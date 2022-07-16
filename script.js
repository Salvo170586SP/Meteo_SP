console.log('js ok');

const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTmp = document.querySelector('.weather-tmp');
const weatherSuggestion = document.querySelector('.suggestion');

//recupero tag <html>
const rootElement = document.documentElement;

//recuperare la posizione
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

//funzione da eseguire in caso di errore
function onError(error) {
    console.error(error);
    weatherLocation.innerText = "Attiva la geolocalizzazione";
}

//funzione da eseguire in caso di successo
function onSuccess(position) {
    console.log(position)

    const apiKey = '7a8c4f1246939c9a0a1b8c6198ae1cbb';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const lang = 'it';
    const units = 'metric';

    const apiUri = `${apiUrl}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${lang}&appid=${apiKey}`;
    console.log(apiUri);

    //faccio la chiamata api
    fetch(apiUri).then((res) => {
        const data = res.json();
        return data;
    }).then((data) => {
        console.log(data);

        const locationName = data.name;
        const temperature = Math.floor(data.main.temp);
        const iconCode = data.weather[0].icon;
        const description = data.weather[0].description;

        const suggestion = getSuggestion(iconCode);
        console.log(suggestion);
        
        weatherLocation.innerText = locationName;
        weatherTmp.innerText = temperature + '°';
        weatherIcon.alt = description;
        weatherIcon.src = 'images/' + iconCode + '.png';
        weatherSuggestion.innerText = suggestion;

        rootElement.classList.remove('js-loading');

    });
}


//premdo le frasi in base al meteo
function getSuggestion(iconCode) {
    const suggestion = {
        '01d' : 'Ricorda la crema solare',
        '01n' : 'Buonanotte',
        '02d' : 'Oggi il sole va e viene',
        '02n' : 'Attenti ai lupoi mannari',
        '03d' : 'Luce perfetta per fare foto',
        '03n' : 'Dormi sereno',
        '04d' : 'Che cielo grigio',
        '04n' : 'Non si vede nemmeno la luna',
        '09d' : 'Prendi l\'ombrello',
        '09n' : 'Copriti bene',
        '010d' : 'Prendi l\'ombrello',
        '010n' : 'Copriti bene',
        '011d' : 'Attento ai fulmini',
        '011n' : 'I lampi accendono la notte',
        '013d' : 'Esci a fare un pupazzo di neve',
        '013n' : 'Notte perfetta per stare sotto al piumone',
        '050d' : 'Accendi i fendinebbia',
        '050n' : 'Guida con prudenza',
    }

    return suggestion[iconCode]
}