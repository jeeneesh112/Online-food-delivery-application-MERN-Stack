import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderAction";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";
import { loginUser } from "../actions/userAction";

const Checkout = ({ subTotal }) => {
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;

  const dispatch = useDispatch();
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token);
  };
  return (
  

    <>
      {loading && <Loader />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Order Placed Succesfully" />}
      <StripeCheckout
        amount={subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51N0IkASDf44cgN1OLA6PEJLHlBy0pECQ0WPtgfNrQusoRijnAFK00WEd9EqrB9fOuY5uRECTTbyruOZ5r6ykvTAU00EqcYzkgq"
        currency="INR"
      >
        <Button style={{backgroundColor:"#F9A825", color:"white"}}>Pay now</Button>
      </StripeCheckout>
    </>
  );
};

export default Checkout;
