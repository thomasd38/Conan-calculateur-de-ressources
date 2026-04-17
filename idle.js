const STORAGE_KEY = 'conan_idle_save_v2';
const LEGACY_STORAGE_KEY = 'conan_idle_save_v1';
const FAST_TICK_RATE_MS = 250;
const SLOW_TICK_RATE_MS = 1000;
const QUEST_SLOTS = 3;

const questDefinitions = [
    // Tier 1 — Débutant
    { id: 'click_25', title: 'Première récolte', description: 'Effectuer 25 récoltes manuelles.', progress: (s) => s.totalClicks, target: 25, reward: { energy: 40 } },
    { id: 'energy_100', title: 'Premier feu', description: 'Accumuler 100 énergie.', progress: (s) => s.energy, target: 100, reward: { crystals: 5 } },
    { id: 'click_50', title: 'Main de fer', description: 'Effectuer 50 récoltes manuelles.', progress: (s) => s.totalClicks, target: 50, reward: { energy: 80, crystals: 6 } },
    { id: 'crystals_20', title: 'Premières gemmes', description: 'Accumuler 20 cristaux.', progress: (s) => s.crystals, target: 20, reward: { energy: 80 } },
    { id: 'spend_200_energy', title: 'Premier chantier', description: 'Dépenser 200 énergie en améliorations/actions.', progress: (s) => s.spentEnergy, target: 200, reward: { crystals: 12 } },
    { id: 'buy_3_upgrades', title: 'Apprenti intendant', description: 'Acheter 3 améliorations.', progress: (s) => s.upgradesPurchased, target: 3, reward: { energy: 120, crystals: 4 } },
    { id: 'energy_500', title: 'Stock stratégique', description: 'Accumuler 500 énergie.', progress: (s) => s.energy, target: 500, reward: { crystals: 25 } },
    { id: 'spend_500_energy', title: 'Investisseur prudent', description: 'Dépenser 500 énergie en améliorations/actions.', progress: (s) => s.spentEnergy, target: 500, reward: { crystals: 20 } },
    { id: 'energy_1500', title: 'Réserve impériale', description: 'Accumuler 1 500 énergie.', progress: (s) => s.energy, target: 1500, reward: { crystals: 35 } },
    { id: 'buy_8_upgrades', title: 'Intendant des ateliers', description: 'Acheter 8 améliorations.', progress: (s) => s.upgradesPurchased, target: 8, reward: { energy: 300 } },

    // Tier 2 — Apprenti
    { id: 'crystals_100', title: 'Collectionneur de gemmes', description: 'Accumuler 100 cristaux.', progress: (s) => s.crystals, target: 100, reward: { energy: 420 } },
    { id: 'crystals_120', title: 'Trésor royal', description: 'Accumuler 120 cristaux.', progress: (s) => s.crystals, target: 120, reward: { energy: 450 } },
    { id: 'drones_10', title: 'Escadron complet', description: 'Posséder 10 drones récupérateurs.', progress: (s) => s.drones, target: 10, reward: { crystals: 45 } },
    { id: 'click_250', title: 'Battement régulier', description: 'Effectuer 250 récoltes manuelles.', progress: (s) => s.totalClicks, target: 250, reward: { energy: 600, crystals: 25 } },
    { id: 'extractors_6', title: 'Front minier', description: 'Posséder 6 extracteurs de cristaux.', progress: (s) => s.extractors, target: 6, reward: { energy: 1200 } },
    { id: 'energy_5000', title: 'Réseau aquilonien', description: 'Accumuler 5 000 énergie.', progress: (s) => s.energy, target: 5000, reward: { crystals: 220 } },
    { id: 'energy_10000', title: 'Entrepôt royal', description: 'Accumuler 10 000 énergie.', progress: (s) => s.energy, target: 10000, reward: { crystals: 150 } },
    { id: 'buy_20_upgrades', title: 'Maître intendant', description: 'Acheter 20 améliorations.', progress: (s) => s.upgradesPurchased, target: 20, reward: { energy: 2000, crystals: 60 } },
    { id: 'crystals_500', title: 'Cœur de gemmes', description: 'Accumuler 500 cristaux.', progress: (s) => s.crystals, target: 500, reward: { energy: 2200 } },
    { id: 'crystals_500_quest', title: 'Veine profonde', description: 'Accumuler 500 cristaux.', progress: (s) => s.crystals, target: 500, reward: { energy: 3000 } },
    { id: 'drones_25', title: 'Flotte aquilonienne', description: 'Posséder 25 drones récupérateurs.', progress: (s) => s.drones, target: 25, reward: { crystals: 200 } },

    // Tier 3 — Vétéran
    { id: 'extractors_20', title: 'Réseau minier', description: 'Posséder 20 extracteurs de cristaux.', progress: (s) => s.extractors, target: 20, reward: { energy: 8000, crystals: 150 } },
    { id: 'click_1000', title: 'Bras inlassable', description: 'Effectuer 1 000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 1000, reward: { energy: 4000, crystals: 120 } },
    { id: 'energy_25000', title: 'Brasier d\'empire', description: 'Accumuler 25 000 énergie.', progress: (s) => s.energy, target: 25000, reward: { crystals: 700, gold: 2 } },
    { id: 'energy_50k', title: 'Grenier aquilonien', description: 'Accumuler 50 000 énergie.', progress: (s) => s.energy, target: 50000, reward: { crystals: 600, gold: 3 } },
    { id: 'crystals_2500', title: 'Cargaison de gemmes', description: 'Accumuler 2 500 cristaux.', progress: (s) => s.crystals, target: 2500, reward: { energy: 20000, gold: 5 } },
    { id: 'crystals_2500_obj', title: 'Mur de cristal', description: 'Accumuler 2 500 cristaux.', progress: (s) => s.crystals, target: 2500, reward: { energy: 12000, gold: 3 } },
    { id: 'gold_10', title: 'Premières pièces', description: 'Accumuler 10 or.', progress: (s) => s.gold, target: 10, reward: { crystals: 1500 } },
    { id: 'refinery_10', title: 'Raffineur expert', description: 'Atteindre le niveau 10 de la raffinerie.', progress: (s) => s.refineryLevel, target: 10, reward: { crystals: 400 } },
    { id: 'converter_5', title: 'Alchimiste confirmé', description: 'Atteindre le niveau 5 du convertisseur.', progress: (s) => s.converterLevel, target: 5, reward: { energy: 15000, gold: 4 } },
    { id: 'buy_40_upgrades', title: 'Grand architecte', description: 'Acheter 40 améliorations.', progress: (s) => s.upgradesPurchased, target: 40, reward: { crystals: 1200, gold: 8 } },
    { id: 'spend_100k_energy', title: 'Bâtisseur insatiable', description: 'Dépenser 100 000 énergie.', progress: (s) => s.spentEnergy, target: 100000, reward: { gold: 12 } },

    // Tier 4 — Conquérant
    { id: 'gold_50', title: 'Bourse du conquérant', description: 'Accumuler 50 or.', progress: (s) => s.gold, target: 50, reward: { crystals: 4000 } },
    { id: 'prospectors_15', title: 'Filon découvert', description: 'Posséder 15 prospecteurs aquiloniens.', progress: (s) => s.prospectors, target: 15, reward: { gold: 40, crystals: 3000 } },
    { id: 'drones_100', title: 'Légion mécanique', description: 'Posséder 100 drones récupérateurs.', progress: (s) => s.drones, target: 100, reward: { crystals: 6000, gold: 25 } },
    { id: 'extractors_60', title: 'Réseau profond', description: 'Posséder 60 extracteurs de cristaux.', progress: (s) => s.extractors, target: 60, reward: { energy: 150000, gold: 30 } },
    { id: 'click_5000', title: 'Volonté indomptable', description: 'Effectuer 5 000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 5000, reward: { gold: 35, crystals: 5000 } },
    { id: 'energy_250k', title: 'Trésor de guerre', description: 'Accumuler 250 000 énergie.', progress: (s) => s.energy, target: 250000, reward: { crystals: 8000, gold: 45 } },
    { id: 'energy_250k_obj', title: 'Cascade d\'énergie', description: 'Accumuler 250 000 énergie.', progress: (s) => s.energy, target: 250000, reward: { gold: 20, crystals: 4000 } },
    { id: 'crystals_15k', title: 'Chambre forte', description: 'Accumuler 15 000 cristaux.', progress: (s) => s.crystals, target: 15000, reward: { gold: 60 } },
    { id: 'crystals_25k_obj', title: 'Mine royale', description: 'Accumuler 25 000 cristaux.', progress: (s) => s.crystals, target: 25000, reward: { gold: 35 } },
    { id: 'gold_500', title: 'Rançon royale', description: 'Accumuler 500 or.', progress: (s) => s.gold, target: 500, reward: { crystals: 25000, energy: 500000 } },
    { id: 'gold_500_obj', title: 'Rançon du prince', description: 'Accumuler 500 or.', progress: (s) => s.gold, target: 500, reward: { crystals: 20000, energy: 300000 } },

    // Tier 5 — Héros
    { id: 'click_20000', title: 'Héros sans relâche', description: 'Effectuer 20 000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 20000, reward: { gold: 150, crystals: 20000 } },
    { id: 'relics_5', title: 'Première relique', description: 'Accumuler 5 reliques.', progress: (s) => s.relics, target: 5, reward: { gold: 250, crystals: 40000 } },
    { id: 'energy_2M', title: 'Réserve titanesque', description: 'Accumuler 2 000 000 énergie.', progress: (s) => s.energy, target: 2000000, reward: { gold: 300, crystals: 50000 } },
    { id: 'energy_2M_obj', title: 'Puits infini', description: 'Accumuler 2 000 000 énergie.', progress: (s) => s.energy, target: 2000000, reward: { gold: 180, relics: 1 } },
    { id: 'crystals_100k', title: 'Mine infinie', description: 'Accumuler 100 000 cristaux.', progress: (s) => s.crystals, target: 100000, reward: { gold: 500, relics: 2 } },
    { id: 'crystals_500k', title: 'Falaise cristalline', description: 'Accumuler 500 000 cristaux.', progress: (s) => s.crystals, target: 500000, reward: { gold: 2500, relics: 12 } },
    { id: 'drones_300', title: 'Armée d\'acier', description: 'Posséder 300 drones récupérateurs.', progress: (s) => s.drones, target: 300, reward: { gold: 400, crystals: 40000 } },
    { id: 'gold_5k', title: 'Trésorier royal', description: 'Accumuler 5 000 or.', progress: (s) => s.gold, target: 5000, reward: { relics: 5, crystals: 80000 } },
    { id: 'relics_20', title: 'Éveil des anciens', description: 'Accumuler 20 reliques.', progress: (s) => s.relics, target: 20, reward: { gold: 2000, energy: 5000000 } },
    { id: 'archeologists_8', title: 'Société savante', description: 'Posséder 8 archéologues stygiens.', progress: (s) => s.archeologists, target: 8, reward: { relics: 8, gold: 1000 } },
    { id: 'converter_20', title: 'Grand alchimiste', description: 'Atteindre le niveau 20 du convertisseur.', progress: (s) => s.converterLevel, target: 20, reward: { gold: 800, crystals: 60000 } },

    // Tier 6 — Légende
    { id: 'gold_50k', title: 'Dragon naissant', description: 'Accumuler 50 000 or.', progress: (s) => s.gold, target: 50000, reward: { relics: 40, crystals: 200000 } },
    { id: 'energy_20M', title: 'Colosse d\'énergie', description: 'Accumuler 20 000 000 énergie.', progress: (s) => s.energy, target: 20000000, reward: { relics: 25, gold: 5000 } },
    { id: 'energy_50M', title: 'Âme du monde', description: 'Accumuler 50 000 000 énergie.', progress: (s) => s.energy, target: 50000000, reward: { relics: 120, gold: 25000 } },
    { id: 'crystals_1M', title: 'Palais de cristal', description: 'Accumuler 1 000 000 cristaux.', progress: (s) => s.crystals, target: 1000000, reward: { relics: 40, gold: 8000 } },
    { id: 'gold_100k', title: 'Dragon thésauriseur', description: 'Accumuler 100 000 or.', progress: (s) => s.gold, target: 100000, reward: { relics: 80, crystals: 500000 } },
    { id: 'relics_300', title: 'Gardien des âges', description: 'Accumuler 300 reliques.', progress: (s) => s.relics, target: 300, reward: { gold: 50000, crystals: 2000000 } },
    { id: 'relics_500', title: 'Sanctuaire complet', description: 'Accumuler 500 reliques.', progress: (s) => s.relics, target: 500, reward: { gold: 80000, crystals: 3000000 } },
    { id: 'temple_15', title: 'Ordre des oubliés', description: 'Atteindre le niveau 15 du temple oublié.', progress: (s) => s.templeLevel, target: 15, reward: { relics: 60, gold: 10000 } },
    { id: 'vault_15', title: 'Coffres scellés', description: 'Atteindre le niveau 15 du coffre royal.', progress: (s) => s.vaultLevel, target: 15, reward: { gold: 20000, crystals: 750000 } },
    { id: 'buy_150_upgrades', title: 'Architecte mythique', description: 'Acheter 150 améliorations.', progress: (s) => s.upgradesPurchased, target: 150, reward: { relics: 35, gold: 15000 } },
    { id: 'spend_5M_energy', title: 'Fondateur d\'empire', description: 'Dépenser 5 000 000 énergie.', progress: (s) => s.spentEnergy, target: 5000000, reward: { relics: 50, gold: 20000 } },

    // Tier 7 — Divin
    { id: 'energy_200M', title: 'Écho cosmique', description: 'Accumuler 200 000 000 énergie.', progress: (s) => s.energy, target: 200000000, reward: { relics: 250, gold: 80000 } },
    { id: 'crystals_15M', title: 'Océan de cristal', description: 'Accumuler 15 000 000 cristaux.', progress: (s) => s.crystals, target: 15000000, reward: { relics: 300, gold: 120000 } },
    { id: 'gold_2M', title: 'Trône d\'or', description: 'Accumuler 2 000 000 or.', progress: (s) => s.gold, target: 2000000, reward: { relics: 500, crystals: 10000000 } },
    { id: 'relics_5000', title: 'Panthéon retrouvé', description: 'Accumuler 5 000 reliques.', progress: (s) => s.relics, target: 5000, reward: { gold: 500000, crystals: 25000000 } },
    { id: 'stormforge_20', title: 'Forgeron des tempêtes', description: 'Atteindre le niveau 20 de la forge des tempêtes.', progress: (s) => s.stormforgeLevel, target: 20, reward: { relics: 400, gold: 200000 } },
    { id: 'total_clicks_100k', title: 'Mythe vivant', description: 'Effectuer 100 000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 100000, reward: { relics: 200, gold: 60000 } },
    { id: 'spent_gold_500k', title: 'Roi prodigue', description: 'Dépenser 500 000 or.', progress: (s) => s.spentGold, target: 500000, reward: { relics: 600, crystals: 20000000 } },
    { id: 'archeologists_40', title: 'Académie cachée', description: 'Posséder 40 archéologues stygiens.', progress: (s) => s.archeologists, target: 40, reward: { relics: 350, gold: 150000 } }
];

const defaultState = {
    energy: 0,
    crystals: 0,
    gold: 0,
    relics: 0,
    clickPower: 1,
    clickCrystalPower: 0,
    baseEnergyPerSec: 0,
    drones: 0,
    extractors: 0,
    prospectors: 0,
    archeologists: 0,
    refineryLevel: 0,
    converterLevel: 0,
    vaultLevel: 0,
    templeLevel: 0,
    stormforgeLevel: 0,
    totalClicks: 0,
    spentEnergy: 0,
    spentCrystals: 0,
    spentGold: 0,
    spentRelics: 0,
    upgradesPurchased: 0,
    questPoints: 0,
    completedQuestIds: [],
    activeQuestIds: [],
    productionBoostUntil: 0,
    lastTimestamp: Date.now()
};

const state = loadState();
let lastSaveAt = 0;
let isResettingSave = false;

const resourcesContainer = document.querySelector('#idle-resources');
const upgradesContainer = document.querySelector('#idle-upgrades');
const missionsContainer = document.querySelector('#idle-missions');
const actionsContainer = document.querySelector('#idle-actions');

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
        title: 'Extracteur de minerai',
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
        description: '+20% à l\'énergie et aux cristaux produits.',
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
    },
    {
        id: 'clickCrystalPower',
        title: 'Pioche sertie',
        description: '+0,1 cristal par clic',
        getLevel: () => Math.round(state.clickCrystalPower * 10),
        getCost: () => ({
            crystals: Math.floor(60 * Math.pow(1.4, Math.round(state.clickCrystalPower * 10))),
            energy: Math.floor(300 * Math.pow(1.35, Math.round(state.clickCrystalPower * 10)))
        }),
        buy: () => {
            state.clickCrystalPower = Math.round((state.clickCrystalPower + 0.1) * 10) / 10;
        }
    },
    {
        id: 'prospector',
        title: 'Prospecteur aquilonien',
        description: '+0,05 or / sec',
        getLevel: () => state.prospectors,
        getCost: () => ({
            energy: Math.floor(1500 * Math.pow(1.32, state.prospectors)),
            crystals: Math.floor(90 * Math.pow(1.28, state.prospectors))
        }),
        buy: () => {
            state.prospectors += 1;
        }
    },
    {
        id: 'vault',
        title: 'Coffre royal',
        description: '+25% à la production d\'or.',
        getLevel: () => state.vaultLevel,
        getCost: () => ({ gold: Math.floor(6 * Math.pow(1.55, state.vaultLevel)) }),
        buy: () => {
            state.vaultLevel += 1;
        }
    },
    {
        id: 'archeologists',
        title: 'Archéologue stygien',
        description: '+0,005 relique / sec',
        getLevel: () => state.archeologists,
        getCost: () => ({
            gold: Math.floor(80 * Math.pow(1.4, state.archeologists)),
            crystals: Math.floor(2500 * Math.pow(1.35, state.archeologists))
        }),
        buy: () => {
            state.archeologists += 1;
        }
    },
    {
        id: 'temple',
        title: 'Temple oublié',
        description: '+30% à la production de reliques.',
        getLevel: () => state.templeLevel,
        getCost: () => ({ relics: Math.floor(4 * Math.pow(1.7, state.templeLevel)) }),
        buy: () => {
            state.templeLevel += 1;
        }
    },
    {
        id: 'stormforge',
        title: 'Forge des tempêtes',
        description: '+15% à toutes les productions passives.',
        getLevel: () => state.stormforgeLevel,
        getCost: () => ({
            gold: Math.floor(150 * Math.pow(1.6, state.stormforgeLevel)),
            relics: Math.floor(3 * Math.pow(1.75, state.stormforgeLevel))
        }),
        buy: () => {
            state.stormforgeLevel += 1;
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
    },
    {
        id: 'marketTrade',
        title: 'Marché de Tarantia',
        description: () => 'Échange 150 cristaux contre 5 or.',
        getCost: () => ({ crystals: 150 }),
        run: () => {
            state.gold += 5;
        }
    },
    {
        id: 'royalPillage',
        title: 'Razzia royale',
        description: () => 'Gros pillage: beaucoup d\'énergie et cristaux pour une bourse d\'or.',
        getCost: () => ({ energy: 2000, crystals: 200 }),
        run: () => {
            state.gold += 18;
            state.energy += 400;
        }
    },
    {
        id: 'mercenaryRaid',
        title: 'Raid de mercenaires',
        description: () => 'Embauche des mercenaires contre de l\'or pour un afflux brut d\'énergie et de cristaux.',
        getCost: () => ({ gold: 40 }),
        run: () => {
            state.energy += 8000;
            state.crystals += 350;
        }
    },
    {
        id: 'archeologicalDig',
        title: 'Fouille archéologique',
        description: () => 'Finance une fouille majeure pour exhumer des reliques oubliées.',
        getCost: () => ({ energy: 25000, gold: 200 }),
        run: () => {
            state.relics += 3;
            state.crystals += 500;
        }
    },
    {
        id: 'stormTribute',
        title: 'Tribut aux tempêtes',
        description: () => 'Consume une relique pour un déluge d\'énergie et de cristaux.',
        getCost: () => ({ relics: 1 }),
        run: () => {
            state.energy += 120000;
            state.crystals += 4500;
            state.gold += 35;
        }
    },

    {
        id: 'grandRitual',
        title: 'Grand rituel de Set',
        description: () => 'Rituel ruineux: offre toutes tes ressources majeures pour un gain légendaire.',
        getCost: () => ({ energy: 500000, crystals: 25000, gold: 2500, relics: 5 }),
        run: () => {
            state.relics += 30;
            state.gold += 800;
            state.crystals += 80000;
            state.energy += 1500000;
            state.productionBoostUntil = Math.max(state.productionBoostUntil, Date.now()) + 120000;
        }
    }
];

function init() {
    ensureQuestSlots();
    bindEvents();
    applyOfflineProgress();
    processProgression();
    renderActions();
    renderUpgrades();
    render();
    setInterval(tickFast, FAST_TICK_RATE_MS);
    setInterval(tickSlow, SLOW_TICK_RATE_MS);
}

function bindEvents() {
    const manualCollectButton = document.querySelector('#manual-collect');
    if (manualCollectButton) {
        manualCollectButton.addEventListener('click', () => {
            const energyGain = state.clickPower;
            let crystalGain = 0;

            state.energy += energyGain;
            if (state.clickCrystalPower > 0) {
                crystalGain = state.clickCrystalPower;
                state.crystals += crystalGain;
            }
            state.totalClicks += 1;

            const rect = manualCollectButton.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            spawnFloatingText(`+${formatNumber(energyGain)}`, centerX, centerY);

            processProgression();
            renderActions();
            renderUpgrades();
            render();
            scheduleSave();
        });
    }

    const navButtons = document.querySelectorAll('.idle-side-nav .idle-icon-btn');
    const sidePanel = document.getElementById('idle-side-panel');
    const centerAction = document.querySelector('.idle-center-action');
    const panelContents = document.querySelectorAll('.idle-panel-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = 'panel-' + btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                sidePanel.classList.remove('open');
                centerAction.classList.remove('menu-open');
                if (targetContent) targetContent.classList.remove('active');
            } else {
                navButtons.forEach(b => b.classList.remove('active'));
                panelContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                if (targetContent) targetContent.classList.add('active');

                sidePanel.classList.add('open');
                centerAction.classList.add('menu-open');
            }
        });
    });

    const resetSaveButton = document.querySelector('#button-reset-save-idle');
    if (resetSaveButton) {
        resetSaveButton.addEventListener('click', resetIdleSave);
    }

    window.addEventListener('beforeunload', () => {
        if (isResettingSave) {
            return;
        }
        saveState();
    });
}


