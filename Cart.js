function showCart() {
    let cartContainer = document.getElementById("card-container");//cart container 
    let cart = JSON.parse(localStorage.getItem("cart")) || []; //cart array
    document.getElementById("cartShow").innerText = cart.length;//its shows the cart count
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.Please add something!</p>";
        document.getElementById("totalPrice").innerText = "";
        return;
    }
         //calculating total price 
         let totalPrice= cart.reduce((acc,food)=>{
            return acc+(parseFloat(food.price)*food.quantity);
        },0);
        document.getElementById("totalPrice").innerText=`Total:💲${totalPrice.toFixed(2)}`;
    //displaying the cart
    cartContainer.innerHTML = cart.map(displayCart).join('');
}

function displayCart(food) {
    let price = parseFloat(food.price) * food.quantity; //price calculation on the basis of quantity
    food.price = price.toFixed(2);
    return `
        <div class="card">
            <img src="${food.strMealThumb}" alt="${food.strMeal}" />
            <h3>${food.strMeal}</h3>
            <p>Category: ${food.strCategory}</p>
            <p>Quantity: ${food.quantity}</p>
            <p>⭐ ${food.rating} / 5</p>
             <p>💲Price: $${food.price}</p>
            <button onClick="removeFromCart('${food.idMeal}')">Remove from Cart</button>
            <button onClick="increase('${food.idMeal}')">+</button>
            <button onClick="decrease('${food.idMeal}')">-</button>
        </div>
    `;
}

//remove from cart
function removeFromCart(id) {
 let cart = JSON.parse(localStorage.getItem("cart")) || [];//cart array
 let isFoodExist = cart.find(food => food.idMeal === id);

    if (isFoodExist) {
        isFoodExist.quantity--; 

        if (isFoodExist.quantity === 0) {
            cart = cart.filter(food => food.idMeal !== id);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));  
    showCart();//show cart to reflect changes
    messagePopup("Food removed from cart successfully");
}
//increase count in cart
function increase(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let isFoodExist = cart.find(food => food.idMeal === id);

    if (isFoodExist) {
        isFoodExist.quantity++; 
    }
    localStorage.setItem("cart", JSON.stringify(cart));  
    showCart();
}
//decrease count in cart
function decrease(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let isFoodExist = cart.find(food => food.idMeal === id);

    if (isFoodExist) {
        isFoodExist.quantity--; 

        if (isFoodExist.quantity === 0) {
            cart = cart.filter(food => food.idMeal !== id);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));  
    showCart();
}

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
// checkOut functionality
let checkout = document.getElementById("checkout");
checkout.addEventListener("click",(e)=>{
    e.preventDefault();
    let cart=JSON.parse(localStorage.getItem("cart")) || [];//cart array
    if(cart.length===0){
        messagePopup("Your cart is empty.Please add something!");
        return;
    }
    //calculating total price
    let totalPrice= cart.reduce((acc,food)=>{
        return acc+(parseFloat(food.price)*food.quantity);
    },0);

    let total=0;//total quantity of food items
    cart.forEach(food=>{
        total+=food.quantity;
    })
    //creating obj for order with date,id,cart,total
    let order={
        totalPrice:totalPrice.toFixed(2),
        date: new Date().toLocaleDateString(),
        id:Date.now(),
        cart:cart,
        total:total
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];//orders array
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

   messagePopup("Order placed successfully");
   localStorage.removeItem("cart");
   showCart();
   setTimeout(()=>{
       window.location.href="order.html"; //redirect to order page
   },3000);
})

document.addEventListener("DOMContentLoaded", showCart);
