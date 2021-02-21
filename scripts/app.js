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
            
        }
    });
}