import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/cities`);
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const getElementId = document.getElementById("data");
  getElementId.innerHTML += `
          <div class="col-xs-12 col-sm-6 col-lg-3 mb-4" id=${id}>
            <a href=pages/adventures/?city=${id}>
              <div class="tile">
                <div class="tile-text text-center">
                  <h5>${city}</h5>
                  <p>${description}</p>
                </div>
                <img class="img-fluid" src=${image} alt="" />
              </div>
            </a>
          </div>
  `;
}

export { init, fetchCities, addCityToDOM };
