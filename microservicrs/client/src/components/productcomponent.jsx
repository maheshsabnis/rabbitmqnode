import React, { useState, useEffect } from 'react';
import HttpService from './../service/httpservice';
const ProductComponent =()=> {
    const serv =  new HttpService();
    const [products, saveProduct] = useState([]);
    const [product, updateProduct] = useState({
        _id:'', ProductRowId:0, ProductId:'', ProductName:'',
        Manufacturer:'', Price:0
    }); 
    const manufacturers = ['IBM', 'HP', 'Bajaj', 'TATA', 'Parle', 'UBS'];
    const save=()=>{
        serv.postProduct(product).then((resp) => {
            saveProduct([
                ...products, 
                resp.data.data
            ]);
            updateProduct(resp.data.data);
        });
    };
    const clear=()=>{
        updateProduct({_id:'',ProductRowId:0,ProductId:'',
            ProductName:'',Manufacturer:'',
            Price:0});
    };

    const columns = [];
    for(const p in product){
        columns.push(p);
    }
    useEffect(() => {
        serv.getProducts().then((value) => {
           saveProduct(value.data.data);
        });
    }, []);
    return(
        <div className="container">  
        <div className="container">
        <div className="form-group">
        <label>Id</label>
        <input type="text" className="form-control" value={product._id} readOnly 
        />
     </div>    
        <div className="form-group">
               <label>Product Row Id</label>
               <input type="number" value={product.ProductRowId} 
               onChange={
                   (evt)=> updateProduct({...product, ProductRowId: evt.target.value})
               }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Product Id</label>
               <input type="text" value={product.ProductId}
               onChange={
                (evt)=> updateProduct({...product, ProductId: evt.target.value})
            }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Product Name</label>
               <input type="text" value={product.ProductName} 
               onChange={
                (evt)=> updateProduct({...product, ProductName: evt.target.value})
            }
               className="form-control"/>
            </div>
            <div className="form-group">
               <label>Manufacturer</label>
               <select className="form-control" 
               onChange={
                (evt)=> updateProduct({...product, Manufacturer: evt.target.value})
            }
               value={product.Manufacturer}>
                 {
                     manufacturers.map((m,i)=> (
                         <option key={i}>{m}</option>
                     ))
                 }
               </select>
            </div>
            <div className="form-group">
               <label>Price</label>
               <input type="number" value={product.Price}
               onChange={
                (evt)=> updateProduct({...product, Price: evt.target.value})
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
                     products.map((p,i)=>(
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

export default ProductComponent;