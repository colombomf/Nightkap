/*
By search
*/

//Gets a random cocktail name, image and recipe with measures and place them in the DOM on button click 
const get_drinks_btn = document.getElementById('get_drinks').addEventListener('click', getDrink)
const drinks_container = document.getElementById('drinks')

// Fetch
function getDrink(){
const inputVal = document.querySelector('input').value
const takeInSpaces = inputVal.replace(/  +/g, ' ') //Input value takes spaces between the names

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+takeInSpaces

	fetch(url)
		.then(res => res.json())
		.then(res => {
		mixology(res.drinks[0]) //Pass the index 0 item into Mixology function
	})
  .catch(err => {
    console.log(`error ${err}`)
})

//Mixology function
function mixology (drinks) {
	const ingredients = [] //Empty array to add elements
	for(let i = 1; i <= 20; i++) { 	//Get all ingredients and their measures from the object by looping through them
		if(drinks[`strIngredient${i}`]) { //Check if the ingredient has a corresponding measure
			ingredients.push(`${drinks[`strIngredient${i}`]} - ${drinks[`strMeasure${i}`]}`) //Add them to the ingredients array with the push method
		} else {
			break
		}
	}
	
  //HTML markup for cocktails (check if data is available with ternary operator)
  //Split, join to format the tags e.g. 'Brunch,Hangover,Mild' becomes 'Brunch, Hangover, Mild'
  //Pass mixology function to map to show the ingredients <li> for each ingredient/measure pair

	const newInnerHTML = `
		<div class="row">

        <h2>${drinks.strDrink}</h2>
				<img src="${drinks.strDrinkThumb}" style="width: 100%; max-height: 100%" alt="Featured Drink Image">

				${drinks.strCategory ? `<p><strong>Category:</strong> ${drinks.strCategory}` : ''} | ${drinks.strAlcoholic ? ` ${drinks.strAlcoholic}</p>` : ''}
				${drinks.strGlass ? `<p><strong>Glassware:</strong> ${drinks.strGlass}</p>` : ''}
				${drinks.strTags ? `<p><strong>Tags:</strong> ${drinks.strTags.split(',').join(', ')}</p>` : ''}
				<h4>Ingredients:</h4>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>

        <h4>Instructions:</h4>
				<p>${drinks.strInstructions}</p>



		</div>
    	
	`
	
	drinks_container.innerHTML = newInnerHTML //Fills drinks div with fetched data
}
}

//Triggers search on enter
//Get the input field
const input = document.getElementById("myInput")
//Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  //Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    //Cancel the default action, if needed
    event.preventDefault()
    //Trigger the button element with a click
    document.getElementById("get_drinks").click()
  }
})



/* 
By random suggestions  
*/
const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
setInterval(getRandomDrink, 5000) // Gets a new drink every 5 seconds


//Gets a random cocktail name and image, place them in the DOM on button click
document.querySelector('button').addEventListener('click', getRandomDrink)
//Fetch
function getRandomDrink(){
    fetch(url) 
    .then(res => res.json()) //Parse response as JSON
    .then(data => {
      console.log(data.drinks)
      document.querySelector('h2').innerText = data.drinks[0].strDrink
      document.querySelector('img').src = data.drinks[0].strDrinkThumb
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
}


//Copies the random cocktail's name to the clipboard
function copyDivToClipboard() {
	var range = document.createRange()
	range.selectNode(document.getElementById("copy2Clipboard"))
	window.getSelection().removeAllRanges() //Clear current selection
	window.getSelection().addRange(range) //Select text
	document.execCommand("copy")
	window.getSelection().removeAllRanges()//Deselect text
}


// Page Loader : hide loader when all are loaded
$(window).on("load",function(){
	$("body").removeClass("preload")
	$(".loader-wrapper").fadeOut("slow")
})

