# 🌤️ Weather App (Next.js)

A simple web application built with **Next.js** that allows users to search for the current weather by city and its 5 day forecast. It uses the Open-Meteo API to fetch real-time data such as temperature and wind speed.

---

## 📌Project Overview

This application allows users to:

- Search for a city by name
- Get the current temperature and wind speed
- View results in a modern and responsive UI
- Handle errors such as city not found or network issues

The project also includes unit tests with Jest to ensure code quality.

---

## ⚠️ Important Note About Project Structure

Due to the project setup, the actual application is located inside a nested folder:
```bash
weather-app/weather-app
```
So you need to navigate into the inner folder before running the project.

---

## ⚙️ Requirements

Before running the project, make sure you have installed:

Node.js (recommended version: 18 or higher) & npm (comes bundled with Node.js)

To verify installation:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started (Step-by-Step)

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Alexan-999/weather-app.git
```
### 2. Navigate to the project folder
```bash
cd weather-app
```
### 3. Navigate to the inner folder
```bash
cd weather-app
```
Final path should look like:
```bash
YourUser/Documents/weather-app/weather-app
```
### 4. Install dependencies
```bash
npm install
```
### 5. Run the development server
```bash
npm run dev
```
### 6. Open in your browser
```bash
[npm run dev](http://localhost:3000)
```

---
## 🧪 Run Tests
To execute unit tests:
```bash
npm test
```

---

## 🚀 Usage Guide
- 1.- Open the application in your browser
- 2.- Enter a city name (e.g., Madrid, Tokyo, Mexico City)
- 3.- Press Enter or click the search button
- 4.- View the current weather data

UI Displays:
🌡️ Temperature (°C)
💨 Wind speed (km/h)
🌤️ Visual weather state
⚡ 5 Day Forecast

---

## ✨ Features
- 🔍 Real-time city search
- 🌡️ Current temperature display
- 💨 Wind speed display
- 🎨 Dynamic UI based on temperature
- ⚡ Loading indicator (in search button)
- ❌ User-friendly error handling
- 📱 Responsive design
- 🧪 Unit testing with Jest

---
