import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';

import SectionTitle from './components/SectionTitle'
import OptionCards from './components/OptionCard'
import ClientInfomationForm from './components/ClientInfomationForm'
import { fetchOptionsDataFromApi } from './store/actions/index'

import Container from '@material-ui/core/Container';
class App extends Component {
  render() {
    return (
      <Container fixed >
        <SectionTitle title={"お客様情報"} />
        <ClientInfomationForm />
        <SectionTitle title={"オプション"} />
        {this.props.options && <OptionCards options={this.props.options} />}
        <SectionTitle title={"日程"} />
      </Container>
    );
  }

  componentDidMount() {
    //initial fetch options
    this.props.fetchOptions()
  }
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
