import { SendEmailMascota } from "../../services/mail.services.js";
import * as service from "../../services/mascotas.services.js";
import fs from "fs";

function getMascotas(req, res) {
  const filter = req.query;

  service.getMascotas(filter).then(function (mascotas) {
    res.status(200).json(mascotas);
  });
}

function getMascotaById(req, res) {
  const idMascota = req.params.idMascota;

  service.getMascotaById(idMascota).then(function (mascota) {
    if (mascota) {
      res.status(200).json(mascota);
    } else {
      res.status(404).json({
        error: { message: `No se encuentra la mascota #${idMascota}` },
      });
    }
  });
}

function getImagenMascota(req, res) {
  const nombreImagen = req.params.imagen;
  fs.exists("./public/" + nombreImagen, (existe) => {
    if (!existe) {
      res.status(500).json({
        message: "No existe la imgen",
      });
    } else {
      fs.readFile("./public/" + nombreImagen, (err, content) => {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.write(content);
      });
    }
  });
}

function createMascota(req, res) {
  try {
    // Reemplazar las diagonales invertidas dobles por diagonales normales en la ruta de la imagen
    //const imagenPath = req.file.path.replace(/\\/g, "/");

    service
      .createMascota(req.body, req.account._id)
      .then(async function (mascota) {
        const coincidencias = await service.findMatchingMascotas(mascota);
        return res.status(201).json({ mascota, coincidencias });
      })
      .catch(function (error) {
        return res.status(500).json({ error: error.message });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

function editMascota(req, res) {
  const idMascota = req.params.idMascota;

  service.editMascota(idMascota, req.body).then(function (mascota) {
    return res.status(200).json(mascota);
  });
}

function deleteMascota(req, res) {
  const idMascota = req.params.idMascota;

  service.deleteMascota(idMascota).then(function () {
    return res.status(200).json({ message: `Mascota #${idMascota} eliminada` });
  });
}

async function sendMascotaEmail(req, res) {
  const { mascota, mensaje } = req.body;
  try {
    const { rejected } = await SendEmailMascota(mascota, mensaje);
    if (rejected.length) return res.status(400).json({ message: rejected[0] });
    return res.status(201).json({ message: "¡Email enviado!" });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export {
  getMascotas,
  createMascota,
  getMascotaById,
  getImagenMascota,
  editMascota,
  deleteMascota,
  sendMascotaEmail,
};
