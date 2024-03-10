import express from "express";
import MascotaRouteApi from "./api/routes/mascotas.api.routes.js";
import AccountRouteApi from "./api/routes/account.api.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'huellasacasa', 
  api_key: '749873276873579', 
  api_secret: 'ob9NWMx-JFnxrYgO8UknaL5Y5eE' 
});

const app = express();
app.use(cors(
  {
    origin: ["https://www.huellasacasa.com"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  }
))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.huellasacasa.com');
  next();
});

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use("/api", express.json());

app.use("/", express.static("public"));
app.use("/mascotas/img", express.static("content/img/mascotas"));

app.use("/api", MascotaRouteApi);
app.use("/api", AccountRouteApi);

app.listen(2023, function () {
  console.log("Servidor levantado! http://localhost:2023");
});
