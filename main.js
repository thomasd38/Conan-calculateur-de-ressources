let resources = [
    {
        id: 1,
        name: "Bois",
        img: "bois",
        quantity: 0
    },
    {
        id: 2,
        name: "Minerai de fer",
        img: "fer",
        quantity: 0
    },
    {
        id: 3,
        name: "Fibre végétale",
        img: "fibre",
        quantity: 0
    },
    {
        id: 4,
        name: "Pierre",
        img: "pierre",
        quantity: 0
    },
    {
        id: 5,
        name: "Goudron",
        img: "goudron",
        quantity: 0
    },
    {
        id: 6,
        name: "Résine",
        img: "résine",
        quantity: 0
    },
    {
        id: 7,
        name: "Soufre",
        img: "soufre",
        quantity: 0
    },
    {
        id: 8,
        name: "Soie",
        img: "soie",
        quantity: 0
    },
];
let builds = [
    {
        id: 1,
        name: "Angle Aquilonien",
        img: "angle",
        resources: [[4,80],[1,10],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 2,
        name: "Angle de fondations aquiloniennes",
        img: "angle_fondation",
        resources: [[4,150],[1,20],[2,15],[5,3],[7,3],[3,45],[6,15]],
        quantity: 0
    },
    {
        id: 3,
        name: "Angle de toit incliné aquilonien",
        img: "angle_toit_incliné",
        resources: [[4,80],[1,15],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 4,
        name: "Angle de toit incliné inversé aquilonien",
        img: "angle_toit_incliné_inversé",
        resources: [[4,80],[1,15],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 5,
        name: "Cadre de fenêtre aquilonien",
        img: "fenetre",
        resources: [[4,80],[1,10],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 6,
        name: "Chambranle de porte aquilonien",
        img: "chambranle",
        resources: [[4,80],[1,10],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 7,
        name: "Coin de toit incliné aquilonien",
        img: "coin_toit_incliné",
        resources: [[4,80],[1,10],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 8,
        name: "Coin de toit incliné inversé aquilonien",
        img: "coin_toit_incliné_inverse",
        resources: [[4,80],[1,10],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 9,
        name: "Fondations aquiloniennes",
        img: "fondation",
        resources: [[4,150],[1,20],[2,15],[5,3],[7,3],[3,45],[6,15]],
        quantity: 0
    },
    {
        id: 10,
        name: "Mur aquilonien",
        img: "mur",
        resources: [[4,80],[1,15],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 11,
        name: "Mur aquilonien incliné vers la droite",
        img: "mur_incliné_droite",
        resources: [[4,90],[1,15],[2,10],[5,2],[7,2],[3,27],[6,9]],
        quantity: 0
    },
    {
        id: 12,
        name: "Mur aquilonien incliné vers la gauche",
        img: "mur_incliné_gauche",
        resources: [[4,90],[1,15],[2,10],[5,2],[7,2],[3,27],[6,9]],
        quantity: 0
    },
    {
        id: 13,
        name: "Mur aquilonien incliné inversé vers la droite",
        img: "mur_inversé_incliné_droite",
        resources: [[4,90],[1,15],[2,10],[5,2],[7,2],[3,27],[6,9]],
        quantity: 0
    },
    {
        id: 14,
        name: "Mur aquilonien incliné inversé vers la gauche",
        img: "mur_inversé_incliné_gauche",
        resources: [[4,90],[1,15],[2,10],[5,2],[7,2],[3,27],[6,9]],
        quantity: 0
    },
    {
        id: 15,
        name: "Pilier aquilonien",
        img: "pilier",
        resources: [[4,80],[1,10],[2,10],[5,2],[7,2],[3,24],[6,8]],
        quantity: 0
    },
    {
        id: 16,
        name: "Plafond Aquilonien",
        img: "plafond",
        resources: [[4,90],[1,15],[2,10],[5,2],[7,2],[3,27],[6,9]],
        quantity: 0
    },
    {
        id: 17,
        name: "Porte aquilonienne",
        img: "porte",
        resources: [[1,20],[2,15],[5,3],[7,3]],
        quantity: 0
    },
    {
        id: 18,
        name: "Toit incliné aquilonien",
        img: "toit_incliné",
        resources: [[4,150],[1,20],[2,15],[5,3],[7,3],[3,45],[6,15]],
        quantity: 0
    },
];
let items = [
    {
        id: 1,
        name: "Brasero aquilonien",
        img: "brasero_1",
        resources: [[4,100]],
        quantity: 0
    },
    {
        id: 2,
        name: "Brasero aquilonien",
        img: "brasero_2",
        resources: [[4,75]],
        quantity: 0
    },
    {
        id: 3,
        name: "Brasero aquilonien",
        img: "brasero_3",
        resources: [[4,75]],
        quantity: 0
    },
    {
        id: 4,
        name: "Bureau",
        img: "bureau",
        resources: [[1,40]],
        quantity: 0
    },
    {
        id: 5,
        name: "Chaise aquilonienne",
        img: "chaise_1",
        resources: [[1,20]],
        quantity: 0
    },
    {
        id: 6,
        name: "Chaise aquilonienne",
        img: "chaise_2",
        resources: [[1,20]],
        quantity: 0
    },
    {
        id: 7,
        name: "Chaise de conseiller aquilonienne",
        img: "chaise_conseiller",
        resources: [[1,40]],
        quantity: 0
    },
    {
        id: 8,
        name: "Coifeusse aquilonienne",
        img: "coiffeuse",
        resources: [[1,24]],
        quantity: 0
    },
    {
        id: 9,
        name: "Divan aquilonien",
        img: "divan",
        resources: [[1,30]],
        quantity: 0
    },
    {
        id: 10,
        name: "Drapeau aquilonien",
        img: "drapeau_1",
        resources: [[1,30],[8,30]],
        quantity: 0
    },
    {
        id: 11,
        name: "Drapeau aquilonien",
        img: "drapeau_2",
        resources: [[1,30],[8,30]],
        quantity: 0
    },
    {
        id: 12,
        name: "Harpe",
        img: "harpe",
        resources: [[1,20],[8,8]],
        quantity: 0
    },
    {
        id: 13,
        name: "Jarre aquilonienne",
        img: "jarre_1",
        resources: [[4,50]],
        quantity: 0
    },
    {
        id: 14,
        name: "Jarre aquilonienne",
        img: "jarre_2",
        resources: [[4,50]],
        quantity: 0
    },
    {
        id: 15,
        name: "Jarre aquilonienne",
        img: "jarre_3",
        resources: [[4,50]],
        quantity: 0
    },
    {
        id: 16,
        name: "Lit simple orné",
        img: "lit",
        resources: [[1,40],[3,15]],
        quantity: 0
    },
    {
        id: 17,
        name: "Paravent aquilonien",
        img: "brasero_1",
        resources: [[1,40]],
        quantity: 0
    },
    {
        id: 18,
        name: "Statue aquilonienne",
        img: "statue_1",
        resources: [[4,100]],
        quantity: 0
    },
    {
        id: 19,
        name: "Statue aquilonienne",
        img: "statue_2",
        resources: [[4,150]],
        quantity: 0
    },
    {
        id: 20,
        name: "Statue aquilonienne",
        img: "statue_3",
        resources: [[4,250]],
        quantity: 0
    },
    {
        id: 21,
        name: "Statue aquilonienne",
        img: "statue_4",
        resources: [[4,250]],
        quantity: 0
    },
    {
        id: 22,
        name: "Table aquilonienne",
        img: "table",
        resources: [[1,30]],
        quantity: 0
    },
    {
        id: 23,
        name: "Tapis aquilonien",
        img: "tapis",
        resources: [[8,30]],
        quantity: 0
    },
    {
        id: 24,
        name: "Torche murale aquilonienne",
        img: "torche_murale",
        resources: [[2,5]],
        quantity: 0
    }
];

let debug = false;
if (debug) {
    let html = "";
    resources.forEach(element => {
        html += displayResource(element.id);
    });
    document.body.innerHTML += html+"<br>";
    builds.forEach(element => {
        document.body.innerHTML += "<img title='"+element.name+"' src='./img/"+element.img+".webp'>";
    });
    items.forEach(element => {
        document.body.innerHTML += "<img title='"+element.name+"' src='./img/"+element.img+".webp'>";
    });
}

function displayResource(id) {
    return "<div class='resource tooltip'><span class='tooltiptext'>"+resources[id-1].name+"</span><img src='./img/"+resources[id-1].img+".webp'><div class='quantity'>"+resources[id-1].quantity+"</div></div>";
}

function displayItems(id) {
    return "<div class='item tooltip'><span class='tooltiptext'>"+items[id-1].name+"</span><img src='./img/"+items[id-1].img+".webp'><div class='quantity'>"+items[id-1].quantity+"</div></div>";
}

function start() {
    document.querySelector('#button-start').style.display = 'none';
    document.querySelector('#button-calculate').style.display = 'block';
    document.querySelector('#left-panel').style.opacity = '1';
    document.querySelector('#right-panel').style.opacity = '1';
    let html = "";
    builds.forEach(element => {
        html += "<div class='item'><input id='build"+element.id+"' type='text'><img src='./img/"+element.img+".webp'><span>"+element.name+"</span></div>";
    });
    document.querySelector("#builds").innerHTML = html;
    html = "";
    items.forEach(element => {
        html += "<div class='item'><input id='item"+element.id+"' type='text'><img src='./img/"+element.img+".webp'><span>"+element.name+"</span></div>";
    });
    document.querySelector("#items").innerHTML = html;
}

function calculate() {
    document.querySelector('#left-panel').style.display = 'none';
    document.querySelector('#right-panel').style.display = 'none';
    document.querySelector('#button-calculate').style.display = 'none';
    document.querySelector('#fake-loading').style.display = 'block';
    builds.forEach(element => {
        if (document.querySelector("#build"+element.id).value != "" && !isNaN(document.querySelector("#build"+element.id).value)) {
            element.resources.forEach(res => {
                resources[res[0]-1].quantity += ( res[1] * document.querySelector("#build"+element.id).value );
            });
        }
    });
    items.forEach(element => {
        if (document.querySelector("#item"+element.id).value != "" && !isNaN(document.querySelector("#item"+element.id).value)) {
            element.resources.forEach(res => {
                resources[res[0]-1].quantity += ( res[1] * document.querySelector("#item"+element.id).value );
            });
        }
    });
    setTimeout(displayProgress, 50);
}

function displayProgress() {
    document.querySelector('#percentage').style.width = '100%';
    setTimeout(displayResult, 5600);
}

function displayResult() {
    document.querySelector('#fake-loading').style.display = 'none';
    document.querySelector('#result-container').style.display = 'block';
    let html = "";
    resources.forEach(element => {
        html += displayResource(element.id);
    });
    document.querySelector("#result").innerHTML = html;
}