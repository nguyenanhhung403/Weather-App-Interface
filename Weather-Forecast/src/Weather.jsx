import React, { useState, useEffect } from "react";
import { Sun, Cloud, CloudRain, Wind, Droplet, Thermometer } from "lucide-react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Ha Noi");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("current");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    try {
      const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;
      const currentResponse = await fetch(currentUrl);
      if (!currentResponse.ok) throw new Error("Không tìm thấy thành phố hoặc có lỗi khi lấy dữ liệu");
      const currentData = await currentResponse.json();
      setWeatherData(currentData);

      const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=5&aqi=no&alerts=no`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) throw new Error("Lỗi khi lấy dữ liệu dự báo");
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setCity(searchQuery);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", { weekday: "short", day: "numeric", month: "numeric" });
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return <Sun size={40} />;
    const text = condition.text.toLowerCase();
    
    if (text.includes("rain") || text.includes("drizzle") || text.includes("mưa")) {
      return <CloudRain size={40} className="text-blue-400" />;
    } else if (text.includes("cloud") || text.includes("overcast") || text.includes("mây")) {
      return <Cloud size={40} className="text-gray-400" />;
    } else if (text.includes("sun") || text.includes("clear") || text.includes("nắng")) {
      return <Sun size={40} className="text-yellow-400" />;
    } else {
      return <Cloud size={40} />;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-4 md:p-8">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        <h1 className="text-2xl font-bold mb-6 text-center">Dự Báo Thời Tiết</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 p-4 rounded-2xl bg-white/20 text-white placeholder-white/70 outline-none border border-white/30 focus:border-white/50 transition"
            placeholder="Nhập tên thành phố..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 rounded-2xl text-white font-semibold hover:opacity-90 transition shadow-lg"
          >
            Tìm
          </button>
        </form>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/30 border border-red-500/50 rounded-xl p-4 text-center mb-6">
            <p className="text-lg">{error}</p>
          </div>
        )}
        
        {weatherData && !loading && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold">{weatherData.location.name}</h2>
              <p className="text-lg text-white/80">{weatherData.location.country}</p>
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
              <button 
                className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === "current" ? "bg-white text-blue-800" : "bg-white/20 hover:bg-white/30"}`} 
                onClick={() => setActiveTab("current")}
              >
                Hiện tại
              </button>
              <button 
                className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === "forecast" ? "bg-white text-blue-800" : "bg-white/20 hover:bg-white/30"}`} 
                onClick={() => setActiveTab("forecast")}
              >
                Dự báo 5 ngày
              </button>
            </div>
            
            {activeTab === "current" && (
              <div className="bg-white/20 rounded-3xl p-6 mt-6">
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    {getWeatherIcon(weatherData.current.condition)}
                    <div className="ml-4">
                      <p className="text-4xl font-bold">{weatherData.current.temp_c}°C</p>
                      <p className="text-xl text-white/80">{weatherData.current.condition.text}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="flex items-center">
                      <Wind size={20} className="mr-2 text-blue-300" />
                      <div>
                        <p className="text-sm text-white/70">Gió</p>
                        <p className="font-medium">{weatherData.current.wind_kph} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Droplet size={20} className="mr-2 text-blue-300" />
                      <div>
                        <p className="text-sm text-white/70">Độ ẩm</p>
                        <p className="font-medium">{weatherData.current.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Thermometer size={20} className="mr-2 text-blue-300" />
                      <div>
                        <p className="text-sm text-white/70">Cảm giác như</p>
                        <p className="font-medium">{weatherData.current.feelslike_c}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Sun size={20} className="mr-2 text-blue-300" />
                      <div>
                        <p className="text-sm text-white/70">UV</p>
                        <p className="font-medium">{weatherData.current.uv}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "forecast" && forecastData && (
              <div className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {forecastData.forecast.forecastday.map((day, index) => (
                    <div key={index} className="bg-white/20 rounded-2xl p-4 text-center hover:bg-white/30 transition">
                      <p className="font-semibold">{formatDate(day.date)}</p>
                      <div className="flex justify-center my-2">
                        {getWeatherIcon(day.day.condition)}
                      </div>
                      <p className="text-lg font-bold">{day.day.avgtemp_c}°C</p>
                      <p className="text-sm text-white/80 mt-1">{day.day.condition.text}</p>
                      <div className="flex justify-between mt-2 text-xs text-white/70">
                        <span>Min: {day.day.mintemp_c}°</span>
                        <span>Max: {day.day.maxtemp_c}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-6 text-white/50 text-sm">Dữ liệu cung cấp bởi WeatherAPI.com</p>
    </div>
  );
};

export default Weather;