import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import { proceedPayment } from '../store/actions';
import io from "socket.io-client";
import './Payment.css';

const Payment = ({ price, email, id }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51GyVFyGEIdbxEPg1XCHjDEPCLg5oKfT4c0zsVoOURN8iD585heXkYh3TcBxQ78uUGXKlxdmuSGEvr8q6Vej6VpXJ0089jTRXX5';
  const dispatch = useDispatch();
  const socket = io("https://whispering-woodland-44131.herokuapp.com/");

  const onToken = token => {
    // history.push('/');
    dispatch(proceedPayment({
      token,
      amount: price,
      id
    }))
      .then(data => {
        socket.emit('paid', data.id);
      })
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
