const errorMessage = (error) => {
  console.log({error});
  if(error.message === "Network Error") return "No internet connection!";
  else if (error.response) {console.log(error.response.data.msg); return error.response.data.msg;}
  else if (error.request) {console.log(error.request.statusText); return error.request.statusText;}
  else {console.log(error.message); return error.message;}
};

export {errorMessage};