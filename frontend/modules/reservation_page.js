import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations/`);
    const data = await res.json();

    // Place holder for functionality to work in the Stubs
    return data;
  } catch {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if (reservations.length) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    console.log(reservations);
  reservations.forEach((reservation) => {
    const { adventure, adventureName, date, id, name, person, price, time } =
      reservation;
    let newDate = new Date(date);
    // let newTime=new Date(time);

    let timeObj = new Date(time);
    let newTime =
      timeObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      ", " +
      timeObj.toLocaleTimeString("en-IN");

    console.log(newTime);

    const reservationTable = document.getElementById("reservation-table");
    reservationTable.innerHTML += `
  <tr>
    <th scope="col">${id}</th>
    <th scope="col">${name}</th>
    <th scope="col">${adventureName}</th>
    <th scope="col">${person}</th>
    <th scope="col">${newDate.toLocaleDateString("en-IN")}</th>
    <th scope="col">${price}</th>
    <th scope="col">${newTime}</th>
    <th id=${id} scope="col"><a href="/frontend/pages/adventures/detail/?adventure=${adventure}" class="reservation-visit-button text-white">Visit Adventure</a></th>
  </tr>`;
  });
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  
}

export { fetchReservations, addReservationToTable };
