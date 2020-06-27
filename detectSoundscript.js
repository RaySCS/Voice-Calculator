// Initialize a sound classifier method with SpeechCommands18w model. A callback needs to be passed.
let classifier;
var arrayOfInputs = ["zero","one","two","three","four","five","six","seven","eight","nine"];
var currentNumTotal = 1;
// Options for the SpeechCommands18w model, the default probabilityThreshold is 0
const options = { probabilityThreshold: 0.7 };
// Two variable to hold the label and confidence of the result


function preload() {
    // Load SpeechCommands18w sound classifier model
    classifier = ml5.soundClassifier('SpeechCommands18w', options);
}
var operationSelected;
// function selectOperation(){
//     operationSelected = document.getElementById("btn-primary").value;
//     alert(operationSelected);
//     classifier.classify(gotResult);// Classify the sound from microphone in real time
// }

$(document).ready(function () {
    $("button").click(function () {
        var operationSelectedID = this.value;
        operationSelected = operationSelectedID;
        classifier.classify(gotResult);// Classify the sound from microphone in real time
    });
});

function setup() {
    noCanvas();
    // Create 'label' and 'confidence' div to hold results


}

// A function to run when we get any errors and the results
function gotResult(error, results) {
    // Display error in the console
    if (error) {
        console.error(error);
    }
    // The results are in an array ordered by confidence.
    console.log(results);
    // Show the first label and confidence
    // label.html('Label: ' + results[0].label);
    convertNums(results[0].label);
    document.getElementById("confidenceID").textContent = "Confidence: " + nf(results[0].confidence, 0, 2);

    // confidence.html('Confidence: ' + nf(results[0].confidence, 0, 2)); // Round the confidence to 0.01
}

function convertNums(input){
    var numRightNow = 0;
    for(let x=0;x<11;x++){
        if(arrayOfInputs[x] == input){
            numRightNow = x;
        }
    }

    if(numRightNow != 0){
        performOperation(numRightNow)
    }


}
function performOperation(input){
    if(operationSelected == "add"){
        currentNumTotal += input;
    }
    else if(operationSelected == "sub"){
        currentNumTotal -= input;
    }
    else if(operationSelected == "divide"){
        currentNumTotal /= input;
    }
    else if(operationSelected == "multiply"){
        currentNumTotal *= input;
    }
    else{
    }
    checkForInfinity();

    document.getElementById("totalID").textContent = "Total: " + currentNumTotal;

}
function checkForInfinity(){
    if(currentNumTotal == Infinity){
        currentNumTotal = 1;
    }

}