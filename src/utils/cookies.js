export function getCookie(cookieName) {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// Usage

export function removeCookie(cookieName) {
  // Set the cookie's expiration date to the past
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const getToken = (name) => {
  return localStorage.getItem(name);
};

export const removeToken = (name) => {
  return localStorage.removeItem(name);
};
