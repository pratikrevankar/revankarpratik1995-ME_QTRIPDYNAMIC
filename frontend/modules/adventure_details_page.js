import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const data = await res.json();
    return data;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  const adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = adventure.name;

  const adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.innerHTML = adventure.subtitle;

  const photoGallery = document.getElementById("photo-gallery");
  adventure.images.forEach((image) => {
    photoGallery.innerHTML += `<div>
    <img class="activity-card-image" src=${image} alt="..." />
  </div>
  `;
  });

  const adventureContent = document.getElementById("adventure-content");
  adventureContent.innerHTML = `
<p>${adventure.content}</p>
`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML="";
  const carouselExampleIndicators=document.createElement("div");
  carouselExampleIndicators.className="carousel slide";
  carouselExampleIndicators.setAttribute("id", "carouselExampleIndicators");
  carouselExampleIndicators.setAttribute("data-bs-ride", "true");
  carouselExampleIndicators.innerHTML+=`
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  `;
  const carouselInner=document.createElement("div");
  carouselInner.className="carousel-inner";
  images.forEach((image, index)=>{
    if(index===0){
      carouselInner.innerHTML+=`
      <div class="carousel-item active">
        <img src=${image} class="activity-card-image d-block w-100" alt="...">
      </div>
      `
    }else{
      carouselInner.innerHTML+=`
      <div class="carousel-item">
        <img src=${image} class="activity-card-image d-block w-100" alt="...">
      </div>
      `
    }
    
  });

  carouselExampleIndicators.appendChild(carouselInner);
  carouselExampleIndicators.innerHTML+=`
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `

  photoGallery.append(carouselExampleIndicators);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  const {costPerHead, name, reserved, subtitle, available, content, id}=adventure;
  const reservationPanelSoldOut=document.getElementById("reservation-panel-sold-out");
  const reservationPanelAvailable=document.getElementById("reservation-panel-available");
  const reservationPersonCost=document.getElementById("reservation-person-cost");

  if(available){
    reservationPanelSoldOut.style.display="none";
    reservationPanelAvailable.style.display="block";
    reservationPersonCost.innerHTML=costPerHead;
  }
  else{
    reservationPanelSoldOut.style.display="block";
    reservationPanelAvailable.style.display="none";
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const {costPerHead, name, reserved, subtitle, available, content, id}=adventure;
  const reservationCost=document.getElementById("reservation-cost");

  if(parseInt(persons)){
    reservationCost.innerHTML=costPerHead*parseInt(persons)
  }
  else{
    reservationCost.innerHTML=0
  }
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const {id}=adventure;
  const formId=document.getElementById("myForm");
  formId.addEventListener("submit", (e)=>{
    e.preventDefault();
    const formData=new FormData(e.target);
    const formDataObj={};
    formData.forEach((val, key)=>{
      formDataObj[key]=val;
    });
    formDataObj["adventure"]=id;

    makeRequest(formDataObj)
  });
  

  async function makeRequest(objectData){
    try{
      const res=await fetch(`${config.backendEndpoint}/reservations/new`, {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(objectData)
      });
      if(res.ok){
        alert("Success!");
        window.location.reload();
      }
      else{
        alert("Failed!");
      }
      const data=await res.json();
      console.log(data);
      return data;
    }
    catch(err){
      alert("Failed!");
      console.log(err)
    }
    
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved){ 
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
