import tensorflow as tf
import numpy as np
import logging
from model_manager import model_manager

# Solo obtener el logger (la configuración ya está en app.py)
logger = logging.getLogger(__name__)

CLASSES = np.array(['anger','fear','joy','love','sadness','surprise'])


def predict_emotion(text):
    """Recibe un texto y devuelve emoción y probabilidad."""
    model = model_manager.get_model()
    
    if model is None:
        logger.error("Modelo no disponible para realizar predicción")
        return {"emotion": "Error de carga", "probability": 0.0}

    try:
        input_tensor = tf.constant([text], dtype=tf.string)

        probs = model.predict(input_tensor, verbose=0)
        idx = np.argmax(probs)
        emotion = CLASSES[idx]
        prob = probs[0][idx].item() 
        logger.info(f"Predicción exitosa: {emotion} ({prob:.3f})")
        return {"emotion": emotion, "probability": prob}
    
    except Exception as e:
        logger.error(f"Error durante la predicción: {e}")
        return {"emotion": "Error de predicción", "probability": 0.0}
