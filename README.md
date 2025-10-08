# 🧠 RNN – Modelo de Predicción de Emociones

## 1. Introducción

En este proyecto se implementa un modelo de inteligencia artificial previamente entrenado y empaquetado en un archivo (`model.pkl`).
El objetivo es exponerlo mediante un backend en **Flask** y permitir la interacción con un **frontend web simple (HTML, CSS y JavaScript con Bootstrap)**.
Finalmente, toda la aplicación se **dockeriza** para facilitar su despliegue en un VPS o entorno en la nube.

---

## 2. Arquitectura de la solución

* **Backend (Flask)**

  * Carga el modelo serializado (`model.pkl`) en memoria al iniciar el servidor.
  * Expone una ruta raíz (`/`) que renderiza una página HTML con un formulario.
  * Procesa las solicitudes `POST` provenientes del frontend, ejecuta la predicción y devuelve el resultado renderizado en la misma interfaz.
  * Puede extenderse fácilmente para exponer un endpoint `/predict` que devuelva las predicciones en formato JSON si se desea interoperabilidad con otros clientes.

* **Frontend (HTML + CSS + JS + Bootstrap)**

  * Página web con un formulario que permite ingresar los datos de entrada para el modelo.
  * Interfaz estilizada con Bootstrap para lograr una experiencia moderna y limpia.
  * Uso de JavaScript opcional (fetch API o formulario tradicional) para enviar los datos al backend y mostrar el resultado dinámicamente.

* **Infraestructura (Docker)**

  * Aplicación contenida en una imagen Docker basada en Python.
  * El contenedor incluye Flask y las dependencias necesarias para ejecutar el modelo.
  * Configurada para ejecutarse de forma autónoma y ser desplegada fácilmente en un VPS o plataforma cloud (DigitalOcean, AWS, Azure, GCP, etc.).

---

## 3. Flujo de funcionamiento

1. El usuario accede a la interfaz web (ruta `/`).
2. Completa el formulario con los valores requeridos por el modelo.
3. Al enviar, Flask recibe los datos vía `POST` y los procesa internamente.
4. El modelo de IA realiza la predicción y Flask devuelve una página con el resultado.
5. El resultado se muestra dinámicamente al usuario en la misma interfaz.

---

## 4. Dockerización

El proyecto incluye:

* Un **Dockerfile** que define la imagen de la aplicación Flask.
* Un **requirements.txt** con las dependencias necesarias (Flask, NumPy, scikit-learn, etc.).
* Un **docker-compose.yml** opcional para facilitar la construcción y ejecución del contenedor, mapeando los puertos y gestionando el entorno.

**Ejemplo de ejecución:**

```bash
docker-compose up --build -d
```

Acceder luego a:

```
http://<IP_DEL_VPS>:5000/
```

---

## 5. Despliegue en VPS

1. Copiar el proyecto y el archivo del modelo (`model.pkl`) al servidor.
2. Construir la imagen Docker con `docker-compose build`.
3. Ejecutar el contenedor con `docker-compose up -d`.
4. Acceder desde el navegador al puerto expuesto (por defecto `5000`).

---

## 6. Conclusión

Este enfoque combina **IA + Flask + Frontend web sencillo**, todo dentro de un contenedor Docker.

* Flask cumple el rol de **backend y servidor web**, manejando tanto la carga del modelo como las predicciones.
* HTML + Bootstrap brindan una **interfaz ligera y funcional** para la interacción con el modelo.
* Docker garantiza **portabilidad, consistencia y facilidad de despliegue** en cualquier entorno productivo.
