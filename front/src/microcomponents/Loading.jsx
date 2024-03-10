import { Loading } from "notiflix/build/notiflix-loading-aio";

export const LoadStart = () => {
  Loading.dots("Cargando...", {
    backgroundColor: "rgba(255,255,255,0.8)",
    svgColor: "#d3970f",
    messageColor: "#d3970f",
  });
};
export const LoadRemove = () => {
  Loading.remove(1023);
};