function tickFast() {
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

function tickSlow() {
    renderActions();
    renderUpgrades();
}

function computeProductionPerSecond() {
    const refineryMultiplier = 1 + state.refineryLevel * 0.2;
    const vaultMultiplier = 1 + state.vaultLevel * 0.25;
    const templeMultiplier = 1 + state.templeLevel * 0.3;
    const stormforgeMultiplier = 1 + state.stormforgeLevel * 0.15;
    const boostMultiplier = isBoostActive() ? 2 : 1;
    const commonMultiplier = stormforgeMultiplier * boostMultiplier;

    return {
        energy: (state.baseEnergyPerSec + state.drones) * refineryMultiplier * commonMultiplier,
        crystals: state.extractors * 0.35 * refineryMultiplier * commonMultiplier,
        gold: state.prospectors * 0.05 * vaultMultiplier * commonMultiplier,
        relics: state.archeologists * 0.005 * templeMultiplier * commonMultiplier
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
    const goldGain = production.gold * elapsedSeconds;
    const relicGain = production.relics * elapsedSeconds;

    state.energy += energyGain;
    state.crystals += crystalGain;
    state.gold += goldGain;
    state.relics += relicGain;
    state.lastTimestamp = now;
    state.lastOfflineGain = energyGain + crystalGain + goldGain + relicGain;
}

function processProgression() {
    completeQuests();
    ensureQuestSlots();
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

    while (available.length > 0) {
        state.activeQuestIds.push(available.shift());
    }
}

const RESOURCE_DISPLAY = [
    { key: 'energy', label: 'Énergie', icon: 'fa-solid fa-bolt' },
    { key: 'crystals', label: 'Cristaux', icon: 'fa-solid fa-gem' },
    { key: 'gold', label: 'Or', icon: 'fa-solid fa-coins' },
    { key: 'relics', label: 'Reliques', icon: 'fa-solid fa-monument' }
];

function render() {
    renderResources();
    renderMissions();
}

function renderResources() {
    const production = computeProductionPerSecond();

    const visibleResources = RESOURCE_DISPLAY.filter((resource) => {
        if (resource.key === 'energy') return true;
        
        const spentKey = 'spent' + resource.key.charAt(0).toUpperCase() + resource.key.slice(1);
        return state[resource.key] > 0 || state[spentKey] > 0;
    });

    resourcesContainer.innerHTML = visibleResources.map((resource) => `
        <div class="idle-resource" title="${resource.label}">
            <i class="${resource.icon} idle-resource__icon" aria-hidden="true"></i>
            <div class="idle-resource__info">
                <span class="idle-resource__value">${formatNumber(state[resource.key])}</span>
                <span class="idle-resource__rate">+${formatNumber(production[resource.key])} / sec</span>
            </div>
        </div>
    `).join('');
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
                    <p class="idle-upgrade__title">${formatText(action.title)}</p>
                    <p class="idle-upgrade__description">${formatText(action.description())}</p>
                    <p class="idle-upgrade__meta">Coût: ${formatCost(cost)} ${info ? `• ${info}` : ''}</p>
                </div>
                <button class="button" type="button" data-action-id="${action.id}" ${canRun ? '' : 'disabled'} aria-label="Lancer" title="Lancer">
                    <i class="fa-solid fa-play"></i>
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
            renderActions();
            renderUpgrades();
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
                    <p class="idle-upgrade__title">${formatText(upgrade.title)}</p>
                    <p class="idle-upgrade__description">${formatText(upgrade.description)}</p>
                    <p class="idle-upgrade__meta">Niveau: ${formatNumber(upgrade.getLevel())} • Coût: ${formatCost(cost)}</p>
                </div>
                <button class="button" type="button" data-upgrade-id="${upgrade.id}" ${canAfford ? '' : 'disabled'} aria-label="Acheter" title="Acheter">
                    <i class="fa-solid fa-arrow-up"></i>
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
            renderActions();
            renderUpgrades();
            render();
            scheduleSave();
        });
    });
}

