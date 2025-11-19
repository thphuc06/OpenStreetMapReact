// WeatherCard Component

import React from 'react';
import { WeatherService } from '../services/weather.service';
import { WEATHER_ICONS } from '../constants/weather.constants';
import type { WeatherResponse, WeatherForecastType, WeatherOverview } from '../types/weather.types';
import {
  weatherContainerStyle,
  weatherHeaderStyle,
  weatherTitleStyle,
  weatherCloseButtonStyle,
  forecastTypeButtonsStyle,
  forecastTypeButtonStyle,
  forecastTypeButtonActiveStyle,
  currentWeatherStyle,
  weatherIconLargeStyle,
  currentTempStyle,
  weatherDescriptionStyle,
  weatherDetailsStyle,
  weatherDetailItemStyle,
  dailyForecastStyle,
  dailyCardStyle,
  hourlyForecastStyle,
  hourlyCardStyle,
} from '../styles/weather.styles';

interface WeatherCardProps {
  weatherData: WeatherResponse;
  weatherOverview: WeatherOverview | null;
  onClose: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, weatherOverview, onClose }) => {
  const [forecastType, setForecastType] = React.useState<WeatherForecastType>('overview');

  const { current, daily, hourly } = weatherData;

  const renderOverview = () => (
    <div>
      {weatherOverview ? (
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          borderRadius: '12px',
          lineHeight: '1.8',
        }}>
          <div style={{
            fontSize: '14px',
            color: '#2d3748',
            fontWeight: '500',
            marginBottom: '12px',
          }}>
            📅 {weatherOverview.date}
          </div>
          <div style={{
            fontSize: '15px',
            color: '#1a202c',
            whiteSpace: 'pre-line',
          }}>
            {weatherOverview.weather_overview}
          </div>
        </div>
      ) : (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: '#718096',
        }}>
          Đang tải tổng quan thời tiết...
        </div>
      )}
    </div>
  );

  const renderCurrent = () => (
    <div>
      <div style={currentWeatherStyle}>
        <div style={weatherIconLargeStyle}>
          {WEATHER_ICONS[current.weather[0].icon] || '🌤️'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={currentTempStyle}>
            {WeatherService.formatTemp(current.temp)}
          </div>
          <div style={weatherDescriptionStyle}>
            {current.weather[0].description}
          </div>
        </div>
      </div>
      <div style={weatherDetailsStyle}>
        <div style={weatherDetailItemStyle}>
          <strong>Cảm giác</strong>
          <span>{WeatherService.formatTemp(current.feels_like)}</span>
        </div>
        <div style={weatherDetailItemStyle}>
          <strong>Độ ẩm</strong>
          <span>{current.humidity}%</span>
        </div>
        <div style={weatherDetailItemStyle}>
          <strong>Gió</strong>
          <span>{current.wind_speed} m/s</span>
        </div>
        <div style={weatherDetailItemStyle}>
          <strong>Mây</strong>
          <span>{current.clouds}%</span>
        </div>
        <div style={weatherDetailItemStyle}>
          <strong>Áp suất</strong>
          <span>{current.pressure} hPa</span>
        </div>
      </div>
    </div>
  );

  const renderDaily = () => (
    <div style={dailyForecastStyle}>
      {daily.slice(0, 7).map((day, index) => (
        <div key={day.dt} style={dailyCardStyle}>
          <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '13px' }}>
            {index === 0 ? 'Hôm nay' : WeatherService.formatDate(day.dt)}
          </div>
          <div style={{ fontSize: '32px', margin: '8px 0' }}>
            {WEATHER_ICONS[day.weather[0].icon] || '🌤️'}
          </div>
          <div style={{ fontWeight: '700', color: '#2d3748', fontSize: '14px' }}>
            {WeatherService.formatTemp(day.temp.max)}
          </div>
          <div style={{ fontSize: '12px', color: '#718096' }}>
            {WeatherService.formatTemp(day.temp.min)}
          </div>
          <div style={{ fontSize: '11px', color: '#a0aec0', marginTop: '4px' }}>
            {day.weather[0].description}
          </div>
          {day.pop > 0 && (
            <div style={{ fontSize: '11px', color: '#4299e1', marginTop: '4px' }}>
              Mưa: {Math.round(day.pop * 100)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderHourly = () => (
    <div style={hourlyForecastStyle}>
      {hourly.slice(0, 24).map((hour) => (
        <div key={hour.dt} style={hourlyCardStyle}>
          <div style={{ fontWeight: '600', marginBottom: '6px' }}>
            {WeatherService.formatTime(hour.dt)}
          </div>
          <div style={{ fontSize: '28px', margin: '6px 0' }}>
            {WEATHER_ICONS[hour.weather[0].icon] || '🌤️'}
          </div>
          <div style={{ fontWeight: '700', color: '#2d3748' }}>
            {WeatherService.formatTemp(hour.temp)}
          </div>
          {hour.pop > 0 && (
            <div style={{ fontSize: '10px', color: '#4299e1', marginTop: '4px' }}>
              {Math.round(hour.pop * 100)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={weatherContainerStyle}>
      <div style={weatherHeaderStyle}>
        <h3 style={weatherTitleStyle}>Dự báo thời tiết</h3>
        <button
          onClick={onClose}
          style={weatherCloseButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ×
        </button>
      </div>

      <div style={forecastTypeButtonsStyle}>
        {(['overview', 'current', 'hourly', 'daily'] as WeatherForecastType[]).map((type) => (
          <button
            key={type}
            onClick={() => setForecastType(type)}
            style={forecastType === type ? forecastTypeButtonActiveStyle : forecastTypeButtonStyle}
          >
            {type === 'overview' && 'Tổng quan'}
            {type === 'current' && 'Hiện tại'}
            {type === 'hourly' && 'Theo giờ'}
            {type === 'daily' && 'Theo ngày'}
          </button>
        ))}
      </div>

      {forecastType === 'overview' && renderOverview()}
      {forecastType === 'current' && renderCurrent()}
      {forecastType === 'hourly' && renderHourly()}
      {forecastType === 'daily' && renderDaily()}
    </div>
  );
};
