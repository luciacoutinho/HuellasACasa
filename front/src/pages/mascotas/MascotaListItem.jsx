import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MascotaListItem.css";
import { useContext } from "react";
import { UserContext } from "../user/UserContext";

("C:/Users/lucia/Documents/Diseño Web/4to Cuatrimestre/Proyecto Final/Huellas a Casa- App programación/Desarrollo/Tesis 1_8");

function MascotaListItem({ mascota }) {
  const { userData } = useContext(UserContext);
  return (
    <div className="col-xl-3 col-md-4 col-6 align-items-stretch px-2 px-md-3 px-xl-2 mb-4 item">
      <Link to={`/mascotas/${mascota._id}`} className="mascota-view">
        <div className="card-perro">
          {mascota.aparecio && (
            <div className="encontrado-label">Encontrado</div>
          )}
          <div
            className={`contenido-card ${
              mascota.aparecio ? "aparecio-true" : ""
            }`}
          >
            <img src={mascota.imagen} className="img-fluid rounded-img" />
            <div className="card-perro-content pb-3 pt-2">
              <div className="div-ubicacion d-flex justify-content-around align-items-center">
                <p className="pt-0 pb-1">
                  <i class="bi bi-geo-alt-fill"></i>
                  {mascota.municipio}
                </p>
              </div>

              <span className="py-1" style={{ whiteSpace: "pre" }}>
                {mascota.raza || " "}
              </span>
              <h3>{mascota.nombre}</h3>
              {userData && userData._id && userData._id == mascota.account ? (
                <div className="botones row">
                  <div className="col-6 p-1">
                    <Link
                      to={`/mascotas/${mascota.categoria}s/editar/${mascota._id}`}
                    >
                      <button className="btn btn-azul btn-block w-100 px-0 px-lg-1">
                        <span className="d-none d-md-block">Editar</span>{" "}
                        <i className="bi bi-pencil-fill d-md-none"></i>
                      </button>
                    </Link>
                  </div>
                  <div className="col-6 p-1">
                    <Link
                      to={`/mascotas/${mascota.categoria}s/eliminar/${mascota._id}`}
                    >
                      <button className="btn btn-naranja btn-block w-100 px-0 px-lg-1">
                        <span className="d-none d-md-block">Eliminar</span>{" "}
                        <i className="bi bi-trash-fill d-md-none"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

MascotaListItem.propTypes = {
  mascota: PropTypes.object.isRequired,
  account: PropTypes.string,
};

export default MascotaListItem;
