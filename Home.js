//javaScaript file for the home page (index.html)..


let searchInput = document.getElementById("search-input");

let foodArray = []; //initial storage for food items

let cart = JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartShow").innerText = cart.length;//its shows the cart count


function fetchFood() {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                foodArray = data.meals.map((food)=>({
                    ...food,
                    price: (Math.random() * (20 - 5) + 5).toFixed(2),
                    rating: (Math.random() * (5 - 3) + 3).toFixed(1) 
                }))  


                let cardContainer = document.getElementById("card-container");//card container
                cardContainer.innerHTML = ""; 
                
                foodArray.forEach(food => {
                    cardContainer.innerHTML += displayCard(food);
                });
            } else {
                console.log("No meals found");
            }
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
}

function displayCard(food) {
    return `
        <div class="card">
            <img src="${food.strMealThumb}" alt="${food.strMeal}" />
            <h3>${food.strMeal}</h3>
            <p>Category: ${food.strCategory}</p>
            <p>⭐ ${food.rating} / 5</p>
             <p>💲Price: $${food.price}</p>
            <button onClick="addToCart('${food.idMeal}')">Add to Cart</button>
        </div>
    `;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; //cart array 
  document.getElementById("cartShow").innerText = cart.length+1; //update the cart count
    let isFoodExist = cart.find(food => food.idMeal === id);

    if (isFoodExist) {
        isFoodExist.quantity++; 
    } else {
        let food = foodArray.find(food => food.idMeal === id);
        if (food) {
            let foodCopy = { ...food, quantity: 1 }; 
            cart.push(foodCopy);
        } else {
            console.error("Food item not found");
            return;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));  
    messagePopup("Food added to cart successfully");
}
//popup message function to give notification to the user
function messagePopup(message) {
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerText = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("fade-out");
        setTimeout(() => {
            popup.remove();
        }, 500);
    }, 2500);
}
 //search function 
 function searchItems(searchValue){
    const filteredItems = foodArray.filter((item)=>{
        return item.strMeal.toLowerCase().includes(searchValue.toLowerCase());
    });
    if(filteredItems.length>0){
        let cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";
        filteredItems.forEach(food => {
            cardContainer.innerHTML += displayCard(food);  //re display the card this time with the filtered items
        });

    }
 }
//delay search function
let timeout=null;
searchInput.addEventListener("input", (e) => {
let searchValue = searchInput.value;
if(searchValue.length===0){
    fetchFood();
}
if(searchValue){
    if(timeout){
        clearTimeout(timeout);
    }
    timeout=setTimeout(()=>{
        searchItems(searchValue);
    },500);
}
});


document.addEventListener("DOMContentLoaded", fetchFood);
