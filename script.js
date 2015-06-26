$(document).ready(function () {
  "use strict";

  $("#import").click(function () {
    var objToSave = generateObjectToSave();
    saveToFirebase(objToSave);
  });

  $("#append").click(function () {
    var objToAppend = generateObjectToSave();
    appendToFirebase(objToAppend);
  });

});

function generateObjectToSave() {
  var objToSave = [];
  var csvText = $("#csv").val();
  var lineArray = csvText.split("\n");
  var headerCells = lineArray[0].split(",");
  // console.log("Headers: " + lineArray[0]);

  for (var i = 1; i < lineArray.length; i++) {
    var cells = lineArray[i].split(",");
    // console.log("line: " + i);
    var innerObj = {};
    for (var j = 0; j < cells.length; j++) {
      innerObj[headerCells[j]] = cells[j];
    }
    objToSave.push(innerObj);
  }
  return objToSave;
}

function appendToFirebase(objectArray) {
  "use strict";
  var uri = $("#firebaseURL").val();
  var model = $("#model").val();
  var ref = new Firebase(uri + "/" + model);
  var running = 0;
  var failed = 0;
  var saved = 0;
  for (var i = 0; i < objectArray.length; i++) {
    running++;
    ref.push(objectArray[i], function(error) {
      if (error) {
        console.log("Data could not be saved for item at index: " + i + " - " + error);
        failed++;
      } else {
        saved++;
      }
      running--;
      console.log("running tasks: " + running);
      if (running === 0) {
        alert("Done. Total Records: " + objectArray.length + "; Saved: " + saved + "; Failed: " + failed);
      }
    });

  }
}

function saveToFirebase(objectArray) {
  "use strict";
  console.log("attempting to save to firebase..");
  var uri = $("#firebaseURL").val();
  var model = $("#model").val();
  var ref = new Firebase(uri);
  var modelRef = ref.child(model);
  modelRef.set(objectArray, function(error) {
    if (error) {
      alert("Data could not be saved." + error);
    } else {
      alert("Data saved successfully.");
    }
  });
}
