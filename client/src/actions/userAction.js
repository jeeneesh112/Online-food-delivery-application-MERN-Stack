import axios from "axios"
import swal from "sweetalert"

const baseService = new axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json"
    }
})



export const registerUser =(user)=> async (dispatch)=>{
    dispatch({type:'USER_REGISTER_REQUEST'})
    try {
       await baseService.post('/users/register',user)
        dispatch({type:'USER_REGISTER_SUCCESS'})
    } catch (error) {
        dispatch({type:'USER_REGISTER_FAIL',payload:error})
    }


}

export const loginUser= (user) => async (dispatch) =>{
    dispatch({type:'USER_LOGIN_REQUEST'})
    try {
        const response = await baseService.post('/users/login',user)
        dispatch({type:'USER_LOGIN_SUCCESS',payload:response.data})
        localStorage.setItem('currentUser',JSON.stringify(response.data))
        window.location.href = '/'
    } catch (error) {
        dispatch({type:'USER_LOGIN_FAIL',payload:error})
    }
}

export const logoutUser = () =>dispatch =>{
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems')
    window.location.href="/"
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    try {
      const response = await baseService.get("/users/getallusers");
      dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_USERS_FAIL", payload: error });
    }
  };

  export const deleteUser = (userid) => async (dispatch) =>{
    try {
       await baseService.post('/users/deleteuser',{userid})
      swal("User Deleted Successfully!","success")
      window.location.reload()
    } catch (error) { 
      swal("Error While Deleting User")
    }
  }

  export const asignAdmin = (userid) => async (dispatch) => {
    // const currentUser = getState().loginUserReducer.currentUser;
    dispatch({
      type: "GET_ALL_USERS_REQUEST",
    });
    try {
       await baseService.post("/users/asignadmin", {userid});
      alert('Asign Admin Role Successfully.')
      const users = await baseService.get("/users/getallusers")
      dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: users.data });
      window.location.href = '/admin/userlist'
    } catch (error) {
      dispatch({ type: "GET_ALL_USERS_FAIL", payload: error });
    }
  };



