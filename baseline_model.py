import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report


def load_dummy_data():
    data = {
        "symptoms": [
            "fever headache nausea",
            "chest pain shortness of breath",
            "itching skin rash",
            "fever cough sore throat",
            "joint pain swelling stiffness",
            "burning urination frequent urination"
        ],
        "disease": [
            "Migraine",
            "Heart Disease",
            "Allergy",
            "Flu",
            "Arthritis",
            "UTI"
        ]
    }
    return pd.DataFrame(data)


def train_model(df):
    X = df["symptoms"]
    y = df["disease"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    vectorizer = TfidfVectorizer(stop_words="english")
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    model = MultinomialNB()
    model.fit(X_train_vec, y_train)

    preds = model.predict(X_test_vec)

    print("Accuracy:", accuracy_score(y_test, preds))
    print(classification_report(y_test, preds))

    return model, vectorizer


if __name__ == "__main__":
    df = load_dummy_data()
    train_model(df)
