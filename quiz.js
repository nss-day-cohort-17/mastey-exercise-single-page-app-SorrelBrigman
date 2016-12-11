//GLOBAL VARIABLE

var data;




////////////////////////////
//Functions
///////////////////////////



//function to populate the page

var populatePage = function () {
    var cardInfo = "";
  for (var i = 0; i < data.cars.length; i++) {
      var cardHolder = document.querySelector(".cardHolder");
      //addes unique class to each card for listener event targeting
      var targetClass = "class='cardNumber" + i + "'";
      //if the counter is at a value divisible by 3, it will start a new row
      if ((i%3) === 0) {
      cardInfo += `<div class="row"><div class="col-sm-3 card ${targetClass}">
          <p>Make: <span class="make">${data.cars[i].make}</span></p>
          <p>Model: <span class="model">${data.cars[i].model}</span></p>
          <p>Year: <span class="year">${data.cars[i].year}</span></p>
          <p>Price: $<span class="price">${data.cars[i].price}</span></p>
          <p>Description: <span class="descr">${data.cars[i].description}</span></p>
          <p>Availability: <span class="avail">${data.cars[i].availability}</span></p>
        </div>`;
        // if the card is the 3rd card on the row, or the last car card on the page it will add the closing div for the row
      } else if ((i%3) === 2 || i === (data.cars.length - 1)) {
        cardInfo += `<div class="col-sm-3 card ${targetClass}">
          <p>Make: <span class="make">${data.cars[i].make}</span></p>
          <p>Model: <span class="model">${data.cars[i].model}</span></p>
          <p>Year: <span class="year">${data.cars[i].year}</span></p>
          <p>Price: $<span class="price">${data.cars[i].price}</span></p>
          <p>Description: <span class="descr">${data.cars[i].description}</span></p>
          <p>Availability: <span class="avail">${data.cars[i].availability}</span></p>
        </div></div>`;
        //otherwise it add the card without adding in row div tags
      }  else { cardInfo += `<div class="col-sm-3 card ${targetClass}">
          <p>Make: <span class="make">${data.cars[i].make}</span></p>
          <p>Model: <span class="model">${data.cars[i].model}</span></p>
          <p>Year: <span class="year">${data.cars[i].year}</span></p>
          <p>Price: $<span class="price">${data.cars[i].price}</span></p>
          <p>Description: <span class="descr">${data.cars[i].description}</span></p>
          <p>Availability: <span class="avail">${data.cars[i].availability}</span></p>
        </div>`;
      }
  }
  // loads card info into the page
          cardHolder.innerHTML = cardInfo;
}



//Parses JSON file to var
var parseJson = function(e) {
  data = JSON.parse(e.target.responseText);
  populatePage();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete
function loadInventory () {
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", parseJson);
  inventoryLoader.open("GET", "https://masteycarlot.firebaseio.com/.json");
  inventoryLoader.send();
}

loadInventory();


//create a function to house all the event listeners

// var activateEvents = function () {
// //listener to click on card
// //listener to

// }
