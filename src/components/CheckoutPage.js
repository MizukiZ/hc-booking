import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import '../css/Stripe.css'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SectionTitle from './SectionTitle'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import { updateSubmitFormError } from '../store/actions/index'
import moment from 'moment'

class CheckoutPage extends React.Component {

  render() {
    const { options } = this.props
    const { firstname, lastname, email, phone, optionId, start_at } = this.props.bookingInfo

    return (
      <StripeProvider apiKey="pk_test_0iLQxnoMSnz8brNv1VplvgY1">
        <Card style={{ padding: 20, margin: 20 }}>
          <SectionTitle title="ご予約内容確認"></SectionTitle>
          <List>
            <Grid
              container
            >
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText
                    primary="名字"
                    secondary={lastname}
                  />
                </ListItem>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText
                    primary="名前"
                    secondary={firstname}
                  />
                </ListItem>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText
                    primary="メール"
                    secondary={email}
                  />
                </ListItem>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText
                    primary="電話番号"
                    secondary={phone}
                  />
                </ListItem>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText
                    primary="オプション"
                    secondary={optionId &&
                      options.filter((option) => {
                        return option.id === optionId
                      })[0].title
                    }
                  />
                </ListItem>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText
                    primary="日時"
                    secondary={moment(start_at).format('YYYY年M月D日　HH時mm分')}
                  />
                </ListItem>
                <Divider />
              </Grid>
            </Grid>
          </List>

          <SectionTitle title="お支払い"></SectionTitle>
          <div className="stripeForm">
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </Card>
      </StripeProvider >
    );
  }

  componentDidMount() {
    // check if the submit form is completed
    if (!this.props.bookingInfo.formIsCompleted) {

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
    options: state.options,
    bookingInfo: state.bookingInfo
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateSubmitState: () => dispatch(updateSubmitFormError())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage))
