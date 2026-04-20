const STORAGE_KEY = 'conan_idle_save_v2';
const LEGACY_STORAGE_KEY = 'conan_idle_save_v1';
const FAST_TICK_RATE_MS = 250;
const SLOW_TICK_RATE_MS = 1000;
const QUEST_SLOTS = 3;

const questDefinitions = [
    // Déblocages (Unlockers)
    { id: 'unlock_crystals', title: 'Découverte des Cristaux', description: 'Atteindre une immense réserve d\'énergie.', progress: (s) => s.energy, target: 5000, reward: { crystals: 1 }, reqQuest: 'energy_500' },
    { id: 'unlock_gold', title: 'Filon d\'Or', description: 'Rassembler assez de cristaux purs.', progress: (s) => s.crystals, target: 2000, reward: { gold: 1 }, reqQuest: 'crystals_120' },
    { id: 'unlock_relics', title: 'Vestiges Anciens', description: 'Acquérir un véritable trésor d\'or.', progress: (s) => s.gold, target: 500, reward: { relics: 1 }, reqQuest: 'gold_50' },

    // Tier 1 — Débutant
    { id: 'click_25', title: 'Première récolte', description: 'Effectuer 125 récoltes manuelles.', progress: (s) => s.totalClicks, target: 125, reward: { energy: 20 } },
    { id: 'energy_100', title: 'Premier feu', description: 'Accumuler 500 énergie.', progress: (s) => s.energy, target: 500, reward: { energy: 125 } },
    { id: 'click_50', title: 'Main de fer', description: 'Effectuer 250 récoltes manuelles.', progress: (s) => s.totalClicks, target: 250, reward: { energy: 40 } },
    { id: 'crystals_20', title: 'Premières gemmes', description: 'Accumuler 100 cristaux.', progress: (s) => s.crystals, target: 100, reward: { energy: 40 }, reqQuest: 'unlock_crystals' },
    { id: 'spend_200_energy', title: 'Premier chantier', description: 'Dépenser 1000 énergie en améliorations/actions.', progress: (s) => s.spentEnergy, target: 1000, reward: { energy: 125 } },
    { id: 'buy_3_upgrades', title: 'Apprenti intendant', description: 'Acheter 15 améliorations.', progress: (s) => s.upgradesPurchased, target: 15, reward: { energy: 60 } },
    { id: 'energy_500', title: 'Stock stratégique', description: 'Accumuler 2500 énergie.', progress: (s) => s.energy, target: 2500, reward: { energy: 250 } },
    { id: 'spend_500_energy', title: 'Investisseur prudent', description: 'Dépenser 2500 énergie en améliorations/actions.', progress: (s) => s.spentEnergy, target: 2500, reward: { energy: 250 } },
    { id: 'energy_1500', title: 'Réserve impériale', description: 'Accumuler 7500 énergie.', progress: (s) => s.energy, target: 7500, reward: { energy: 750 } },
    { id: 'buy_8_upgrades', title: 'Intendant des ateliers', description: 'Acheter 40 améliorations.', progress: (s) => s.upgradesPurchased, target: 40, reward: { energy: 150 } },

    // Tier 2 — Apprenti
    { id: 'crystals_100', title: 'Collectionneur de gemmes', description: 'Accumuler 500 cristaux.', progress: (s) => s.crystals, target: 500, reward: { energy: 210 }, reqQuest: 'unlock_crystals' },
    { id: 'crystals_120', title: 'Trésor royal', description: 'Accumuler 600 cristaux.', progress: (s) => s.crystals, target: 600, reward: { energy: 225 }, reqQuest: 'unlock_crystals' },
    { id: 'drones_10', title: 'Escadron complet', description: 'Posséder 50 drones récupérateurs.', progress: (s) => s.drones, target: 50, reward: { energy: 500 } },
    { id: 'click_250', title: 'Battement régulier', description: 'Effectuer 1250 récoltes manuelles.', progress: (s) => s.totalClicks, target: 1250, reward: { energy: 300 } },
    { id: 'extractors_6', title: 'Front minier', description: 'Posséder 30 extracteurs de cristaux.', progress: (s) => s.extractors, target: 30, reward: { energy: 600 }, reqQuest: 'unlock_crystals' },
    { id: 'energy_5000', title: 'Réseau aquilonien', description: 'Accumuler 25000 énergie.', progress: (s) => s.energy, target: 25000, reward: { crystals: 110 }, reqQuest: 'unlock_crystals' },
    { id: 'energy_10000', title: 'Entrepôt royal', description: 'Accumuler 50000 énergie.', progress: (s) => s.energy, target: 50000, reward: { crystals: 75 }, reqQuest: 'unlock_crystals' },
    { id: 'buy_20_upgrades', title: 'Maître intendant', description: 'Acheter 100 améliorations.', progress: (s) => s.upgradesPurchased, target: 100, reward: { energy: 1000, crystals: 30 }, reqQuest: 'unlock_crystals' },
    { id: 'crystals_500', title: 'Cœur de gemmes', description: 'Accumuler 2500 cristaux.', progress: (s) => s.crystals, target: 2500, reward: { energy: 1100 }, reqQuest: 'unlock_crystals' },
    { id: 'crystals_500_quest', title: 'Veine profonde', description: 'Accumuler 2500 cristaux.', progress: (s) => s.crystals, target: 2500, reward: { energy: 1500 }, reqQuest: 'unlock_crystals' },
    { id: 'drones_25', title: 'Flotte aquilonienne', description: 'Posséder 125 drones récupérateurs.', progress: (s) => s.drones, target: 125, reward: { energy: 1250 } },

    // Tier 3 — Vétéran
    { id: 'extractors_20', title: 'Réseau minier', description: 'Posséder 100 extracteurs de cristaux.', progress: (s) => s.extractors, target: 100, reward: { energy: 4000, crystals: 75 }, reqQuest: 'unlock_crystals' },
    { id: 'click_1000', title: 'Bras inlassable', description: 'Effectuer 5000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 5000, reward: { energy: 2000 } },
    { id: 'energy_25000', title: 'Brasier d\'empire', description: 'Accumuler 125000 énergie.', progress: (s) => s.energy, target: 125000, reward: { crystals: 350, gold: 2 }, reqQuest: 'unlock_gold' },
    { id: 'energy_50k', title: 'Grenier aquilonien', description: 'Accumuler 250000 énergie.', progress: (s) => s.energy, target: 250000, reward: { crystals: 300, gold: 2 }, reqQuest: 'unlock_gold' },
    { id: 'crystals_2500', title: 'Cargaison de gemmes', description: 'Accumuler 12500 cristaux.', progress: (s) => s.crystals, target: 12500, reward: { energy: 10000, gold: 2 }, reqQuest: 'unlock_gold' },
    { id: 'crystals_2500_obj', title: 'Mur de cristal', description: 'Accumuler 12500 cristaux.', progress: (s) => s.crystals, target: 12500, reward: { energy: 6000, gold: 2 }, reqQuest: 'unlock_gold' },
    { id: 'gold_10', title: 'Premières pièces', description: 'Accumuler 50 or.', progress: (s) => s.gold, target: 50, reward: { crystals: 750 }, reqQuest: 'unlock_gold' },
    { id: 'refinery_10', title: 'Raffineur expert', description: 'Atteindre le niveau 50 de la raffinerie.', progress: (s) => s.refineryLevel, target: 50, reward: { crystals: 200 }, reqQuest: 'unlock_crystals' },
    { id: 'converter_5', title: 'Alchimiste confirmé', description: 'Atteindre le niveau 25 du convertisseur.', progress: (s) => s.converterLevel, target: 25, reward: { energy: 7500, gold: 2 }, reqQuest: 'unlock_gold' },
    { id: 'buy_40_upgrades', title: 'Grand architecte', description: 'Acheter 200 améliorations.', progress: (s) => s.upgradesPurchased, target: 200, reward: { crystals: 600, gold: 2 }, reqQuest: 'unlock_gold' },
    { id: 'spend_100k_energy', title: 'Bâtisseur insatiable', description: 'Dépenser 500000 énergie.', progress: (s) => s.spentEnergy, target: 500000, reward: { gold: 5 }, reqQuest: 'unlock_gold' },

    // Tier 4 — Conquérant
    { id: 'gold_50', title: 'Bourse du conquérant', description: 'Accumuler 250 or.', progress: (s) => s.gold, target: 250, reward: { crystals: 2000 }, reqQuest: 'unlock_gold' },
    { id: 'prospectors_15', title: 'Filon découvert', description: 'Posséder 75 prospecteurs aquiloniens.', progress: (s) => s.prospectors, target: 75, reward: { gold: 20, crystals: 1500 }, reqQuest: 'unlock_gold' },
    { id: 'drones_100', title: 'Légion mécanique', description: 'Posséder 500 drones récupérateurs.', progress: (s) => s.drones, target: 500, reward: { crystals: 3000, gold: 12 }, reqQuest: 'unlock_gold' },
    { id: 'extractors_60', title: 'Réseau profond', description: 'Posséder 300 extracteurs de cristaux.', progress: (s) => s.extractors, target: 300, reward: { energy: 75000, gold: 15 }, reqQuest: 'unlock_gold' },
    { id: 'click_5000', title: 'Volonté indomptable', description: 'Effectuer 25000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 25000, reward: { gold: 18, crystals: 2500 }, reqQuest: 'unlock_gold' },
    { id: 'energy_250k', title: 'Trésor de guerre', description: 'Accumuler 1250000 énergie.', progress: (s) => s.energy, target: 1250000, reward: { crystals: 4000, gold: 22 }, reqQuest: 'unlock_gold' },
    { id: 'energy_250k_obj', title: 'Cascade d\'énergie', description: 'Accumuler 1250000 énergie.', progress: (s) => s.energy, target: 1250000, reward: { gold: 10, crystals: 2000 }, reqQuest: 'unlock_gold' },
    { id: 'crystals_15k', title: 'Chambre forte', description: 'Accumuler 75000 cristaux.', progress: (s) => s.crystals, target: 75000, reward: { gold: 30 }, reqQuest: 'unlock_gold' },
    { id: 'crystals_25k_obj', title: 'Mine royale', description: 'Accumuler 125000 cristaux.', progress: (s) => s.crystals, target: 125000, reward: { gold: 18 }, reqQuest: 'unlock_gold' },
    { id: 'gold_500', title: 'Rançon royale', description: 'Accumuler 2500 or.', progress: (s) => s.gold, target: 2500, reward: { crystals: 12500, energy: 250000 }, reqQuest: 'unlock_gold' },
    { id: 'gold_500_obj', title: 'Rançon du prince', description: 'Accumuler 2500 or.', progress: (s) => s.gold, target: 2500, reward: { crystals: 10000, energy: 150000 }, reqQuest: 'unlock_gold' },

    // Tier 5 — Héros
    { id: 'click_20000', title: 'Héros sans relâche', description: 'Effectuer 100000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 100000, reward: { gold: 75, crystals: 10000 }, reqQuest: 'unlock_gold' },
    { id: 'relics_5', title: 'Première relique', description: 'Accumuler 25 reliques.', progress: (s) => s.relics, target: 25, reward: { gold: 125, crystals: 20000 }, reqQuest: 'unlock_relics' },
    { id: 'energy_2M', title: 'Réserve titanesque', description: 'Accumuler 10000000 énergie.', progress: (s) => s.energy, target: 10000000, reward: { gold: 150, crystals: 25000 }, reqQuest: 'unlock_gold' },
    { id: 'energy_2M_obj', title: 'Puits infini', description: 'Accumuler 10000000 énergie.', progress: (s) => s.energy, target: 10000000, reward: { gold: 90, relics: 2 }, reqQuest: 'unlock_relics' },
    { id: 'crystals_100k', title: 'Mine infinie', description: 'Accumuler 500000 cristaux.', progress: (s) => s.crystals, target: 500000, reward: { gold: 250, relics: 2 }, reqQuest: 'unlock_relics' },
    { id: 'crystals_500k', title: 'Falaise cristalline', description: 'Accumuler 2500000 cristaux.', progress: (s) => s.crystals, target: 2500000, reward: { gold: 1250, relics: 5 }, reqQuest: 'unlock_relics' },
    { id: 'drones_300', title: 'Armée d\'acier', description: 'Posséder 1500 drones récupérateurs.', progress: (s) => s.drones, target: 1500, reward: { gold: 200, crystals: 20000 }, reqQuest: 'unlock_gold' },
    { id: 'gold_5k', title: 'Trésorier royal', description: 'Accumuler 25000 or.', progress: (s) => s.gold, target: 25000, reward: { relics: 2, crystals: 40000 }, reqQuest: 'unlock_relics' },
    { id: 'relics_20', title: 'Éveil des anciens', description: 'Accumuler 100 reliques.', progress: (s) => s.relics, target: 100, reward: { gold: 1000, energy: 2500000 }, reqQuest: 'unlock_relics' },
    { id: 'archeologists_8', title: 'Société savante', description: 'Posséder 40 archéologues stygiens.', progress: (s) => s.archeologists, target: 40, reward: { relics: 2, gold: 500 }, reqQuest: 'unlock_relics' },
    { id: 'converter_20', title: 'Grand alchimiste', description: 'Atteindre le niveau 100 du convertisseur.', progress: (s) => s.converterLevel, target: 100, reward: { gold: 400, crystals: 30000 }, reqQuest: 'unlock_gold' },

    // Tier 6 — Légende
    { id: 'gold_50k', title: 'Dragon naissant', description: 'Accumuler 250000 or.', progress: (s) => s.gold, target: 250000, reward: { relics: 20, crystals: 100000 }, reqQuest: 'unlock_relics' },
    { id: 'energy_20M', title: 'Colosse d\'énergie', description: 'Accumuler 100000000 énergie.', progress: (s) => s.energy, target: 100000000, reward: { relics: 12, gold: 2500 }, reqQuest: 'unlock_relics' },
    { id: 'energy_50M', title: 'Âme du monde', description: 'Accumuler 250000000 énergie.', progress: (s) => s.energy, target: 250000000, reward: { relics: 60, gold: 12500 }, reqQuest: 'unlock_relics' },
    { id: 'crystals_1M', title: 'Palais de cristal', description: 'Accumuler 5000000 cristaux.', progress: (s) => s.crystals, target: 5000000, reward: { relics: 20, gold: 4000 }, reqQuest: 'unlock_relics' },
    { id: 'gold_100k', title: 'Dragon thésauriseur', description: 'Accumuler 500000 or.', progress: (s) => s.gold, target: 500000, reward: { relics: 40, crystals: 250000 }, reqQuest: 'unlock_relics' },
    { id: 'relics_300', title: 'Gardien des ages', description: 'Accumuler 1500 reliques.', progress: (s) => s.relics, target: 1500, reward: { gold: 25000, crystals: 1000000 }, reqQuest: 'unlock_relics' },
    { id: 'relics_500', title: 'Sanctuaire complet', description: 'Accumuler 2500 reliques.', progress: (s) => s.relics, target: 2500, reward: { gold: 40000, crystals: 1500000 }, reqQuest: 'unlock_relics' },
    { id: 'temple_15', title: 'Ordre des oubliés', description: 'Atteindre le niveau 75 du temple oublié.', progress: (s) => s.templeLevel, target: 75, reward: { relics: 30, gold: 5000 }, reqQuest: 'unlock_relics' },
    { id: 'vault_15', title: 'Coffres scellés', description: 'Atteindre le niveau 75 du coffre royal.', progress: (s) => s.vaultLevel, target: 75, reward: { gold: 10000, crystals: 375000 }, reqQuest: 'unlock_gold' },
    { id: 'buy_150_upgrades', title: 'Architecte mythique', description: 'Acheter 750 améliorations.', progress: (s) => s.upgradesPurchased, target: 750, reward: { relics: 18, gold: 7500 }, reqQuest: 'unlock_relics' },
    { id: 'spend_5M_energy', title: 'Fondateur d\'empire', description: 'Dépenser 25000000 énergie.', progress: (s) => s.spentEnergy, target: 25000000, reward: { relics: 25, gold: 10000 }, reqQuest: 'unlock_relics' },

    // Tier 7 — Divin
    { id: 'energy_200M', title: 'Écho cosmique', description: 'Accumuler 1000000000 énergie.', progress: (s) => s.energy, target: 1000000000, reward: { relics: 125, gold: 40000 }, reqQuest: 'unlock_relics' },
    { id: 'crystals_15M', title: 'Océan de cristal', description: 'Accumuler 75000000 cristaux.', progress: (s) => s.crystals, target: 75000000, reward: { relics: 150, gold: 60000 }, reqQuest: 'unlock_relics' },
    { id: 'gold_2M', title: 'Trône d\'or', description: 'Accumuler 10000000 or.', progress: (s) => s.gold, target: 10000000, reward: { relics: 250, crystals: 5000000 }, reqQuest: 'unlock_relics' },
    { id: 'relics_5000', title: 'Panthéon retrouvé', description: 'Accumuler 25000 reliques.', progress: (s) => s.relics, target: 25000, reward: { gold: 250000, crystals: 12500000 }, reqQuest: 'unlock_relics' },
    { id: 'stormforge_20', title: 'Forgeron des tempêtes', description: 'Atteindre le niveau 100 de la forge des tempêtes.', progress: (s) => s.stormforgeLevel, target: 100, reward: { relics: 200, gold: 100000 }, reqQuest: 'unlock_relics' },
    { id: 'total_clicks_100k', title: 'Mythe vivant', description: 'Effectuer 500000 récoltes manuelles.', progress: (s) => s.totalClicks, target: 500000, reward: { relics: 100, gold: 30000 }, reqQuest: 'unlock_relics' },
    { id: 'spent_gold_500k', title: 'Roi prodigue', description: 'Dépenser 2500000 or.', progress: (s) => s.spentGold, target: 2500000, reward: { relics: 300, crystals: 10000000 }, reqQuest: 'unlock_relics' },
    { id: 'archeologists_40', title: 'Académie cachée', description: 'Posséder 200 archéologues stygiens.', progress: (s) => s.archeologists, target: 200, reward: { relics: 175, gold: 75000 }, reqQuest: 'unlock_relics' }
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
    pendingQuestIds: [],
    productionBoostUntil: 0,
    lastTimestamp: Date.now()
};

const state = loadState();
let lastSaveAt = 0;
let isResettingSave = false;
const activeNotifications = new Map();

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
        reqQuest: 'energy_100', // Exemple: Débloqué après avoir atteint 100 énergie
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
        reqQuest: 'unlock_crystals',
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
        reqQuest: 'unlock_crystals', // Exemple: Débloqué après avoir eu 20 cristaux
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
        reqQuest: 'unlock_gold',
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
        reqQuest: 'unlock_crystals',
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
        reqQuest: 'unlock_gold',
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
        reqQuest: 'unlock_gold',
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
        reqQuest: 'unlock_relics',
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
        reqQuest: 'unlock_relics',
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
        reqQuest: 'unlock_relics',
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
        reqQuest: 'unlock_crystals', // Exemple: Débloqué après avoir dépensé 200 énergie
        getCost: () => ({ energy: getTransmuteCost() }),
        run: () => {
            state.crystals += getTransmuteReward();
        }
    },
    {
        id: 'productionBoost',
        title: 'Surcharge des générateurs',
        description: () => 'Double la production passive pendant 30 secondes.',
        reqQuest: 'unlock_crystals',
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
        reqQuest: 'unlock_crystals', // Exemple: Débloqué après avoir eu 100 cristaux
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
        reqQuest: 'unlock_gold',
        getCost: () => ({ crystals: 150 }),
        run: () => {
            state.gold += 5;
        }
    },
    {
        id: 'royalPillage',
        title: 'Razzia royale',
        description: () => 'Gros pillage: beaucoup d\'énergie et cristaux pour une bourse d\'or.',
        reqQuest: 'unlock_gold',
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
        reqQuest: 'unlock_gold',
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
        reqQuest: 'unlock_relics',
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
        reqQuest: 'unlock_relics',
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
        reqQuest: 'unlock_relics',
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
    const savedTheme = localStorage.getItem('conan_idle_theme') || 'dark';
    applyTheme(savedTheme);
    
    ensureQuestSlots();
    bindEvents();
    applyOfflineProgress();
    processProgression();
    state.pendingQuestIds.forEach(id => spawnQuestNotification(id));
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

    const themeToggleBtn = document.getElementById('button-theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('theme-light') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('conan_idle_theme', newTheme);
            applyTheme(newTheme);
        });
    }

    const questOverlay = document.getElementById('quest-popup-overlay');
    const questClose   = document.getElementById('quest-popup-close');
    const questClaim   = document.getElementById('quest-popup-claim');
    if (questClose)   questClose.addEventListener('click', closeQuestPopup);
    if (questOverlay) questOverlay.addEventListener('click', (e) => { if (e.target === questOverlay) closeQuestPopup(); });
    if (questClaim)   questClaim.addEventListener('click', () => {
        const id = questClaim.getAttribute('data-quest-id');
        if (id) claimQuestReward(id);
    });

    window.addEventListener('beforeunload', () => {
        if (isResettingSave) {
            return;
        }
        saveState();
    });
}