function renderMissions() {
    let uncompletedCount = 0;

    const cards = questDefinitions.map((quest) => {
        const isCompleted = state.completedQuestIds.includes(quest.id);

        if (isCompleted) {
            return `
                <article class="idle-objective idle-objective--done">
                    <p class="idle-objective__badge">Terminée</p>
                    <p class="idle-upgrade__title" style="color: #6ce5b1;">${quest.title}</p>
                </article>
            `;
        }

        uncompletedCount++;

        if (uncompletedCount <= 5) {
            const progressValue = Math.min(quest.target, quest.progress(state));
            const ratio = quest.target <= 0 ? 0 : (progressValue / quest.target) * 100;

            return `
                <article class="idle-objective idle-objective--quest">
                    <p class="idle-objective__badge">Quête active</p>
                    <p class="idle-upgrade__title">${formatText(quest.title)}</p>
                    <p class="idle-upgrade__description">${formatText(quest.description)}</p>
                    <p class="idle-upgrade__meta">Progression: ${formatNumber(progressValue)} / ${formatNumber(quest.target)} • Récompense: ${formatCost(quest.reward)}</p>
                    <div class="idle-progress">
                        <span style="width: ${Math.min(100, ratio)}%"></span>
                    </div>
                </article>
            `;
        } else {
            return `
                <article class="idle-objective idle-objective--quest" style="opacity: 0.4;">
                    <p class="idle-objective__badge">Quête verrouillée</p>
                    <p class="idle-upgrade__title">???</p>
                    <p class="idle-upgrade__description">?????</p>
                    <p class="idle-upgrade__meta">Progression: ??? / ??? • Récompense: ???</p>
                    <div class="idle-progress">
                        <span style="width: 0%"></span>
                    </div>
                </article>
            `;
        }
    });

    missionsContainer.innerHTML = cards.join('');
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

const RESOURCE_LABELS = {
    energy: '<i class="fa-solid fa-bolt" title="énergie"></i>',
    crystals: '<i class="fa-solid fa-gem" title="cristaux"></i>',
    gold: '<i class="fa-solid fa-coins" title="or"></i>',
    relics: '<i class="fa-solid fa-monument" title="reliques"></i>'
};

function formatText(text) {
    if (!text) return '';
    return text
        .replace(/d'énergie|d'energie/gi, "d'<i class=\"fa-solid fa-bolt\" title=\"énergie\"></i>")
        .replace(/l'énergie|l'energie/gi, "l'<i class=\"fa-solid fa-bolt\" title=\"énergie\"></i>")
        .replace(/(?:\b|\s|^)(énergie|energie)(?:\b|\s|$|[.,])/gi, (match, p1) => match.replace(p1, '<i class="fa-solid fa-bolt" title="énergie"></i>'))
        .replace(/\b(cristaux|cristal|gemmes|gemme)\b/gi, '<i class="fa-solid fa-gem" title="cristaux"></i>')
        .replace(/\bor\b/gi, '<i class="fa-solid fa-coins" title="or"></i>')
        .replace(/\b(reliques|relique)\b/gi, '<i class="fa-solid fa-monument" title="reliques"></i>');
}

function formatCost(cost) {
    return Object.entries(cost)
        .map(([key, value]) => `${formatNumber(value)} ${RESOURCE_LABELS[key] || key}`)
        .join(' • ');
}

function spawnFloatingText(textStr, x, y) {
    const text = document.createElement('div');
    text.className = 'idle-floating-text';
    text.textContent = textStr;

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 50;

    const finalX = x + Math.cos(angle) * distance;
    const finalY = y + Math.sin(angle) * distance;

    text.style.left = `${finalX}px`;
    text.style.top = `${finalY}px`;

    document.body.appendChild(text);

    setTimeout(() => {
        text.remove();
    }, 1000);
}

function hasEnoughResources(cost) {
    if (cost.energy && state.energy < cost.energy) {
        return false;
    }

    if (cost.crystals && state.crystals < cost.crystals) {
        return false;
    }

    if (cost.gold && state.gold < cost.gold) {
        return false;
    }

    if (cost.relics && state.relics < cost.relics) {
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

    if (cost.gold) {
        state.gold -= cost.gold;
        state.spentGold += cost.gold;
    }

    if (cost.relics) {
        state.relics -= cost.relics;
        state.spentRelics += cost.relics;
    }
}

function applyReward(reward) {
    if (reward.energy) {
        state.energy += reward.energy;
    }

    if (reward.crystals) {
        state.crystals += reward.crystals;
    }

    if (reward.gold) {
        state.gold += reward.gold;
    }

    if (reward.relics) {
        state.relics += reward.relics;
    }
}

function scheduleSave() {
    if (isResettingSave) {
        return;
    }

    const now = Date.now();
    if (now - lastSaveAt < 1000) {
        return;
    }

    saveState();
    lastSaveAt = now;
}

function saveState() {
    if (isResettingSave) {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // Silencieux: certains navigateurs peuvent bloquer l'écriture en mode privé.
    }
}

function resetIdleSave() {
    isResettingSave = true;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    window.location.reload();
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

    if (!raw) {
        return structuredClone(defaultState);
    }

    try {
        const parsed = JSON.parse(raw);
        const mergedQuestIds = [
            ...(Array.isArray(parsed.completedQuestIds) ? parsed.completedQuestIds : []),
            ...(Array.isArray(parsed.completedObjectiveIds) ? parsed.completedObjectiveIds : [])
        ];
        return {
            ...structuredClone(defaultState),
            ...parsed,
            completedQuestIds: mergedQuestIds,
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
