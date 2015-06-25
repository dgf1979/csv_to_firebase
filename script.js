$(document).ready(function () {
  "use strict";

  $("#import").click(function () {
    var objToSave = [];

    var csvText = $("#csv").val();
    var lineArray = csvText.split("\n");
    var headerCells = lineArray[0].split(",");
    console.log("Headers: " + lineArray[0]);

    for (var i = 1; i < lineArray.length; i++) {
      var cells = lineArray[i].split(",");
      console.log("line: " + i);
      var innerObj = {};
      for (var j = 0; j < cells.length; j++) {
        innerObj[headerCells[j]] = cells[j];
      }
      objToSave.push(innerObj);
    }
    saveToFirebase(objToSave);
  });
});

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
