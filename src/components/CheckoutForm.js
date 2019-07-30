import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux'
import axios from "axios"

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    const stripToken = await this.props.stripe.createToken({ name: "Name" })
    let response = await axios.post("http://localhost:3000/api/v1/payments", {
      tokenId: stripToken.token.id,
      email: this.props.bookingInfo.email,
      optionId: this.props.bookingInfo.optionId
    })

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

const mapStateToProps = function (state) {
  return {
    bookingInfo: state.bookingInfo
  }
}

export default connect(mapStateToProps)(injectStripe(CheckoutForm))