import React from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaMinusCircle, FaPlusCircle,FaTrash } from "react-icons/fa";
import {addToCart, deleteFromCart}  from '../actions/cartAction'
import Checkout from "../components/Checkout";
const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  const charge = 47;
  let subTotal = cartItems.reduce((x, item)=> x + item.price,0)

  if(subTotal < 500 )
  {
    subTotal = subTotal + charge;
  }
  else{
    subTotal = subTotal;
  }

 
  return (
    <div className="bg-auto">
      <Container style={{color:'white'}}>
      
        <h1
            style={{ color: "white",textAlign:'center' }}
            className=" bg-black  p-2"
          >
            My Cart
        </h1>
        <hr color="white"/>
      
        <Row>
          <Col md={6}>
         
            <Row>
              {cartItems.map((item) => (
                <>
                  <Col md={7}>
                    <h5><b>
                      {item.name}[{item.varient}]
                    </b>
                    </h5>
                    <h6 style={{color:'#f5f5f5'}}>
                      Price : {item.quantity} X {item.prices[0][item.varient]}=
                      {""}
                      {item.price}
                    </h6>
                    <h6 style={{color:'#f5f5f5'}}>
                      Quantity :&nbsp;
                      <FaMinusCircle className="text-danger" 
                      style={{cursor:"pointer"}}
                      onClick={()=>{
                        dispatch(addToCart(item,item.quantity-1, item.varient))
                      }}
                      /> &nbsp;
                      {item.quantity}&nbsp;
                      <FaPlusCircle className="text-success" 
                      style={{cursor:"pointer"}}
                      onClick={()=>{
                        dispatch(addToCart(item,item.quantity+1, item.varient))
                      }}
                      />
                    </h6>
          
                  </Col>
                  <Col md={5}>
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{ width: "95px", height: "80px" }}
                    />
                    <FaTrash className="text-danger" 
                      style={{cursor:"pointer",marginLeft:'20px'}}
                      onClick={()=>{
                        dispatch(deleteFromCart(item))
                      }}/>
                <hr/>
                     
                  </Col>
      
          
                </>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <h3><b>Payment Info :</b></h3>
            <hr style={{color:'white'}}/>
            <h4>Total Bill : <b> Rs. {subTotal} /-</b></h4>
            
            <Checkout subTotal={subTotal} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartScreen;
