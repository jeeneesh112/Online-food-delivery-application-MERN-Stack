import React, { useEffect } from "react";



import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaAction";

import { Container, Row, Col } from "react-bootstrap";
import Pizza from "../components/Pizza";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Filters from "../components/Filters";

// import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const pizzastate = useSelector(state => state.getAllPizzaReducer);
  const { loading, pizzas, error } = pizzastate;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);
  return (
    <div className="bg-dark">
      <Container>
        {loading ? (
          <Loader/>
        ) : error ? (
          <Error>Error while fetching Pizzas {error}</Error>
        ) : (
          <>
          
          <Row>
            <Col md={12}>
            <Filters/>
            </Col>
          </Row>
          <Row>
            {pizzas.map((pizza) => (
              <Col md={4}>
                <Pizza pizza={pizza} />
              </Col>
            ))}
          </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
