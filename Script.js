async function getRecipes() {
  const ingredient = document.getElementById('ingredientInput').value;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const resultDiv = document.getElementById('recipes');
  resultDiv.innerHTML = '<p>Loading recipes...</p>';

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.meals) {
      resultDiv.innerHTML = '<p>No recipes found. Try another ingredient.</p>';
      return;
    }

    const recipes = data.meals.slice(0, 5).map(meal => `
      <div class="recipe">
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      </div>
    `).join('');
    resultDiv.innerHTML = recipes;
  } catch (error) {
    resultDiv.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}
