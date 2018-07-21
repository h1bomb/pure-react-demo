import SEARCH_ITEM, { LOAD_ERROR, LOAD_DATA, LOADING } from '../actions';

export default (state = {
  value: '', isLoading: true, list: [], message: '',
}, action) => {
  const {
    type, value, isLoading, list, message,
  } = action;

  if (type === SEARCH_ITEM) {
    return {
      ...state,
      value,
    };
  }

  if (type === LOADING) {
    return {
      ...state,
      isLoading,
    };
  }

  if (type === LOAD_DATA) {
    return {
      ...state,
      isLoading: false,
      list,
    };
  }

  if (type === LOAD_ERROR) {
    return {
      ...state,
      isLoading: false,
      message,
    };
  }
  return state;
};
