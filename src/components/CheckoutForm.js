import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    this.props.stripe.createToken({ name: "Name" }).then((token) => {
      console.log(token)
    })

    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: { "Content-Type": "text/plain" },
    //   body: token.id
    // });

    // if (response.ok) {
    //   this.setState({ complete: true })
    //   console.log("Purchase Complete!")
    // }
  }

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);