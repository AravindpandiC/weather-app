console.log("Script running");

// fetch("http://localhost:8080/weather?address=Madurai").then((response) => {
//   response.json().then((data) => {
//     if (data.error) console.log(data.error);
//     else console.log(data[0].location, data[0].forcast);
//   });
// });

const locationSearch = document.querySelector("form");
const locationInput = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

locationSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = locationInput.value;
  console.log(location);
  if (location == "") {
    messageTwo.textContent = "";
    return (messageOne.textContent = "Please enter location");
  }
  fetch("http://localhost:8080/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data[0].location;
          messageTwo.textContent = data[0].forcast;
        }
      });
    }
  );
});
