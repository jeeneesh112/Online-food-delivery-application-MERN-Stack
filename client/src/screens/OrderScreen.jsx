import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Col, Row } from "react-bootstrap";

const OrderScreen = () => {
    const orderState = useSelector((state) => state.getUserOrdersReducer);
    const { loading, error, orders } = orderState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  return (
    <>
      <h1 className="text-center" style={{color:"white"}}>Order screen</h1>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />} 
      {orders &&
        orders.map((order) => (
        <div className="container border p-4 bg-light">
          <Row>
              <Col md={4}>
                <h4>Items :</h4>
                {order.orderItems.map((item) => (
                  <h6 key={item.name}>
                    {item.name} [{item.varient}] * {item.quantity} ={" "}
                    {item.price}
                  </h6>
                ))}
              </Col>
              <Col md={4}>
                <h4>Address</h4>
                <h6>Street  : {order.shippingAddress.street}</h6>
                <h6>City    : {order.shippingAddress.city}</h6>
                <h6>PinCode : {order.shippingAddress.pincode}</h6>
                <h6>Country : {order.shippingAddress.country}</h6>
              </Col>
              <Col md={4}>
                <h4>Order Info:</h4>
                <h6>Order Amount : {order.orderAmount}</h6>
                <h6>Order ID : {order._id}</h6>
              </Col>
          </Row>
          </div>
        ))}
    </>
  );
};

export default OrderScreen;
