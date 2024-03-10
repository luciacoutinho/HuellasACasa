import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GoogleMapComponent from "../../microcomponents/GoogleMaps";
import axios from "axios";
import Swal from "sweetalert2";

function MascotaDetailsPage() {
  const [mascota, setMascota] = useState({});
  const { idMascota } = useParams();

  useEffect(() => {
    fetch(`https://tesis-react-backend.vercel.app/api/mascotas/${idMascota}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setMascota(data);
        }
      });
  }, [idMascota]);

  // Función para renderizar el mapa con las coordenadas de la mascota
  const renderizarMapa = () => {
    if (mascota?.ubicacion) {
      return <GoogleMapComponent coordenadas={mascota?.ubicacion} />;
    } else {
      return <p>Ubicación no disponible</p>;
    }
  };

  //Funcion sendmail para enviar un mail al usuario que encontro/perdio la mascota
  const sendmail = () => {
    Swal.fire({
      titleText: `Informar que viste a ${mascota.nombre}`,
      text: "Escribí en esta casilla tu mensaje y le enviaremos al usuario un correo",
      // icon: "info",
      input: "textarea",
      inputLabel: "¡No olvides incluir tus datos de contacto!",
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,

      cancelButtonText: "Cancelar",

      confirmButtonText: "Enviar",
    }).then(async (response) => {
      if (response.isConfirmed) {
        try {
          const { data, status } = await axios.post(
            `https://tesis-react-backend.vercel.app/api/mascotas/enviarmail`,
            { mascota, mensaje: response.value },
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
          if (status === 201) {
            Swal.fire({
              titleText: data.message,
              text: "Ya enviamos tu mensaje al usuario. Muchas gracias",
              icon: "success",
            });
          } else {
            Swal.fire({
              titleText: "Ups!",
              text: `Ha ocurrido un error! Puede que el usuario no tenga un mail para notificar, o su mail estaba incorrecto 
              (${data.message}). Trata de comunicarte por otras vias (como WhatsApp o número de celular)`,
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <section className="container detalle-perrito px-lg-5 mx-lg-5 pt-0">
      <div id="detalle-perdidos_body px-lg-5 mx-lg-5" className="container">
        <div className="row">
          <div className="col-12 pb-3">
            <Link
              to={`/mascotas/${mascota?.categoria?.toLowerCase()}s`}
              className="naranja volver text-white"
            >
              <i className="bi bi-arrow-left"></i>Volver al listado de mascotas{" "}
              {mascota?.categoria?.toLowerCase().slice(0, -1) + "as"}
            </Link>
          </div>
          <div className="col-xs-6 col-md-6 col-lg-7">
            <img src={mascota?.imagen} className="w-100" alt="Perro perdido" />

            {mascota?.whatsapp && (
              <div className="w-100 btn btn-naranja text-white py-2 my-2">
                <Link
                  to={`https://wa.me/${
                    mascota?.whatsapp
                  }?text=Hola!%20Tengo%20información%20sobre%20tu%20${mascota?.especie?.toLowerCase()}%20${mascota?.categoria?.toLowerCase()}%20${
                    mascota?.nombre
                  }`}
                  target="_blank"
                  className="text-white"
                >
                  <i className="bi bi-whatsapp"></i> Tengo Información sobre{" "}
                  {mascota?.nombre ? mascota.nombre : "la mascota"}
                </Link>
              </div>
            )}
            {mascota?.email && (
              <div
                className="w-100 btn btn-naranja text-white py-2 my-2"
                onClick={sendmail}
              >
                <>
                  <i className="bi bi-envelope px-1"></i>
                  Avisar que ví a{" "}
                  {mascota?.nombre ? mascota.nombre : "la mascota"}
                </>
              </div>
            )}
          </div>

          <div className="col-xs-6 col-md-6 col-lg-5">
            <div className="info-detalle-perrito">
              <h2 className="mt-1">
                Información del{" "}
                <span className="naranja">
                  {" "}
                  {mascota?.especie?.toLowerCase()}{" "}
                  {mascota?.categoria?.toLowerCase()}
                </span>
              </h2>
              <ul className="ml-0">
                {mascota?.nombre && (
                  <li>
                    <strong>Nombre</strong>: {mascota.nombre}
                  </li>
                )}
                <li>
                  <strong>Sexo</strong>: {mascota?.sexo}
                </li>
                <li>
                  <strong>Tamaño</strong>: {mascota?.tamano}
                </li>
                {mascota?.color && (
                  <li>
                    <strong>Color</strong>: {mascota.color}
                  </li>
                )}
                {mascota?.raza && (
                  <li>
                    <strong>Raza</strong>: {mascota.raza}
                  </li>
                )}
                {mascota?.edad && (
                  <li>
                    <strong>Edad</strong>: {mascota.edad}
                  </li>
                )}
                {mascota?.collar && (
                  <li>
                    <strong>Collar</strong>: {mascota.collar}
                  </li>
                )}

                <li>
                  <strong>Fecha en la que se perdió</strong>: {mascota?.fecha}
                </li>

                <li>
                  <strong>Provincia</strong>: {mascota?.provincia}
                </li>
                <li>
                  <strong>Localidad</strong>: {mascota?.municipio}
                </li>
                {mascota?.zona_perdida && (
                  <li>
                    <strong>Zona donde se perdió</strong>:{" "}
                    {mascota.zona_perdida}
                  </li>
                )}

                {mascota?.descripcion && (
                  <li>
                    <strong>Descripción</strong>: {mascota.descripcion}
                  </li>
                )}
                <li>
                  <strong>Celular de contacto</strong>: {mascota?.celular}
                </li>
                {mascota?.whatsapp && (
                  <li>
                    <strong>WhatsApp de contacto</strong>: {mascota?.whatsapp}
                  </li>
                )}
                {mascota?.mail && (
                  <li>
                    <strong>Mail de contacto</strong>: {mascota?.mail}
                  </li>
                )}
              </ul>
            </div>
            <div className="info-detalle-perrito">
              <h2 className="mt-1">
                Ubicación del{" "}
                <span className="naranja">
                  {" "}
                  {mascota?.especie?.toLowerCase()}{" "}
                  {mascota?.categoria?.toLowerCase()}
                </span>
              </h2>
              <div className="embed-responsive embed-responsive-1by1">
                {renderizarMapa()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MascotaDetailsPage;
