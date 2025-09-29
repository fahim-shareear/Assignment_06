let allPlants = [];
let cart = []; // keep track of items

// Load all plants from API
const loadAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then((json) => {
      allPlants = json.plants;
      displayPlants(allPlants);
      displayCategories(allPlants);
    })
    .catch(err => console.error("Error fetching plants:", err));
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn) => {
    btn.classList.remove("active", "bg-green-600", "text-white");
  });
};

const loadCategoryPlants = (category) => {
  removeActive();
  const btn = document.getElementById(`category-btn-${category}`);
  btn.classList.add("active", "bg-green-600", "text-white");

  if (category === "all") {
    displayPlants(allPlants);
  } else {
    const filtered = allPlants.filter(plant => plant.category === category);
    displayPlants(filtered);
  }
};

const displayCategories = (plants) => {
  const categories = [...new Set(plants.map(p => p.category))];
  const categoryContainer = document.getElementById("category-main");
  categoryContainer.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.id = "category-btn-all";
  allBtn.className = "category-btn font-bold mt-2 w-full text-left rounded-xl p-3 text-xl hover:bg-green-600 hover:text-white";
  allBtn.innerText = "All Trees";
  allBtn.onclick = () => loadCategoryPlants("all");
  categoryContainer.appendChild(allBtn);

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.id = `category-btn-${category}`;
    btn.className = "category-btn font-bold mt-2 w-full text-left rounded-xl p-3 text-xl hover:bg-green-600 hover:text-white";
    btn.innerText = category;
    btn.onclick = () => loadCategoryPlants(category);
    categoryContainer.appendChild(btn);
  });
};

// Display plant cards
const displayPlants = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  if (plants.length === 0) {
    plantContainer.innerHTML = `
      <div class="text-center col-span-full py-10">
        <h2 class="text-2xl font-bold text-gray-500">No Plants Found</h2>
      </div>
    `;
    return;
  }

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className = "card w-[320px] h-[450px] bg-white rounded-xl shadow-md flex flex-col p-3";
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-[200px] rounded-lg mb-3 object-cover">
      <h1 class="font-bold text-lg mb-2">${plant.name}</h1>
      <p class="text-gray-600 text-sm mb-2">${plant.description}</p>
      <div class="flex items-center justify-between mb-3">
        <span class="text-green-700 font-semibold border-2 border-green-500 rounded-lg p-1">${plant.category}</span>
        <span class="text-green-600 font-bold">$${plant.price}</span>
      </div>
      <button class="bg-green-600 text-white rounded-xl py-2 mt-auto hover:bg-green-700" id="add-cart${plant.id}">Add to Cart</button>
    `;
    plantContainer.appendChild(card);

    //Add event listener directly after rendering button
    const cartBtn = card.querySelector(`#add-cart${plant.id}`);
    cartBtn.addEventListener("click", () => addToCart(plant));
  });
};

//Add item to cart
const addToCart = (plant) => {
  cart.push(plant);
  updateCartUI();
};

//Update cart UI
const updateCartUI = () => {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const cartItem = document.createElement("div");
    cartItem.className = "bg-gray-300 w-full flex items-center justify-between p-2 rounded-md";

    cartItem.innerHTML = `
      <div>
        <h2 class="font-semibold text-lg">${item.name}</h2>
        <p class="text-sm text-gray-700">$${item.price}</p>
      </div>
      <div class="text-red-600 cursor-pointer font-bold">X</div>
    `;

    //Remove item on click
    cartItem.querySelector("div:last-child").addEventListener("click", () => {
      cart.splice(index, 1);
      updateCartUI();
    });

    cartContainer.appendChild(cartItem);
  });

  cartTotal.innerText = `$${total}`;
};

//Run
loadAllPlants();
