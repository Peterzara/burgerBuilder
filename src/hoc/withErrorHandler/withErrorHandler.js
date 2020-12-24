import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axois) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axois.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axois.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axois.interceptors.request.eject(this.reqInterceptor);
            axois.interceptors.response.eject(this.resInterceptor);
        }

        errorClickedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return( 
                <Aux>
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorClickedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default withErrorHandler;