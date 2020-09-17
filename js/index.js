function getNewCoords(){
    var errDiv = document.getElementById("eContainer");
    var resultDiv = document.getElementById("rContainer");
    var ocoordX = document.getElementById("coord-x").value;
    var ocoordZ = document.getElementById("coord-z").value;
    if(ocoordX == "")
    {
        errDiv.style.display="flex";
        document.getElementById("errorMessage").innerHTML="El campo de la coordenada x se encuentra vacío";
    }
    else if(ocoordZ == "")
    {
        errDiv.style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Campo coordenada x vacío";
    }
    else if(ocoordX == "" && ocoordZ == "")
    {
        errDiv.style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Campo coordenada x vacío";
    }
    else if(isNaN(ocoordX))
    {
        errDiv.style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Campo coordenada x vacío";
    }
    else if(isNaN(ocoordZ))
    {
        errDiv.style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Campo coordenada x vacío";
    }
    else if(isNaN(ocoordX) && isNaN(ocoordZ))
    {
        errDiv.style.display = "flex";
        document.getElementById("errorMessage").innerHTML = "Campo coordenada x vacío";
    }
    else
    {

    }
}

function hideError()
{
    document.getElementById("eContainer").style.display = "none";
}

function hideResult()
{
    document.getElementById("rContainer").style.display="none";
}