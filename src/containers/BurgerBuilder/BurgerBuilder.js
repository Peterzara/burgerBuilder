import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios.order';

import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredient();
    }

    updatePurchasable( ingredients ) {
        const sum = Object.keys( ingredients ).map( key => {
            return ingredients[ key ];
        } ).reduce( ( sum, el ) => sum + el, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState( { purchasing: true } );    
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.igns) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.igns[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push( { pathname: '/checkout' } );
    }

    render() {
        const disableInfo = { ...this.props.igns };
        for ( let key in disableInfo ) { // [salad, cheese, ...]
            disableInfo[ key ] = ( disableInfo[ key ] <= 0 );
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if ( this.props.igns ) {
            orderSummary = <OrderSummary
                ingredients={this.props.igns}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.props.price} />;

            burger = (
                <Aux>
                    <Burger ingredients={this.props.igns} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRvm}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable( this.props.igns )}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                    />
                </Aux>
            );
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        /** OrderSummary: 账单 **/
        /** Burger: 汉堡ui，controller **/
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            igns: state.burgerBuilder.ingredients,
            price: state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error,
            isAuth: state.auth.token !== null
        }
    );
};

const mapDispatchToProps = dispatch => {
    return (
        {
            onIngredientAdd: ( ign ) => dispatch( actions.addIngredient( ign ) ),
            onIngredientRvm: ( ign ) => dispatch( actions.removeIngredient( ign ) ),
            onInitIngredient: () => dispatch( actions.initIngredient() ),
            onInitPurchase: () => dispatch( actions.purchaseInit() ),
            onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
        }
    );
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );