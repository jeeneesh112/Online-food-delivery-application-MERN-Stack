import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "../../actions/orderAction";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader";
import Error from "../Error";
const Orderlist = () => {
  const allOrdersState = useSelector((state) => state.allUserOrdersReducer);
  const { loading, orders, error } = allOrdersState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div>
       <h1 style={{color:'#F9A825'}} className="text-center bg-black  p-2">Orders List</h1>
      {loading && <Loader />}
      {error && <Error error="Admin Order req Fail" />}
      <Table striped bordered hover>
        <thead>
          <tr style={{color:'#F9A825'}}>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody style={{color:'white'}}>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{order.name}</td>
                <td> Rs {order.orderAmount}/-</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {""}
                  {order.isDelivered ? (
                    <h6 className="text-success">Delivered</h6>
                  ) : (
                    <>
                      <Button
                        style={{ backgroundColor: "#F9A825" }}
                        className="btn-danger"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver
                      </Button>
                    </>
                  )}{""}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orderlist;
