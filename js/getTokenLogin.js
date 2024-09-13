import { fetchHelper } from "./helper/fetchHelper.js";

export async function getToken() {
  let url = `https://accounts.spotify.com/api/token`;

  let body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "",
    client_secret: "",
  });

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(), // Aquí envías el body con los query params
  };

  return await fetchHelper(url, options);
}
