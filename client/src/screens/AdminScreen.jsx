import React, { useEffect } from "react";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import {useSelector} from 'react-redux'
// import {  Route, Routes } from "react-router-dom";

import { useNavigate} from "react-router-dom";
// import Userlist from "../components/Admin/Userlist";
// import Pizzaslist from "../components/Admin/Pizzaslist";
// import AddNewPizza from "../components/Admin/AddNewPizza";
// import Orderlist from "../components/Admin/Orderlist";

const AdminScreen = () => {
  const navigate = useNavigate();
  const userState = useSelector(state=> state.loginUserReducer)
  const {currentUser} = userState;
  useEffect(()=>{
    if(localStorage.getItem('currentUser') === null || !currentUser.isAdmin){
        window.location.href = '/'
    }
  },[currentUser])
  return (
    <>
      <Container>
        <h1 style={{color:'#F9A825'}} className="text-center bg-black  p-2">Admin Panel</h1>

        <Row>
          <Col md={3}>
            <ButtonGroup
              vertical
              style={{ minHeight: "550px", minWidth: "200px" }}
            >
              <Button
                onClick={() => navigate("/admin/userlist")}
                style={{ backgroundColor: "#F9A825" }}
              >
                All Users
              </Button>
              <Button
                onClick={() => navigate("/admin/pizzalist")}
                style={{ backgroundColor: "white", color: "black" }}
              >
                Items Catalog
              </Button>
              <Button
                onClick={() => navigate("/admin/addnewpizza")}
                style={{ backgroundColor: "#F9A825" }}
              >
                Add New Item
              </Button>
              <Button
                onClick={() => navigate("/admin/orderlist")}
                style={{ backgroundColor: "white", color: "black" }}
              >
                All orders
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={9}>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminScreen;
