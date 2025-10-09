#!/bin/bash

# Variables
IMAGE_NAME="rnn-emotions-app"
CONTAINER_NAME="rnn-emotions-container"
HOST_VOLUME="$(pwd)/data"
CONTAINER_VOLUME="/app/data"
ENV_FILE="$(pwd)/.env"


# Preguntar si se desea buildear la imagen
read -p "¿Deseas buildear la imagen Docker? (s/n): " build_image
if [[ "$build_image" =~ ^[sS]$ ]]; then
  docker build -t $IMAGE_NAME .
fi

# Crear el directorio local si no existe
mkdir -p "$HOST_VOLUME"

# Eliminar el contenedor anterior si existe
docker rm -f $CONTAINER_NAME 2>/dev/null

# Correr el contenedor con el volumen, el archivo .env y el puerto 5000
docker run -d --name $CONTAINER_NAME -p 5000:5000 \
  --env-file "$ENV_FILE" \
  -v "$HOST_VOLUME":"$CONTAINER_VOLUME" \
  $IMAGE_NAME