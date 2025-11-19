// OpenWeather API Configuration

export const WEATHER_CONFIG = {
  API_KEY: '02f8afa5528849bfcf1baa81ae56a3dc',
  BASE_URL: 'https://api.openweathermap.org/data/3.0/onecall',
  ICON_URL: 'https://openweathermap.org/img/wn/',
  UNITS: 'metric', // Celsius
  LANGUAGE: 'vi',
} as const;

// Weather icon mapping for better display
export const WEATHER_ICONS: Record<string, string> = {
  '01d': '☀️',  // clear sky day
  '01n': '🌙',  // clear sky night
  '02d': '⛅',  // few clouds day
  '02n': '☁️',  // few clouds night
  '03d': '☁️',  // scattered clouds
  '03n': '☁️',
  '04d': '☁️',  // broken clouds
  '04n': '☁️',
  '09d': '🌧️',  // shower rain
  '09n': '🌧️',
  '10d': '🌦️',  // rain day
  '10n': '🌧️',  // rain night
  '11d': '⛈️',  // thunderstorm
  '11n': '⛈️',
  '13d': '❄️',  // snow
  '13n': '❄️',
  '50d': '🌫️',  // mist
  '50n': '🌫️',
};
