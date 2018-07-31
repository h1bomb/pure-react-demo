import { connect } from 'react-redux';
import SEARCH_ITEM, { FETCH_DATA } from '../actions';
import App from '../components/app';


export default connect(state => ({
  val: state.value,
  list: state.list,
  error: state.message,
  isLoading: state.isLoading,
}), dispatch => ({
  fetchData: () => {
    dispatch({ type: FETCH_DATA });
  },
  searchItem: (value) => {
    dispatch({ type: SEARCH_ITEM, value });
  },
}))(App);
