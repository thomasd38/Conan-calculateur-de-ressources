const STORAGE_KEY = 'conan_idle_save_v2';
const LEGACY_STORAGE_KEY = 'conan_idle_save_v1';
const TICK_RATE_MS = 250;
const QUEST_SLOTS = 3;

const objectiveDefinitions = [
    {
        id: 'energy_500',
        title: 'Stock stratégique',
        description: 'Atteindre 500 énergie.',
        requirement: (gameState) => gameState.energy >= 500,
        reward: { crystals: 25 }
    },
    {
        id: 'crystals_120',
        title: 'Trésor royal',
        description: 'Atteindre 120 cristaux.',
        requirement: (gameState) => gameState.crystals >= 120,
        reward: { energy: 450 }
    },
    {
        id: 'energy_5000',
        title: 'Réseau aquilonien',
        description: 'Atteindre 5 000 énergie.',
        requirement: (gameState) => gameState.energy >= 5000,
        reward: { crystals: 220 }
    },
    {
        id: 'crystals_500',
        title: 'Cœur de gemmes',
        description: 'Atteindre 500 cristaux.',
        requirement: (gameState) => gameState.crystals >= 500,
        reward: { energy: 2200 }
    }
];

const questDefinitions = [
    {
        id: 'click_50',
        title: 'Main de fer',
        description: 'Effectuer 50 récoltes manuelles.',
        progress: (gameState) => gameState.totalClicks,
        target: 50,
        reward: { energy: 80, crystals: 6 }
    },
    {
        id: 'spend_500_energy',
        title: 'Investisseur prudent',
        description: 'Dépenser 500 énergie en améliorations/actions.',
        progress: (gameState) => gameState.spentEnergy,
        target: 500,
        reward: { crystals: 20 }
    },
    {
        id: 'buy_8_upgrades',
        title: 'Intendant des ateliers',
        description: 'Acheter 8 améliorations.',
        progress: (gameState) => gameState.upgradesPurchased,
        target: 8,
        reward: { energy: 300 }
    },
    {
        id: 'energy_1500',
        title: 'Réserve impériale',
        description: 'Accumuler 1 500 énergie.',
        progress: (gameState) => gameState.energy,
        target: 1500,
        reward: { crystals: 35 }
    },
    {
        id: 'crystals_100',
        title: 'Collectionneur de gemmes',
        description: 'Accumuler 100 cristaux.',
        progress: (gameState) => gameState.crystals,
        target: 100,
        reward: { energy: 420 }
    },
    {
        id: 'drones_10',
        title: 'Escadron complet',
        description: 'Posséder 10 drones récupérateurs.',
        progress: (gameState) => gameState.drones,
        target: 10,
        reward: { crystals: 45 }
    },
    {
        id: 'extractors_6',
        title: 'Front minier',
        description: 'Posséder 6 extracteurs de cristaux.',
        progress: (gameState) => gameState.extractors,
        target: 6,
        reward: { energy: 1200 }
    }
];

const defaultState = {
    energy: 0,
    crystals: 0,
    clickPower: 1,
    baseEnergyPerSec: 1,
    drones: 0,
    extractors: 0,
    refineryLevel: 0,
    converterLevel: 0,
    totalClicks: 0,
    spentEnergy: 0,
    spentCrystals: 0,
    upgradesPurchased: 0,
    questPoints: 0,
    completedQuestIds: [],
    completedObjectiveIds: [],
    activeQuestIds: [],
    productionBoostUntil: 0,
    lastTimestamp: Date.now(),
    lastOfflineGain: 0
};

const state = loadState();
let lastSaveAt = 0;

const statsContainer = document.querySelector('#idle-stats');
const upgradesContainer = document.querySelector('#idle-upgrades');
const offlineGainLabel = document.querySelector('#offline-gain');
const objectivesContainer = document.querySelector('#idle-objectives');
const actionsContainer = document.querySelector('#idle-actions');
const questsContainer = document.querySelector('#idle-quests');

