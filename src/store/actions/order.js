import * as actionTypes from './actionTypes'
import axios from '../../axios.order';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderdata, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderdata)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderdata))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
};

export const fetchOrder = (token, userId) => {
    return (dispatch) => {
        dispatch({type: actionTypes.FETCH_ORDER_START});
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                // console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch({
                    type: actionTypes.FETCH_ORDER_SUCCESS, 
                    orders: fetchedOrders
                });
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.FETCH_ORDER_FAIL,
                    error: err
                })
            });
    }
}