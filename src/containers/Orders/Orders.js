import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios.order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = 
                this.props.orders.map(order => (
                    <Order
                        price={+order.price}
                        key={order.id}
                        ingredients={order.ingredients} />
                ))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(action.fetchOrder(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));