import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { registerUser } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Success from "../components/Success";
import Error from "../components/Error";
import swal from "sweetalert";

const Register = () => {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')


   const registerState = useSelector(state => state.registerUserReducer) 
   const {error,success,loading} = registerState

const dispatch = useDispatch()

    const registerHandler= ()=>{
        if(password !== confirmPassword){
            swal('Password do not match')
        }else{
            const user ={name,email,password};
            dispatch(registerUser(user))
          
        }
    }
  return (
    <>
    <Container>
        {loading && <Loader/>}
        {success && <Success success="User Register Succesfully"/>}
        {error && <Error error="Something went wrong"/>}
      <Form>
        <h1 style={{color:"white"}}>Registration</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label style={{color:"white"}}>Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="enter name" required value={name} onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:"white"}}>Email address</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" value={password} onChange={e => setPassword(e.target.value)}>
          <Form.Label style={{color:"white"}}>Password</Form.Label>
          <Form.Control type="password" id="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label style={{color:"white"}}>Confirm Password</Form.Label>
          <Form.Control type="password" id="conformpass" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <Button style={{backgroundColor:"#F9A825", color:"white"}} disabled={name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0}  variant="primary"  onClick={registerHandler}>
            
          Register
        </Button>
        
        
      </Form>
      </Container>
    </>
  );
};

export default Register;
