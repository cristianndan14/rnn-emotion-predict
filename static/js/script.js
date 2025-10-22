// Scripts para la aplicación de predicción de emociones
document.addEventListener('DOMContentLoaded', function() {
  // Variables globales
  const predictForm = document.getElementById('predictForm');
  const textInput = document.getElementById('textInput');
  const charCount = document.getElementById('charCount');
  const predictBtn = document.getElementById('predictBtn');
  const loading = document.getElementById('loading');
  const resultado = document.getElementById('resultado');
  const error = document.getElementById('error');
  const modelStatus = document.getElementById('modelStatus');
  const statsBtn = document.getElementById('statsBtn');
  const healthBtn = document.getElementById('healthBtn');

  // Contador de caracteres
  textInput.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    if (count > 450) {
      charCount.parentElement.classList.add('text-warning');
    } else {
      charCount.parentElement.classList.remove('text-warning');
    }
  });

  // Verificar estado del modelo al cargar
  checkModelHealth();

  // Manejar envío del formulario
  predictForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const text = textInput.value.trim();
    if (!text) return;

    // Mostrar loading
    showLoading();
    hideResults();
    hideError();

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text })
      });

      const data = await response.json();

      if (response.ok) {
        showResults(data);
      } else {
        showError(data.error || 'Error desconocido');
      }
    } catch (err) {
      showError('Error de conexión con el servidor');
    } finally {
      hideLoading();
    }
  });

  // Botón de estadísticas
  statsBtn.addEventListener('click', async function() {
    const modal = new bootstrap.Modal(document.getElementById('statsModal'));
    modal.show();
    
    try {
      const response = await fetch('/stats');
      const data = await response.json();
      
      if (response.ok) {
        document.getElementById('statsContent').innerHTML = formatStats(data);
      } else {
        document.getElementById('statsContent').innerHTML = `
          <div class="alert alert-warning">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Modelo no disponible
          </div>
        `;
      }
    } catch (err) {
      document.getElementById('statsContent').innerHTML = `
        <div class="alert alert-danger">
          <i class="fas fa-times-circle me-2"></i>
          Error al obtener estadísticas
        </div>
      `;
    }
  });

  // Botón de salud
  healthBtn.addEventListener('click', checkModelHealth);

  // Funciones auxiliares
  function showLoading() {
    loading.classList.remove('d-none');
    predictBtn.disabled = true;
    predictBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analizando...';
  }

  function hideLoading() {
    loading.classList.add('d-none');
    predictBtn.disabled = false;
    predictBtn.innerHTML = '<i class="fas fa-magic me-2"></i>Predecir Emoción';
  }

  function showResults(data) {
    const emotionResult = document.getElementById('emotionResult');
    const probabilityBar = document.getElementById('probabilityBar');
    const probabilityText = document.getElementById('probabilityText');
    
    // Configurar emoción
    emotionResult.textContent = data.emotion;
    emotionResult.className = `badge emotion-badge ${getEmotionColor(data.emotion)}`;
    
    // Configurar probabilidad
    const percentage = Math.round(data.probability * 100);
    probabilityBar.style.width = `${percentage}%`;
    probabilityBar.className = `progress-bar ${getConfidenceColor(data.probability)}`;
    probabilityText.textContent = `${percentage}%`;
    
    resultado.classList.remove('d-none');
  }

  function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    error.classList.remove('d-none');
  }

  function hideResults() {
    resultado.classList.add('d-none');
  }

  function hideError() {
    error.classList.add('d-none');
  }

  async function checkModelHealth() {
    try {
      const response = await fetch('/health');
      const data = await response.json();
      
      if (data.model_loaded) {
        modelStatus.innerHTML = `
          <span class="badge bg-success">
            <i class="fas fa-check-circle me-1"></i>Modelo Activo
          </span>
        `;
      } else {
        modelStatus.innerHTML = `
          <span class="badge bg-warning">
            <i class="fas fa-exclamation-triangle me-1"></i>Modelo No Disponible
          </span>
        `;
      }
    } catch (err) {
      modelStatus.innerHTML = `
        <span class="badge bg-danger">
          <i class="fas fa-times-circle me-1"></i>Error de Conexión
        </span>
      `;
    }
  }

  function getEmotionColor(emotion) {
    const colors = {
      'joy': 'bg-success',
      'love': 'bg-danger',
      'surprise': 'bg-info',
      'anger': 'bg-warning text-dark',
      'fear': 'bg-dark',
      'sadness': 'bg-secondary'
    };
    return colors[emotion.toLowerCase()] || 'bg-primary';
  }

  function getConfidenceColor(probability) {
    if (probability >= 0.8) return 'bg-success';
    if (probability >= 0.6) return 'bg-warning';
    return 'bg-danger';
  }

  function formatStats(data) {
    return `
      <div class="row">
        <div class="col-md-6">
          <p><strong>Estado:</strong> <span class="badge bg-success">Cargado</span></p>
          <p><strong>Archivo:</strong> ${data.model_path}</p>
          <p><strong>Total de clases:</strong> ${data.total_classes}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Emociones soportadas:</strong></p>
          <div class="d-flex flex-wrap gap-1">
            ${data.supported_emotions.map(emotion => 
              `<span class="badge ${getEmotionColor(emotion)}">${emotion}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
  }
});