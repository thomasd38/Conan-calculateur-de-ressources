const STORAGE_KEY = 'conan_idle_save_v1';
const TICK_RATE_MS = 250;

const defaultState = {
    energy: 0,
    crystals: 0,
    clickPower: 1,
    drones: 0,
    extractors: 0,
    refineryLevel: 0,
    totalClicks: 0,
    lastTimestamp: Date.now(),
    lastOfflineGain: 0
};

const state = loadState();
let lastSaveAt = 0;

const statsContainer = document.querySelector('#idle-stats');
const upgradesContainer = document.querySelector('#idle-upgrades');
const offlineGainLabel = document.querySelector('#offline-gain');

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
    }
];

function init() {
    bindEvents();
    applyOfflineProgress();
    render();
    setInterval(tick, TICK_RATE_MS);
}

function bindEvents() {
    document.querySelector('#manual-collect').addEventListener('click', () => {
        state.energy += state.clickPower;
        state.totalClicks += 1;
        render();
        scheduleSave();
    });

    document.querySelector('#reset-save').addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        Object.assign(state, structuredClone(defaultState));
        state.lastTimestamp = Date.now();
        state.lastOfflineGain = 0;
        render();
        saveState();
    });

    window.addEventListener('beforeunload', () => {
        saveState();
    });
}

function tick() {
    const now = Date.now();
    const deltaSeconds = Math.max(0, (now - state.lastTimestamp) / 1000);
    state.lastTimestamp = now;

    const multiplier = 1 + state.refineryLevel * 0.2;
    const energyGain = state.drones * deltaSeconds * multiplier;
    const crystalGain = state.extractors * 0.35 * deltaSeconds * multiplier;

    state.energy += energyGain;
    state.crystals += crystalGain;

    render();
    scheduleSave();
}

function applyOfflineProgress() {
    const now = Date.now();
    const elapsedSeconds = Math.max(0, (now - state.lastTimestamp) / 1000);

    if (elapsedSeconds <= 1) {
        state.lastTimestamp = now;
        state.lastOfflineGain = 0;
        return;
    }

    const multiplier = 1 + state.refineryLevel * 0.2;
    const energyGain = state.drones * elapsedSeconds * multiplier;
    const crystalGain = state.extractors * 0.35 * elapsedSeconds * multiplier;

    state.energy += energyGain;
    state.crystals += crystalGain;
    state.lastTimestamp = now;
    state.lastOfflineGain = energyGain + crystalGain;
}

function render() {
    renderStats();
    renderUpgrades();
    renderOfflineGain();
}

function renderStats() {
    const multiplier = 1 + state.refineryLevel * 0.2;
    const energyPerSec = state.drones * multiplier;
    const crystalPerSec = state.extractors * 0.35 * multiplier;

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
            <p class="stat-card__label">Clics manuels</p>
            <p class="stat-card__value">${formatNumber(state.totalClicks)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Énergie / sec</p>
            <p class="stat-card__value">${formatNumber(energyPerSec)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Cristaux / sec</p>
            <p class="stat-card__value">${formatNumber(crystalPerSec)}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Bonus raffinerie</p>
            <p class="stat-card__value">x${(multiplier).toFixed(2)}</p>
        </article>
    `;
}

function renderUpgrades() {
    upgradesContainer.innerHTML = upgrades.map((upgrade) => {
        const cost = upgrade.getCost();
        const canAfford = hasEnoughResources(cost);
        const costText = Object.entries(cost)
            .map(([key, value]) => `${formatNumber(value)} ${key === 'energy' ? 'énergie' : 'cristaux'}`)
            .join(' • ');

        return `
            <article class="idle-upgrade ${canAfford ? '' : 'idle-upgrade--disabled'}">
                <div>
                    <p class="idle-upgrade__title">${upgrade.title}</p>
                    <p class="idle-upgrade__description">${upgrade.description}</p>
                    <p class="idle-upgrade__meta">Niveau: ${formatNumber(upgrade.getLevel())} • Coût: ${costText}</p>
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
            render();
            scheduleSave();
        });
    });
}

function renderOfflineGain() {
    if (state.lastOfflineGain > 0) {
        offlineGainLabel.textContent = `Progression hors-ligne récupérée: +${formatNumber(state.lastOfflineGain)} ressources.`;
    } else {
        offlineGainLabel.textContent = 'Aucune progression hors-ligne détectée cette session.';
    }
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
    }

    if (cost.crystals) {
        state.crystals -= cost.crystals;
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
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return structuredClone(defaultState);
    }

    try {
        const parsed = JSON.parse(raw);
        return {
            ...structuredClone(defaultState),
            ...parsed
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