const upgrades = [
    {
        id: 'clickPower',
        title: 'Gants de forgeron',
        description: '+1 énergie par clic',
        getLevel: () => state.clickPower - 1,
        getCost: () => ({ energy: Math.floor(25 * Math.pow(1.35, state.clickPower - 1)) }),
        buy: () => {
            state.clickPower += 1;
        }
    },
    {
        id: 'drones',
        title: 'Drone récupérateur',
        description: '+1 énergie / sec',
        getLevel: () => state.drones,
        getCost: () => ({ energy: Math.floor(45 * Math.pow(1.22, state.drones)) }),
        buy: () => {
            state.drones += 1;
        }
    },
    {
        id: 'extractors',
        title: 'Extracteur de cristaux',
        description: '+0,35 cristal / sec',
        getLevel: () => state.extractors,
        getCost: () => ({ energy: Math.floor(130 * Math.pow(1.3, state.extractors)) }),
        buy: () => {
            state.extractors += 1;
        }
    },
    {
        id: 'refinery',
        title: 'Raffinerie royale',
        description: '+20% à toutes les productions passives',
        getLevel: () => state.refineryLevel,
        getCost: () => ({ crystals: Math.floor(12 * Math.pow(1.6, state.refineryLevel)) }),
        buy: () => {
            state.refineryLevel += 1;
        }
    },
    {
        id: 'converter',
        title: 'Convertisseur alchimique',
        description: 'Améliore la conversion énergie → cristaux.',
        getLevel: () => state.converterLevel,
        getCost: () => ({ energy: Math.floor(220 * Math.pow(1.45, state.converterLevel)), crystals: Math.floor(18 * Math.pow(1.35, state.converterLevel)) }),
        buy: () => {
            state.converterLevel += 1;
        }
    }
];

const actions = [
    {
        id: 'transmute',
        title: 'Transmutation',
        description: () => `Convertit ${formatNumber(getTransmuteCost())} énergie en ${formatNumber(getTransmuteReward())} cristaux.`,
        getCost: () => ({ energy: getTransmuteCost() }),
        run: () => {
            state.crystals += getTransmuteReward();
        }
    },
    {
        id: 'productionBoost',
        title: 'Surcharge des générateurs',
        description: () => 'Double la production passive pendant 30 secondes.',
        getCost: () => ({ energy: 200, crystals: 15 }),
        canRun: () => !isBoostActive(),
        run: () => {
            state.productionBoostUntil = Date.now() + 30000;
        },
        cooldownText: () => {
            if (!isBoostActive()) {
                return '';
            }
            const leftSeconds = Math.max(0, (state.productionBoostUntil - Date.now()) / 1000);
            return `Actif (${formatNumber(leftSeconds)} sec restantes)`;
        }
    },
    {
        id: 'expedition',
        title: 'Expédition de pillage',
        description: () => 'Dépense des cristaux pour un paquet mixte de ressources.',
        getCost: () => ({ crystals: 20 }),
        run: () => {
            state.energy += 260;
            state.crystals += 8;
        }
    }
];

function init() {
    ensureQuestSlots();
    bindEvents();
    applyOfflineProgress();
    processProgression();
    render();
    setInterval(tick, TICK_RATE_MS);
}

function bindEvents() {
    const manualCollectButton = document.querySelector('#manual-collect');
    if (manualCollectButton) {
        manualCollectButton.addEventListener('click', () => {
            state.energy += state.clickPower;
            state.totalClicks += 1;
            processProgression();
            render();
            scheduleSave();
        });
    }

    window.addEventListener('beforeunload', () => {
        saveState();
    });
}

function tick() {
    const now = Date.now();
    const deltaSeconds = Math.max(0, (now - state.lastTimestamp) / 1000);
    state.lastTimestamp = now;

    const production = computeProductionPerSecond();
    state.energy += production.energy * deltaSeconds;
    state.crystals += production.crystals * deltaSeconds;

    processProgression();
    render();
    scheduleSave();
}

function computeProductionPerSecond() {
    const refineryMultiplier = 1 + state.refineryLevel * 0.2;
    const boostMultiplier = isBoostActive() ? 2 : 1;
    return {
        energy: (state.baseEnergyPerSec + state.drones) * refineryMultiplier * boostMultiplier,
        crystals: state.extractors * 0.35 * refineryMultiplier * boostMultiplier
    };
}

function applyOfflineProgress() {
    const now = Date.now();
    const elapsedSeconds = Math.max(0, (now - state.lastTimestamp) / 1000);

    if (elapsedSeconds <= 1) {
        state.lastTimestamp = now;
        state.lastOfflineGain = 0;
        return;
    }

    const production = computeProductionPerSecond();
    const energyGain = production.energy * elapsedSeconds;
    const crystalGain = production.crystals * elapsedSeconds;

    state.energy += energyGain;
    state.crystals += crystalGain;
    state.lastTimestamp = now;
    state.lastOfflineGain = energyGain + crystalGain;
}

function processProgression() {
    completeObjectives();
    completeQuests();
    ensureQuestSlots();
}

