const food_btn = document.getElementById('food_button');
const container = document.getElementById('display_food');
const display_likes = document.getElementById('display_likes');

var curr_recipe;
var likes_list;

food_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			createRecipe(res.meals[0]);
			curr_recipe = res.meals[0];
		})
		.catch(e => {
			console.warn(e);
		});
});

const createRecipe = recipe => {
	const ingredients = [];

	for(let i = 1; i <= 20; i++){
		if (recipe[`strIngredient${i}`]) {
			ingredients.push(
				`${recipe[`strIngredient${i}`]}  -  ${recipe[`strMeasure${i}`]}`
				);
		}
		else {
			break;

		}
	}

	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${recipe.strMealThumb}" alt="Meal Image">
				${
					recipe.strCategory
						? `<p><strong>Category:</strong> ${recipe.strCategory}</p>`
						: ''
				}
				${recipe.strArea ? `<p><strong>Area:</strong> ${recipe.strArea}</p>` : ''}
				${
					recipe.strTags
						? `<p><strong>Tags:</strong> ${recipe.strTags
								.split(',')
								.join(', ')}</p>`
						: ''
				}
				<p><strong>Source: </strong><a href="${recipe.strSource}">Click Here</a></p>
				<button id="like" onclick="likeRecipe()">LIKE</button>
			</div>
			<div class="columns seven">
				<h4>${recipe.strMeal}</h4>
				<p>${recipe.strInstructions}</p>
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
		</div>
		${
			recipe.strYoutube
				? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
				: ''
		}
	`;

	container.innerHTML = newInnerHTML;
}

function likeRecipe() {
	if (localStorage.getItem('count') === null) { 
		localStorage.setItem('count', 1);
	} else {
		localStorage.setItem('count', localStorage.getItem('count')+1);
	}

	var name = 'bm'+localStorage.getItem('count');
	localStorage.setItem(name, JSON.stringify(curr_recipe));
	console.log(localStorage.getItem(name));
}

function getLikes() {
	likes = [];
	curr_count = 0;
	count = localStorage.getItem('count');
	if (count != null) {
		for (i = 1; i <= count; i++) {
			curr = JSON.parse(localStorage.getItem('bm'+i));
			if (curr != null) {
				likes[curr_count] = curr;
				curr_count++;
			}
		}
	}

	return likes;
}

clear_likes_btn.addEventListener('click', () => {
	localStorage.clear();
})

display_likes_btn.addEventListener('click', () => {
	container.innerHTML = "";
 	likes_list = getLikes();
 	likes_list.forEach(displayLikes);
})


function displayLikes(recipe) {

	const ingredients = [];

	for(let i = 1; i <= 20; i++){
		if (recipe[`strIngredient${i}`]) {
			ingredients.push(
				`${recipe[`strIngredient${i}`]}  -  ${recipe[`strMeasure${i}`]}`
				);
		}
		else {
			break;

		}
	}

	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${recipe.strMealThumb}" alt="Meal Image">
				${
					recipe.strCategory
						? `<p><strong>Category:</strong> ${recipe.strCategory}</p>`
						: ''
				}
				${recipe.strArea ? `<p><strong>Area:</strong> ${recipe.strArea}</p>` : ''}
				${
					recipe.strTags
						? `<p><strong>Tags:</strong> ${recipe.strTags
								.split(',')
								.join(', ')}</p>`
						: ''
				}
				<p><strong>Source: </strong><a href="${recipe.strSource}">Click Here</a></p>
				<button id="like" onclick="likeRecipe()">LIKE</button>
			</div>
			<div class="columns seven">
				<h4>${recipe.strMeal}</h4>
				<p>${recipe.strInstructions}</p>
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
		</div>
		${
			recipe.strYoutube
				? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
				: ''
		}
	<br>
	<br>
	<hr>
	<br>
	<br>`;

	container.innerHTML += newInnerHTML;

}