function applyTheme(theme) {
    const btn = document.getElementById('button-theme-toggle');
    if (theme === 'light') {
        document.body.classList.add('theme-light');
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-moon" id="theme-toggle-icon"></i> Passer en thème sombre';
        }
    } else {
        document.body.classList.remove('theme-light');
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-sun" id="theme-toggle-icon"></i> Passer en thème clair';
        }
    }
}


function tickFast() {
    const now = Date.now();
    const deltaSeconds = Math.max(0, (now - state.lastTimestamp) / 1000);
    state.lastTimestamp = now;

    const production = computeProductionPerSecond();
    state.energy += production.energy * deltaSeconds;
    state.crystals += production.crystals * deltaSeconds;
    state.gold += production.gold * deltaSeconds;
    state.relics += production.relics * deltaSeconds;

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
    const readyIds = state.activeQuestIds.filter((questId) => {
        const quest = getQuestById(questId);
        return quest && quest.progress(state) >= quest.target && !state.pendingQuestIds.includes(questId);
    });

    if (readyIds.length === 0) return;

    readyIds.forEach((questId) => {
        state.activeQuestIds = state.activeQuestIds.filter((id) => id !== questId);
        state.pendingQuestIds.push(questId);
        spawnQuestNotification(questId);
    });
}

function ensureQuestSlots() {
    const available = questDefinitions
        .filter((quest) => !quest.reqQuest || state.completedQuestIds.includes(quest.reqQuest))
        .map((quest) => quest.id)
        .filter((questId) =>
            !state.completedQuestIds.includes(questId) &&
            !state.activeQuestIds.includes(questId) &&
            !state.pendingQuestIds.includes(questId)
        );

    const maxActive = 5;
    while (state.activeQuestIds.length < maxActive && available.length > 0) {
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
    const availableActions = actions.filter(action => !action.reqQuest || state.completedQuestIds.includes(action.reqQuest));

    actionsContainer.innerHTML = availableActions.map((action) => {
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

    availableActions.forEach((action) => {
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
    const availableUpgrades = upgrades.filter(upgrade => !upgrade.reqQuest || state.completedQuestIds.includes(upgrade.reqQuest));

    upgradesContainer.innerHTML = availableUpgrades.map((upgrade) => {
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

    availableUpgrades.forEach((upgrade) => {
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
    // Quêtes terminées (limité aux 5 dernières)
    const completedCards = state.completedQuestIds.slice(-5).map(id => {
        const quest = getQuestById(id);
        if (!quest) return '';
        return `
            <article class="idle-objective idle-objective--done">
                <p class="idle-objective__badge">Terminée</p>
                <p class="idle-upgrade__title" style="color: #6ce5b1;">${quest.title}</p>
            </article>
        `;
    });

    // Quêtes en attente de validation
    const pendingCards = state.pendingQuestIds.map(id => {
        const quest = getQuestById(id);
        if (!quest) return '';
        return `
            <article class="idle-objective idle-objective--quest" style="border-color: #f1c40f;">
                <p class="idle-objective__badge" style="background: #f1c40f; color: #111;">À réclamer</p>
                <p class="idle-upgrade__title">${formatText(quest.title)}</p>
                <p class="idle-upgrade__description">Cliquez sur la notification pour réclamer.</p>
                <div class="idle-progress">
                    <span style="width: 100%; background: #f1c40f;"></span>
                </div>
            </article>
        `;
    });

    // Quêtes actives
    const activeCards = state.activeQuestIds.map(id => {
        const quest = getQuestById(id);
        if (!quest) return '';
        const progressValue = Math.min(quest.target, quest.progress(state));
        const ratio = quest.target <= 0 ? 0 : (progressValue / quest.target) * 100;
        return `
            <article class="idle-objective idle-objective--quest">
                <p class="idle-objective__badge">Quête active</p>
                <p class="idle-upgrade__title">${formatText(quest.title)}</p>
                <p class="idle-upgrade__description">${formatText(quest.description)}</p>
                <p class="idle-upgrade__meta">Progression: ${formatNumber(progressValue)} / ${formatNumber(quest.target)} • Récompense: ${formatCost(quest.reward)}${getQuestUnlocksText(quest.id)}</p>
                <div class="idle-progress">
                    <span style="width: ${Math.min(100, ratio)}%"></span>
                </div>
            </article>
        `;
    });

    // Quêtes à venir (files d'attente)
    const eligibleLocked = questDefinitions.filter(q => 
        !state.completedQuestIds.includes(q.id) &&
        !state.activeQuestIds.includes(q.id) &&
        !state.pendingQuestIds.includes(q.id) &&
        (!q.reqQuest || state.completedQuestIds.includes(q.reqQuest))
    );

    const lockedCards = eligibleLocked.slice(0, 2).map(() => {
        return `
            <article class="idle-objective idle-objective--quest" style="opacity: 0.4;">
                <p class="idle-objective__badge">Quête à venir</p>
                <p class="idle-upgrade__title">???</p>
                <p class="idle-upgrade__description">?????</p>
                <p class="idle-upgrade__meta">Progression: ??? / ??? • Récompense: ???</p>
                <div class="idle-progress">
                    <span style="width: 0%"></span>
                </div>
            </article>
        `;
    });

    missionsContainer.innerHTML = [...completedCards, ...pendingCards, ...activeCards, ...lockedCards].join('');
}

function getQuestById(id) {
    return questDefinitions.find((quest) => quest.id === id);
}

function getQuestUnlocksText(questId) {
    const unlockedUpgrades = upgrades.filter(u => u.reqQuest === questId).map(u => u.title);
    const unlockedActions = actions.filter(a => a.reqQuest === questId).map(a => a.title);

    const unlocks = [];
    if (unlockedUpgrades.length > 0) unlocks.push(`Amélioration(s) : ${unlockedUpgrades.join(', ')}`);
    if (unlockedActions.length > 0) unlocks.push(`Action(s) : ${unlockedActions.join(', ')}`);

    return unlocks.length > 0 ? ` • <span style="color: #a4b0be; font-size: 0.9em;"><i class="fa-solid fa-unlock"></i> ${unlocks.join(' | ')}</span>` : '';
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

function spawnQuestNotification(questId) {
    const quest = getQuestById(questId);
    if (!quest || activeNotifications.has(questId)) return;
    const container = document.getElementById('quest-notifications');
    if (!container) return;

    const notif = document.createElement('div');
    notif.className = 'quest-notif';
    notif.setAttribute('data-quest-id', questId);
    notif.innerHTML = `
        <i class="fa-solid fa-scroll quest-notif__icon" aria-hidden="true"></i>
        <div class="quest-notif__body">
            <p class="quest-notif__title">${quest.title} !</p>
            <p class="quest-notif__sub">Quête terminée — cliquez pour réclamer</p>
        </div>
        <i class="fa-solid fa-chevron-right quest-notif__arrow" aria-hidden="true"></i>
    `;
    notif.addEventListener('click', () => showQuestPopup(questId));
    container.appendChild(notif);
    activeNotifications.set(questId, notif);
    requestAnimationFrame(() => requestAnimationFrame(() => notif.classList.add('quest-notif--visible')));
}

function removeQuestNotification(questId) {
    const notif = activeNotifications.get(questId);
    if (!notif) return;
    notif.classList.remove('quest-notif--visible');
    notif.classList.add('quest-notif--exit');
    setTimeout(() => { notif.remove(); activeNotifications.delete(questId); }, 400);
}

function showQuestPopup(questId) {
    const quest = getQuestById(questId);
    if (!quest) return;
    document.getElementById('quest-popup-title').textContent = quest.title;
    document.getElementById('quest-popup-lore').textContent  = quest.description;
    document.getElementById('quest-popup-reward').innerHTML  = 'Récompense : ' + formatCost(quest.reward) + getQuestUnlocksText(questId);
    document.getElementById('quest-popup-claim').setAttribute('data-quest-id', questId);
    document.getElementById('quest-popup-overlay').classList.add('active');
}

function closeQuestPopup() {
    document.getElementById('quest-popup-overlay').classList.remove('active');
}

function claimQuestReward(questId) {
    const quest = getQuestById(questId);
    if (!quest || !state.pendingQuestIds.includes(questId)) return;
    state.pendingQuestIds = state.pendingQuestIds.filter(id => id !== questId);
    state.completedQuestIds.push(questId);
    state.questPoints += 1;
    applyReward(quest.reward);
    closeQuestPopup();
    removeQuestNotification(questId);
    processProgression();
    renderActions();
    renderUpgrades();
    render();
    scheduleSave();
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
        
        let activeIds = Array.isArray(parsed.activeQuestIds) ? parsed.activeQuestIds : [];
        activeIds = activeIds.filter(id => {
            const quest = questDefinitions.find(q => q.id === id);
            if (!quest) return false;
            if (quest.reqQuest && !mergedQuestIds.includes(quest.reqQuest)) return false;
            return true;
        });

        return {
            ...structuredClone(defaultState),
            ...parsed,
            completedQuestIds: mergedQuestIds,
            activeQuestIds: activeIds,
            pendingQuestIds: Array.isArray(parsed.pendingQuestIds) ? parsed.pendingQuestIds : []
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
