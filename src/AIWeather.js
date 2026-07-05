import { useState, useEffect } from "react";
import axios from "axios";

export default function AIWeatherTips({ weatherData }) {
  const [tips, setTips] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!weatherData) return;

    async function getTips() {
      setLoading(true);
      setTips("");

      const aiPrompt = `
Voici les donnees meteo actuelles pour aujourd'hui:
Ville: ${weatherData.name || "inconnue"}
Temperature: ${weatherData.main.temp || "N/A"}°C
Condition: ${weatherData.weather?.[0]?.description || "N/A"}
Humidite: ${weatherData.main.humidity || "N/A"}%
Vent: ${weatherData.wind?.speed || "N/A"} km/h
status ${weatherData.weather[0].main}
Genere 3 conseils pratiques et utiles pour cette meteo aujourd'hui. Reponds de maniere concise et claire.
`;

      try {
        const { data } = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content:
                  "Vous etes un assistant meteo intelligent. Fournissez des conseils pratiques bases sur les donnees meteo actuelles.",
              },
              { role: "user", content: aiPrompt },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
          }
        );

        setTips(
          data.choices?.[0]?.message?.content ||
            "Pas de conseils disponibles pour le moment."
        );
      } catch (error) {
        console.error("Error:", error);
        setTips("Une erreur est survenue lors de la connexion a l'IA.");
      }

      setLoading(false);
    }

    getTips();
  }, [weatherData]);

  return (
    <div className="ai">
      {loading && <p>Chargement des conseils...</p>}
      {tips && (
        <>
          <strong>Conseils et recommandations :</strong>
          <p style={{paddingTop:'20px'}}>{tips}</p>
        </>
      )}
    </div>
  );
}
