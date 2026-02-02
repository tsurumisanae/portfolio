/* ===================================
   FoodFrame Script
   =================================== */

// State
let meals = JSON.parse(localStorage.getItem('foodframe_meals')) || [];
const GOAL_CALORIES = 2200;

// DOM Elements
const totalCaloriesEl = document.getElementById('totalCalories');
const progressBarEl = document.getElementById('progressBar');
const goalCaloriesEl = document.getElementById('goalCalories');
const feedGrid = document.getElementById('feedGrid');
const currentDateEl = document.getElementById('currentDate');

// Modal Elements
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const modalClose = document.getElementById('modalClose');
const saveBtn = document.getElementById('saveBtn');
const uploadPreview = document.getElementById('uploadPreview');
const fileInput = document.getElementById('fileInput');
const previewImg = document.getElementById('previewImg');
const menuNameInput = document.getElementById('menuName');
const menuCaloriesInput = document.getElementById('menuCalories');
const typeBtns = document.querySelectorAll('.type-btn');

let currentImageType = null; // 'Breakfast', 'Lunch', etc.

// Image Classifier
let classifier;

// Calorie Database (Approximate)
const CALORIE_DB = {
    'pizza': 266,
    'cheeseburger': 303,
    'hotdog': 290,
    'ice cream': 207,
    'espresso': 9,
    'coffee': 5,
    'chocolate sauce': 50,
    'strawberry': 32,
    'orange': 47,
    'banana': 89,
    'apple': 52,
    'broccoli': 34,
    'cucumber': 15,
    'bell pepper': 20,
    'mushroom': 22,
    'corn': 86,
    'bagel': 250,
    'pretzel': 380,
    'mashed potato': 88,
    'french loaf': 289,
    'carbonara': 650,
    'spaghetti': 158,
    'guacamole': 150,
    'consomme': 20,
    'trifle': 200,
    'potpie': 400
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderDate();
    renderFeed();
    updateStats();

    // Load ML Model
    classifier = ml5.imageClassifier('MobileNet', () => {
        console.log('Model Loaded!');
        uploadPreview.style.borderColor = '#e09f3e'; // Signal ready
    });

    // Modal listeners
    addBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    document.getElementById('modalBackdrop').addEventListener('click', closeModal);

    // Form listeners
    uploadPreview.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    typeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            typeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    saveBtn.addEventListener('click', saveMeal);
});

function renderDate() {
    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    currentDateEl.textContent = now.toLocaleDateString('ja-JP', options).replace(/\//g, '.');
}

function updateStats() {
    const total = meals.reduce((sum, meal) => sum + parseInt(meal.calories), 0);

    // Animate count up
    animateValue(totalCaloriesEl, parseInt(totalCaloriesEl.textContent), total, 500);

    // Update bar
    const percentage = Math.min((total / GOAL_CALORIES) * 100, 100);
    progressBarEl.style.width = `${percentage}%`;

    if (total > GOAL_CALORIES) {
        progressBarEl.style.backgroundColor = '#d62828'; // Warning color
    } else {
        progressBarEl.style.backgroundColor = '#e09f3e';
    }
}

function renderFeed() {
    feedGrid.innerHTML = '';

    // Sort by newest first
    const sortedMeals = [...meals].reverse();

    sortedMeals.forEach((meal, index) => {
        const card = document.createElement('article');
        card.className = 'meal-card';
        card.innerHTML = `
      <div class="meal-img-wrapper">
        <img src="${meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'}" alt="${meal.name}" class="meal-img">
        <div class="meal-overlay">${meal.type}</div>
        <button class="delete-btn" onclick="deleteMeal(${meals.length - 1 - index})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="meal-info">
        <div class="meal-header">
          <h3 class="meal-name">${meal.name}</h3>
          <span class="meal-calories">${meal.calories}</span>
        </div>
        <div class="meal-time">${new Date(meal.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    `;
        feedGrid.appendChild(card);
    });
}

// Actions
function openModal() {
    modal.classList.add('active');
    resetForm();
}

function closeModal() {
    modal.classList.remove('active');
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.textContent = '';
            previewImg.src = e.target.result;
            previewImg.classList.add('show');

            // Predict
            if (classifier) {
                uploadPreview.innerHTML += '<p style="position:absolute; bottom:10px; background:rgba(0,0,0,0.7); padding:4px;">Thinking...</p>';
                setTimeout(() => {
                    classifier.classify(previewImg, (error, results) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        if (results && results.length > 0) {
                            const label = results[0].label.split(',')[0].toLowerCase();
                            const confidence = results[0].confidence;
                            console.log(`Prediction: ${label} (${confidence})`);

                            // Auto-fill
                            menuNameInput.value = capitalize(label);

                            // Estimate Calories
                            let estimatedCals = 300; // Default
                            if (CALORIE_DB[label]) {
                                estimatedCals = CALORIE_DB[label];
                            } else {
                                // Simple heuristic fallback
                                if (label.includes('salad') || label.includes('fruit')) estimatedCals = 100;
                                if (label.includes('cake') || label.includes('chocolate')) estimatedCals = 400;
                                if (label.includes('burger') || label.includes('pizza')) estimatedCals = 600;
                                if (label.includes('fried')) estimatedCals = 500;
                            }

                            menuCaloriesInput.value = estimatedCals;

                            // Clean UI
                            const p = uploadPreview.querySelector('p:last-child');
                            if (p) p.remove();
                        }
                    });
                }, 500); // Wait for image load
            }
        };
        reader.readAsDataURL(file);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function saveMeal() {
    const name = menuNameInput.value;
    const calories = menuCaloriesInput.value;
    const type = document.querySelector('.type-btn.active').dataset.type;
    const image = previewImg.classList.contains('show') ? previewImg.src : null;

    if (!name || !calories) {
        alert('Please enter menu name and calories.');
        return;
    }

    const newMeal = {
        id: Date.now(),
        name,
        calories: parseInt(calories),
        type,
        image
    };

    meals.push(newMeal);
    localStorage.setItem('foodframe_meals', JSON.stringify(meals));

    closeModal();
    renderFeed();
    updateStats();
}

// Global scope function for onclick attribute
window.deleteMeal = function (originalIndex) {
    if (confirm('Delete this record?')) {
        meals.splice(originalIndex, 1);
        localStorage.setItem('foodframe_meals', JSON.stringify(meals));
        renderFeed();
        updateStats();
    }
};

function resetForm() {
    menuNameInput.value = '';
    menuCaloriesInput.value = '';
    previewImg.src = '';
    previewImg.classList.remove('show');
    fileInput.value = '';
    // Reset active type to Breakfast
    typeBtns.forEach(b => b.classList.remove('active'));
    typeBtns[0].classList.add('active');
}

// Simple Count Animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
