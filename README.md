# RNN Modelo de prediccion de emociones

## 1. Introducción  
En este proyecto se implementa un modelo de inteligencia artificial previamente entrenado y empaquetado en un archivo (`model.pkl`).  
El objetivo es exponerlo mediante un backend en **Django** y permitir la interacción con un **frontend web simple (HTML, CSS y JavaScript con Bootstrap)**.  
Finalmente, toda la aplicación se **dockeriza** para facilitar su despliegue en un VPS.  

---

## 2. Arquitectura de la solución  

- **Backend (Django)**  
  - Carga el modelo serializado en memoria.  
  - Expone un endpoint `/predict/` que recibe los datos enviados por el frontend.  
  - Devuelve la predicción en formato JSON.  
  - Provee la vista `/ui/` que renderiza un formulario web para interactuar con el modelo.  

- **Frontend (HTML + CSS + JS + Bootstrap)**  
  - Formulario web para ingresar los valores de entrada del modelo.  
  - Estilizado con Bootstrap para mejorar la experiencia visual.  
  - Uso de JavaScript (fetch API) para enviar datos al backend sin recargar la página y mostrar el resultado dinámicamente.  

- **Infraestructura (Docker)**  
  - Aplicación contenida en una imagen Docker basada en Python.  
  - El contenedor incluye Django y las dependencias necesarias.  
  - Listo para desplegar en cualquier VPS (ej. DigitalOcean, AWS, Azure, GCP).  

---

## 3. Flujo de funcionamiento  

1. El usuario accede a la interfaz web en la ruta `/ui/`.  
2. Completa el formulario con los valores de entrada del modelo.  
3. Al enviar, se ejecuta un request AJAX hacia `/predict/`.  
4. El backend recibe los datos, ejecuta la predicción y responde en formato JSON.  
5. El frontend muestra la predicción en pantalla en un bloque dinámico.  

---

## 4. Dockerización  

El proyecto incluye:  
- Un **Dockerfile** para construir la imagen de la aplicación.  
- Un **requirements.txt** con las dependencias necesarias (Django, librerías de machine learning, etc.).  
- Un **docker-compose.yml** que permite levantar fácilmente el contenedor y mapear los puertos hacia el VPS.  

---

## 5. Despliegue en VPS  

1. Copiar el proyecto y el archivo del modelo al servidor.  
2. Construir la imagen con Docker Compose.  
3. Levantar el contenedor en segundo plano.  
4. Acceder desde el navegador a la dirección del servidor en el puerto expuesto (ej. `http://<IP_DEL_VPS>:8000/ui/`).  

---

## 6. Conclusión  

Este enfoque combina **IA + Django + Frontend web sencillo**, todo dentro de un contenedor Docker.  
- Django cumple el rol de backend y servidor web.  
- HTML + Bootstrap + JavaScript brindan la interfaz de usuario minimalista.  
- Docker asegura que la aplicación sea portátil y fácil de desplegar en cualquier entorno de producción (VPS, cloud, etc.).  
