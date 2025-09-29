const loadAllCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => displayAllCategory(data.categories)) // pass the array
        .catch(err => console.error("Error fetching categories:", err));
};

const displayAllCategory = (lessons) => {
    const levelCategory = document.getElementById('category-main');
    levelCategory.innerHTML = ''; // clear existing content
    
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="font-bold hover:bg-green-600 mt-3 w-[300px] text-left rounded-xl p-3 transition-all duration-400 text-xl pointer hover:text-white">
                ${lesson.category_name}  <!-- display category_name -->
            </button>
        `;
        levelCategory.appendChild(btnDiv);
    }
};

loadAllCategory();
