// let url = "http://127.0.0.1:5000";
let url = "/api";
function onPageLoad(){
    let getLocationUrl = `${url}/get-location-names`;
    $.get(getLocationUrl, (response)=>{
        console.log(response);
        if(response){
            let locations = response.locations;
            let uilocations = document.getElementById("uiLocations");
            for(let i in locations){
                let opt = new Option(locations[i]);
                $("#uiLocations").append(opt);
            }
        }
    })
}

function getBHKValue(){
    let uiBHK = document.getElementsByName("uiBHK");
    for(i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBathValue(){
    let uiBathrooms = document.getElementsByName("uiBathrooms");
    for(i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function onClickedEstimatePrice(){
    console.log("Estimate price button Clicked");
    let sqft = document.getElementById("uiSqft");
    let bhk = getBHKValue();
    let bathrooms = getBathValue();
    let location = document.getElementById("uiLocations");
    let estPrice = document.getElementById("uiEstimatedPrice");

    let predictUrl = `${url}/predict-home-price`;

    let obj = {
        total_sqft : parseFloat(sqft.value),
        bhk : bhk,
        bath : bathrooms,
        location : location.value
    }; 
    $.post(predictUrl, obj,  (response, status)=>{
        console.log(response.estimated_price);
        estPrice.innerHTML = "<h2>" + (Math.round(response.estimated_price*100)/100)  + " Lakh </h2>";
        console.log(status);
    })

}

window.onload = onPageLoad;