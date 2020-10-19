function transformCoords() 
{
    var fieldX = document.getElementById("netherCoord-x").value;
    var fieldZ = document.getElementById("netherCoord-z").value;

    // Validation of the inputs

    if(fieldX == "" && fieldZ == "")
    {
        document.getElementById("errorContainer").style.display="flex";
        document.getElementById("error-title").innerHTML="Error: por favor, introduzca coordenadas antes de continuar.";
    }
    else
    {
        if(fieldX == "")
        {
            document.getElementById("errorContainer").style.display = "flex";
            document.getElementById("error-title").innerHTML = "Error: el primer campo se encuentra vació.";
        }
        else if(fieldZ == "")
        {
            document.getElementById("errorContainer").style.display = "flex";
            document.getElementById("error-title").innerHTML = "Error: el segundo campo se encuentra vació.";
        }
    }

    
}

function cleanFields()
{
    document.getElementById("netherCoord-x").value="";
    document.getElementById("netherCoord-z").value="";
}

function hideContainer(container)
{
    document.getElementById(container).style.display="none";
}