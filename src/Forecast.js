import "./Style.css";
import { useNavigate } from "react-router-dom";

export default function Forecast({ info, ville, Q }) {
  const navigate = useNavigate();

  function back() {
    localStorage.removeItem("ville");
    navigate("/");
  }

  function navigateToCity() {
    navigate(`/CityInfo/${encodeURIComponent(ville)}/${Q}`);
  }

  return (
    <div className="forecast-container">
      <button className="changer-ville" onClick={back} style={{marginBottom:'10px'}}>
        Changer la ville
      </button>

      {Q && (
        <button className="more-info-btn" onClick={navigateToCity}>
          Plus d'informations sur {ville}
        </button>
      )}

      <div className="cards-wrapper">
        {info.list
          .filter((item, index) => index % 8 === 0)
          .map((item, id) => (
            <div className="forecast-card" key={id}>
              <div className="left-section">
                <h1 className="temp-max">{Math.round(item.main.temp_max)}°</h1>
                <h2 className="temp-min">{Math.round(item.main.temp_min)}°</h2>
              </div>

              <div className="middle-section">
                <h4 className="wind">{item.wind.speed} km/h</h4>
                <h5 className="r">{item.rain?.["3h"] ?? 0} mm</h5>
              </div>

              <div className="right-section">
                <div className="day-name">
                  {new Date(item.dt_txt).toLocaleDateString("fr-FR", {
                    weekday: "long",
                  })}
                </div>

                <div className="icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
