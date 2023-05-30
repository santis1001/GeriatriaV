const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxjzwV_68pTvmAHNE3xUhvSRgUV1B5icNljQZtWz9p15JTINTYsiIpe1jbp2uNoCsk-/exec';

const login = document.getElementById('login-form');
const u_nombre = document.getElementById('Nombre');
const u_matricula = document.getElementById('Matricula');
const doc_error = document.getElementById('errorModal');

const thisURL = './main-sesion.html?mat='

login.addEventListener('submit', function (event) {
    event.preventDefault();

    if (u_nombre.value != '' && u_matricula.value != '') {
        GetData(u_matricula.value, "Indexer")
            .then(function (data) {
                console.log(data)
                const url = (thisURL + data[0].Matricula);
                window.location.href = url
            })
            .catch(function (error) {
                console.log(error)
                showError();
            });

    }

});

function showError() {
    doc_error.setAttribute('class', 'row justify-content-center my-4 mx-1');
    setTimeout(function () {

        doc_error.setAttribute('class', 'row justify-content-center my-4 mx-1 d-none');
    }, 3000);

}
function GetData(matricula, sheet) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            crossDomain: true,
            url: WEB_APP_URL,
            type: "GET",
            data: { "Matricula": matricula, "Sheet": sheet },
            success: function (data) {
                console.log(data);
                resolve(data.data);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}
