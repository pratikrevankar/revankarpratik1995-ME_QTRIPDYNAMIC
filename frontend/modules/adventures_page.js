import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    const { id, category, image, name, costPerHead, duration } = adventure;

    const getDataId = document.getElementById("data");
    getDataId.innerHTML += `
    <div class="col-6 col-lg-3 mb-4 card border-0">
    <div class="category-banner">${category}</div>
    <a href="detail/?adventure=${id}" id=${id}>
    <div class="activity-card">
                <img
                  class="activity-card img rounded-0 rounded-top img-fluid"
                  src=${image}
                />
                <div class="activity-card-text text-md-center w-100 mt-3 px-4">
                  <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-start">${name}</h5>
                    <p>₹${costPerHead}</p>
                  </div>
                    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-start">Duration</h5>
                    <p>${duration} Hours</p>
                  </div>
                </div>
              </div>
            </a>
  </div>
    `;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let listByDuration = list.filter((item) =>
    item.duration<=high && item.duration>=low);

  return listByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let listByCategory = list.filter((item) =>
    categoryList.includes(item.category)
  );

  return listByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let duration = filters.duration.split("-");
  let low = duration[0];
  let high = duration[1];
  let filteredByCategoryList = [];
  let filteredByDurationList = "";
  let categoryList = filters["category"];

  if (filters.duration.length > 0 && filters.category.length > 0) {
    filteredByDurationList = filterByDuration(list, low, high);
    filteredByCategoryList = filterByCategory(filteredByDurationList, categoryList);
    list = [...filteredByCategoryList];
  } else if (filters.duration.length > 0) {
    filteredByDurationList = filterByDuration(list, low, high);
    list = [...filteredByDurationList];
  } else if (filters.category.length > 0) {
    filteredByCategoryList = filterByCategory(list, filters.category);
    list = [...filteredByCategoryList];
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let newObject =window.localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  return JSON.parse(newObject);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = document.getElementById("category-list");
  filters.category.forEach((element) => {
    categoryList.innerHTML += `
      <div class="border border-warning p-2 px-4 me-2 rounded-pill">${element}</div>
    `;
  });
  let filterDuration=filters.duration;
  let getDurationRange=document.getElementById("duration-select");
  for(let i=0; i<getDurationRange.length; i++){
    let option = getDurationRange.options[i];
      if (option.value == filterDuration) {
          document.getElementById("duration-select").value=filterDuration
      }
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
