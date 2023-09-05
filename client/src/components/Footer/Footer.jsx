import React from "react";
import "../Footer/Footer.css";
import Git from "../../img/logotipo-de-github.png";
import Lin from "../../img/linkedin.png";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        {/* <img className="Logooo" src={logoOriginal1} alt="" /> */}

        <div>

        <div className="contenedores">
          <h2 className="titulo2">Created by Benjamin Bidondo </h2>
        </div>
          <a href="https://www.linkedin.com/in/benjamin-bidondo-lacassy-a5a089231/">
            <img className="Lin" src={Lin}  alt="" />
          </a>

          <a href="https://github.com/BBidondo">
            <img className="Git" src={Git} alt="" />
          </a>
        </div>

        
      </footer>
    );
  }
}

export default Footer;
