import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updatedObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updatedObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updatedObject(action.orderData, { id: action.orderId });
            return updatedObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            });
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updatedObject(state, { loading: false });
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updatedObject(state, {
                loading: false,
                orders: action.orders
            })
        case actionTypes.FETCH_ORDER_START:
            return updatedObject(state, { loading: false });
        case actionTypes.FETCH_ORDER_FAIL:
            return updatedObject(state, { loading: false });
        default:
            return state;
    }
};

export default reducer;