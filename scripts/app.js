const errors = [];
const results = [];

const createAndShowError = () => {

}

const createAndShowResult = (operationOption) => {

}

const validateValues = (cordinate_x, cordinate_z, operationOption) => {
    if (cordinate_x == "") { errors.push(new Error("El campo x esta vacio")); createAndShowError(); }
    if (cordinate_z == "") { errors.push(new Error("El campo z esta vacio")); createAndShowError(); }
    if (cordinate_x == "" && cordinate_z == "") {
        errors.push(new Error("Los campos estan vacios")); createAndShowError();
    }
    if (cordinate_x != "" && cordinate_z != "") { }
}

const initApp = () => {
    document.getElementById("btn-cord").addEventListener("click", () => {
        let operationOption = document.getElementById('operation-value').value;
        let input_x_value = document.getElementById('cord-x').value;
        let input_z_value = document.getElementById('cord-z').value;
        validateValues(input_x_value, input_z_value, operationOption);
    });
}

window.onload = () => {
    initApp();
}

// Sección vieja del archivo

const clearFields = () => {
    document.getElementById("cord-x").value = '';
    document.getElementById("cord-z").value = '';
}

const closeError = () => {
    document.getElementById("c-error").innerHTML = "";
}

const createElement = () => {
    let errorHTML = '';
    for (let error of errors) {
        errorHTML = `
                        <div class="error">
                            <div class="closeable">
                                <i class="fas fa-times icon" onclick='closeError()'></i>
                            </div>
                            <p class="text error-text">
                                Error: ${error.message}
                            </p>
                        </div>
        `
    }
    document.getElementById("c-error").innerHTML = errorHTML;
}

const deleteManager = (id) => {
    let resultIndex = results.findIndex(results => results.id === id);
    results.splice(resultIndex, 1);
    includeToHistory();
}

const createResultElement = (resultObject) => {
    let resultHTML = `
                <div class="history">
                    <div class="closeable">
                        <i class="fas fa-times icon"
                        onclick='deleteManager(${resultObject.id})'></i>    
                    </div>
                    <p class="text success-text">
                        Coordenadas: [X: ${resultObject.x}, Z: ${resultObject.z}]
                    </p>
                </div>


    `;
    return resultHTML;
}

const includeToHistory = () => {
    let resultHTML = '';
    for (let result of results) {
        resultHTML += createResultElement(result);
    }
    document.getElementById("coords-history").innerHTML = resultHTML;
}

const owToNe = (coord_x, coord_z) => {
    let resultHTML;
    let result_coords = [];
    result_coords[0] = parseFloat(coord_x / 8);
    result_coords[1] = parseFloat(coord_z / 8);
    results.push(new Coordinate(result_coords[0], result_coords[1]));
    resultHTML = `
                        <div class="result">
                            <div class="closeable">
                                <i class="fas fa-times icon"
                                onclick='closeError()'></i>
                            </div>
                            <p class="text success-text">
                                Resultado: [ X: ${result_coords[0]}, Z: ${result_coords[1]}]
                            </p>
                        </div>

    `;
    document.getElementById("c-error").className = "result-container";
    document.getElementById("c-error").innerHTML = resultHTML;
    setTimeout(includeToHistory, 1000);
    setTimeout(closeError, 3000);
}

const neToOw = (coord_x, coord_z) => {
    let resultHTML;
    let result_coords = [];
    result_coords[0] = parseFloat(coord_x * 8);
    result_coords[1] = parseFloat(coord_z * 8);
    results.push(new Coordinate(result_coords[0], result_coords[1]));
    resultHTML = `
                        <div class="result">
                            <div class="closeable">
                                <i class="fas fa-times icon"
                                onclick='closeError()'></i>
                            </div>
                            <p class="text success-text">
                                Resultado: [ X: ${result_coords[0]}, Z: ${result_coords[1]}]
                            </p>
                        </div>

    `;
    document.getElementById("c-error").className = "result-container";
    document.getElementById("c-error").innerHTML = resultHTML;
    setTimeout(includeToHistory, 1000);
    setTimeout(closeError, 3000);
}

