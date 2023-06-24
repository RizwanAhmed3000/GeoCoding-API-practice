const mainContainer = document.querySelector('.mainContainer');

function whaerAmI(lat, lng){
    const fetchApi = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    fetchApi
        .then((response)=> {
            if(!response.ok){
                throw new Error(`There is a problem with with your Coordinates, your status code in ${response.status}`)
            }else{
                console.log(response)
                return response.json()
            }
        })
        .then((data)=> {
            if(data.distance == "Throttled! See geocode.xyz/pricing"){
                throw new Error('API is throttling')
            } else{
                console.log(data);
                console.log(`You are in ${data.country}`);
                return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
            }
        })
        .then((counrtyResp)=>{
            console.log(counrtyResp, "==>> country response");
            if(!counrtyResp.ok){
                throw new Error(`Country not found, status code ${counrtyResp.status}`)
            } else{
                return counrtyResp.json();
            }
        })
        .then((countryData)=>{
            console.log(countryData[0], "==>> country data");
            uiCreation(countryData[0]);
        })
        .catch((err)=> {
            console.log(err);
            mainContainer.innerHTML = `<h5>${err}</h5>`
        })
}

function uiCreation(country){
    const card = `<div class="card" style="width: 18rem;">
    <img id="image" src=${country.flags.png} class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${country.name.common}</h5>
        <p class="card-text">${country.name.official}</p>
        <h5 class="card-title">Currencies:</h5>
        <p class="card-text">${country.currencies.GBP.name}(${country.currencies.GBP.symbol})</p>
        <h5 class="card-title">Languages:</h5>
        <p class="card-text">${country.languages.eng}</p>
    </div>
</div>`

    mainContainer.innerHTML = card;
}

// whaerAmI(52.508, 13.381);