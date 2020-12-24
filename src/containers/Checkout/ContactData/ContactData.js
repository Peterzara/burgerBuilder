import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import axios from '../../../axios.order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formValid: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        
        const orderData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            orderData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            price: this.props.price,
            ingredients: this.props.ings,
            orderData: orderData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    reactInputHandler = (event, identifier) => {
        // console.log(event.target.value);
        const updatedElement = updatedObject( this.state.orderForm[ identifier ], {
            value: event.target.value,
            valid: checkValidity( event.target.value, this.state.orderForm[ identifier ].validation ),
            touched: true
        });
        const updatedOrderForm = updatedObject( this.state.orderForm, {
            [ identifier ]: updatedElement
        });
        // console.log(updatedElement);
        let formIsValid = true;
        for (let identifier in updatedOrderForm) {
            // 等价于A & B & C & D ...
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formValid: formIsValid});
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                {formElementArray.map(forElement => (
                    <Input
                        elementType={forElement.config.elementType}
                        elementConfig={forElement.config.elementConfig}
                        value={forElement.config.value}
                        key={forElement.id}
                        invalid={!forElement.config.valid}
                        shouldValidate={forElement.config.validation}
                        touched={forElement.config.touched}
                        valueType={forElement.config.elementConfig.type}
                        changed={(event) => this.reactInputHandler(event, forElement.id)} />
                ))}
                <Button 
                    clicked={this.orderHandler} 
                    btnType='Success'
                    disabled={!this.state.formValid}>
                ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderdata, token) => dispatch(actionCreators.purchaseBurger(orderdata, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));