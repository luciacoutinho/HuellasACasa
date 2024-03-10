// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CreadoConExito({ especie, categoria }) {
  return (
    <div className="exito row justify-content-center py-3 mb-5 p-md-5">
      <div className="titulo-seccion text-center d-md-flex justify-content-between align-items-center">
        <div className="col-md-5 col-lg-3 text-center text-md-left">
          <div className="check">
            <i className="bi bi-check-circle"></i>
          </div>
        </div>
        <div className="col-md-7 col-lg-8 mascota-exito">
          <h3>
            Tu {especie.toLowerCase()} {categoria.toLowerCase()} fue cargado con
            éxito{" "}
          </h3>
          {categoria === "Perdido" ? (
            <p>¡Esperamos que aparezca pronto!</p>
          ) : (
            <p>¡Esperamos que encuentres a sus dueños pronto!</p>
          )}
          <Link
            className="btn btn-naranja w-100 mt-4"
            to={`../mascotas/${categoria}s`}
          >
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreadoConExito;

CreadoConExito.propTypes = {
  especie: PropTypes.string.isRequired,
  categoria: PropTypes.string.isRequired,
};
