import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ setImgMascota, setPreviewMascota }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "huellasacasa",
          folder: "huellasacasa",
          uploadPreset: "o3xexmhp",
          cropping: true,
          multiple: false,
          sources: ["local"],
          language: "es",
          text: {
            es: {
              actions: "Cargar",
              or: "O",
              local: {
                browse: "Buscar",
                dd_title_single: "Arrastre una imagen aqui",
              },
              queue: {
                done: "Cargado",
                statuses: {
                  uploaded: "Cargado",
                },
              },
              menu: {
                files: "Mis archivos",
              },
              crop: {
                title: "Recortar",
                skip_btn: "Saltar paso",
                reset_btn: "Resetear",
                crop_btn: "Recortar",
              },
            },
          },
        },

        (error, result) => {
          if (!error && result && result.event === "success") {
            setPreviewMascota(result.info.public_id);
            setImgMascota(result.info.secure_url);
          }
        }
      );

      myWidget.open();

    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        type="button"
        onClick={initializeCloudinaryWidget}
      >
        Subir imagen
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
