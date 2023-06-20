import { Link } from "react-router-dom";
import "./landing.css";
import image from "../../img/logole.png";

export default function Landing() {
  return (
    <div className="background">
      <Link to="/videogames">
        <img className="myButton" src={image} alt="" />
      </Link>
      <h3 className="Title">Welcome,</h3>
      <h3 className="Title4">Gamer</h3>
    </div>
  );
}
