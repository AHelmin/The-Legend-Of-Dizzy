import { createStore } from 'redux';

// Initial state
const initialState = {
  email: '', battlescore: 0,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
      case 'SET_BATTLESCORE':
      return { ...state, battlescore: action.payload };
    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

export default store;