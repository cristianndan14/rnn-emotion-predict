from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np


app = Flask(__name__)


# Cargar el modelo de IA
# modelo = joblib.load('model.pkl')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        valor1 = float(data.get('valor1', 0))
        valor2 = float(data.get('valor2', 0))
        # prediccion = modelo.predict([[valor1, valor2]])[0]
        # Simulación de predicción
        prediccion = valor1 + valor2  # Ejemplo simple
        return jsonify({'resultado': str(prediccion)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)