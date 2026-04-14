const resources = [
    { id: 1, name: 'Bois', img: 'bois', quantity: 0 },
    { id: 2, name: 'Minerai de fer', img: 'fer', quantity: 0 },
    { id: 3, name: 'Fibre végétale', img: 'fibre', quantity: 0 },
    { id: 4, name: 'Pierre', img: 'pierre', quantity: 0 },
    { id: 5, name: 'Goudron', img: 'goudron', quantity: 0 },
    { id: 6, name: 'Résine', img: 'résine', quantity: 0 },
    { id: 7, name: 'Soufre', img: 'soufre', quantity: 0 },
    { id: 8, name: 'Soie', img: 'soie', quantity: 0 }
];

const builds = [
    { id: 1, name: 'Angle aquilonien', img: 'angle', resources: [[4, 80], [1, 10], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 2, name: 'Angle de fondations aquiloniennes', img: 'angle_fondation', resources: [[4, 150], [1, 20], [2, 30], [5, 3], [7, 3], [3, 45], [6, 15]], quantity: 0 },
    { id: 3, name: 'Angle de toit incliné aquilonien', img: 'angle_toit_incliné', resources: [[4, 80], [1, 15], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 4, name: 'Angle de toit incliné inversé aquilonien', img: 'angle_toit_incliné_inversé', resources: [[4, 80], [1, 15], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 5, name: 'Cadre de fenêtre aquilonien', img: 'fenetre', resources: [[4, 80], [1, 10], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 6, name: 'Chambranle de porte aquilonien', img: 'chambranle', resources: [[4, 80], [1, 10], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 7, name: 'Coin de toit incliné aquilonien', img: 'coin_toit_incliné', resources: [[4, 80], [1, 10], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 8, name: 'Coin de toit incliné inversé aquilonien', img: 'coin_toit_incliné_inverse', resources: [[4, 80], [1, 10], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 9, name: 'Fondations aquiloniennes', img: 'fondation', resources: [[4, 150], [1, 20], [2, 30], [5, 3], [7, 3], [3, 45], [6, 15]], quantity: 0 },
    { id: 10, name: 'Mur aquilonien', img: 'mur', resources: [[4, 80], [1, 15], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 11, name: 'Mur aquilonien incliné vers la droite', img: 'mur_incliné_droite', resources: [[4, 90], [1, 15], [2, 20], [5, 2], [7, 2], [3, 27], [6, 9]], quantity: 0 },
    { id: 12, name: 'Mur aquilonien incliné vers la gauche', img: 'mur_incliné_gauche', resources: [[4, 90], [1, 15], [2, 20], [5, 2], [7, 2], [3, 27], [6, 9]], quantity: 0 },
    { id: 13, name: 'Mur aquilonien incliné inversé vers la droite', img: 'mur_inversé_incliné_droite', resources: [[4, 90], [1, 15], [2, 20], [5, 2], [7, 2], [3, 27], [6, 9]], quantity: 0 },
    { id: 14, name: 'Mur aquilonien incliné inversé vers la gauche', img: 'mur_inversé_incliné_gauche', resources: [[4, 90], [1, 15], [2, 20], [5, 2], [7, 2], [3, 27], [6, 9]], quantity: 0 },
    { id: 15, name: 'Pilier aquilonien', img: 'pilier', resources: [[4, 80], [1, 10], [2, 20], [5, 2], [7, 2], [3, 24], [6, 8]], quantity: 0 },
    { id: 16, name: 'Plafond aquilonien', img: 'plafond', resources: [[4, 90], [1, 15], [2, 20], [5, 2], [7, 2], [3, 27], [6, 9]], quantity: 0 },
    { id: 17, name: 'Porte aquilonienne', img: 'porte', resources: [[1, 20], [2, 30], [5, 3], [7, 3]], quantity: 0 },
    { id: 18, name: 'Toit incliné aquilonien', img: 'toit_incliné', resources: [[4, 150], [1, 20], [2, 30], [5, 3], [7, 3], [3, 45], [6, 15]], quantity: 0 }
];

const items = [
    { id: 1, name: 'Brasero aquilonien', img: 'brasero_1', resources: [[4, 100]], quantity: 0 },
    { id: 2, name: 'Brasero aquilonien', img: 'brasero_2', resources: [[4, 75]], quantity: 0 },
    { id: 3, name: 'Brasero aquilonien', img: 'brasero_3', resources: [[4, 75]], quantity: 0 },
    { id: 4, name: 'Bureau', img: 'bureau', resources: [[1, 40]], quantity: 0 },
    { id: 5, name: 'Chaise aquilonienne', img: 'chaise_1', resources: [[1, 20]], quantity: 0 },
    { id: 6, name: 'Chaise aquilonienne', img: 'chaise_2', resources: [[1, 20]], quantity: 0 },
    { id: 7, name: 'Chaise de conseiller aquilonienne', img: 'chaise_conseiller', resources: [[1, 40]], quantity: 0 },
    { id: 8, name: 'Coiffeuse aquilonienne', img: 'coiffeuse', resources: [[1, 24]], quantity: 0 },
    { id: 9, name: 'Divan aquilonien', img: 'divan', resources: [[1, 30]], quantity: 0 },
    { id: 10, name: 'Drapeau aquilonien', img: 'drapeau_1', resources: [[1, 30], [8, 30]], quantity: 0 },
    { id: 11, name: 'Drapeau aquilonien', img: 'drapeau_2', resources: [[1, 30], [8, 30]], quantity: 0 },
    { id: 12, name: 'Harpe', img: 'harpe', resources: [[1, 20], [8, 8]], quantity: 0 },
    { id: 13, name: 'Jarre aquilonienne', img: 'jarre_1', resources: [[4, 50]], quantity: 0 },
    { id: 14, name: 'Jarre aquilonienne', img: 'jarre_2', resources: [[4, 50]], quantity: 0 },
    { id: 15, name: 'Jarre aquilonienne', img: 'jarre_3', resources: [[4, 50]], quantity: 0 },
    { id: 16, name: 'Lit simple orné', img: 'lit', resources: [[1, 40], [3, 15]], quantity: 0 },
    { id: 17, name: 'Paravent aquilonien', img: 'paravent', resources: [[1, 40]], quantity: 0 },
    { id: 18, name: 'Statue aquilonienne', img: 'statue_1', resources: [[4, 100]], quantity: 0 },
    { id: 19, name: 'Statue aquilonienne', img: 'statue_2', resources: [[4, 150]], quantity: 0 },
    { id: 20, name: 'Statue aquilonienne', img: 'statue_3', resources: [[4, 250]], quantity: 0 },
    { id: 21, name: 'Statue aquilonienne', img: 'statue_4', resources: [[4, 250]], quantity: 0 },
    { id: 22, name: 'Table aquilonienne', img: 'table', resources: [[1, 30]], quantity: 0 },
    { id: 23, name: 'Tapis aquilonien', img: 'tapis', resources: [[8, 30]], quantity: 0 },
    { id: 24, name: 'Torche murale aquilonienne', img: 'torche_murale', resources: [[2, 10]], quantity: 0 }
];

const state = {
    search: '',
    resourceFilter: 'all',
    nonZeroOnly: false
};
const STORAGE_KEY = 'conan-resource-calculator-v2';

const buildsContainer = document.querySelector('#builds');
const itemsContainer = document.querySelector('#items');
const resourceContainer = document.querySelector('#result');
const statsContainer = document.querySelector('#stats');
const resourceFilter = document.querySelector('#resource-filter');

function init() {
    hydrateFromStorage();
    hydrateResourceFilter();
    syncFilterControls();
    bindEvents();
    render();
}

function bindEvents() {
    document.querySelector('#search-input').addEventListener('input', (event) => {
        state.search = event.target.value.trim().toLowerCase();
        renderCatalogs();
        persistState();
    });

    resourceFilter.addEventListener('change', (event) => {
        state.resourceFilter = event.target.value;
        renderCatalogs();
        persistState();
    });

    document.querySelector('#toggle-non-zero').addEventListener('change', (event) => {
        state.nonZeroOnly = event.target.checked;
        renderResources();
        persistState();
    });

    document.querySelector('#button-reset').addEventListener('click', () => {
        [...builds, ...items].forEach((element) => {
            element.quantity = 0;
        });
        render();
        persistState();
    });

    const resetSave = () => {
        localStorage.removeItem(STORAGE_KEY);
        state.search = '';
        state.resourceFilter = 'all';
        state.nonZeroOnly = false;

        [...builds, ...items].forEach((element) => {
            element.quantity = 0;
        });

        document.querySelector('#search-input').value = '';
        document.querySelector('#toggle-non-zero').checked = false;
        resourceFilter.value = 'all';

        render();
    };

    document.querySelector('#button-reset-save').addEventListener('click', resetSave);
    document.querySelector('#button-reset-save-mobile').addEventListener('click', resetSave);

    document.querySelector('#button-calculate').addEventListener('click', () => {
        showLoading();
        setTimeout(() => {
            hideLoading();
            document.querySelector('#result-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 900);
    });
}

function hydrateResourceFilter() {
    const options = [
        '<option value="all">Toutes les ressources</option>',
        ...resources.map((resource) => `<option value="${resource.id}">${resource.name}</option>`)
    ];
    resourceFilter.innerHTML = options.join('');
}

function syncFilterControls() {
    document.querySelector('#search-input').value = state.search;
    resourceFilter.value = state.resourceFilter;
    document.querySelector('#toggle-non-zero').checked = state.nonZeroOnly;
}

function render() {
    computeTotals();
    renderCatalogs();
    renderResources();
    renderStats();
}

function renderCatalogs() {
    const filteredBuilds = applyFilters(builds);
    const filteredItems = applyFilters(items);

    buildsContainer.innerHTML = filteredBuilds.map((build) => displayItemCard(build, 'build')).join('');
    itemsContainer.innerHTML = filteredItems.map((item) => displayItemCard(item, 'item')).join('');

    document.querySelector('#build-count').textContent = `${filteredBuilds.length}/${builds.length}`;
    document.querySelector('#item-count').textContent = `${filteredItems.length}/${items.length}`;

    attachCardEvents(filteredBuilds, 'build');
    attachCardEvents(filteredItems, 'item');
}

function applyFilters(collection) {
    return collection.filter((element) => {
        const matchesSearch = !state.search || element.name.toLowerCase().includes(state.search);
        const matchesResource =
            state.resourceFilter === 'all' ||
            element.resources.some(([resourceId]) => resourceId === Number(state.resourceFilter));

        return matchesSearch && matchesResource;
    });
}

function displayItemCard(element, prefix) {
    return `
        <article class="item-card">
            <img src="./img/${element.img}.webp" alt="${element.name}">
            <div>
                <p class="item-card__name">${element.name}</p>
                <p class="item-card__recipe">${displayRecipe(element.resources)}</p>
            </div>
            <div class="item-card__controls" data-prefix="${prefix}" data-id="${element.id}">
                <button class="stepper-btn" data-action="decrement" type="button">-</button>
                <input class="stepper" type="number" min="0" value="${element.quantity}">
                <button class="stepper-btn" data-action="increment" type="button">+</button>
            </div>
        </article>
    `;
}

function displayRecipe(recipe) {
    return recipe
        .map(([resourceId, qty]) => {
            const resource = resources.find((entry) => entry.id === resourceId);
            return `${qty} ${resource.name}`;
        })
        .join(' • ');
}

function attachCardEvents(collection, prefix) {
    collection.forEach((element) => {
        const controls = document.querySelector(`.item-card__controls[data-prefix="${prefix}"][data-id="${element.id}"]`);
        if (!controls) {
            return;
        }

        const input = controls.querySelector('input');
        const [decrementBtn, incrementBtn] = controls.querySelectorAll('button');

        decrementBtn.addEventListener('click', () => updateQuantity(element, Math.max(0, element.quantity - 1)));
        incrementBtn.addEventListener('click', () => updateQuantity(element, element.quantity + 1));

        input.addEventListener('input', (event) => {
            const nextValue = Number(event.target.value);
            updateQuantity(element, Number.isNaN(nextValue) || nextValue < 0 ? 0 : Math.floor(nextValue));
        });
    });
}

function updateQuantity(element, value) {
    element.quantity = value;
    computeTotals();
    renderResources();
    renderStats();
    renderCatalogs();
    persistState();
}

function computeTotals() {
    resources.forEach((resource) => {
        resource.quantity = 0;
    });

    [...builds, ...items].forEach((element) => {
        if (!element.quantity) {
            return;
        }

        element.resources.forEach(([resourceId, unitCost]) => {
            const resource = resources.find((entry) => entry.id === resourceId);
            resource.quantity += unitCost * element.quantity;
        });
    });
}

function renderResources() {
    const displayedResources = [...resources]
        .filter((resource) => !state.nonZeroOnly || resource.quantity > 0)
        .sort((a, b) => b.quantity - a.quantity || a.name.localeCompare(b.name));

    resourceContainer.innerHTML = displayedResources
        .map((resource) => `
            <article class="resource">
                <img src="./img/${resource.img}.webp" alt="${resource.name}">
                <div>
                    <p class="resource__name">${resource.name}</p>
                    <p class="resource__quantity">${resource.quantity.toLocaleString('fr-FR')}</p>
                </div>
            </article>
        `)
        .join('');
}

function renderStats() {
    const allEntries = [...builds, ...items];
    const selectedEntries = allEntries.filter((entry) => entry.quantity > 0);
    const totalParts = selectedEntries.reduce((accumulator, entry) => accumulator + entry.quantity, 0);
    const uniqueResources = resources.filter((resource) => resource.quantity > 0).length;

    statsContainer.innerHTML = `
        <article class="stat-card">
            <p class="stat-card__label">Éléments sélectionnés</p>
            <p class="stat-card__value">${selectedEntries.length}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Pièces à poser</p>
            <p class="stat-card__value">${totalParts.toLocaleString('fr-FR')}</p>
        </article>
        <article class="stat-card">
            <p class="stat-card__label">Ressources mobilisées</p>
            <p class="stat-card__value">${uniqueResources}/${resources.length}</p>
        </article>
    `;
}

function showLoading() {
    const fakeLoading = document.querySelector('#fake-loading');
    const percentage = document.querySelector('#percentage');
    percentage.style.width = '0';
    fakeLoading.style.display = 'flex';
    requestAnimationFrame(() => {
        percentage.style.width = '100%';
    });
}

function hideLoading() {
    document.querySelector('#fake-loading').style.display = 'none';
}

function hydrateFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        if (typeof parsed.search === 'string') {
            state.search = parsed.search;
        }
        if (typeof parsed.resourceFilter === 'string') {
            state.resourceFilter = parsed.resourceFilter;
        }
        if (typeof parsed.nonZeroOnly === 'boolean') {
            state.nonZeroOnly = parsed.nonZeroOnly;
        }

        applySavedQuantities(builds, parsed.builds);
        applySavedQuantities(items, parsed.items);
    } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
    }
}

function applySavedQuantities(collection, savedCollection) {
    if (!Array.isArray(savedCollection)) {
        return;
    }
    const quantityById = new Map(savedCollection.map((entry) => [entry.id, entry.quantity]));
    collection.forEach((element) => {
        const savedQty = quantityById.get(element.id);
        if (Number.isFinite(savedQty) && savedQty >= 0) {
            element.quantity = Math.floor(savedQty);
        }
    });
}

function persistState() {
    const payload = {
        search: state.search,
        resourceFilter: state.resourceFilter,
        nonZeroOnly: state.nonZeroOnly,
        builds: builds.map(({ id, quantity }) => ({ id, quantity })),
        items: items.map(({ id, quantity }) => ({ id, quantity }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

init();
