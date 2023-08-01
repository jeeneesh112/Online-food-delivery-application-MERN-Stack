import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { filterPizza } from "../actions/pizzaAction";

const Filters = () => {
    const [serchkey, setsearchkey] = useState('')
    const [category, setcategory] = useState('all')
  const dispatch = useDispatch();
  return (
    <div style={{backgroundColor:'#F9A825',width:'95%'}} className="p-4 mt-4 center">
      <Form>
        <Row>
          <Col md={6}>
            <Form.Control value={serchkey} onChange={e => setsearchkey(e.target.value)} placeholder="search pizza" />
          </Col>
          <Col>
            <Form.Select style={{width:'250px',height:'40px',borderRadius:'7px'}} value={category} onChange={e=> setcategory(e.target.value)}>
              <option>All</option>
              <option>veg</option>
              <option>nonveg</option>
            </Form.Select>
          </Col>
          <Col>
            <Button onClick={()=>{dispatch(filterPizza(serchkey,category))}} style={{width:'150px',backgroundColor:'black',borderRadius:'7px'}}>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Filters;
