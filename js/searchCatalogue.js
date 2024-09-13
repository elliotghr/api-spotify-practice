function getTypeData(json) {
  let jsonKey = Object.keys(json)[0];
  let data = json[jsonKey].items;

  return data;
}

function getImagePath(type, item) {
  switch (type) {
    case "artist":
    case "album":
      return item.images[0]?.url;

    case "track":
      return item.album.images[0].url;

    default:
      break;
  }
}

function getData(items, $fragment, $template, type) {
  items.forEach((item) => {
    $template.querySelector(".footer .name").textContent = item.name;
    const image = getImagePath(type, item);

    const imageRes = image ? image : "./assets/Unknown_person.jpg";
    $template.querySelector(".image img").src = imageRes;

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
  });
}

export function getCardInformation(json, type) {
  let $fragment = document.createDocumentFragment();
  let $template = document.querySelector("#result-card").content;

  const data = getTypeData(json);

  getData(data, $fragment, $template, type);
  return $fragment;
}
