import "./Style.css";
import { useNavigate } from "react-router-dom";
import AIWeatherTips from "./AIWeather";

export default function Meteo_aujourdhui({ info, ville = "", Q = "", w }) {
  const navigate = useNavigate();
  function back() {
    localStorage.removeItem("ville");
    navigate("/");
    document.body.className = "";
    document.body.classList.add("body");
  }

  function navigatetocity() {
    navigate(`/CityInfo/${encodeURIComponent(ville)}/${Q}`);
  }

  return (
    <div className="parent_metoe">
      <div className={`activity-suggestion ${w}1`}>
        <AIWeatherTips weatherData={info} />
      </div>

      <div className="weather_parent">
        <div className="weather-card">
          {ville && Q && (
            <button className="more-info-btn" onClick={navigatetocity}>
              Plus d'informations sur {ville}
            </button>
          )}
          <div className="city-header">
            <span>{info.name}</span>
            <span className="date-text">
              {new Date().toLocaleDateString("fr-FR")}
            </span>
          </div>

          <div className="weather-body">
            <div className="big-icon">
              <img
                src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>

            <div className="temp-section">
              <h1>{info.main.temp}°</h1>
              <p>{info.weather[0].description}</p>
            </div>
          </div>

          <div className="extra-info">
            <span>Humidite : {info.main.humidity}%</span>
            <span>Pression : {info.main.pressure} hPa</span>
          </div>
          <button className="changer-ville" onClick={back}>
            Changer la ville
          </button>
        </div>
      </div>
    </div>
  );
}
