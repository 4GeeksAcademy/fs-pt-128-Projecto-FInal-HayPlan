export const planDateFormatLarge = (dateString) => {
  const date = new Date(dateString);
  let formatDate = date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  let formatDateSplit = formatDate.replace(",", "");
  let formatDatePoint = formatDateSplit.replace(",", " ·");
  let formatDateUpper = formatDatePoint
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formatDateUpper;
};
