console.log('%c HI', 'color: firebrick')


function addImagesToDom(data) {
  let imageDiv = document.querySelector("#dog-image-container");
  for (let i = 0; i < data["message"].length; i++) {
    let image = document.createElement("img");
    // image.innerHTML = `<img src="${data["message"][i]}">`;
    image.src = data["message"][i];
    imageDiv.append(image);
  }
}

function addBreedsToDom(data) {
  let dogBreedList = document.querySelector("#dog-breeds");
  for (let i = 0; i < Object.keys(data["message"]).length; i++) {
    let li = document.createElement("li");
    li.innerText = Object.keys(data["message"])[i];
    li.dataset.dogBreed = li.innerText[0];
    dogBreedList.append(li);
    li.addEventListener("click", function () {
      li.style.color = "purple";
    });
  }
}

function fetchDogs() {
  fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((resp) => resp.json())
    .then((data) => addImagesToDom(data));
}

function fetchBreeds() {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((resp) => resp.json())
    .then((data) => addBreedsToDom(data));
}

document.addEventListener("DOMContentLoaded", function () {
  fetchDogs();
  fetchBreeds();
});

let dropdown = document.querySelector("#breed-dropdown");
dropdown.value = "🐶";

dropdown.addEventListener("change", function () {
  let allLis = document.querySelectorAll("li");
  let val = event.target.value;
  for (let i = 0; i < allLis.length; i++) {
    if (allLis[i].dataset.dogBreed != val) {
      allLis[i].hidden = true;
    } else {
      allLis[i].hidden = false;
    }
  }
});