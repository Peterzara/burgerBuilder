import React from 'react';

import { withRouter } from 'react-router-dom';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

//string[] -> ['salad','cheese','meat']
//[salad:1, cheese:1, meat:2]
//
const burger = (props) => {
    let transformedIngredients = Object.keys( props.ingredients )
    .map( igKey => {
        return [...Array( props.ingredients[igKey])].map( ( _, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);