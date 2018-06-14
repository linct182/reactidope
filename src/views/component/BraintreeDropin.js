import React, { Component } from 'react';
import BraintreeDropin from "../../utils/braintreeDropinReact";
import braintree from "braintree-web-drop-in";
import styled from 'react-emotion';

import api from "../../utils/api";
import Loading from './Loading';

const LoadingContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});


class DropinPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: null,
            renderSubmitbutton:true,
        };
    }

    componentWillMount() {
        api({
            method: 'GET',
            url: '/payments/generate-auth-token'
        }).then((data) => {
            this.setState({ auth: data.data.clientToken })
        }).catch((err) => {

        });

    }

    handlePayment = (e) => {
        // paypal accounts does not have to be liabilityshifted.
        this.setState({
            buttonStyle: 'invisible'
        });

        if (e.liabilityShifted === true || e.type === 'PayPalAccount') {

            if (typeof this.props.onSubmit === 'function') {
                return this.props.onSubmit(e);
            }
        }

        if (typeof this.props.onNotShifted === 'function') {
            return this.props.onNotShifted(e);
        }
    }

    render() {
        if (this.state.auth !== null && typeof this.state.auth !== 'undefined') {
            return <BraintreeDropin
                braintree={braintree}
                authorizationToken={this.state.auth || ' '}
                handlePaymentMethod={this.handlePayment}
                container={'braintree-dropin-react'}
                threedsecure={{
                    amount: this.props.amount
                }}
                paypal={{
                    flow: 'vault',
                    amount: this.props.amount,
                    currency: 'USD'
                }}
                buttonStyle={this.state.buttonStyle}
            />
        }else{
          return (
          <LoadingContainer>
            <Loading />
            <p> Waiting for Payment Gateway </p>
          </LoadingContainer>)
        }

    }
}

export default DropinPage;