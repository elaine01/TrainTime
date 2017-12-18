// * Make sure that your app suits this basic spec:
//   * When adding trains, administrators should be able to submit the following:
//     * Train Name
//     * Destination 
//     * First Train Time -- in military time
//     * Frequency -- in minutes
//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.
//   * Users from many different machines must be able to view same train times.
//   * Styling and theme are completely up to you. Get Creative!


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHEmZW-gC4cnBS-8Lc3p8c_RSJxBSAeO0",
  authDomain: "train-schedule-cd6fa.firebaseapp.com",
  databaseURL: "https://train-schedule-cd6fa.firebaseio.com",
  projectId: "train-schedule-cd6fa",
  storageBucket: "",
  messagingSenderId: "579350870403"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#add-train-btn", function(e) {
	e.preventDefault();

	console.log("hi");

	// grab user input
	var addTrain = $("#train-name-input").val().trim();
	var addDestination = $("#destination-input").val().trim();
	var addTime = $("#start-input").val().trim();
	var addFrequency = $("#frequency-input").val().trim();

	// create local "temporary" object for holding employee data
	var newTrain = {
		name: addTrain,
		destination: addDestination,
		time: addTime,
		frequency: addFrequency,
	};

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	//Alert
	alert("Train successfully added");

	//Clear all values in form
	$("#train-name").val("");
	$("#train-destination").val("");
	$("#train-starttime").val("");
	$("#train-frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	// store everything into variable
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);

// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
	var firstTrainCoverted = moment(trainTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDifference = moment().diff(moment(firstTrainCoverted), "minutes");
	var remainingTime = timeDifference % trainFrequency;
	var minutesNextTrain = trainFrequency - remainingTime;
	var nextTrain = moment().add(minutesNextTrain, "minutes");
	var nextTrainArrival = moment(nextTrain).format("hh:mm a")


	$("#train-table > tbody").append("<tr><td>" + trainName
		+"</td><td>" + trainDestination 
		+ "</td><td>" + trainFrequency
		+ "</td><td>" + nextTrainArrival
		+ "</td><td>" + minutesNextTrain + "</td><td>");

})



