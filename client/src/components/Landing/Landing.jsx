import { Link } from "react-router-dom";
import "./landing.css";
import image from "../../img/logole.png";
// import kratos from "../../img/kratos shadow.png";
import fuego from "../../img/fuego.png";
import kratos from "../../img/kra1.png";
import kratos2 from "../../img/kra2.png";


export default function Landing() {
  return (
    <div className="background">
      
      
      <Link to="/videogames">
        <img className="myButton" src={image} alt="" />
      </Link>
      {/* <img className="fuego" src={fuego} /> */}
      {/* <div className="wrapper">
        <div  className="Back image"><img className="kratos2" src={kratos2} /> </div>
        <div className="Front image"><img className="kratos" src={kratos} /> </div>
      </div> */}
      <h3 className="Title">Welcome,</h3>
      <h3 className="Title4">Gamer</h3>
      <h3 className="Title5"></h3>
      
    </div>
  );
}

