const buyButtons = document.querySelectorAll(".buy-button");

const cartButton = document.querySelector("#cart-button");
const cart = document.querySelector("#cart");
const closeCartButton = document.querySelector("#close-cart");
const cartItemsContainer = document.querySelector("#cart-items");

let cartItems = [];

function showCartItems() {
  cartItemsContainer.innerHTML = "";

  cartItems.forEach(function (product) {
    const productElement = document.createElement("p");

    productElement.textContent =
      product.name + " - " + product.quantity + " st";

    cartItemsContainer.appendChild(productElement);
  });
}

buyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = button.dataset.name;

    const productContent = button.parentElement;
    const quantityInput = productContent.querySelector(".quantity");
    const quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1) {
      alert("Antalet måste vara minst 1.");
      return;
    }

    const existingProduct = cartItems.find(function (product) {
      return product.name === productName;
    });

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cartItems.push({
        name: productName,
        quantity: quantity,
      });
    }

    showCartItems();

    alert("Vara lagd i varukorg: " + productName);
  });
});

cartButton.addEventListener("click", function () {
  cart.style.display = "block";
});

closeCartButton.addEventListener("click", function () {
  cart.style.display = "none";
});
