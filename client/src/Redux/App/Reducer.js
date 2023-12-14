import * as ways from "./ActionType";

const initialState = {
  data: [],
  isLoding: false,
  isError: false,
};

function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ways.GET_DATA_SUCCESS:
      console.log("payload", payload);
      return { ...state, isLoding: false, isError: false, data: payload.data };
    case ways.GET_DATA_SUCCESS:
      return { ...state, isLoding: false, isError: false, data: payload };
    case ways.GET_DATA_FAILURE:
      return { ...state, isError: false, data: [], isLoding: false };
    case ways.DELETE_DATA_SUCCESS:
      console.log('Item deleted successfully:', payload);
      const updatedData = state.data.filter((item) => item.id !== payload);
      return { ...state, isLoding: false, isError: false, data: updatedData };
    case ways.DELETE_DATA_FAILURE:
      return { ...state, isError: false, data: [], isLoding: false };

    default:
      return state;
  }
}

export default Reducer;
