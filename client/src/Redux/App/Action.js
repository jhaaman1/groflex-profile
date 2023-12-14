import axios from "axios";
import * as type from "./ActionType";

const isDataLoding = {
    type: type.GET_DATA_REQUEST,
};
const isDeleteDataRequest = {
    type: type.DELETE_DATA_REQUEST,
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

export const isDeleteDataSuccess = (payload) => {
    return {
        type: type.DELETE_DATA_SUCCESS,
        payload: payload,
    };
};

const isDeleteDataFailed = {
    type: type.DELETE_DATA_FAILURE,
};

export const deleteData = (id) => async (dispatch) => {
    dispatch(isDeleteDataRequest);
    try {
        await axios.delete(`http://localhost:8080/api/user/move-to-trash-user/${id}`);
        dispatch(isDeleteDataSuccess(id));
    } catch (err) {
        dispatch(isDeleteDataFailed);
    }
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