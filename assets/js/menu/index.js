const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const Matricula = urlParams.get('mat');
const Folio = urlParams.get('folio');

const thisURL = './main-sesion.html?mat=';
const addURL = '&folio=';

let Local_list = loadDataFromLocalStorage();
let globalSelected;

GetList();


function GetList() {
    if(Local_list!= null){
        init(Local_list);
    }
    
    GetData(Matricula, "Indexer")
        .then(function (data) {
            if (isNewData(data, Local_list)) {
                saveDataToLocalstorage(data);
                Local_list = data;
            }
            init(Local_list);
        })
        .catch(function (error) {
            console.error(error);
        });
}

function saveDataToLocalstorage(data) {
    var jsonData = JSON.stringify(data);
    localStorage.setItem(Matricula, jsonData);
}
function loadDataFromLocalStorage() {
    var jsonData = localStorage.getItem(Matricula);
    return JSON.parse(jsonData);
}
function isNewData(newData, storedData) {
    var newJsonData = JSON.stringify(newData);
    var storedJsonData = JSON.stringify(storedData);
    return newJsonData !== storedJsonData;
}
// const mock_list = [
//     { 
//         Nombre:"Geargina",
//         Apellido:"Velazquez",
//         Folio:"156342",
//         Encuestas:{
//             MNAM:true,
//             CSFDS:false,
//             FRAIL: true,
//             ESDP: true,
//             EDGTY:false,
//             OSRS: false,
//             KATZ:false,
//             EDLB:false
//         }
//     },
//     {
//         Nombre:"Luis",
//         Apellido:"Gutierrez",
//         Folio:"35435",
//         Encuestas:{
//             MNAM:true,
//             CSFDS:false,
//             FRAIL: false,
//             ESDP: true,
//             EDGTY:false,
//             OSRS: false,
//             KATZ:false,
//             EDLB:true
//         }
//     },
//     {
//         Nombre:"Gerardo",
//         Apellido:"Caminos",
//         Folio:"345355",
//         Encuestas:{
//             MNAM:true,
//             CSFDS:true,
//             FRAIL: true,
//             ESDP: true,
//             EDGTY:true,
//             OSRS: true,
//             KATZ:false,
//             EDLB:true
//         }
//     },
//     {
//         Nombre:"Michelle",
//         Apellido:"Reyes",
//         Folio:"345345",
//         Encuestas:{
//             MNAM:true,
//             CSFDS:false,
//             FRAIL: false,
//             ESDP: true,
//             EDGTY:false,
//             OSRS: false,
//             KATZ:true,
//             EDLB:true
//         }
//     },
//     {
//         Nombre:"Manuel",
//         Apellido:"Perees",
//         Folio:"456598",
//         Encuestas:{
//             MNAM:false,
//             CSFDS:true,
//             FRAIL: false,
//             ESDP: true,
//             EDGTY:false,
//             OSRS: true,
//             KATZ:false,
//             EDLB:true
//         }
//     },
//     {
//         Nombre:"Antonio",
//         Apellido:"Lopez",
//         Folio:"213265",
//         Encuestas:{
//             MNAM:  true,
//             CSFDS: false,
//             FRAIL: false,
//             ESDP:  true,
//             EDGTY: true,
//             OSRS: false,
//             KATZ: false,
//             EDLB: true
//         }
//     }
// ];


