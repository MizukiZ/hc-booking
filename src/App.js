import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';

import SectionTitle from './components/SectionTitle'
import OptionCards from './components/OptionCard'
import DateAndTime from './components/DateAndTime'
import ClientInfomationForm from './components/ClientInfomationForm'
import CheckoutPage from './components/CheckoutPage'
import ThankYouPage from './components/ThankYouPage'
import { fetchOptionsDataFromApi, fetchAppointmentsDataFromApi, updateSubmitFormError, fetchSettingsDataFromApi } from './store/actions/index'

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { Route, withRouter } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BeatLoader from 'react-spinners/BeatLoader';
class App extends Component {
  render() {
    return (
      < Container fixed >
        <ToastContainer />
        {/* home path */}
        <Route path='/' exact component={() => {

          if (this.props.options) {
            return (<Card style={{ padding: 20, margin: 20 }}>
              <SectionTitle title={"お客様情報"} />
              <ClientInfomationForm />
              <SectionTitle title={"オプション"} />
              {this.props.options && <OptionCards options={this.props.options} />}
              <SectionTitle title={"日程"} />
              {this.props.settings && <DateAndTime />}

              <Grid style={{ margin: 20 }}>
                <Grid item style={{ textAlign: 'center' }}>
                  <Button
                    id='formSubmitBtn'
                    variant="contained"
                    onClick={() => {
                      this.props.updateSubmitState().then(() => {
                        if (this.props.submitError) {
                          // submission error handling
                          toast.error(<i style={{ fontWeight: 'bold' }}>ご入力内容をもう一度ご確認ください</i>)
                        } else {
                          toast.dismiss()
                          // jump to payment page
                          this.props.history.push('/payment')
                        }
                      })
                    }}
                  >
                    予約する
                    </Button>
                </Grid>
              </Grid>
            </Card>)
          } else {
            return (
              <Grid container style={{ padding: '5em' }}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <BeatLoader color='#36D7B7' />
                </Grid>
              </Grid>
            )
          }

        }} />

        {/* payment path */}
        <Route path='/payment/' component={() => {
          return <CheckoutPage />
        }} />

        {/* thank you page path */}
        <Route path='/thankyou/' component={() => {
          return <ThankYouPage />
        }} />
      </Container >
    );
  }

  componentDidMount() {
    //initial fetch options
    this.props.fetchOptions()
    this.props.fetchSettings()
    this.props.fetchAppointments()
  }
}

const mapStateToProps = function (state) {
  return {
    options: state.options,
    settings: state.settings,
    appointments: state.appointments,
    submitError: state.bookingInfo.submitError,
    formIsCompleted: state.bookingInfo.formIsCompleted
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOptions: () => dispatch(fetchOptionsDataFromApi()),
    fetchSettings: () => dispatch(fetchSettingsDataFromApi()),
    fetchAppointments: () => dispatch(fetchAppointmentsDataFromApi()),
    updateSubmitState: () => dispatch(updateSubmitFormError())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
