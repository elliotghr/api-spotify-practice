import { fetchHelper } from "./fetchHelper.js";
import { getCardInformation } from "./searchCatalogue.js";

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $form = e.target.closest("form");
    const $submitter = e.target.querySelector("button");

    const formData = new FormData($form, $submitter);
    let type = formData.get("type");
    // Convertimos FormData a query params
    const queryParams = new URLSearchParams(formData).toString();

    let $resultContent = document.querySelector(".result-content");

    let url = `https://api.spotify.com/v1/search?${queryParams}`;
    let options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer BQDWkRR36zXNCLUcc3lCvolM6QtYgrxQRxlK4HFS3_ySZtI0kmI6RWLoK6FtmeLCd_7OMeQjBaBgCBdpYleL0_gqVJ8fd2SRs2-VwzzAHkTnvf_m_78",
      },
    };

    let res = await fetchHelper(url, options);

    if (res?.status) {
      $resultContent.innerHTML = `Error status: ${res.status}, error message: ${res.statusText}`;
      return;
    }

    const fragment = getCardInformation(res, type);

    $resultContent.innerHTML = "";
    $resultContent.appendChild(fragment);
  });
});