function completeObjectives() {
    objectiveDefinitions.forEach((objective) => {
        if (state.completedObjectiveIds.includes(objective.id)) {
            return;
        }

        if (!objective.requirement(state)) {
            return;
        }

        applyReward(objective.reward);
        state.completedObjectiveIds.push(objective.id);
    });
}

function completeQuests() {
    const completedNow = [];

    state.activeQuestIds.forEach((questId) => {
        const quest = getQuestById(questId);
        if (!quest) {
            return;
        }

        if (quest.progress(state) < quest.target) {
            return;
        }

        state.completedQuestIds.push(quest.id);
        completedNow.push(quest.id);
        state.questPoints += 1;
        applyReward(quest.reward);
    });

    if (completedNow.length === 0) {
        return;
    }

    state.activeQuestIds = state.activeQuestIds.filter((questId) => !completedNow.includes(questId));
}

function ensureQuestSlots() {
    const available = questDefinitions
        .map((quest) => quest.id)
        .filter((questId) => !state.completedQuestIds.includes(questId) && !state.activeQuestIds.includes(questId));

    while (state.activeQuestIds.length < QUEST_SLOTS && available.length > 0) {
        state.activeQuestIds.push(available.shift());
    }
}

function render() {
    renderStats();
    renderActions();
    renderUpgrades();
    renderQuests();
    renderObjectives();
    renderOfflineGain();
}

function renderStats() {
    const production = computeProductionPerSecond();
    const questsRemaining = questDefinitions.length - state.completedQuestIds.length;

    statsContainer.innerHTML = `
        <article class="stat-card">
            <p class="stat-card__label">Énergie</p>
            <p class="stat-card__value">${formatNumber(state.energy)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Cristaux</p>
            <p class="stat-card__value">${formatNumber(state.crystals)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Énergie / sec</p>
            <p class="stat-card__value">${formatNumber(production.energy)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Cristaux / sec</p>
            <p class="stat-card__value">${formatNumber(production.crystals)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Quêtes terminées</p>
            <p class="stat-card__value">${formatNumber(state.questPoints)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Quêtes restantes</p>
            <p class="stat-card__value">${formatNumber(Math.max(0, questsRemaining))}</p>
        </article>
    `;
}

function renderActions() {
    actionsContainer.innerHTML = actions.map((action) => {
        const cost = action.getCost();
        const canAfford = hasEnoughResources(cost);
        const customRunState = action.canRun ? action.canRun() : true;
        const canRun = canAfford && customRunState;
        const info = action.cooldownText ? action.cooldownText() : '';

        return `
            <article class="idle-upgrade ${canRun ? '' : 'idle-upgrade--disabled'}">
                <div>
                    <p class="idle-upgrade__title">${action.title}</p>
                    <p class="idle-upgrade__description">${action.description()}</p>
                    <p class="idle-upgrade__meta">Coût: ${formatCost(cost)} ${info ? `• ${info}` : ''}</p>
                </div>
                <button class="button" type="button" data-action-id="${action.id}" ${canRun ? '' : 'disabled'}>
                    Lancer
                </button>
            </article>
        `;
    }).join('');

    actions.forEach((action) => {
        const button = actionsContainer.querySelector(`[data-action-id="${action.id}"]`);
        if (!button) {
            return;
        }

        button.addEventListener('click', () => {
            const cost = action.getCost();
            if (!hasEnoughResources(cost)) {
                return;
            }
            if (action.canRun && !action.canRun()) {
                return;
            }

            payCost(cost);
            action.run();
            processProgression();
            render();
            scheduleSave();
        });
    });
}

function renderUpgrades() {
    upgradesContainer.innerHTML = upgrades.map((upgrade) => {
        const cost = upgrade.getCost();
        const canAfford = hasEnoughResources(cost);

        return `
            <article class="idle-upgrade ${canAfford ? '' : 'idle-upgrade--disabled'}">
                <div>
                    <p class="idle-upgrade__title">${upgrade.title}</p>
                    <p class="idle-upgrade__description">${upgrade.description}</p>
                    <p class="idle-upgrade__meta">Niveau: ${formatNumber(upgrade.getLevel())} • Coût: ${formatCost(cost)}</p>
                </div>
                <button class="button" type="button" data-upgrade-id="${upgrade.id}" ${canAfford ? '' : 'disabled'}>
                    Acheter
                </button>
            </article>
        `;
    }).join('');

    upgrades.forEach((upgrade) => {
        const button = upgradesContainer.querySelector(`[data-upgrade-id="${upgrade.id}"]`);
        if (!button) {
            return;
        }

        button.addEventListener('click', () => {
            const cost = upgrade.getCost();
            if (!hasEnoughResources(cost)) {
                return;
            }

            payCost(cost);
            upgrade.buy();
            state.upgradesPurchased += 1;
            processProgression();
            render();
            scheduleSave();
        });
    });
}

