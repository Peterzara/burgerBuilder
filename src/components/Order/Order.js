import classes from './Order.module.css';
import React from 'react';

const order = (props) => {
    let ingredients = [];
    for (let igName in props.ingredients) {
        ingredients.push({
            name: igName,
            amount: props.ingredients[igName]
        });
    }
    let ingredientOutput = ingredients.map(ig => {
        return <span 
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ig.name} ({ig.amount})</span>;
    })
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order;