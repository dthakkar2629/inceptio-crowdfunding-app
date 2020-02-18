const token = JSON.parse(window.localStorage.getItem("token"));
export const authHeader = (tokenLocal) => ({headers: { Authorization: tokenLocal || token} })