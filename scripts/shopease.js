import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


loadProducts(renderProductsGrid);


function renderProductsGrid() {

  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      
      <div class="product-rating-container">
        <img class="product-rating-stars" src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      
      <div class="product-price">
        ${product.getPrice()}
      </div>
      
      <div class="product-quantity-container">
        <label for="quantity-1" class="visually-hidden">Select quantity</label>
        <select 
          data-quantity-selector="${product.id}"          id="quantity-${product.id}"
          name="quantity-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}
      
      <div class="product-spacer"></div>
      
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" alt="Checkmark icon"> Added
      </div>
      
      <button class="add-to-cart-button 
      button-primary
      js-add-to-cart"
      data-product-id = "${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  });

  // console.log(productsHTML);

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  updateCartQuantity();

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    const cartQuantityElement =
      document.querySelector(".js-cart-quantity");
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }

  }
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      const selector = document.querySelector(`[data-quantity-selector="${productId}"]`);
      const quantity = Number(selector.value);

      addToCart(productId, quantity);
      updateCartQuantity();

    });
  });
}
