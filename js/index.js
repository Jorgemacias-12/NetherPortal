function getNewCoords(){
    let errDiv = document.getElementById("eContainer");
    let resultDiv = document.getElementById("rContainer");
    var ocoordX = document.getElementById("coord-x").value;
    var ocoordz = document.getElementById("coord-z").value;
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
    else
    {

    }
}

function hideError()
{

}