const mainContainer = document.querySelector('.mainContainer');

async function whaerAmI(lat, lng) {
    try {
        const fetchApi = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!fetchApi.ok) {
            throw new Error(`There is a problem with with your Coordinates, your status code in ${response.status}`)
        }
        const data = await fetchApi.json();
        if (data.distance == "Throttled! See geocode.xyz/pricing") {
            throw new Error('API is throttling')
        }
        console.log(data);
        console.log(`You are in ${data.country}`);
        const countryApi = await fetch(`https://restcountries.com/v3.1/name/${data.country}`)
        if (!countryApi.ok) {
            throw new Error(`Country not found, status code ${counrtyResp.status}`)
        }
        const countryData = await countryApi.json();
        uiCreation(countryData[0]);
    } catch (error) {
        console.error(error);
        mainContainer.innerHTML = `<h5>${err}</h5>`
    }
}

function uiCreation(country) {
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