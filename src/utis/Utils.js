export default function validateRefs(refs) {
  let ok = true;
  let message = "";
  refs.forEach((element) => {
    if (element.current.value === "") {
      ok = false;
      message = "empty fields";
      return;
    }
    if (element.current.value.length < 3) {
      ok = false;
      message = "smaller word";
      return;
    }
    if (element.current.attributes["type"].value === "email") {
      if (!element.current.value.includes("@")) {
        ok = false;
        message = "not valid email address";
        return;
      }
    }
  });
  return { success: ok, message: message };
}
