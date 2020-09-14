function getNewCoords(){
    var divER = document.getElementById("reContainer");
    var ocoordX = document.getElementById("coord-x").value;
    var ocoordz = document.getElementById("coord-z").value;
    if(ocoordX == "")
    {
        divER.classList.add("errors"); 
        divER.style.display="block";
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