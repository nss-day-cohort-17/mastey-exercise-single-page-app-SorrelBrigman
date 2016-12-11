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
      //if the counter is at a value divisible by 3 AND the last last car, it will start a new row and close off the div
      if((i%3) === 0 && i === (data.cars.length - 1)) {
      cardInfo += `<div class="row"><div class="col-sm-3 card">
          <p>Make: <span class="make">${data.cars[i].make}</span></p>
          <p>Model: <span class="model">${data.cars[i].model}</span></p>
          <p>Year: <span class="year">${data.cars[i].year}</span></p>
          <p>Price: $<span class="price">${data.cars[i].price}</span></p>
          <p>Description: <span class="descr">${data.cars[i].description}</span></p>
          <p>Availability: <span class="avail">${data.cars[i].availability}</span></p>
        </div></div>`;
      //if the counter is at a value divisible by 3, it will start a new row
      } else if ((i%3) === 0) {
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
  //when a card is clicked on, it will be updated with color and border size.
  document.querySelector(".cardHolder").addEventListener("click", addColor);
  //when input field is typed in, the description will update
    //when user presses enter, the changes will post and the card will be unselected
  document.querySelector("input").addEventListener("keyup", updateDescript);
  //when the "post changes" button is clicked, the changes will post and the card will be unselected
  document.querySelector("button").addEventListener("click", postChanges);

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
  if(document.querySelector(".selected") !== null) {
    reset();
  }
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

var updateDescript = function (e) {
  //selects the inner text of the selected card's description element
  //and sets it equal to the value of the input field, changing on every keyup
  if(e.keyCode !== 13) {
    document.querySelector(".selected span.descr").innerText = document.querySelector("input").value;
  } else if (e.keyCode === 13) {
    document.querySelector("input").value = " ";
    reset();
  }
}


//Function that resets card value to normal

var reset = function() {
  var selectedCard = document.querySelector(".selected");
  //as long as there is a selected card
  if(selectedCard !== null) {
  //that selected card will return to normal by removing the selected class
  document.querySelector(".selected").className = "col-sm-3 card";
  }
}

//function that will unselect the card when the user is finished updating descript and clicks the button

var postChanges = function(e) {
  e.preventDefault();
  document.querySelector("input").value = " ";
  reset();
}

//function that will unselect the card when the user is finished updating descript and hits enter
// var postChangesEnter = function(e) {
//   e.preventDefault();
//   console.log(e);
//   if (e.keyCode === 13) {
//     document.querySelector("input").value = " ";
//     reset();
//   }
// }
