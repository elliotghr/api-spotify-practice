import { fetchHelper } from "./helper/fetchHelper.js";
import { getCardInformation } from "./searchCatalogue.js";
import { getFormData } from "./helper/formHelper.js";
import { getTOKEN } from "./getToken.js";

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = getFormData(e);

    let $resultContent = document.querySelector(".result-content");

    // Seteamos el token en el localStorage
    getTOKEN($resultContent);

    // Convertimos FormData a query params
    const queryParams = new URLSearchParams(formData).toString();

    let count = 0;

    do {
      // Obtenemos el valor del token
      const TOKEN = localStorage.getItem("access_token");

      let url = `https://api.spotify.com/v1/search?${queryParams}`;
      let options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };

      // Consumimos el endpoint
      let res = await fetchHelper(url, options);

      // Validamos el status de la respuesta
      if (res?.status === 401) {
        console.log("401");
        localStorage.removeItem("access_token");
        getTOKEN($resultContent);
        continue;
      } else if (res?.status) {
        $resultContent.innerHTML = `Error status: ${res.status}, error message: ${res.statusText}`;
        return;
      }

      // Obtenemos el tipo de busqueda
      const type = formData.get("type");
      // Obtenemos la data en formato HTML
      const fragment = getCardInformation(res, type);

      // Limpiamos el contenedor de resultados y renderizamos la data
      $resultContent.innerHTML = "";
      $resultContent.appendChild(fragment);
      break;
    } while (count === 3);
  });
});
