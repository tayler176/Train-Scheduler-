  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyASHJmKMg82Npuy9hy-zgAIEbijXNoX2mo",
    authDomain: "newtrains-2265b.firebaseapp.com",
    databaseURL: "https://newtrains-2265b.firebaseio.com",
    projectId: "newtrains-2265b",
    storageBucket: "newtrains-2265b.appspot.com",
    messagingSenderId: "833569902501"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var train = ""
var firstTrain = "";
var destination = ""
var frequency= 0;



$("#submit").on('click', function () {
  train = $("#trainNameHTML").val();
  firstTrain = $("#firstTrainHTML").val();
  destination = $("#destinationHTML").val();
  frequency = $("#frequencyHTML").val();

  $("#trainNameHTML").val('');  
  $("#firstTrainHTML").val('');
  $("#destinationHTML").val('');
  $("#frequencyHTML").val('');

  console.log(train);
  console.log(firstTrain);
  console.log(destination);
  console.log(frequency);



  database.ref().push({
    train: train,
    firstTrain: firstTrain,
    destination: destination,
    frequency: frequency,
  });
});

database.ref().on("child_added", function (snapshot) {
  console.log(snapshot.val());
  console.log(snapshot.val().train);
  console.log(snapshot.val().firstTrain);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().frequency);

  console.log("First: " + snapshot.val().firstTrain);
  var convertedTime = moment().format(snapshot.val().firstTrain, "HH:mm");
  console.log("real: " + convertedTime);

  // var convertTime = moment(), "hh:mm");
  console.log(convertTime);
  var timeDiff = (convertTime * "-1");
  console.log("Not: " + timeDiff);
  var nextArrival = (timeDiff * snapshot.val().frequency);
  console.log("Sure: " + nextArrival);



  $(".table").append("<tr><td> " +
    snapshot.val().train +
    " </td><td> " + snapshot.val().destination + 
    " </td><td> " + snapshot.val().frequency +
    " </td><td> " + nextArrival +
    " </td><td> " + "blank" +
    // " </td><td> " + minutesAway +
    " </td></tr>");
});