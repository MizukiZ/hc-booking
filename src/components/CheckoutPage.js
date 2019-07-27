// MyStoreCheckout.js
import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../css/Stripe.css'

class CheckoutPage extends React.Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_0iLQxnoMSnz8brNv1VplvgY1">
        <div className="stripeForm">
          <h1>お支払いページ</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default CheckoutPage