function renderQuests() {
    if (state.activeQuestIds.length === 0) {
        questsContainer.innerHTML = '<p class="idle-empty">Toutes les quêtes sont terminées.</p>';
        return;
    }

    questsContainer.innerHTML = state.activeQuestIds.map((questId) => {
        const quest = getQuestById(questId);
        if (!quest) {
            return '';
        }

        const progressValue = Math.min(quest.target, quest.progress(state));
        const ratio = quest.target <= 0 ? 0 : (progressValue / quest.target) * 100;

        return `
            <article class="idle-objective">
                <p class="idle-upgrade__title">${quest.title}</p>
                <p class="idle-upgrade__description">${quest.description}</p>
                <p class="idle-upgrade__meta">Progression: ${formatNumber(progressValue)} / ${formatNumber(quest.target)} • Récompense: ${formatCost(quest.reward)}</p>
                <div class="idle-progress">
                    <span style="width: ${Math.min(100, ratio)}%"></span>
                </div>
            </article>
        `;
    }).join('');
}

function renderObjectives() {
    objectivesContainer.innerHTML = objectiveDefinitions.map((objective) => {
        const completed = state.completedObjectiveIds.includes(objective.id);
        return `
            <article class="idle-objective ${completed ? 'idle-objective--done' : ''}">
                <p class="idle-upgrade__title">${objective.title}</p>
                <p class="idle-upgrade__description">${objective.description}</p>
                <p class="idle-upgrade__meta">Récompense: ${formatCost(objective.reward)}${completed ? ' • Terminé' : ''}</p>
            </article>
        `;
    }).join('');
}

function renderOfflineGain() {
    if (state.lastOfflineGain > 0) {
        offlineGainLabel.textContent = `Progression hors-ligne récupérée: +${formatNumber(state.lastOfflineGain)} ressources.`;
    } else {
        offlineGainLabel.textContent = 'Aucune progression hors-ligne détectée cette session.';
    }
}

function getQuestById(id) {
    return questDefinitions.find((quest) => quest.id === id);
}

function getTransmuteCost() {
    return Math.max(20, 60 - state.converterLevel * 6);
}

function getTransmuteReward() {
    return 4 + state.converterLevel * 1.5;
}

function isBoostActive() {
    return state.productionBoostUntil > Date.now();
}

function formatCost(cost) {
    return Object.entries(cost)
        .map(([key, value]) => `${formatNumber(value)} ${key === 'energy' ? 'énergie' : 'cristaux'}`)
        .join(' • ');
}

function hasEnoughResources(cost) {
    if (cost.energy && state.energy < cost.energy) {
        return false;
    }

    if (cost.crystals && state.crystals < cost.crystals) {
        return false;
    }

    return true;
}

function payCost(cost) {
    if (cost.energy) {
        state.energy -= cost.energy;
        state.spentEnergy += cost.energy;
    }

    if (cost.crystals) {
        state.crystals -= cost.crystals;
        state.spentCrystals += cost.crystals;
    }
}

function applyReward(reward) {
    if (reward.energy) {
        state.energy += reward.energy;
    }

    if (reward.crystals) {
        state.crystals += reward.crystals;
    }
}

function scheduleSave() {
    const now = Date.now();
    if (now - lastSaveAt < 1000) {
        return;
    }

    saveState();
    lastSaveAt = now;
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Silencieux: certains navigateurs peuvent bloquer l'écriture en mode privé.
    }
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

    if (!raw) {
        return structuredClone(defaultState);
    }

    try {
        const parsed = JSON.parse(raw);
        return {
            ...structuredClone(defaultState),
            ...parsed,
            completedQuestIds: Array.isArray(parsed.completedQuestIds) ? parsed.completedQuestIds : [],
            completedObjectiveIds: Array.isArray(parsed.completedObjectiveIds) ? parsed.completedObjectiveIds : [],
            activeQuestIds: Array.isArray(parsed.activeQuestIds) ? parsed.activeQuestIds : []
        };
    } catch {
        return structuredClone(defaultState);
    }
}

function formatNumber(value) {
    return Number(value).toLocaleString('fr-FR', {
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
    });
}

init();
