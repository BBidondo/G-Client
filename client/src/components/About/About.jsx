import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import "./about.css";
import fuego from "../../img/fuego.png";
import linkedinMorado from "../../img/linkedinMorado.png";


const team = [
  {
    id: 1,
    name: "About me ",
    description:
      " I am committed to the continuous growth and development of my career as a programmer, and I focus on staying updated with the latest trends and technologies. My long-term goal is to become a highly experienced developer and be able to lead challenging projects. ",
    image: "https://i.ibb.co/RDhnhjk/asdsasdasdasda.jpg",
    linkedin: "https://www.linkedin.com/in/benjamin-bidondo-lacassy-a5a089231/",
    github: "https://github.com/BBidondo",
  },
];

export default function About() {
  return (
    <div>
      <NavBar />
      <div className="All">
        

      <div >
      {/* <img src={fuego} className="fotoback" /> */}

        
        <p className="parrafo1">
        <h2>The Project</h2>
         " I utilized React, Redux, HTML, CSS, SQL, and JavaScript to develop a
          high-quality application. Working with these technologies was
          challenging and rewarding, and they played a critical role in creating
          a seamless user interface and supporting data management needs.
          Overall, my experience was positive and allowed me to leverage my
          skills to create a product that met stakeholder expectations. "
        </p>
        
      </div>

      <div className="segundoDiv">
        {team.map((el) => {
          return (
            <div className="tarjetaPadre">
              <div className="yo">
                <div className="divFoto">
                <h1 className="nombre">{el.name}</h1>
                  <img src={el.image} className="foto" />
                </div>

                <div>
                  <div>
                    
                    
                    <p className="descripcion1">{el.description}</p>
                    
                  </div>
                   
                </div>
              </div>
            </div>
            
          );
        })}
      </div>
      
      </div>
      
      <Footer />
    </div>
  );
}
