/* eslint-disable no-case-declarations */
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_CLEAR_ITEMS,
	CART_ADD_CUSTOM_ITEM
} from "../constants/cartConstants";

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
		case CART_ADD_CUSTOM_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					)
				};
			} else {
				return {
					...state,
					cartItems: [
						...state.cartItems,
						{
							...item,
							isCustom: action.type === CART_ADD_CUSTOM_ITEM ? true : false, // Add an 'isCustom' flag
						}
					]
				};
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload)
			};

		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload
			};

		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload
			};

		case CART_CLEAR_ITEMS:
			return {
				...state,
				cartItems: []
			};

		default:
			return state;
	}
};
