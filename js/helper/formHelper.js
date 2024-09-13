export function getFormData(e) {
  const $form = e.target.closest("form");
  const $submitter = e.target.querySelector("button");

  return new FormData($form, $submitter);
}
