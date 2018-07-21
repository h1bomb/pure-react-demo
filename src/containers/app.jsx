import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Search from '../components/search';
import List from '../components/list';
import SEARCH_ITEM, { FETCH_DATA } from '../actions';

const LoadableErrorComponent = Loadable({
  loader: () => import('../components/error'),
  loading: () => (
    <div>
       Loading...
    </div>
  ),
});

const LoadErr = ({ message }) => (
  <LoadableErrorComponent message={message} />
);

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: FETCH_DATA });
  }

  setValue = (val) => {
    const { dispatch } = this.props;
    dispatch({ type: SEARCH_ITEM, value: val.target.value });
  }

  render() {
    const {
      val, list, error, isLoading,
    } = this.props;
    return (
      <div>
        <LoadErr message={error} />
        <Search value={val} setValue={this.setValue} />
        <List filter={val} data={list} isLoading={isLoading} />
      </div>);
  }
}

export default connect(state => ({
  val: state.value,
  list: state.list,
  error: state.message,
  isLoading: state.isLoading,
}))(App);
