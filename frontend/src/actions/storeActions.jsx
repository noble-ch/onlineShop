/* eslint-disable no-unused-vars */
import axios from "axios";
import {
	STORE_CREATE_REVIEWS_REQUEST,
	STORE_CREATE_REVIEWS_SUCCESS,
	STORE_CREATE_REVIEWS_FAIL,
	STORE_LIST_REVIEWS_REQUEST,
	STORE_LIST_REVIEWS_SUCCESS,
	STORE_LIST_REVIEWS_FAIL
} from "../constants/storeConstants";

export const createStoreReview = (review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: STORE_CREATE_REVIEWS_REQUEST
		});

		const {
			userLogin: { userInfo }
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.token}`
			}
		};

		const { data } = await axios.post("/api/store/reviews/", review, config);
		dispatch({
			type: STORE_CREATE_REVIEWS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: STORE_CREATE_REVIEWS_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};

export const listStoreReviews = () => async (dispatch) => {
	try {
		dispatch({ type: STORE_LIST_REVIEWS_REQUEST });

		const { data } = await axios.get("/api/store/reviews/list");

		dispatch({
			type: STORE_LIST_REVIEWS_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: STORE_LIST_REVIEWS_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message
		});
	}
};
