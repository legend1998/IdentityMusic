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

export function statusSwitch(status) {
  switch (status) {
    case "rejected":
      return (
        <span className="bg-red-500 text-white p-3 shadow-lg">rejected</span>
      );
    case "injested":
      return (
        <span className="bg-yellow-700 text-white p-3 shadow-lg">injested</span>
      );
    case "moderation":
      return (
        <span className="bg-blue-400 text-white p-3 shadow-lg">moderation</span>
      );
    case "approved":
      return (
        <span className="bg-green-500 text-white p-3 shadow-lg">approved</span>
      );
    case "live":
      return (
        <span className="bg-green-900 text-white p-3 shadow-lg">live</span>
      );
    default:
      return (
        <span className="bg-yellow-500 text-white p-3 shadow-lg">pending</span>
      );
  }
}
export function getEarnigns(data) {
  var total = 0;
  data.forEach((d) => {
    total += Number(d.earnings);
  });

  return total;
}
