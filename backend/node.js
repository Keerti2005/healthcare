import { PythonShell } from 'python-shell';

// Prepare the symptom data to pass
const symptomData = {
  "Fever": 1,
  "Cough": 1,
  "Shortness_of_breath": 0,
  "Headache": 1,
  "Fatigue": 1,
  "Body_aches": 1,
  "Sore_throat": 0,
  "Runny_nose": 1,
  "Nausea": 0,
  "Chills": 1,
  "Diarrhea": 0
};

// Convert symptom data to a JSON string
const symptomsJson = JSON.stringify(symptomData);

// Options for python-shell
let options = {
  pythonPath: 'python', // Ensure this points to your Python executable
  args: [symptomsJson]  // Pass the JSON data as an argument to the Python script
};

console.log("Starting the Python script...");

// Run the Python script
PythonShell.run("C:/Users/ashok/OneDrive/Documents/healthcare/backend/predict.py", options, function (err, results) {
  if (err) {
    console.error("Error running Python script:", err);
  } else {
    console.log('Python script output:', results);
  }
});