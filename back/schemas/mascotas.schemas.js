import yup from "yup";

const mascota = yup.object({
  nombre: yup.string().optional(),
  sexo: yup
    .string()
    .oneOf(["Macho", "Hembra"])
    .required((msg) => "El campo de sexo es obligatorio"),
  especie: yup
    .string()
    .oneOf(["Perro", "Gato"])
    .required((msg) => "El campo de especie es obligatorio"),
  tamano: yup
    .string()
    .oneOf(["Chico", "Mediano", "Grande"])
    .required((msg) => "El campo de tamaño es obligatorio"),
  color: yup.string().optional(),
  imagen: yup
    .string()
    .required((msg) => "Deber subir una imagen de la mascota"),
  raza: yup.string().optional(),
  edad: yup.string().optional(),
  zona_perdida: yup.string().optional(),
  fecha: yup
    .date()
    .required("El campo de fecha es obligatorio")
    .max(new Date(), "No puedes ingresar una fecha posterior al día actual"),
  descripcion: yup.string().optional(),
  celular: yup
    .string()
    .required("El campo de celular es obligatorio")
    .matches(/^[0-9]+$/, "El campo de celular solo puede contener números")
    .length(10, "El campo de celular debe tener 10 dígitos"),
  whatsapp: yup
    .string()
    .optional()
    .matches(/^[0-9]*$/, "El campo de whatsapp solo puede contener números"),
  email: yup
    .string()
    .optional()
    .email("Debe ser una dirección de correo electrónico válida"),
  categoria: yup
    .string()
    .oneOf(["Perdido", "Encontrado"])
    .required((msg) => "El campo de categoria es obligatorio"),
  aparecio: yup.boolean().required().default(false),
  collar: yup
    .string()
    .oneOf([
      "Tiene collar con chapita",
      "Tiene collar sin chapita",
      "No tiene collar",
    ])
    .optional(),
  provincia: yup
    .string()
    .required((msg) => "El campo de provincia es obligatorio"),
  municipio: yup
    .string()
    .required((msg) => "El campo de municipio es obligatorio"),
  ubicacion: yup.object({
    lat: yup.string().optional(),
    lng: yup.string().optional(),
  }),
});
const editMascota = yup.object({
  nombre: yup.string().optional(),
  sexo: yup.string().oneOf(["Macho", "Hembra"]).optional(),
  especie: yup.string().oneOf(["Perro", "Gato"]).optional(),
  tamano: yup.string().oneOf(["Chico", "Mediano", "Grande"]).optional(),
  color: yup.string().optional(),
  raza: yup.string().optional(),
  edad: yup.string().optional(),
  zona_perdida: yup.string().optional(),
  fecha: yup.string().optional(),
  descripcion: yup.string().optional(),
  celular: yup.string().optional(),
  email: yup.string().optional(),
  whatsapp: yup.string().optional(),
  categoria: yup.string().oneOf(["Perdido", "Encontrado"]).optional(),
  aparecio: yup.boolean().required().default(false),
  imagen: yup.string().optional(),
  collar: yup
    .string()
    .oneOf([
      "Tiene collar con chapita",
      "Tiene collar sin chapita",
      "No tiene collar",
    ])
    .optional(),
});

export { mascota, editMascota };
