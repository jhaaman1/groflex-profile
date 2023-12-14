import axios from "axios";
import * as type from "./ActionType";

const isDataLoding = {
    type: type.GET_DATA_REQUEST,
};

export const isDataLodingSuccess = (payload) => {
    return {
        type: type.GET_DATA_SUCCESS,
        payload: payload,
    };
};

const isDataLodingFailed = {
    type: type.GET_DATA_FAILURE,
};

export const getData = (page) => async (dispatch) => {
    dispatch(isDataLoding);
    try {
        const response = await axios.get(`http://localhost:8080/api/user-registration/${page}`);
        dispatch(isDataLodingSuccess(response.data));
        return response.data; 
    } catch (err) {
        dispatch(isDataLodingFailed);
    }
};