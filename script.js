
const menu =  document.getElementById("menu")
const cartBtn = document.getElementById("cart-count")
const cartmodal = document.getElementById("card-modal")
const cartitemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutbtn = document.getElementById("checkout-btn")
const closemodalbtn = document.getElementById("close-modal-btn")
const  cartcount = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addresswars = document.getElementById("address-wars")

let cart = []


// Abrir o motal do carrinho
cartBtn.addEventListener("click", function(){
  updateCartModal();
    cartmodal.style.display = "flex"
})

// Fechar o motal quando clicar fora
cartmodal.addEventListener("click", function(event){ if(event.target === cartmodal){
    cartmodal.style.display = "none"
}
})
// Fechar o carrinho qundo clicae em fechar
closemodalbtn.addEventListener("click", function(){
    cartmodal.style.display = "none"
})

 menu.addEventListener("click", function(event){
     const newLocal = event.target.closest(".add-to-cart-btn ")
    //console.log(event.target)


    let parentButton = event.target.closest(".add-to-cart-btn ")
    
    if(parentButton){
      const name = parentButton.getAttribute("data-name")
      const price = parentButton.getAttribute("data-price")
      addToCart(name, price)
    }
 })

 //Função para adicional no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){

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
        cartitemsContainer.innerHTML = "";
        let Total = 0;


         cart.forEach(item => {
           const cartItemElement = document.createElement("div");

           cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

            cartItemElement.innerHTML = `
             <div class = "flex items-center justify-between"  >
             <div>
             <p class=" font-medium">${item.name}<p>
             <p   " > Qtd:  ${item.quantity}<p>
             <p class="font-medium mt-2">kz ${item.price}<p>
             <div>
             
       
             <button class="remove-from-cart-btn" data-name="${item.name}">
               Remover
              <button>
       
             <div>
            `
           Total += item.price * item.quantity

           cartitemsContainer.appendChild(cartItemElement) 
         })

         cartTotal.textContent = Total.toLocaleString()


         cartcount.innerHTML = cart.length;


    }

//função para adicional função de remover
   cartitemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains  ("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
   
      removeItemCart(name);
    }

   })  

   function removeItemCart(name){

    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
if(item.quantity > 1){
    item.quantity -= 1;
    updateCartModal();
    return;
}  

cart.splice(index, 1);
updateCartModal();

    }
   }

   addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;



    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500"
        )
        addresswars.classList.add("hidden")
    }
    


   })


   // Finalizar pedido
   

   checkoutbtn.addEventListener("click", function()
   {
const isopen = checkRestaurantOpen();
if(!isopen){
    

  Toastify({text: "restaurante está fechado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right` 
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ef4444",
    },}).showToast();

   return;
  }


  

    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addresswars.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }
    





// enviar mensagem no whatapp
const cartItems = cart.map((item)=>{
    return (
       ` ${item.name} Quantidade: (${item.quantity}) preço: kz${item.price} |`
    )
  }).join("")

  const message = encodeURIComponent(cartItems)
  const phone = "946682698"
  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addresswars.value}`, "_blank")

  cart = [];
  updateCartModal();






   })

   function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 8 && hora < 22;
    // true = restaurante está aberto

}

 
const spanItem = document.getElementById("date-span")
const isopen = checkRestaurantOpen();

if(isopen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}

else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}







   