function FillSideList(encuestados) {
    const container = document.getElementById('Side_Nav');
    container.innerHTML = '';
    encuestados.forEach(element => {

        const El_a = document.createElement('a');
        El_a.setAttribute('class', 'list-group-item list-group-item-action py-3 lh-tight');
        const url = thisURL + Matricula + addURL + element.Folio;
        El_a.setAttribute('href', url)
        El_a.setAttribute('aria-current', 'true');
        if (element.Folio == Folio) {
            El_a.setAttribute('class', 'list-group-item list-group-item-action py-3 lh-tight active');
            globalSelected = element;
        }
        const El_div = document.createElement('div');
        El_div.setAttribute('class', 'd-flex w-100 align-items-center justify-content-between');

        const El_strong = document.createElement('strong');
        El_strong.setAttribute('class', 'mb-1');
        El_strong.textContent = element.Nombre + ' ' + element.Apellido;

        const El_small = document.createElement('small');
        El_small.textContent = 'Folio: ' + element.Folio;

        El_div.appendChild(El_strong);
        El_div.appendChild(El_small);

        El_a.appendChild(El_div);

        container.appendChild(El_a);
    });
    try {
        console.log(Folio.length);
    } catch {
        const url = thisURL + Matricula + addURL + encuestados[0].Folio;
        window.location.href = url;
    }
}
function FillDropList(encuestados) {
    const container = document.getElementById('Dropdown_NavList');
    container.innerHTML = '';
    encuestados.forEach(element => {

        const El_li = document.createElement('li');

        const El_a = document.createElement('a');
        El_a.setAttribute('class', 'dropdown-item');
        if (element.Folio == Folio) {
            El_a.setAttribute('class', 'dropdown-item bg-aqua text-white');
        }
        const url = thisURL + Matricula + addURL + element.Folio;
        El_a.setAttribute('href', url)
        El_a.textContent = element.Nombre + ' ' + element.Apellido;

        const El_p = document.createElement('p');
        if (element.Folio == Folio) {
            El_p.setAttribute('class', 'text-white');
        }
        El_p.textContent = 'Folio: ' + element.Folio;
        El_a.appendChild(El_p);
        El_li.appendChild(El_a);
        container.appendChild(El_li);
    });
}
function FillMenu() {

    const doc_Titulo = document.getElementById('Menu_Titulo');
    const doc_Folio = document.getElementById('Menu_Folio');

    doc_Titulo.textContent = 'Encuesta: ' + globalSelected.Nombre + ' ' + globalSelected.Apellido;
    doc_Folio.textContent = 'Folio: ' + globalSelected.Folio


    if (globalSelected.Encuestas.MNAM == true) {
        document.getElementById('BTN_MNAM').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('MNAM-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('MNAM-Section2').setAttribute('class', 'list-group-item d-none');

    }
    if (globalSelected.Encuestas.CSFDS == true) {
        document.getElementById('BTN_CSFDS').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('CSFDS-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('CSFDS-Section2').setAttribute('class', 'list-group-item d-none');
    }
    if (globalSelected.Encuestas.FRAIL == true) {
        document.getElementById('BTN_FRAIL').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('FRAIL-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('FRAIL-Section2').setAttribute('class', 'list-group-item d-none');
    }
    if (globalSelected.Encuestas.ESDP == true) {
        document.getElementById('BTN_ESDP').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('ESDP-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('ESDP-Section2').setAttribute('class', 'list-group-item d-none');
    }
    if (globalSelected.Encuestas.EDGTY == true) {
        document.getElementById('BTN_EDGTY').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('EDGTY-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('EDGTY-Section2').setAttribute('class', 'list-group-item d-none');
    }
    if (globalSelected.Encuestas.OSRS == true) {
        document.getElementById('BTN_OSRS').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('OSRS-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('OSRS-Section2').setAttribute('class', 'list-group-item d-none');
    }
    if (globalSelected.Encuestas.KATZ == true) {
        document.getElementById('BTN_KATZ').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('KATZ-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('KATZ-Section2').setAttribute('class', 'list-group-item d-none');
    }
    if (globalSelected.Encuestas.EDLB == true) {
        document.getElementById('BTN_EDLB').setAttribute('class', 'col-xl-5 m-3 btn btn-success');
        document.getElementById('EDLB-Section1').setAttribute('class', 'list-group-item d-none');
        document.getElementById('EDLB-Section2').setAttribute('class', 'list-group-item d-none');
    }

}

function init(list) {
    console.log(list);
    FillSideList(list);
    FillDropList(list);
    FillMenu();
}

