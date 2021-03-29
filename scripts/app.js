const errors = [];
const results = [];

const deleteManager = (id) => {
    let resultIndex = results.findIndex(results => results.id === id);
    results.splice(resultIndex, 1);
    updateHistory();
}

const createHistoryElements = (resultObject) => {
    let resultElement =
        `
                <div class="history">
                    <div class="closeable">
                        <i class="fas fa-times icon"
                        onclick='deleteManager(${resultObject.id})'></i>    
                    </div>
                    <p class="text success-text">
                        Coordenadas: [X: ${resultObject.x}, Z: ${resultObject.z}]
                    </p>
                </div>
    `
    return resultElement;
}

const updateHistory = () => {
    let htmlElements = '';
    for (let element of results) { htmlElements += createHistoryElements(element) }
    document.getElementById('coords-history').innerHTML = htmlElements;
}

const clearInputFields = () => {
    document.getElementById("cord-x").value = '';
    document.getElementById("cord-z").value = '';
}

function destroyElement() {
    document.getElementById('c-error').innerHTML = "";
}

const overworldToNether = (cordinate_x, cordinate_z) => {
    let newCordinates = [];
    newCordinates[0] = cordinate_x / 8;
    newCordinates[1] = cordinate_z / 8;
    return newCordinates;
}

const netherToOverworld = (cordinate_x, cordinate_z) => {
    let newCordinates = [];
    newCordinates[0] = cordinate_x * 8;
    newCordinates[1] = cordinate_z * 8;
    return newCordinates;
}

const createAndShowError = () => {
    let errorElementToCreate = ``;
    for (let errorElement of errors) {
        errorElementToCreate =
            `
                        <div class="error">
                            <div class="closeable">
                                <i class="fas fa-times icon" onclick='destroyElement()'></i>
                            </div>
                            <p class="text error-text">
                                Error: ${errorElement.message}
                            </p>
                        </div>
        `
    }
    document.getElementById('c-error').innerHTML = errorElementToCreate;
}

const createAndShowResult = (operationOption, cordinate_x, cordinate_z) => {
    let localresults;
    if (operationOption == "ow") { localresults = overworldToNether(cordinate_x, cordinate_z) }
    if (operationOption == "ne") { localresults = netherToOverworld(cordinate_x, cordinate_z) }
    results.push(new Coordinate(localresults[0], localresults[1]));
    document.getElementById('c-error').className = "result-container";
    document.getElementById('c-error').innerHTML =
        `
                        <div class="result">
                            <div class="closeable">
                                <i class="fas fa-times icon"
                                onclick='destroyElement()'></i>
                            </div>
                            <p class="text success-text">
                                Resultado: [ X: ${localresults[0]}, Z: ${localresults[1]}]
                            </p>
                        </div>
    `;
    setTimeout(updateHistory, 1000);
    setTimeout(destroyElement, 1000);
    setTimeout(clearInputFields, 1000)
}

const validateValues = (cordinate_x, cordinate_z, operationOption) => {
    if (cordinate_x == "") { errors.push(new Error("El campo x esta vacio")); createAndShowError(); }
    if (cordinate_z == "") { errors.push(new Error("El campo z esta vacio")); createAndShowError(); }
    if (cordinate_x == "" && cordinate_z == "") {
        errors.push(new Error("Los campos estan vacios")); createAndShowError();
    }
    if (cordinate_x != "" && cordinate_z != "") {
        createAndShowResult(operationOption, cordinate_x, cordinate_z);
    }
}

const initApp = () => {
    document.getElementById("btn-cord").addEventListener("click", () => {
        validateValues
            (
                document.getElementById('cord-x').value,
                document.getElementById('cord-z').value,
                document.getElementById('operation-value').value
            );
    });
}

window.onload = () => {
    initApp();
}