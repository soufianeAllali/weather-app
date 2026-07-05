import axios from "axios";
import { useState, useEffect } from "react";
import "./Style.css";
import { useParams, useNavigate } from "react-router-dom";

export default function CityInfo() {
  const [infowikipedia, setInfowikipedia] = useState(null);
  const [images, setImages] = useState([]);
  const [infowikidata, setInfowikidata] = useState(null);
  const [err, setErr] = useState("");
  const { ville, Q } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add("bodywhite");

    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages|categories|links|info|images|coordinates|pageprops|revisions&explaintext=1&piprop=original&redirects=1&titles=${ville}&origin=*`
      )
      .then((r) => setInfowikipedia(r.data))
      .catch((e) => {
        if (!e.response) setErr("Erreur reseau ou probleme de connexion");
        else if (e.response.status === 404) setErr("Ville introuvable");
        else setErr("Probleme API");
      });

    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${ville}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      )
      .then((r) => setImages(r.data.results))
      .catch((e) => {
        if (!e.response) setErr("Erreur reseau ou probleme de connexion");
        else if (e.response.status === 404) setErr("Ville introuvable");
        else setErr("Probleme API");
      });

    axios
      .get(
        `https://www.wikidata.org/wiki/Special:EntityData/${Q}.json?origin=*`
      )
      .then((r) => setInfowikidata(r.data))
      .catch((e) => {
        if (!e.response) setErr("Erreur reseau ou probleme de connexion");
        else if (e.response.status === 404) setErr("Ville introuvable");
        else setErr("Probleme API");
      });
  }, [ville, Q]);

  function image(e) {
    navigate(`/Image/${encodeURIComponent(e.target.src)}`);
  }

  function back() {
    navigate(-1);
  }

  if (err) {
    return <h1 className="error-message">{err}</h1>;
  } else if (infowikidata && infowikipedia) {
    const page =
      infowikipedia.query.pages[Object.keys(infowikipedia.query.pages)[0]];

    const population =
      infowikidata.entities[Q]?.claims?.P1082?.[0]?.mainsnak?.datavalue?.value
        ?.amount || "Indisponibles";

    const area =
      infowikidata.entities[Q]?.claims?.P2046?.[0]?.mainsnak?.datavalue?.value
        ?.amount || "Indisponibles";

    const description = page?.extract || "Indisponibles";

    return (
      <div className="city-container">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Population {ville} :</h3>
            <p className="stat-value">{population}</p>
          </div>

          <div className="stat-card">
            <h3>Superficie :</h3>
            <p className="stat-value">
              {area !== "Indisponibles" ? `${area} km²` : area}
            </p>
          </div>
        </div>
        <button className="back-btn" onClick={back}>
          Retour
        </button>

        <h2 className="images-title">Images :</h2>
        <div className="images-grid">
          {images.length > 0 ? (
            images.map((img) => (
              <div className="image-card" key={img.id}>
                <img
                  src={img.urls.small}
                  alt={img.alt_description || "Image de la ville"}
                  className="image-item"
                  onClick={image}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))
          ) : (
            <p>Aucune image disponible pour cette ville.</p>
          )}
        </div>

        <div className="city-description">
          <h2>Description</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement des donnees...</p>
      </div>
    );
  }
}
