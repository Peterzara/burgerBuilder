import * as actionTypes from './actionTypes';
import axios from '../../axios.order';

export const addIngredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.ADD_INGREDIENT
    }
};

export const removeIngredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.REMOVE_INGREDIENT
    }
};

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL
    }
};

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-f1561.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredient(res.data))
            })
            .catch(error => {
                dispatch(fetchIngredientFailed())
            });
    };
};