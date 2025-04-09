import sys
import json
import joblib
import time
import os

# Debug: Confirm script is running
print("Python script is running!")

# Print the current working directory for debugging purposes
print("Current working directory:", os.getcwd())

# Absolute path for the model
model_path = "C:/Users/ashok/OneDrive/Documents/healthcare/backend/mm.pkl"

# Ensure the model file exists
if not os.path.exists(model_path):
    print(f"Error: The model file does not exist at {model_path}")
    sys.exit(1)

# Load the trained model
print("Loading model...")
start_time = time.time()
try:
    model = joblib.load(model_path)
    print(f"Model loaded in {time.time() - start_time:.2f} seconds.")
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

# Check if the script has been passed the necessary argument
if len(sys.argv) < 2:
    print("Error: No symptom data provided.")
    sys.exit(1)

# Get the symptom data from the argument
symptoms_json = sys.argv[1]
print("Received JSON data:", symptoms_json)

# Parse the symptom data
try:
    symptoms = json.loads(symptoms_json)
except json.JSONDecodeError as e:
    print(f"JSONDecodeError: {e}")
    sys.exit(1)

# Extract the feature values (assuming the input is a dictionary of symptoms)
feature_values = list(symptoms.values())
print("Feature values:", feature_values)

# Use the model to make a prediction
print("Prediction started...")
try:
    prediction = model.predict([feature_values])
    print("Prediction completed.")
    print("Prediction result:", prediction[0])
except Exception as e:
    print(f"Error during prediction: {e}")
    sys.exit(1)

# Return the prediction result (for debugging purposes, you can print it)
print("Prediction:", prediction[0])
