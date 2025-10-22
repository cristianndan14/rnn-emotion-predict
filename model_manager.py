import os
import logging
import tensorflow as tf
from dotenv import load_dotenv

# Solo obtener el logger (la configuración ya está en app.py)
logger = logging.getLogger(__name__)

load_dotenv()

# Configuración del modelo
MODEL_PATH = os.getenv('MODEL_PATH', 'bilstm.keras')

class ModelManager:
    """Singleton para gestionar la carga del modelo de manera eficiente."""
    
    _instance = None
    _model = None
    _model_loaded = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelManager, cls).__new__(cls)
        return cls._instance
    
    def load_model(self):
        """Carga el modelo de manera lazy (solo cuando se necesita)."""
        if not self._model_loaded:
            try:
                if not os.path.exists(MODEL_PATH):
                    raise FileNotFoundError(f"Archivo de modelo no encontrado: {MODEL_PATH}")
                
                logger.info(f"Cargando modelo desde {MODEL_PATH}...")
                self._model = tf.keras.models.load_model(MODEL_PATH)
                self._model_loaded = True
                logger.info("Modelo cargado exitosamente.")
                
            except Exception as e:
                logger.error(f"Error al cargar el modelo: {e}")
                self._model = None
                self._model_loaded = False
                
        return self._model
    
    def get_model(self):
        """Obtiene el modelo, cargándolo si es necesario."""
        if not self._model_loaded:
            return self.load_model()
        return self._model
    
    def is_model_available(self):
        """Verifica si el modelo está disponible."""
        return self._model_loaded and self._model is not None

# Instancia singleton del gestor de modelo
model_manager = ModelManager()
