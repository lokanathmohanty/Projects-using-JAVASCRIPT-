// ===============================
// SELECT DOM ELEMENTS
// ===============================

const recipeContainer = document.getElementById("recipeContainer");
const categoryList = document.getElementById("categoryList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const detailView = document.getElementById("detailView");
const homeBtn = document.getElementById("homeBtn");


// Global State
let allMeals = [];
let selectedCategories = [];

// ===============================
// INITIAL LOAD
// ===============================

window.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    fetchAllRecipes();
});

// ===============================
// LOAD ALL RECIPES INITIALLY
// ===============================

function fetchAllRecipes() {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then(res => res.json())
        .then(data => {
            allMeals = data.meals;
            displayRecipes(allMeals);
        });
}

// Create Reset Function
homeBtn.addEventListener("click", resetApp);
function resetApp() {

    // 1️⃣ Clear search input
    searchInput.value = "";

    // 2️⃣ Clear selected categories
    selectedCategories = [];

    // 3️⃣ Uncheck all checkboxes
    const checkboxes = categoryList.querySelectorAll("input");
    checkboxes.forEach(box => box.checked = false);

    // 4️⃣ Hide detail view if open
    detailView.classList.add("hidden");

    // 5️⃣ Show grid again
    recipeContainer.classList.remove("hidden");

    // 6️⃣ Display all meals
    displayRecipes(allMeals);
}

// ===============================
// LOAD CATEGORIES
// ===============================

function loadCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(res => res.json())
        .then(data => {

            data.categories.forEach(cat => {

                const label = document.createElement("label");

                label.innerHTML = `
                    <input type="checkbox" value="${cat.strCategory}">
                    ${cat.strCategory}
                `;

                const checkbox = label.querySelector("input");

                checkbox.addEventListener("change", handleCategoryChange);

                categoryList.appendChild(label);
            });
        });
}

// ===============================
// HANDLE CATEGORY CHECK
// ===============================

function handleCategoryChange(e) {

    const value = e.target.value;

    if (e.target.checked) {
        selectedCategories.push(value);
    } else {
        selectedCategories = selectedCategories.filter(cat => cat !== value);
    }

    filterRecipes();
}

// ===============================
// SEARCH BUTTON
// ===============================

searchBtn.addEventListener("click", () => {
    filterRecipes();
});

// ===============================
// FILTER LOGIC (SEARCH + CATEGORY)
// ===============================

function filterRecipes() {

    const searchText = searchInput.value.toLowerCase();

    let filtered = allMeals.filter(meal => {

        const matchSearch = meal.strMeal.toLowerCase().includes(searchText);

        const matchCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(meal.strCategory);

        return matchSearch && matchCategory;
    });

    displayRecipes(filtered);
}

// ===============================
// DISPLAY RECIPES
// ===============================

function displayRecipes(meals) {

    recipeContainer.innerHTML = "";

    if (!meals || meals.length === 0) {
        recipeContainer.innerHTML = "<h3>No recipes found</h3>";
        return;
    }

    meals.forEach(meal => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h4>${meal.strMeal}</h4>
            <p>${meal.strCategory}</p>
        `;

        card.addEventListener("click", () => {
            showDetails(meal);
        });

        recipeContainer.appendChild(card);
    });
}

// ===============================
// SHOW FULL DETAILS
// ===============================

function showDetails(meal) {

    // Hide grid
    recipeContainer.classList.add("hidden");

    // Show detail section
    detailView.classList.remove("hidden");

    detailView.innerHTML = `
        <button id="backBtn">⬅ Back</button>
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}">
        <p><b>Category:</b> ${meal.strCategory}</p>
        <p><b>Area:</b> ${meal.strArea}</p>
        <p>${meal.strInstructions}</p>
    `;

    document.getElementById("backBtn")
        .addEventListener("click", goBackToGrid);
}

// ===============================
// GO BACK TO GRID
// ===============================

function goBackToGrid() {

    // Hide detail section
    detailView.classList.add("hidden");

    // Show grid
    recipeContainer.classList.remove("hidden");

    // Clear search input
    searchInput.value = "";

    // Clear selected categories
    selectedCategories = [];    }
    categoryList.querySelectorAll("input").forEach(checkbox => {
        checkbox.checked = false;
    });

