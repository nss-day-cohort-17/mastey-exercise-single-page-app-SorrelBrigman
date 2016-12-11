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
      //if the counter is at a value divisible by 3, it will start a new row
      if ((i%3) === 0) {
      cardInfo += `<div class="row"><div class="col-sm-3 card">
          <p>Make: <span class="make">${data.cars[i].make}</span></p>
          <p>Model: <span class="model">${data.cars[i].model}</span></p>
          <p>Year: <span class="year">${data.cars[i].year}</span></p>
          <p>Price: $<span class="price">${data.cars[i].price}</span></p>
          <p>Description: <span class="descr">${data.cars[i].description}</span></p>
          <p>Availability: <span class="avail">${data.cars[i].availability}</span></p>
        </div>`;
        // if the card is the 3rd card on the row, or the last car card on the page it will add the closing div for the row
      } else if ((i%3) === 2 || i === (data.cars.length - 1)) {
        cardInfo += `<div class="col-sm-3 card">
          <p>Make: <span class="make">${data.cars[i].make}</span></p>
          <p>Model: <span class="model">${data.cars[i].model}</span></p>
          <p>Year: <span class="year">${data.cars[i].year}</span></p>
          <p>Price: $<span class="price">${data.cars[i].price}</span></p>
          <p>Description: <span class="descr">${data.cars[i].description}</span></p>
          <p>Availability: <span class="avail">${data.cars[i].availability}</span></p>
        </div></div>`;
        //otherwise it add the card without adding in row div tags
      }  else { cardInfo += `<div class="col-sm-3 card">
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


//create a function to house all the event listeners

var activateEvents = function () {
  document.querySelector(".cardHolder").addEventListener("click", addColor);
  document.querySelector("input").addEventListener("keyup", updateDescript);
}







//Parses JSON file to var
var parseJson = function(e) {
  data = JSON.parse(e.target.responseText);
  populatePage();
  activateEvents();
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


//Function that addes background color and thickens border

var addColor = function (e) {
  e.preventDefault;
  //if they click on one of the p elements in the card
  if (event.target.parentElement.className.split(" ")[1] === "card") {
        var targetThisCard = event.target.parentElement;
        event.target.parentElement.className = "col-sm-3 selected";
       //if they click on the card element itself
    } else if (event.target.className.split(" ")[1] === "card") {
        var targetThisCard = event.target;
        event.target.className = "col-sm-3 selected";
        //if they click on the span inside of the p element in the card
    } else if (event.target.parentElement.parentElement.className.split(" ")[1] === "card") {
        var targetThisCard = event.target.parentElement.parentElement;
        event.target.parentElement.parentElement.className = "col-sm-3 selected";
    }
    //clears any text in the input text field
    document.querySelector("input").value = " ";
    document.querySelector("input").focus();
    //calls function to update text
}


//Function that updates text

var updateDescript = function () {
  //selects the inner text of the selected card's description element
  //and sets it equal to the value of the input field, changing on every keyup
  document.querySelector(".selected span.descr").innerText = document.querySelector("input").value;
}
