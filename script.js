const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = []

//Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

//Fechar o modal do carrinho clicando fora
cartModal.addEventListener("click", function(event){
    if (event.target === cartModal){
        cartModal.style.display = "none"
    }
})
//fechar através do botão
closeModalBtn.addEventListener("click", function() {   
        cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){    
    let parentButton = event.target.closest(".add-to-cart-btn")    
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
        //add no carrinho
    }
})

//função add carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
//Se o item já existe, aumenta apenas a quantidade para +1
    if(existingItem) {
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()    

}
//Atualizar o carrinho

function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qnt: ${item.quantity}</p>
                <p>Valor: R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="bg-red-500 py-1 px-1 rounded text-white hover:bg-red-700 duration-200">Remover</button>
        </div>
   
        `

         total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}