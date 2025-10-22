import logging
from flask import Flask, render_template, request, jsonify
from predict_emotion import predict_emotion, CLASSES
from model_manager import model_manager, MODEL_PATH

# Configuración del logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),  # Consola
        logging.FileHandler('app.log')  # Archivo (opcional)
    ]
)

# Crear logger para este módulo
logger = logging.getLogger(__name__)

# Reducir verbosidad de TensorFlow
logging.getLogger('tensorflow').setLevel(logging.WARNING)

app = Flask(__name__)

logger.info("Inicializando modelo...")
model_manager.load_model()

if model_manager.is_model_available():
    logger.info("Aplicación lista para recibir peticiones.")
else:
    logger.warning("No se pudo cargar el modelo. La aplicación funcionará con errores.")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health_check():
    """Endpoint para verificar el estado de la aplicación y el modelo."""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_manager.is_model_available()
    })


@app.route('/stats')
def model_stats():
    """Endpoint para mostrar estadísticas básicas del modelo."""
    if model_manager.is_model_available():
        logger.info("Consultando estadísticas del modelo")
        return jsonify({
            'model_status': 'loaded',
            'model_path': MODEL_PATH,
            'supported_emotions': CLASSES.tolist(),
            'total_classes': len(CLASSES)
        })
    else:
        logger.warning("Intento de consultar estadísticas con modelo no disponible")
        return jsonify({'model_status': 'not_loaded'}), 503


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Verificar que el modelo esté disponible
        if not model_manager.is_model_available():
            logger.error("Intento de predicción con modelo no disponible")
            return jsonify({'error': 'Modelo no disponible. Intente más tarde.'}), 503

        data = request.get_json()
        text_input = data.get('text', '')

        if not text_input:
            logger.warning("Petición de predicción sin texto de entrada")
            return jsonify({'error': 'No se proporcionó texto de entrada.'}), 400

        logger.info(f"Procesando predicción para texto: '{text_input[:50]}{'...' if len(text_input) > 50 else ''}'")
        resultado_prediccion = predict_emotion(text_input)

        return jsonify(resultado_prediccion) 
        
    except Exception as e:
        logger.error(f"Error inesperado en endpoint /predict: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    logger.info("Iniciando servidor Flask...")
    app.run(host='0.0.0.0', port=5000, debug=True)