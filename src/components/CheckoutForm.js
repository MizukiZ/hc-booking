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
    const fullname = `${this.props.bookingInfo.firstname} ${this.props.bookingInfo.lastname}`
    const stripToken = await this.props.stripe.createToken({ name: fullname })

    let response = await axios.post("http://localhost:3000/api/v1/payments", {
      tokenId: stripToken.token.id,
      firstname: this.props.bookingInfo.firstname,
      lastname: this.props.bookingInfo.lastname,
      email: this.props.bookingInfo.email,
      phone: this.props.bookingInfo.phone,
      content: this.props.bookingInfo.content,
      datetime: this.props.bookingInfo.datetime,
      optionId: this.props.bookingInfo.optionId
    })

    if (response.status === 200) {
      this.setState({ complete: true })
      console.log("Purchase Complete!")
    }
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