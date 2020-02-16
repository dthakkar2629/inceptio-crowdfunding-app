const token = JSON.parse(window.localStorage.getItem("token"))
export const authHeader = {headers: { Authorization: `${token}`} };