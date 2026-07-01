// =============================
// Theme Toggle
// =============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }

});


// =============================
// Add Items to List
// =============================

const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");

let items = [];

function renderItems() {

    itemList.innerHTML = "";

    items.forEach(item => {

        const li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);

    });

}

addBtn.addEventListener("click", () => {

    const value = itemInput.value.trim();

    if (value !== "") {

        items.push(value);      // Array method
        renderItems();

        itemInput.value = "";
        itemInput.focus();

    }

});


// =============================
// Fetch Random Quote
// =============================

const quoteBtn = document.getElementById("quoteBtn");
const quote = document.getElementById("quote");

quoteBtn.addEventListener("click", fetchQuote);

function fetchQuote() {

    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {

            quote.innerHTML =
                `"${data.content}" <br><strong>- ${data.author}</strong>`;

        })
        .catch(() => {

            quote.textContent = "Unable to fetch quote.";

        });

}