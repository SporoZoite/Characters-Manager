const up = document.getElementById("header");

const titre = document.createElement("h1");
titre.innerHTML = "CHARACTERS MANAGER";

const searchbox = document.createElement("input");
searchbox.setAttribute("type", "text");
searchbox.setAttribute("id", "search");
searchbox.setAttribute("placeholder", "Search character");
searchbox.setAttribute("onkeyup", "search_chara");
searchbox.setAttribute("name", "search");

const separator = document.getElementById("separator");
const divider = document.createElement("hr");
divider.setAttribute("class", "solid");

const app = document.getElementById("root");

const container = document.createElement("div");
container.setAttribute("class", "container");

const bottom = document.getElementById("bottom");
const newButton = document.createElement("button");
newButton.setAttribute("id", "newButton");
newButton.innerText = "Add new character to the collection";

up.appendChild(titre);
up.appendChild(searchbox);
separator.appendChild(divider);
app.appendChild(container);
bottom.appendChild(newButton);

var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://my-json-server.typicode.com/SporoZoite/user-api-server/characters",
  true
);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((character) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const image = document.createElement("img");
      image.setAttribute("class", "rounded");
      image.src = character.image;

      const h1 = document.createElement("h2");
      h1.textContent = character.name;

      const p = document.createElement("p");
      character.shortDescription = character.shortDescription.substring(0, 250);
      p.textContent = `${character.shortDescription}...`;

      const params = {
        id: character.id,
      };

      const charaButton = document.createElement("button");
      charaButton.setAttribute("id", "charaButton");
      charaButton.addEventListener("click", async function () {
        const res = await fetch(
          "https://my-json-server.typicode.com/SporoZoite/user-api-server/characters?" +
            new URLSearchParams(params)
        );
        const hero = await res.json();
        if (request.status >= 200 && request.status < 400) {
          hero.forEach((character) => {
            const cardSolo = document.createElement("div");
            cardSolo.setAttribute("id", "cardSolo");

            const image = document.createElement("img");
            image.setAttribute("class", "rounded");
            image.setAttribute("id", "bigImg");
            image.src = character.image;

            const titreSolo = document.createElement("div");
            titreSolo.setAttribute("class", "titreSolo");
            const h3 = document.createElement("h3");
            h3.textContent = character.name;

            const minp = document.createElement("p");
            minp.setAttribute("id", "minP");
            minp.textContent = `${character.shortDescription}`;

            const p = document.createElement("p");
            p.setAttribute("id", "bigP");
            p.textContent = `${character.description}`;

            const buttonSolo = document.createElement("div");
            buttonSolo.setAttribute("class", "buttonSolo");

            const updateButton = document.createElement("button");
            updateButton.setAttribute("id", "updateButton");
            updateButton.innerText = "Update character";

            const deleteButton = document.createElement("button");
            deleteButton.setAttribute("id", "deleteButton");
            deleteButton.innerText = "Delete character";

            const backButton = document.createElement("button");
            backButton.setAttribute("id", "backButton");
            backButton.innerText = "<Back";
            backButton.addEventListener("click", async function () {
             container.removeChild(cardSolo);
            })

            container.appendChild(cardSolo);
            cardSolo.appendChild(image);
            cardSolo.appendChild(titreSolo);
            titreSolo.appendChild(h3);
            titreSolo.appendChild(minp);
            cardSolo.appendChild(p);
            cardSolo.appendChild(buttonSolo);
            buttonSolo.appendChild(updateButton);
            buttonSolo.appendChild(deleteButton);
            cardSolo.appendChild(backButton);
          });
        }
      });
      charaButton.innerText = "See character";

      container.appendChild(card);
      card.appendChild(image);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(charaButton);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};

request.send();
