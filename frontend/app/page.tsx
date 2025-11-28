// frontend/src/app/page.tsx
"use client"; 

import { useState } from "react";

interface WeatherData {
  city: string;
  region: string;
  data: {
    temperature: number;
    humidity: number;
    precipitation: number;
    wind_speed: number;
  };
  units: {
    temperature: string;
    humidity: string;
    precipitation: string;
    wind_speed: string;
  };
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`http://localhost:8000/api/weather/${city}`);
      
      if (!res.ok) {
        throw new Error("Cidade não encontrada ou erro no servidor");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError("Não foi possível buscar o clima. Verifique o nome da cidade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-800">Canac Clima</h1>
        <p className="text-gray-600 mt-2">Monitoramento climático para canaviais</p>
      </header>

      <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Digite a cidade (ex: Ribeirão Preto)"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 font-semibold"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-full max-w-md">
          {error}
        </div>
      )}
      {weather && (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="bg-green-50 p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">{weather.city}</h2>
            <p className="text-gray-500">{weather.region}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
              <span className="block text-3xl font-bold text-orange-600">
                {weather.data.temperature}{weather.units.temperature}
              </span>
              <span className="text-sm text-gray-600 font-medium">Temperatura</span>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
              <span className="block text-3xl font-bold text-blue-600">
                {weather.data.precipitation}{weather.units.precipitation}
              </span>
              <span className="text-sm text-gray-600 font-medium">Precipitação</span>
            </div>


            <div className="text-center p-4 bg-cyan-50 rounded-lg border border-cyan-100">
              <span className="block text-3xl font-bold text-cyan-600">
                {weather.data.humidity}{weather.units.humidity}
              </span>
              <span className="text-sm text-gray-600 font-medium">Umidade</span>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="block text-3xl font-bold text-gray-600">
                {weather.data.wind_speed} <span className="text-lg">{weather.units.wind_speed}</span>
              </span>
              <span className="text-sm text-gray-600 font-medium">Vento</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}