let orders = JSON.parse(localStorage.getItem("orders")) || [];
let orderContainer = document.getElementById("order-container");//

if (orders.length === 0) {
    orderContainer.innerHTML = `<h2>No orders!</h2>`;
} else {
    orderContainer.innerHTML = `
    <table class="order-table">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Items</th>
                <th>Total Quantity</th>
                <th>Total Price</th>
                <th>Re Order</th>
            </tr>
        </thead>
        <tbody>
            ${orders.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.date || "N/A"}</td>
                    <td>
                        <table class="items-table">
                            ${order.cart.map(o => `
                                <tr>
                                    <td><img src="${o.strMealThumb}" alt="${o.strMeal}" class="meal-img"></td>
                                    <td>${o.strMeal}</td>
                                    <td>${o.quantity}</td>
                                     <td>${o.price}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </td>
                    <td>${order.total}</td>
                    <td>${"💲Price:"+order.totalPrice}</td>
                    <td><button class="Re-btn" onClick="Reorder('${order.id}')">ReOrder</button></td>
                </tr>
            `).join('')}
        </tbody>
    </table>
`;
}
//reOrder function
function Reorder(id){
    let order = orders.find(o => o.id == id);
    if(!order){
        return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = [...cart, ...order.cart];//adding the order.cart items to cart
    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(()=>{
        window.location.href="cart.html";//redirecting to cart page
    },1000);
}

