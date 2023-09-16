import {
	STORE_CREATE_REVIEWS_REQUEST,
	STORE_CREATE_REVIEWS_SUCCESS,
	STORE_CREATE_REVIEWS_FAIL,
	STORE_CREATE_REVIEWS_RESET,
	STORE_LIST_REVIEWS_REQUEST,
	STORE_LIST_REVIEWS_SUCCESS,
	STORE_LIST_REVIEWS_FAIL
} from "../constants/storeConstants";
export const storeReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case STORE_CREATE_REVIEWS_REQUEST:
			return { loading: true };

		case STORE_CREATE_REVIEWS_SUCCESS:
			return { loading: false, success: true };

		case STORE_CREATE_REVIEWS_FAIL:
			return { loading: false, error: action.payload };

		case STORE_CREATE_REVIEWS_RESET:
			return {};

		default:
			return state;
	}
};

export const storeReviewsReducer = (
	state = { loading: true, reviews: [] },
	action
) => {
	switch (action.type) {
		case STORE_LIST_REVIEWS_REQUEST:
			return { loading: true, reviews: [] };
		case STORE_LIST_REVIEWS_SUCCESS:
			return { loading: false, reviews: action.payload };
		case STORE_LIST_REVIEWS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
