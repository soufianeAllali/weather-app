import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";


export default function Form({ err = "" }) {
  const [ville, setVille] = useState("");
  const [check, setCheck] = useState("");
  const [eror, setErr] = useState(err);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add("body");
  }, []);

  useEffect(() => {
    const savedCity = localStorage.getItem("ville");
    if (savedCity) {
      navigate(`/weather/${encodeURIComponent(savedCity)}`);
    }
  }, [navigate]);

  useEffect(() => {
    const click = () => setErr("");
    document.body.addEventListener("click", click);
    return () => {
      document.body.removeEventListener("click", click);
    };
  }, []);

  function Weather(e) {
    e.preventDefault();
    if (navigator.onLine) {
      if (!ville.trim()) {
        setCheck("Ville?");
        setTimeout(() => setCheck(""), 2000);
      } else {
        const city = ville.trim();
        localStorage.setItem("ville", city);
        setCheck("");
        navigate(`/weather/${encodeURIComponent(city)}`);
      }
    } else {
      setErr("Erreur reseau ou probleme de connexion");
    }
  }

  function Forecast() {
    if (navigator.onLine) {
      if (!ville.trim()) {
        setCheck("Ville?");
        setTimeout(() => setCheck(""), 2000);
      } else {
        const city = ville.trim();
        localStorage.setItem("ville", city);
        setCheck("");
        navigate(`/forecast/${encodeURIComponent(city)}`);
      }
    } else {
      setErr("Erreur reseau ou probleme de connexion");
    }
  }
  function Location() {
    if (navigator.onLine) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          navigate(
            `/weather/${position.coords.latitude}/${position.coords.longitude}`
          );
        },
        (erreur) => {
          setErr(erreur.message);
        }
      );
    } else {
      setErr("Erreur reseau ou probleme de connexion");
    }
  }
  function Map() {
    if (navigator.onLine) {
      navigate("/WeatherMap");
    } else {
      setErr("Erreur reseau ou probleme de connexion");
    }
  }
  return (
    <>
      <form
        onSubmit={Weather}
        style={{ opacity: eror ? "0.2" : "1" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>
          Rechercher la meteo d'une ville <span aria-hidden="true">☁</span>
          <input
            type="button"
            onClick={Location}
            className="b3"
            style={{ marginTop: "10px" }}
          />
          <input
            type="button"
            onClick={Map}
            className="b4"
            style={{ marginTop: "10px" }}
          />
        </h1>
        <input
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Entrez le nom de la ville"
          className="v"
        />
        <input
          type="submit"
          value="Afficher la meteo d'aujourd'hui"
          className="b"
        />
        <input
          type="button"
          onClick={Forecast}
          value="Previsions des prochains jours"
          className="b2"
          style={{ marginTop: "10px" }}
        />
      </form>
      <h1 className="h1">{check}</h1>
      {eror && <h1 className="h1 msg">{eror}</h1>}
    </>
  );
}

