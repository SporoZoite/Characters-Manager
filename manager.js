const up = document.getElementById('header')

const titre = document.createElement('h1')
titre.innerHTML = 'CHARACTERS MANAGER'

const searchbox = document.createElement('input')
searchbox.setAttribute ('type', 'text')
searchbox.setAttribute ('id', 'search')
searchbox.setAttribute ('placeholder', 'Search character')
searchbox.setAttribute ('onkeyup', 'search_chara')
searchbox.setAttribute ('name', 'search')

const separator =document.getElementById('separator')
const divider = document.createElement('hr')
divider.setAttribute ('class','solid')

const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

const bottom = document.getElementById('bottom')
const newButton = document.createElement('button')
newButton.setAttribute ('id','newButton')
newButton.innerText ='Add new character to the collection'


up.appendChild(titre)
up.appendChild(searchbox)
separator.appendChild(divider)
app.appendChild(container)
bottom.appendChild(newButton)


var request = new XMLHttpRequest()
request.open('GET', 'https://character-database.becode.xyz/characters', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach((character) => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const image = document.createElement('img')
      image.setAttribute('class','rounded' )
      image.src = character.image

      const h1 = document.createElement('h2')
      h1.textContent = character.name

      const p = document.createElement('p')
      character.shortDescription = character.shortDescription.substring(0, 300)
      p.textContent = `${character.shortDescription}...`

      const charaButton = document.createElement('button')
      charaButton.setAttribute ('id','charaButton')
      charaButton.innerText ='See character'

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
      card.appendChild(charaButton)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()