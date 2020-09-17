function getNewCoords(){
    var inputCoordX = document.getElementById("coord-x").value;
    var inputCoordZ = document.getElementById("coord-z").value;

    // Validations section

    if(inputCoordX == "")
    {
        document.getElementById("eContainer").style.display="flex";
        document.getElementById("errorMessage").innerHTML="Error: campo x vacío.";
    }
    else if (inputCoordZ == "")
    {
        document.getElementById("eContainer").style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Error: campo z vacío.";
    }
    else
    {
        if (inputCoordX == "" && inputCoordZ == "") {
            document.getElementById("eContainer").style.display = "flex";
            document.getElementById("errorMessage").innerHTML = "Error: Los campos estan vacios.";
        }
    }
    
    if(isNaN(inputCoordX) && !isNaN(inputCoordZ))
    {
        document.getElementById("eContainer").style.display="flex";
        document.getElementById("errorMessage").innerHTML="Error: el campo x no contiene números."
    }
    else if (!isNaN(inputCoordX) && isNaN(inputCoordZ))
    {
        document.getElementById("eContainer").style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Error: el campo z no contiene números."
    }
    else if (isNaN(inputCoordX) && isNaN(inputCoordZ))
    {
        document.getElementById("eContainer").style.display="flex";
        document.getElementById("errorMessage").innerHTML="Error: Ninguno de los campos contiene números.";
    }

    document.getElementById("rContainer").style.display="flex";
    document.getElementById("resultMessage").innerHTML="X: "+(inputCoordX / 8)+"  Z: "+(inputCoordZ / 8);

}

function hideError()
{
    document.getElementById("eContainer").style.display = "none";
}

function hideResult()
{
    document.getElementById("rContainer").style.display="none";
}