import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../css/Stripe.css'

import { withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import { updateSubmitFormError } from '../store/actions/index'

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

  componentDidMount() {
    // check if the submit form is completed
    if (!this.props.formIsCompleted) {

      // updateSubmitState to make error on the form 
      this.props.updateSubmitState().then(() => {
        // if the form is not completed, then redirect back to form page
        this.props.history.push('/')
      })
    }
  }
}

const mapStateToProps = function (state) {
  return {
    submitError: state.bookingInfo.submitError,
    formIsCompleted: state.bookingInfo.formIsCompleted
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSubmitState: () => dispatch(updateSubmitFormError())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage))
