import { useState } from "react";

const API_KEY = "7be6f2aec3004f11aef53212251903"; // 🔥 Replace with your actual API key

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    condition: { text: string };
    wind_kph: number;
  };
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setWeather(null); // Clear previous data

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) throw new Error("Invalid city name");

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(`Failed to fetch weather data :  ${error}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">Weather App</h1>

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Enter city name"
          className="border p-2 rounded-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading data…</p>}

      {weather && (
        <div className="weather-cards grid gap-4 grid-cols-2 max-w-lg">
          <div className="weather-card p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-bold">Temperature</h2>
            <p>{weather.current.temp_c}°C</p>
          </div>

          <div className="weather-card p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-bold">Humidity</h2>
            <p>{weather.current.humidity}%</p>
          </div>

          <div className="weather-card p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-bold">Condition</h2>
            <p>{weather.current.condition.text}</p>
          </div>

          <div className="weather-card p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-bold">Wind Speed</h2>
            <p>{weather.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}
