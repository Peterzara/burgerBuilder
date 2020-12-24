import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICE = {
    salad: 0.3,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1.0
}

const reducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            let updatedIngredient = { [ action.ingredientName ]: state.ingredients[ action.ingredientName ] + 1 };
            let updatedIngredients = updatedObject( state.ingredients, updatedIngredient );
            let updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[ action.ingredientName ],
                building: true
            }
            return updatedObject( state, updatedState );
        case actionTypes.REMOVE_INGREDIENT:
            let updatedIng = { [ action.ingredientName ]: state.ingredients[ action.ingredientName ] - 1 };
            let updatedIngs = updatedObject( state.ingredients, updatedIng );
            let updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[ action.ingredientName ],
                building: true
            }
            return updatedObject( state, updatedSt );
        case actionTypes.SET_INGREDIENT:
            let updatedSta = {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            }
            return updatedObject( state, updatedSta );
        case actionTypes.FETCH_INGREDIENT_FAIL:
            let updatedStat = {
                error: true
            }
            return updatedObject( state, updatedStat );
        default:
            return state;
    }
};

export default reducer;