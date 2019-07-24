import React, { Component } from 'react';
import './css/App.css';
import { connect } from 'react-redux';

import SectionTitle from './components/SectionTitle'
import { fetchOptionsDataFromApi } from './store/actions/index'

class App extends Component {
  render() {
    return (
      <div className="container-fluid" >
        <SectionTitle title={"お客様情報"} />
        <SectionTitle title={"オプション"} />
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
    options: state.optinos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOptions: () => dispatch(fetchOptionsDataFromApi())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
