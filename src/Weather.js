import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Meteo_aujourdhui from "./Meteo_aujourd'hui";
import Forecast from "./Forecast";
import Form from "./Form";
import {useNavigate} from 'react-router-dom';
import "./Style.css";

export default function Weather({ env }) {
  console.log(useParams);
  const { ville, lat, lon } = useParams();
  console.log(ville);
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [Qville, setQville] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    setInfo(null);
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/" + env,
      params: {
        lat: lat,
        lon: lon,
        q: ville,
        appid: `${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
        units: "metric",
        lang: "fr",
      },
    };

    axios
      .request(options)
      .then((reponse) => {

        setInfo(reponse.data);
        localStorage.setItem('info',reponse.data);
        setErr("");
        if (env === "weather") {
          document.body.className = "";
          document.body.classList.add(
            reponse.data.weather[0].main.toLowerCase()
          );
        } else {
          document.body.className = "";
          document.body.classList.add("body");
        }
      })
      .catch((e) => {
        setInfo(null);
        localStorage.removeItem("ville");
        if (!e.response) {
          setErr("Erreur reseau ou probleme de connexion ⚠");
        } else if (e.response.status == 404) {
          setErr("Ville introuvable ⚠");
        } else {
          setErr("Probleme API");
        }
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${ville}&language=fr&format=json&origin=*`
      )
      .then((r) => {
        setQville(r.data.search[0].id);
      })
      .catch((e) => {
        setInfo(null);
        localStorage.removeItem("ville");
        if (!e.response) {
          setErr("Erreur reseau ou probleme de connexion ⚠");
        } else if (e.response.status == 404) {
          setErr("Ville introuvable ⚠");
        } else {
          setErr("Probleme API");
        }
      })
  }, [ville, lat, lon, env]);

  if (loading) {
    return (
      <>
        <h2 className="chargement" style={{ textAlign: "center" }}>
          💭
        </h2>
        <p className="charge">Chargement des données...</p>
      </>
    );
  }

  if (env === "weather") {
    return (
      <>
        {(lat && info) && <Meteo_aujourdhui info={info} ville="" Q="" w={info.weather[0].main.toLowerCase()}/>}
        {(ville && info) && <Meteo_aujourdhui info={info} ville={ville} Q={Qville} w={info.weather[0].main.toLowerCase()}/>}
        {err &&  <Form err={err} />}
      </>
    );
  } else {
    return (
      <div className="parent">
        {info && <Forecast info={info} ville={ville} Q={Qville} />}
        {err && <Form err={err} />}
      </div>
    );
  }
}
