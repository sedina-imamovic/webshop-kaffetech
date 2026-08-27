let products = [];
let cartItems = [];

const productList = document.querySelector("#productList");

const cartButton = document.querySelector("#cart-button");
const cart = document.querySelector("#cart");
const closeCartButton = document.querySelector("#close-cart");
const cartItemsContainer = document.querySelector("#cart-items");

async function getProducts() {
  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Kunde inte hämta produkterna.");
    }

    products = await response.json();

    console.log(products);

    renderProducts(products);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
  }
}

function renderProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product-item");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.imageAlt;

    article.appendChild(productImage);

    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productName.classList.add("product-name");

    article.appendChild(productName);

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;
    productDescription.classList.add("product-description");

    article.appendChild(productDescription);

    const productPrice = document.createElement("span");
    productPrice.textContent = product.price + " kr";
    productPrice.classList.add("price");

    article.appendChild(productPrice);

    if (product.badge) {
      const badge = document.createElement("span");

      badge.classList.add("badge");
      badge.textContent = product.badge;

      article.appendChild(badge);
    }

    const quantityLabel = document.createElement("label");

    quantityLabel.textContent = "Antal:";
    quantityLabel.classList.add("quantity-label");

    const quantityInput = document.createElement("input");

    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = "1";
    quantityInput.classList.add("quantity");

    const inputId = "quantity-" + product.id;

    quantityInput.id = inputId;
    quantityLabel.setAttribute("for", inputId);

    article.appendChild(quantityLabel);
    article.appendChild(quantityInput);

    const buyButton = document.createElement("button");

    buyButton.textContent = "Lägg i varukorg";
    buyButton.classList.add("buy-button");

    article.appendChild(buyButton);

    buyButton.addEventListener("click", () => {
      const quantity = Number(quantityInput.value);

      if (quantity < 1 || !Number.isInteger(quantity)) {
        alert("Antalet måste vara minst 1.");
        return;
      }

      const existingProduct = cartItems.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cartItems.push({
          name: product.name,
          quantity: quantity,
        });
      }

      showCartItems();

      alert("Vara lagd i varukorg: " + product.name);
    });

    productList.appendChild(article);
  });
}

function showCartItems() {
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((product) => {
    const productElement = document.createElement("p");

    productElement.textContent =
      product.name + " - " + product.quantity + " st";

    cartItemsContainer.appendChild(productElement);
  });
}

if (cartButton && cart && closeCartButton) {
  cartButton.addEventListener("click", () => {
    cart.style.display = "block";
    showCartItems();
  });

  closeCartButton.addEventListener("click", () => {
    cart.style.display = "none";
  });
}

if (productList) {
  getProducts();
}
