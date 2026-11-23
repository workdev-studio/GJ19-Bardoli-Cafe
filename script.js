const products = [
 {name:"GJ19 Special Pizza",cat:"Pizza",price:330,desc:"Loaded with paneer, capsicum, onion, tomato & sweet corn.",img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"},
 {name:"Margherita Pizza",cat:"Pizza",price:240,desc:"A classic cheesy pizza favourite.",img:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"},
 {name:"Veg Cheese Pizza",cat:"Pizza",price:240,desc:"Veggies, delicious sauce and mozzarella cheese.",img:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80"},
 {name:"Veg Cheese Burger",cat:"Burgers",price:150,desc:"Veg patty, fresh vegetables, sauces and cheese.",img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
 {name:"Veg Burger",cat:"Burgers",price:120,desc:"A satisfying classic veg burger.",img:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"},
 {name:"Cheese Paneer Grilled Sandwich",cat:"Sandwiches",price:270,desc:"Loaded with vegetables, paneer and cheese.",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"},
 {name:"Paneer Grilled Sandwich",cat:"Sandwiches",price:220,desc:"Grilled bread with vegetables, sauces and paneer.",img:"https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=700&q=80"},
 {name:"Cheese Grilled Sandwich",cat:"Sandwiches",price:200,desc:"Grilled vegetable sandwich with cheese.",img:"https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=700&q=80"},
 {name:"Regular Grilled Sandwich",cat:"Sandwiches",price:150,desc:"A tasty grilled vegetable sandwich.",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"},
 {name:"Salted French Fries",cat:"Snacks",price:100,desc:"Crispy golden fries, simply delicious.",img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
 {name:"Garlic Bread (3 Pieces)",cat:"Snacks",price:150,desc:"Garlic bread with mozzarella cheese.",img:"https://images.unsplash.com/photo-1619531040576-f94167406613?auto=format&fit=crop&w=700&q=80"},
 {name:"Maggi Masala",cat:"Snacks",price:100,desc:"A comforting, flavour-packed snack.",img:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=700&q=80"},
 {name:"Spring Roll",cat:"Snacks",price:120,desc:"Crispy rolls for a crunchy bite.",img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"},
 {name:"Cold Coffee",cat:"Beverages",price:90,desc:"A chilled coffee treat made with milk.",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"}
];
const cart = [];
const grid = document.getElementById("foodGrid");
function render(filter="All"){
 const list = filter==="All" ? products : products.filter(p=>p.cat===filter);
 grid.innerHTML = list.map(p=>`<article class="food-card"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="food-info"><span class="food-meta">${p.cat}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="food-bottom"><span class="price">₹${p.price}</span><button class="add-btn" data-name="${p.name}">+ Add</button></div></div></article>`).join("");
 document.querySelectorAll(".add-btn").forEach(btn=>btn.addEventListener("click",()=>{const item=products.find(p=>p.name===btn.dataset.name);cart.push(item);updateCart();btn.textContent="Added ✓";setTimeout(()=>btn.textContent="+ Add",900)}));
}
function updateCart(){
 const total=cart.reduce((s,p)=>s+p.price,0);
 document.getElementById("cartCount").textContent=`${cart.length} item${cart.length===1?"":"s"}`;
 document.getElementById("cartTotal").textContent=`₹${total}`;
 document.getElementById("cartBar").classList.toggle("show",cart.length>0);
}
document.getElementById("filters").addEventListener("click",e=>{if(!e.target.matches(".filter"))return;document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");render(e.target.dataset.filter)});

document.getElementById("sendOrder").addEventListener("click", () => {

    if (cart.length === 0) return;

    const grouped = cart.reduce((a, p) => {
        a[p.name] = a[p.name] || {
            qty: 0,
            price: p.price
        };
        a[p.name].qty++;
        return a;
    }, {});

    const total = cart.reduce((sum, p) => sum + p.price, 0);

    const orderDetails = Object.entries(grouped)
        .map(([name, item]) =>
            `${item.qty} x ${name} - ₹${item.price * item.qty}`
        )
        .join("\n");

    // Confirmation dialog
    const confirmed = window.confirm(
        `GJ19 THE BARDOLI CAFE\n\n` +
        `ORDER SUMMARY\n\n` +
        `${orderDetails}\n\n` +
        `----------------------\n` +
        `Grand Total: ₹${total}\n\n` +
        `Do you want to confirm this order and continue to WhatsApp?`
    );

    // Cancel clicked
    if (!confirmed) return;

    // Professional WhatsApp message
    const message =
`🍕 *NEW ORDER REQUEST*

Hello GJ19 The Bardoli Cafe! 👋

I would like to place an order.

📋 *ORDER DETAILS*
${orderDetails}

━━━━━━━━━━━━━━
💰 *TOTAL: ₹${total}*
━━━━━━━━━━━━━━

Please confirm my order and share the estimated preparation time.

Thank you! 😊`;

    const whatsappURL =
        `https://wa.me/916355440598?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

});

document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
render();
