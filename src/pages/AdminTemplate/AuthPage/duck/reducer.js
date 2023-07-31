import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_CLEAR_DATA,
} from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case AUTH_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case AUTH_FAIL:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    case AUTH_CLEAR_DATA:
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state };
    default:
      return { ...state };
  }
};

export default authReducer;
