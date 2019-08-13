import React, { Component } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux'
import axios from "axios"
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BeatLoader from 'react-spinners/BeatLoader';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { process: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    if (!this.state.process) {

      this.setState({ process: true })

      const fullname = `${this.props.bookingInfo.firstname} ${this.props.bookingInfo.lastname}`
      const stripToken = await this.props.stripe.createToken({ name: fullname })
      const errorMessageJp = { 'incomplete_number': "カード番号をご確認ください", 'incomplete_expiry': '有効期限をご確認ください', 'invalid_expiry_year_past': '有効期限をご確認ください', 'incomplete_cvc': 'セキュリティコードをご確認ください' }

      // input validation errors
      if (stripToken.error) {
        this.setState({ process: false })
        toast.error(<i style={{ fontWeight: 'bold' }}>{errorMessageJp[stripToken.error.code]}</i>)
      } else {
        // no validation errors, process

        // hc api url
        const localhostApi = `http://localhost:3000`
        const productionApi = 'https://hc-booking-api.herokuapp.com'

        const hcApi = process.env.NODE_ENV === "development" ? localhostApi : productionApi

        const { firstname, lastname, email, phone, content, start_at, end_at, optionId } = this.props.bookingInfo

        let response = await axios.post(`${hcApi}/api/v1/payments`, {
          tokenId: stripToken.token.id,
          firstname, lastname, email, phone, content, start_at, end_at, optionId
        })

        if (response.status === 200) {
          toast.dismiss()
          this.setState({ process: false })
          // redirect to thank you page
          this.props.history.push('/thankyou')
        }
      }

    }
  }

  render() {
    return (
      <Grid container className="checkout">
        <Grid item xs={12} sm={6}>
          <label>
            カード番号
        <CardNumberElement />
          </label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>
            有効期限
        <CardExpiryElement />
          </label>
        </Grid>
        <Grid item xs={12} sm={6}>

          <label>
            セキュリティコード
        <CardCvcElement />
          </label>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button onClick={this.submit}>{this.state.process ? <BeatLoader color='#fff' /> : "お支払い"}</Button>

        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    bookingInfo: state.bookingInfo
  }
}

export default withRouter(connect(mapStateToProps)(injectStripe(CheckoutForm)))