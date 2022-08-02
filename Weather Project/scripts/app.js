const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const details2 = document.querySelector(".details-2");
const body = document.querySelector('body')
const container = document.querySelector('.container')
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  // destructure properties
  const { cityDets, weather } = data;
  console.log(data)
  // update details template
  details.innerHTML = ` 
    <div class="display-4">
      <span>${weather.Temperature.Metric.Value}</span>
    </div>
    <span>&deg;C</span>
    <div>
    <h5 class="display-4">${cityDets.EnglishName}</h5>
    <p>Region: ${cityDets.Region.EnglishName}</p>
    </div>
    <div class="icon">
    <img src="img/icons/${weather.WeatherIcon}.svg" alt="" />
    <div>${weather.WeatherText}</div>
    </div>
    `;

    details2.innerHTML= `
    <h5>GeoPosition:</h5>
    <div class="geo">
    <p>Latitude: ${cityDets.GeoPosition.Latitude}</p>
    <p>Longitude: ${cityDets.GeoPosition.Longitude}</p>
    </div>
    <h5>Country: </h5>
    <div class="country">
    <p>${cityDets.Country.EnglishName}(${cityDets.Country.ID})</p>
    </div>
    <div class="link">
    <a href="${weather.Link}" target="_blank">More Details</a>
    </div>`;

  // update day/night img
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  if(weather.IsDayTime){
    container.classList.add('container-2')
    container.classList.remove('container-3')
    body.classList.add('body-2')
    body.classList.remove('body-3')
  } else{
    container.classList.add('container-3')
    container.classList.remove('container-2')
    body.classList.add('body-3')
    body.classList.remove('body-2')
  }

  // remove the d-none class if present
  if (details.classList.contains("d-none")) {
    details.classList.remove("d-none");
  }

  if (details2.classList.contains("d-none")) {
    details2.classList.remove("d-none");
  }
};


cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  forecast.updateCity(city)
    .then((data) => updateUI(data))
    .catch(() => alert("Error, you typed the location name incorrectly.  Try again!"));

    // set local storage
    localStorage.setItem('location', city);
});


if(localStorage.getItem('location')){
  forecast.updateCity(localStorage.getItem('location'))
  .then(data => updateUI(data))
  .catch(err => console.log(err));
}