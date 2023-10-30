export const getBlogReadTime = (numChars) => {
  console.log(numChars);
  const time = numChars / 12;

  return time < 60 ? Math.round(time) + " sec" : Math.round(time / 60) + " min";
};
export const monthMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
export function capitalizeFirstLetter(inputString) {
  return `${inputString.charAt(0).toUpperCase()}${inputString.slice(1)}`;
}
