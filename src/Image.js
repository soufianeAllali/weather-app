import { useParams, useNavigate } from "react-router-dom";
import "./Style.css";


export default function ImagePage() {
  const { url } = useParams();
  const navigate = useNavigate();
  const realUrl = decodeURIComponent(url);

  function back() {
    navigate(-1);
  }

  return (
    <div className="image-page-container">
      <button className="back-btn" onClick={back}>
        Retour
      </button>

      <div className="image-frame">
        <img src={realUrl} className="natural-image" alt="City" />
      </div>
    </div>
  );
}
