import React, { useState, useEffect } from 'react';
import HttpService from './../service/httpservice';
const OrderComponent =()=> {
    const serv =  new HttpService();
    const [orders, saveOrder] = useState([]);
    const [products, updateProducts] = useState([]);
    const [order, updateOrder] = useState({
        _id:'', OrderRowId:0, OrderId:'', CustomerName:'',
        ProductId:'', Quantity:0,TotalPrice:0
    }); 
    const [productPrice, getProductPrice] = useState({});
    const save=()=>{
        serv.postOrder(order).then((resp) => {
            saveOrder([
                ...orders, 
                resp.data.data
            ]);
            updateOrder(resp.data.data);
        });
    };
    const clear=()=>{
        updateOrder({_id:'', OrderRowId:0, OrderId:'', CustomerName:'',
        ProductId:'', Quantity:0,TotalPrice:0});
    };

    const columns = [];
    for(const p in order){
        columns.push(p);
    }
    useEffect(() => {
        serv.getOrders().then((value) => {
           saveOrder(value.data.data);
        });
        serv.getProducts().then((value)=>{
            updateProducts(value.data.data);
        });
    }, []);
    return(
        <div className="container">  
        <div className="container">
        <div className="form-group">
        <label>Id</label>
        <input type="text" className="form-control" value={order._id} readOnly 
        />
     </div>    
        <div className="form-group">
               <label>Order Row Id</label>
               <input type="number" value={order.ProductRowId} 
               onChange={
                   (evt)=> updateOrder({...order, OrderRowId: evt.target.value})
               }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Order Id</label>
               <input type="text" value={order.OrderId}
               onChange={
                (evt)=> updateOrder({...order, OrderId: evt.target.value})
            }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Customer Name</label>
               <input type="text" value={order.CustomerName} 
               onChange={
                (evt)=> updateOrder({...order, CustomerName: evt.target.value})
            }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Product Name</label>
               <select className="form-control" 
               onChange={
                (evt)=> 
                {
                    updateOrder({...order, ProductId: evt.target.value});
                    getProductPrice(products[evt.target.options.selectedIndex].Price);
                }
            }
               value={order.ProductId}>
                 {
                     products.map((p,i)=> (
                         <option key={i} value={p.ProductId} >
                                {p.ProductName}
                         </option>
                     ))
                 }
               </select>
               <input type="text" readOnly value={productPrice} className="form-control"/>
            </div>
            <div className="form-group">
               <label>Quantity</label>
               <input type="number" value={order.Quantity}
               onChange={
                (evt)=> updateOrder({...order, Quantity: evt.target.value,
                 TotalPrice: parseInt(evt.target.value) * productPrice})
            }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Total Price</label>
               <input type="number" readOnly value={order.TotalPrice}
               onChange={
                (evt)=> updateOrder({...order, TotalPrice: evt.target.value})
            }
               className="form-control"/>
            </div>
            <div className="form-group">
               <input type="button" value="New" onClick={clear} className="btn btn-warning"/>
               <input type="button" value="Save" onClick={save} className="btn btn-success"/>
            </div>
        </div>  
        <div className="container">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  {
                        columns.map((c,i) => (
                            <th key={i}>{c}</th>
                        ))
                  }
                </tr>
              </thead>
              <tbody>
                 {
                     orders.map((p,i)=>(
                         <tr key={i}>
                         {
                            columns.map((c,j) => (
                                <td key={j}>{p[c]}</td>
                            ))
                         }
                         </tr>
                     ))
                 }
              </tbody>
            </table>
        </div>      
      </div>
    );
}
export default OrderComponent;