import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';

import SectionTitle from './components/SectionTitle'
import OptionCards from './components/OptionCard'
import DateAndTime from './components/DateAndTime'
import ClientInfomationForm from './components/ClientInfomationForm'
import CheckoutPage from './components/CheckoutPage'
import { fetchOptionsDataFromApi } from './store/actions/index'

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
class App extends Component {
  render() {
    return (
      <Container fixed >
        <Card style={{ padding: 20, margin: 20 }}>
          <SectionTitle title={"お客様情報"} />
          <ClientInfomationForm />
          <SectionTitle title={"オプション"} />
          {this.props.options && <OptionCards options={this.props.options} />}
          <SectionTitle title={"日程"} />
          <DateAndTime />

          <Grid style={{ margin: 20 }}>
            <Grid item style={{ textAlign: 'center' }}>
              <Button style={styles.submitBtn} variant="contained">
                予約する
           </Button>
            </Grid>
          </Grid>
        </Card>
        <CheckoutPage />
      </Container>
    );
  }

  componentDidMount() {
    //initial fetch options
    this.props.fetchOptions()
  }
}

const styles = {
  submitBtn: { width: '200px', height: '60px', fontSize: '1.5em', background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', color: '#fff' }
}

const mapStateToProps = function (state) {
  return {
    options: state.options
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOptions: () => dispatch(fetchOptionsDataFromApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
