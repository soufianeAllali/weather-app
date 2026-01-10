import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Weather from "./Weather";
import WeatherMap from "./WeatherMap";
import CityInfo from "./CityInfo";
import Image from "./Image";


export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/weather/:ville" element={<Weather env="weather" />} />
          <Route path="/weather/:lat/:lon" element={<Weather env="weather" />}/>
          <Route path="/forecast/:ville" element={<Weather env="forecast" />} />
          <Route path="/WeatherMap" element={<WeatherMap />} />
          <Route path="/CityInfo/:ville/:Q" element={<CityInfo />} />
          <Route path="/Image/:url" element={<Image />} />
        </Routes>
      </Router>
  );
}
