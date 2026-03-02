# 🍽️ Professional Recipe App

A fully responsive Recipe Application built using **HTML, CSS, and JavaScript** that fetches real-time data from a public API.

This project demonstrates real-world frontend architecture including filtering, state management, dynamic rendering, and responsive UI design.

---

# 🚀 Live Features

✅ Initially displays all available recipes  
✅ Sticky sidebar with category filters  
✅ Home button to reset application state  
✅ Real-time search functionality  
✅ Combined filtering (Search + Category)  
✅ Click recipe card to view full details  
✅ Back button to return to grid  
✅ Fully responsive (Desktop + Mobile)  
✅ Clean Single Page Application (SPA) behavior  

---

# 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox + Grid + Media Queries)
- JavaScript (ES6)
- Fetch API
- DOM Manipulation
- Event Handling
- Client-side Filtering

---

# 🌐 API Used

This application uses:

TheMealDB API

Main Endpoints Used:

1. Get All Recipes  
https://www.themealdb.com/api/json/v1/1/search.php?s=

2. Get Categories  
https://www.themealdb.com/api/json/v1/1/categories.php

---

# 🧠 Application Architecture

The app follows a structured frontend architecture:

## 1️⃣ Global State Management

```javascript
let allMeals = [];
let selectedCategories = [];

allMeals stores API data

selectedCategories stores checked filters

This avoids unnecessary API calls and improves performance.

2️⃣ Core Functions
🔹 fetchAllRecipes()

Fetches all recipes when the page loads.

🔹 loadCategories()

Fetches categories and dynamically builds sidebar checkboxes.

🔹 filterRecipes()

Combines:

Search text filtering

Category filtering

🔹 displayRecipes()

Renders recipe cards dynamically in grid format.

🔹 showDetails()

Displays detailed recipe view without reloading page.

🔹 resetApp()

Resets:

Search

Categories

UI state

Shows all recipes again

🎯 Filtering Logic
const matchSearch = meal.strMeal.toLowerCase().includes(searchText);

const matchCategory =
    selectedCategories.length === 0 ||
    selectedCategories.includes(meal.strCategory);

return matchSearch && matchCategory;

Both conditions must be true.

This demonstrates proper boolean filtering logic.

📱 Responsive Design

The app is fully responsive using:

CSS Grid

Flexbox

Media Queries

On mobile:

Sidebar moves to top

Grid resizes dynamically

Layout becomes vertical

🖥️ UI Structure
----------------------------------
| Sidebar | Main Content         |
|         |-----------------------|
|         | Search Bar           |
|         |-----------------------|
|         | Recipe Cards Grid    |
----------------------------------

When a card is clicked:

Grid is hidden
Detail view is shown

This mimics Single Page Application behavior.

📂 Project Structure
recipe-app/
│
├── index.html
├── style.css
├── script.js
└── README.md


🧩 Key JavaScript Concepts Practiced

DOM Selection

Event Listeners

Fetch API

Promises

Template Literals

Array Methods (filter, forEach)

State Management

Conditional Rendering

Dynamic Element Creation

