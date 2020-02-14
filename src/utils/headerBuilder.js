const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTQ2NzkzNDEwMjJlMjI3Mjg0MDVhODciLCJuYW1lIjoic291cmFiaCIsImlhdCI6MTU4MTY3Njg2NCwiZXhwIjoxNjEzMjMzNzkwfQ.5eYoQ1Ztxu9VxABxYFlrMNG26b5ct_GGLYVQbJo39Rk";

// const userLocal = JSON.parse(window.localStorage.getItem("user"));
// const {token} = userLocal || "";
export const authHeader = {headers: { Authorization: `Bearer ${token}`} };