<template>
  <div class="container">
    <h1>WEATHER APP</h1>
    <div class="search-bar">
      <input 
        type="text" 
        v-model="city" 
        placeholder="Enter city name, e.g., Clayton, AU" 
      />
      <button @click="searchByCity">Search</button>
    </div>

    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <p>{{ weatherData.weather[0].description }}</p>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "5f31f2288e4cd7238c51f8f1290e083c"; 

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
    };
  },
  computed: {

    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },

    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
  
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    

    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch weather data. Please check your API key or city name.");
      }
    },


    async searchByCity() {
      if (!this.city) return;
      // 根据用户输入的 city 拼接 API 请求链接
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
      await this.fetchWeatherData(url);
    }
  }
};
</script>

<style scoped>

.container {
  text-align: center;
  margin-top: 2rem;
}
.search-bar {
  margin-bottom: 2rem;
}
input {
  padding: 5px;
  margin-right: 10px;
}
</style>