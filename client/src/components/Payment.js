import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './Payment.css';
import { useHistory } from 'react-router-dom';

const Payment = ({ price, email }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51GyVFyGEIdbxEPg1XCHjDEPCLg5oKfT4c0zsVoOURN8iD585heXkYh3TcBxQ78uUGXKlxdmuSGEvr8q6Vej6VpXJ0089jTRXX5';
  const history = useHistory();

  const onToken = token => {
    history.push('/')
    console.log(token);
    console.log('mantep udah bayar');
  }
 
  return (
    <div>
      <StripeCheckout 
      label="Pay Artist"
      name="DemocARTcy"
      currency="IDR"
      description={`You have to pay Rp ${price}`}
      amount={priceForStripe}
      panelLabel="Proceed Payment"
      token={onToken}
      stripeKey={publishableKey}
      allowRememberMe={false}
      email={email}
      >
        <div className="paid-button w-100 text-center">
          <p className="mb-0">Pay</p>
        </div>
      </StripeCheckout>
    </div>
  );
 }

export default Payment;
