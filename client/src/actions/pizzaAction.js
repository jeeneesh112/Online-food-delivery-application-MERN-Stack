
import axios from "axios";
import swal from 'sweetalert';

const baseService = new axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    }
})

// Add a request interceptor
baseService.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
baseService.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await baseService.get("/pizzas/getAllPizzas");
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAIL", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZAS_REQUEST" });
  try {
    const response = await baseService.post("/pizzas/addpizza",{pizza});
    dispatch({ type: "ADD_PIZZAS_SUCCESS", payload: response });
  } catch (error) {
    dispatch({ type: "ADD_PIZZAS_FAIL", payload: error });
  }
};

export const getPizzaById = (pizzaId) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });
  try {
    const response = await baseService.post("/pizzas/getpizzabyid", { pizzaId });
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response });
  } catch (err) {
    dispatch({ type: "GET_PIZZABYID_FAIL", payload: err });
  }
};
export const updatePizza = (updatedPizza) => async (dispatch) => {
  dispatch({ type: "UPDATE_PIZZABYID_REQUEST" });
  try {
    const response = await baseService.post("/pizzas/updatepizza", {
      updatedPizza,
    });
    dispatch({ type: "UPDATE_PIZZABYID_SUCCESS", payload: response });
    window.location.href = "/admin/pizzalist";
  } catch (err) {
    dispatch({ type: "UPDATE_PIZZABYID_FAIL", payload: err });
  }
};

export const deletePizza = (pizzaId) => async (dispatch) =>{
  try {
    const res = await baseService.post('/pizzas/deletepizza',{pizzaId})
    swal("Pizza Deleted Successfully!","success")
    window.location.href="/admin/pizzalist"
    console.log(res)
  } catch (error) { 
    swal("Error While Deleting Pizza")
  }
}

export const filterPizza =(searchkey,category) => async (dispatch)=>{
  let filteredPizza;
  dispatch({type:'GET_PIZZAS_REQUEST'})
  try {
    const res = await baseService.get('/pizzas/getAllPizzas')
    filteredPizza = res.filter((pizza) => pizza.name.toLowerCase().includes(searchkey))
    if(category !=='all'){
      filteredPizza = res.filter(pizza => pizza.category.toLowerCase() === category)
    }
    dispatch({type:'GET_PIZZAS_SUCCESS', payload:filteredPizza})
  } catch (error) {
    dispatch({type:'GET_PIZZAS_FAIL',payload:error})
  }

}