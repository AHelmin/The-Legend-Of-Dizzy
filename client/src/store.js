import { createStore } from "redux";

// Initial state
const initialState = {
  email: '',
  battlescore: 900,
  rpgscore: 200,
  shooterScore: 11,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_BATTLESCORE":
      return { ...state, battlescore: action.payload };
      case "SET_RPGSCORE":
        return { ...state, rpgscore: action.payload };
        case "SET_SHOOTERSCORE":
          return { ...state, shooterScore: action.payload};

    default:
      return state;
  }
};

// Create store
const store = createStore(rootReducer);

export default store;
