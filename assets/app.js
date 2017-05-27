// Initialize Firebase
var config = {
    apiKey: "AIzaSyDt4fyAKWI_VDYQsT0W-9_E8H8oINBQBG0",
    authDomain: "train-schedule-ac86d.firebaseapp.com",
    databaseURL: "https://train-schedule-ac86d.firebaseio.com",
    projectId: "train-schedule-ac86d",
    storageBucket: "train-schedule-ac86d.appspot.com",
    messagingSenderId: "676159951683"
};
firebase.initializeApp(config);

var dataBase = firebase.database();

//variables
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";

//first time pushed back 1 year to make sure it comes before current time
var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

//set current time 
var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("hh:mm"));

//difference in current time to first train time
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME " + diffTime);

//Time apart (remainder)
var trainRemainder = diffTime % trainFrequency;
console.log(trainRemainder);

//minutes unitl train
var trainMinutesTillTrain = trainFrequency - trainRemainder;
console.log("MINUTES TILL TRAIN: " + trainMinutesTillTrain);

//next train
var nextTrain = moment().add(trainMinutesTillTrain, "minutes");
console.log("NEXT ARRIVAL TIME: " + moment(nextTrain));
/*
$('#hello-world').submit(function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    /* Validations go here */
/*this.submit(); // If all the validations succeeded
});*/
/**/


//onclick to "on submit" for forms
//capturing the on click event
$("#submit-button").on("click", function(event) {
      event.preventDefault();
    
    
    //variables to hold the input from user
    trainName = $("#train-nameForm").val().trim();
    trainDestination = $("#train-destinationForm").val().trim();
    trainTime = $("#train-timeForm").val().trim();
    trainFrequency = $("#train-frequencyForm").val().trim();



    //pushing the data inputed to firbase 
    dataBase.ref().push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    });

    $("#train-nameForm").val('');
    $("#train-destinationForm").val('');
    $("#train-timeForm").val('');
    $("#train-frequencyForm").val('');

    var newRow = $("<tr>");
    newRow.html("<td>" + trainName + "</td>" + "<td>" + trainDestination + "</td>" + "<td>" + trainFrequency + "</td>" + "<td>" + trainMinutesTillTrain + "</td>" + "<td>" + nextTrain + "</td>");

    $("#table-body").prepend(newRow);

});

dataBase.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);


});
