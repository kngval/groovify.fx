function parseJwt(token:string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function isTokenExpired(token:string) {
  const decodedToken = parseJwt(token);
  const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
  const now = Date.now();
  return now > expiryTime;
}

export function checkTokenExpiry() {
  const token = localStorage.getItem("jwtToken");
  if (token && isTokenExpired(token)) {
    localStorage.removeItem("jwtToken");
    // Optionally redirect the user to the login page
    window.location.href = "/login";
  }
}
