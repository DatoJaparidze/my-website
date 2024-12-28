function showLoadingSpinner() {
    const checkoutButton = document.getElementById('checkout-btn');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    checkoutButton.appendChild(spinner);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checking out.');
    } else {
        showLoadingSpinner(); // Show spinner
        setTimeout(() => {
            alert('Thank you for shopping with us! Your order has been placed.');
            cart = []; // Empty the cart after checkout
            updateCart(); // Update the cart display
        }, 3000); // Simulate loading time of 3 seconds
    }
}


const express = require('express');
const stripe = require('stripe')('sk_test_51Qb2ErGdvm5LjcKqDcfxkaC2NW62Rzt7cujWeDixlaiT1y7IIHzBYLCPxKUlP4JIxKPt76ss2NBD0hys5XEtWzeX00Zi11Uj4k'); // Replace with your secret key
const app = express();

app.use(express.json()); // Parse incoming JSON requests

app.post('/checkout', async (req, res) => {
  const { items, totalAmount } = req.body; // Get cart items and total from the front end

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: 'usd',
      metadata: { items: JSON.stringify(items) }, // Add cart details for reference
    });

    res.send({
      clientSecret: paymentIntent.client_secret, // Send client secret to the front end
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});







