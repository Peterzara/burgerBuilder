import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSidedrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState( { showSidedrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSidedrawer: !prevState.showSidedrawer }
        } );
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    clickedMenu={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated} />
                <Sidedrawer
                    closed={this.sideDrawerCloseHandler}
                    open={this.state.showSidedrawer}
                    isAuth={this.props.isAuthenticated} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect( mapStateToProps )( Layout );