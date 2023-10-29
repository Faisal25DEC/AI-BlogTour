export const getBlogReadTime = (numChars) => {
  console.log(numChars);
  const time = numChars / 12;

  return time < 60 ? Math.round(time) + " sec" : Math.round(time / 60) + " min";
};
