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
        <button className="bg-red-400 text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Inspection Failed
        </button>
      );
    case "injested":
      return (
        <button className="bg-indigo-500 text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Locked
        </button>
      );
    case "moderation":
      return (
        <button className="bg-indigo-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Locked
        </button>
      );
    case "approved":
      return (
        <button className="bg-green-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          approved
        </button>
      );
    case "live":
      return (
        <button className="bg-indigo-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Locked
        </button>
      );
    case "consideration":
      return (
        <button className="bg-purple-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Processing
        </button>
      );
    case "takedown":
      return (
        <button className="bg-red-600 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Takendown
        </button>
      );
    default:
      return (
        <button className="bg-yellow-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Pending
        </button>
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

export function downloadcsv(album) {
  let csvContent = "";
  var key;
  var head = "";
  var data = "";

  for (key in album) {
    if (
      key === "coverImage" ||
      key === "stats" ||
      key === "artist" ||
      key === "storInfo"
    )
      continue;
    head += `${key},`;
    data += `${album[key]},`;
  }

  csvContent += head + "\n" + data;

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", csvContent]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "albuminfo.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
export function downloadxlsx(album) {
  let csvContent = "";
  var key;
  var head = "";
  var data = "";
  for (key in album) {
    if (
      key === "coverImage" ||
      key === "stats" ||
      key === "artist" ||
      key === "storInfo"
    )
      continue;
    head += `${key},`;
    data += `${album[key]},`;
  }

  csvContent += head + "\n" + data;

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", csvContent]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "albuminfo.xlsx";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function calculateOutstanding(arraydata = [], total = 0) {
  return arraydata.reduce(
    (total, a) => total - Number.parseInt(a.amount),
    total
  );
}
