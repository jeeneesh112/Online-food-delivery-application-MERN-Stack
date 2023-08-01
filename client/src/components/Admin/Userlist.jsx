import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asignAdmin,deleteUser, getAllUsers } from "../../actions/userAction";
import {Table, Button} from 'react-bootstrap'
import Loader from "../Loader";
import Error from "../Error";
import {AiFillDelete} from 'react-icons/ai'


const Userlist = () =>{
    const userState = useSelector(state => state.getAllUsersReducer)
    const {loading,error,users} = userState
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUsers())

    },[dispatch])
    return(
        <div>
            <h1 style={{color:'#F9A825'}} className="text-center bg-black p-2">Users List</h1>
            <hr style={{color:"yellow"}}/>
            {loading && (<Loader/>)}
            {error && (<Error error="Error While Fetching Users"/>)}
            <Table striped bordered hover>
      <thead>
        <tr style={{color:'#F9A825'}}>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Delete</th>
          <th>Admin authority</th>
        </tr>
      </thead>
      <tbody style={{color:'white'}}>
        {users && users.map(user =>(
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><AiFillDelete style={{color:'red',cursor:'pointer'}} 
                         onClick={()=>{dispatch(deleteUser(user._id))

                         }}/></td>
                <td>
                  {""}
                  {user.isAdmin ? (
                    <h6 className="text-success">Admin authority assign</h6>
                  ) : (
                    <>
                      <Button
                        style={{ backgroundColor: "#F9A825" }}
                        className="btn-danger"
                        onClick={() => {
                          dispatch(asignAdmin(user._id));
                        }}
                      >
                        Admin authority
                      </Button>
                    </>
                  )}{""}
                </td>
            </tr>
        ))}
      </tbody>
    </Table>
        </div>
    )
}

export default Userlist;