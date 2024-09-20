import { fetchToken } from "./fetchTokenLogin.js";

export async function getTOKEN(resultContent) {
  // Nos logueamos:
  if (!localStorage.getItem("access_token")) {
    console.log("getTOKEN");
    const loginResponse = await fetchToken();

    if (loginResponse?.status) {
      resultContent.innerHTML = `Error status: ${loginResponse.status}, error message: ${loginResponse.statusText}`;
      return;
    }

    // Obtenemos el TOKEN
    const TOKEN = loginResponse.access_token;

    // Seteamos el TOKEN al localStorage
    localStorage.setItem("access_token", TOKEN);
  }
}
