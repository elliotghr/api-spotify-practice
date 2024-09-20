import { fetchHelper } from "./helper/fetchHelper.js";

export async function fetchToken() {
  let url = `https://accounts.spotify.com/api/token`;

  let body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "bbdf267aab96475f9050de679ba70d9a",
    client_secret: "22ce5a9ed9f4410489465ed841ba41bc",
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
