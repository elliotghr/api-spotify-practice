import { fetchHelper } from "./helper/fetchHelper.js";
import { getCardInformation } from "./searchCatalogue.js";
import { getFormData } from "./helper/formHelper.js";
import { getToken } from "./getTokenLogin.js";

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = getFormData(e);

    // Nos logueamos:
    let $resultContent = document.querySelector(".result-content");

    const loginResponse = await getToken();

    if (loginResponse?.status) {
      $resultContent.innerHTML = `Error status: ${loginResponse.status}, error message: ${loginResponse.statusText}`;
      return;
    }

    // Obtenemos el TOKEN
    const TOKEN = loginResponse.access_token;

    // Convertimos FormData a query params
    const queryParams = new URLSearchParams(formData).toString();

    let url = `https://api.spotify.com/v1/search?${queryParams}`;
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    let res = await fetchHelper(url, options);

    if (res?.status) {
      $resultContent.innerHTML = `Error status: ${res.status}, error message: ${res.statusText}`;
      return;
    }

    const type = formData.get("type");
    const fragment = getCardInformation(res, type);

    $resultContent.innerHTML = "";
    $resultContent.appendChild(fragment);
  });
});
