import { cart } from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {

  let productPriceRupees = 0;
  let shippingPriceRupees = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceRupees += product.priceRupees * cartItem.quantity;

    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionsId);

    shippingPriceRupees += deliveryOption.priceRupees;
    totalQuantity += cartItem.quantity;

  });

  const totalBeforeTaxRupees = productPriceRupees + shippingPriceRupees;

  const taxRupees = totalBeforeTaxRupees * 0.1;
  const totalRupees = totalBeforeTaxRupees + taxRupees;

  const paymentSummaryHTML = ` 
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (<span class="js-checkout-qty"></span>):</div>
          <div class="payment-summary-money">₹${formatCurrency(productPriceRupees)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-shipping">₹${formatCurrency(shippingPriceRupees)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money js-before-tax">₹${formatCurrency(totalBeforeTaxRupees)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money js-tax">₹${formatCurrency(taxRupees)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-order-total">₹${formatCurrency(totalRupees)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-checkout-qty').textContent = totalQuantity;
  document.querySelector('.js-checkout-element').textContent = totalQuantity;


  document.querySelector('.js-place-order').addEventListener('click', async () => {

    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();
      addOrder(order);

    } catch (error) {
      console.log('Unexpected error. Try again later!');
    }

    window.location.href = 'orders.html';
  });
}
