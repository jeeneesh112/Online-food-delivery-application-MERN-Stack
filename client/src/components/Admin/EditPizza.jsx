import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaById, updatePizza } from "../../actions/pizzaAction";
import Loader from "./../Loader";
import Error from "./../Error";
import { useParams } from "react-router-dom";

const EditPizza = () => {
  const {pizzaId} = useParams();
  console.log(pizzaId);
  const [name, setname] = useState("");
  const [smallPrice, setsmallPrice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [mediumPrice, setmediumPrice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const dispatch = useDispatch();
  const getPizzaByState = useSelector((state) => state.getPizzaByIdReducer);
  const { error, pizza } = getPizzaByState;
  const updatePizzaState = useSelector((state) => state.updatePizzaByIdReducer);
  const { updateloading } = updatePizzaState;
  console.log(pizza);
  useEffect(() => {
    console.log('inside use effect')
    if (pizza) {
        console.log('inside if statemnet')
      if (pizza._id === pizzaId) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setimage(pizza.image);
        setsmallPrice(pizza.prices[0]["small"]);
        setmediumPrice(pizza.prices[0]["medium"]);
        setlargeprice(pizza.prices[0]["large"]);
      } else {
        dispatch(getPizzaById(pizzaId));
      }
    } else {
      dispatch(getPizzaById(pizzaId));
    }
  }, [pizza, dispatch,pizzaId]);
  const submitForm = (e) => {
    e.preventDefault();
    const updatedPizza = {
      _id:pizzaId,
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largeprice,
      },
    };
    dispatch(updatePizza(updatedPizza));
  };
  return (
    <div>
      {updateloading && <Loader />}
      {error && <Error error="add new pizza error" />}
      {/* {success && <Success success="Pizza Added Successfully" />} */}
      <h1 className="text-center bg-black text-white p-2">Edit Item Details</h1>
      <Form onSubmit={submitForm} className="bg-light p-4">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Row className="mb-3 mt-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Small Price</Form.Label>
              <Form.Control
                type="text"
                value={smallPrice}
                onChange={(e) => setsmallPrice(e.target.value)}
                placeholder="Enter Small Price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Medium Price</Form.Label>
              <Form.Control
                type="text"
                value={mediumPrice}
                onChange={(e) => setmediumPrice(e.target.value)}
                placeholder="Enter medium price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Large Price</Form.Label>
              <Form.Control
                type="text"
                value={largeprice}
                onChange={(e) => setlargeprice(e.target.value)}
                placeholder="Enter large price"
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              ttype="text"
              value={image}
              onChange={(e) => setimage(e.target.value)}
              placeholder="Add Image URL"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter Description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            placeholder="Enter Category"
          />
        </Form.Group>

        <Button style={{backgroundColor:"#F9A825"}} variant="primary" type="submit">
          Update Item
        </Button>
      </Form>
    </div>
  );
};

export default EditPizza;