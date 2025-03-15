import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Expanded dataset with more conditions and symptoms
data = {
    'Fever': [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
    'Cough': [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    'Shortness of breath': [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    'Headache': [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
    'Fatigue': [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    'Body aches': [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1],
    'Sore throat': [0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
    'Runny nose': [1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
    'Nausea': [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    'Chills': [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
    'Diarrhea': [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0],
    'Condition': ['Flu', 'Cold', 'COVID-19', 'Asthma', 'Flu', 'COVID-19', 'Pneumonia', 'Cold', 'Stomach Bug', 'Flu', 'COVID-19']
}

df = pd.DataFrame(data)

# Features (symptoms) and target (condition)
X = df.drop('Condition', axis=1)
y = df['Condition']

# Split data into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the classifier
model = RandomForestClassifier(n_estimators=100)

# Train the model
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save the trained model
import joblib
joblib.dump(model, 'backend/sss.pkl')
