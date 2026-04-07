# 🌤️ Weather App (Next.js)

Aplicación web desarrollada con **Next.js** que permite a los usuarios buscar el clima actual de cualquier ciudad en el mundo. Utiliza la API de Open-Meteo para obtener información en tiempo real como temperatura y velocidad del viento.

---

## 📌 Resumen del proyecto

Esta aplicación permite:

- Buscar una ciudad ingresando su nombre
- Obtener temperatura actual y velocidad del viento
- Visualizar los datos en una interfaz moderna y responsiva
- Manejar errores como ciudades no encontradas o problemas de red

El proyecto también incluye **pruebas unitarias con Jest** para garantizar la calidad del código.

---

## ⚙️ Instalación

Sigue estos pasos para correr el proyecto en tu entorno local:

```bash
# Clonar el repositorio
git clone <tu-repo-url>

# Entrar al proyecto
cd weather-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev 
```

La aplicación estará disponible en:
```bash
[function () { return "This code is highlighted as Javascript!"}](http://localhost:3000)
```

---

## 🧪 Ejecutar pruebas

Para correr las pruebas unitarias:
```bash
npm test
```

---

## 🚀 Guía de uso
1.- Abre la aplicación en el navegador
2.- Escribe el nombre de una ciudad (ej: Madrid, Tokyo, CDMX)
30- Presiona Enter o el botón Buscar
4.- Visualiza el clima actual

📊 Ejemplo de resultado
```bash
{
  "temperature": 20,
  "windspeed": 5,
  "city": "Madrid",
  "country": "Spain"
}
```
En la interfaz se muestra:
🌡️ Temperatura (°C)
💨 Velocidad del viento (km/h)
🌤️ Estado visual del clima (emoji + color dinámico)

---

## ✨ Funcionalidades
- 🔍 Búsqueda de ciudades en tiempo real
- 🌡️ Visualización de temperatura actual
- 💨 Visualización de velocidad del viento
- 🎨 UI dinámica basada en temperatura (colores + emojis)
- ⚡ Indicador de carga
- ❌ Manejo de errores amigable
- 📱 Diseño responsivo
- 🧪 Pruebas unitarias con Jest

---

## ⚠️ Manejo de errores

La aplicación maneja distintos tipos de errores personalizados:

### 1. Ciudad no encontrada
Se lanza: CityNotFoundError
Mensaje:
"No encontramos "<ciudad>". Verifica el nombre e intenta de nuevo."
### 2. Error de red
Se lanza: NetworkError
Mensaje:
"Sin conexión. Revisa tu internet e intenta de nuevo."
### 3. Error desconocido
Cualquier otro error no controlado
Se muestra un mensaje genérico al usuario

---

## 🌐 Información de la API

La aplicación utiliza Open-Meteo API:

### 1. Geocoding API

Convierte el nombre de la ciudad en coordenadas:
```bash
https://geocoding-api.open-meteo.com/v1/search
```
Parámetros:
- name: nombre de la ciudad
- count: número de resultados
- language: idioma
- format: json

### 2. Weather API

Obtiene el clima actual:
```bash
https://api.open-meteo.com/v1/forecast
```
Parámetros:
- latitude
- longitude
- current_weather=true

---

## 🧪 Cobertura de pruebas

Las pruebas incluyen:

✅ Caso exitoso (ciudad válida)
❌ Ciudad inexistente
🌐 Error de red
⚠️ Respuesta inesperada de la API
⏱️ Fallo en la API de clima

---

## 🛠️ Tecnologías utilizadas
Next.js
React
TypeScript
Tailwind CSS
Jest

## 🔮 Mejoras futuras

Algunas ideas para mejorar el proyecto:

🌍 Soporte para múltiples idiomas
📍 Geolocalización automática del usuario
📅 Pronóstico extendido (varios días)
💾 Historial de búsquedas recientes
