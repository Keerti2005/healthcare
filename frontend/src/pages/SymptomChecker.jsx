import { useState } from "react";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState({
    Fever: 0,
    Cough: 0,
    Shortness_of_breath: 0,
    Headache: 0,
    Fatigue: 0,
    Body_aches: 0,
    Sore_throat: 0,
    Runny_nose: 0,
    Nausea: 0,
    Chills: 0,
    Diarrhea: 0,
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setSymptoms({ ...symptoms, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(symptoms).map(([key, value]) => [key, value ? 1 : 0])
          )
        ),
      });

      const data = await response.json();
      console.log("Received Response:", data);
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Symptom Checker</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-96">
        {Object.keys(symptoms).map((symptom) => (
          <div key={symptom} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {symptom.replace(/_/g, " ")}
            </label>
            <input
              type="checkbox"
              name={symptom}
              checked={symptoms[symptom] === "1"}
              onChange={(e) =>
                setSymptoms({ ...symptoms, [symptom]: e.target.checked ? "1" : "0" })
              }
              className="mr-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full"
          disabled={loading}
        >
          {loading ? "Checking..." : "Get Prediction"}
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-green-200 text-green-800 font-bold rounded">
          Prediction: {prediction}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-200 text-red-800 font-bold rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
