function getNewCoords(){
    var errDiv = document.getElementById("eContainer");
    var resultDiv = document.getElementById("rContainer");
    var ocoordX = document.getElementById("coord-x").value;
    var ocoordZ = document.getElementById("coord-z").value;
    if(ocoordX == "")
    {
        errDiv.classList.remove("none");
        errDiv.classList.add("errors");
        document.getElementById("errorMessage").innerHTML="Campo coordenada x vacío";
    }
    else if(ocoordZ == "")
    {

    }
    else if(ocoordX == "" && ocoordZ == "")
    {

    }
    else if(isNaN(ocoordX))
    {

    }
    else if(isNaN(ocoordZ))
    {

    }
    else if(isNaN(ocoordX) && isNaN(ocoordZ))
    {

    }
    else
    {

    }
}

function hideError()
{

}