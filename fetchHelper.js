export async function fetchHelper(url, options) {
  try {
    let res = await fetch(url, options);
    let json = await res.json();

    if (!res.ok)
      throw {
        status: res.status,
        statusText: !res.statusText ? "Ocurrió un error" : res.statusText,
      };

    return json;
  } catch (err) {
    return err;
  }
}
