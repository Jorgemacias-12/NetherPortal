const errors = [];
const results = [];

window.onload = () => {
    getNewCoords();
}
const getNewCoords = () => {
    let form = document.forms['form'];
    let optionValue;
    let coord_x;
    let coord_z;
    form['btn-cord'].addEventListener("click", () => {
        optionValue = form['operation-value'].value;
        coord_x = form['cord-x'].value;
        coord_z = form['cord-z'].value;
        if (coord_x != "" && coord_z != "") {
            if (optionValue == "ow") {
                owToNe(coord_x, coord_z);
            } else if (optionValue == "ne") {
                neToOw(coord_x, coord_z);
            }
        } else {
            if (coord_x == "" && coord_z != "") {
                errors.push(new Error("El campo x esta vacio"));
                createElement();
            } else if (coord_z == "" && coord_x != "") {
                errors.push(new Error("El campo z esta vacio"));
                createElement();
            }
            if (coord_x == "" && coord_z == "") {
                errors.push(new Error("Los campos estan vacios"));
                createElement();
            }
        }
        setTimeout(clearFields, 3000);
    });
}

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
    result_coords[0] =  parseFloat(coord_x / 8);
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
    setTimeout(closeError,3000);
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

