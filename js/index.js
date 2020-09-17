function getNewCoords(){
    let errDiv = document.getElementById("eContainer");
    let resultDiv = document.getElementById("rContainer");
    var ocoordX = document.getElementById("coord-x").value;
    var ocoordZ = document.getElementById("coord-z").value;
    if(ocoordX == "")
    {
        errDiv.classList.add("errors");
        errDiv.style.display="block";
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