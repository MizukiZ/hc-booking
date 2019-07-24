import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';

import SectionTitle from './components/SectionTitle'
import OptionCards from './components/OptionCard'
import { fetchOptionsDataFromApi } from './store/actions/index'

class App extends Component {
  render() {
    return (
      <div className="container-fluid" >
        <SectionTitle title={"お客様情報"} />
        <SectionTitle title={"オプション"} />
        {this.props.options && <OptionCards options={this.props.options} />}
        <SectionTitle title={"日程"} />
      </div>
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
