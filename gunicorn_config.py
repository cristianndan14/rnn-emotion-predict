import os

# Puerto dinámico de Render
bind = f"0.0.0.0:{os.environ.get('PORT', 5000)}"

# Configuración optimizada para memoria limitada
workers = 1
worker_class = "sync"
worker_connections = 1000

# Timeouts
timeout = 300
keepalive = 2

# Límites para evitar memory leaks
max_requests = 100
max_requests_jitter = 10

# Precargar la aplicación para ahorrar memoria
preload_app = True

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"