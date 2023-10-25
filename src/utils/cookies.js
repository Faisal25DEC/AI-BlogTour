// cookies.js
export const getCookie = (name) => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  console.log(cookies);
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export function removeCookie(cookieName) {
  // Set the cookie's expiration date to the past
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
