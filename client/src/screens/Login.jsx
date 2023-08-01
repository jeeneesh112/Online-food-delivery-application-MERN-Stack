import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { loginUser } from "../actions/userAction";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('currentUser')){
        window.location.href='/'
    }
  }, []);

  const loginHandler= ()=>{
    const user = {email,password}
    dispatch(loginUser(user))
  }
  return (
    <>
      <Container>
        <Form>
          <Form.Group style={{color:"white"}} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <Form.Text style={{color:"white"}} className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label style={{color:"white"}}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check  style={{color:"white"}}type="checkbox" label="Check me out" />
          </Form.Group>
          <Button style={{backgroundColor:"#F9A825", color:"white"}} variant="primary" disabled={email.length === 0 || password.length === 0}  onClick={loginHandler}>
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
