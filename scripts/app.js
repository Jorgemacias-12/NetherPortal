const errors = [];
const results = [];

window.onload = () => {
    getNewCoords();
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(document.getElementById("cord-x"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});

setInputFilter(document.getElementById("cord-z"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value);
});

const getNewCoords = () => {
    deleteErrors();
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
                
            } else if (optionValue == "ne") {

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
    });
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
