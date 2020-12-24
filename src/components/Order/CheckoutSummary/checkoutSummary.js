import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './checkoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div>
                <Button 
                    clicked={props.clickCancelledHandler} 
                    btnType='Danger'>CANCEL</Button>
                <Button 
                    clicked={props.clickProcessedHandler} 
                    btnType='Success'>PURCHASE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;