/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens()
drawKittens()
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  
  let form = event.target
  let namedKitten = form.name.value
  let kitttenId = generateId()

    let kitty = {
      id: kitttenId,
      name: namedKitten,
      mood: "Happy",
      affection: 9,
      image: "https://robohash.org/" + namedKitten + "?set=set4"
  }

  kittens.push(kitty)
  
  saveKittens()
  form.reset()
  drawKittens()
}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
  drawKittens()
}

function deleteKitten(kittenId) {
  let index = kittens.findIndex(kitten => kitten.id == kittenId)
  if (index == -1) {
    throw new Error("Invalid Kitten Id")
  } 
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}


/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenElement = document.getElementById("kittens")
  let kittenTemplate = ""
  kittens.forEach(kitten => {
   if (kitten.mood == "Happy") {
     kittenTemplate += `
    <div id="kitten happy img " class="d-flex space-around align-items-center flex-wrap kitten happy kitten  card m-2 font "> 
      <img src= "${kitten.image}" class=" kitten happy" alt="kitten image" height="100px">
      <div class="space-around text-center">
        <h1>${kitten.name}</h1>
        <p>${kitten.mood}</p>
        <p>${kitten.affection}</p>
        <button class="font" onclick="pet('${kitten.id}')">Pet</button>
        <button class="font" onclick="catnip('${kitten.id}')">CatNip</button>
        <button class="font" onclick=deleteKitten('${kitten.id}')>Delete</button>
      </div>
    </div>`
  } else if (kitten.mood == "Tolerant") {
    kittenTemplate += `
    <div id="kitten tolerant img " class="d-flex space-around align-items-center flex-wrap kitten tolerant img kitten img card m-2 font "> 
      <img src= "${kitten.image}" class=" kitten tolerant img" alt="kitten image" height="100px">
      <div class="space-around text-center">
        <h1>${kitten.name}</h1>
        <p>${kitten.mood}</p>
        <p>${kitten.affection}</p>
        <button class="font" onclick="pet('${kitten.id}')">Pet</button>
        <button class="font" onclick="catnip('${kitten.id}')">CatNip</button>
        <button class="font" onclick=deleteKitten('${kitten.id}')>Delete</button>
      </div>
    </div>`
  } else if (kitten.mood == "Angry"){
    kittenTemplate += `
    <div id="kitten angry img " class="d-flex space-around align-items-center flex-wrap kitten angry img kitten img card m-2 font "> 
      <img src= "${kitten.image}" class=" kitten angry img" alt="kitten image" height="100px">
      <div class="space-around text-center">
        <h1>${kitten.name}</h1>
        <p>${kitten.mood}</p>
        <p>${kitten.affection}</p>
        <button class="font" onclick="pet('${kitten.id}')">Pet</button>
        <button class="font" onclick="catnip('${kitten.id}')">CatNip</button>
        <button class="font" onclick=deleteKitten('${kitten.id}')>Delete</button>
      </div>
    </div>`
  }else if (kitten.mood == "Gone") {
    kittenTemplate += `
    <div id="kitten gone img " class="d-flex space-around align-items-center flex-wrap kitten gone img kitten img card bg-dark m-2 font "> 
    <img src= "${kitten.image}" class=" kitten gone img" alt="kitten image" height="100px">
      <div class="space-around text-center">
        <h1>${kitten.name}</h1>
        <p>${kitten.mood}</p>
        <p>${kitten.affection}</p>
        <button class="font" onclick=deleteKitten('${kitten.id}')>Delete</button>
      </div>
    </div>`
  }})

  kittenElement.innerHTML = kittenTemplate

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitty = findKittenById(id)
  let randomNumber = Math.random() 

  if (randomNumber > .7) {
    kitty.affection ++
  } else {
    kitty.affection --
  }

  kitty.mood = setKittenMood(kitty)

  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)

  kitten.mood = "Tolerant"
  kitten.affection = 5

  saveKittens()
  drawKittens() 
}


/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection > 6) {
    kitten.mood = "Happy"
  } else if (kitten.affection <= 0) {
    kitten.mood = "Gone"
  }  else if (kitten.affection <= 3) {
    kitten.mood = "Angry"
  } else {
    kitten.mood = "Tolerant"
  }
 
  return kitten.mood
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("addKitten").classList.remove("hidden")
  document.getElementById("kittens").classList.remove("hidden")
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number, image: string}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}
