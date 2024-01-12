//StockForm

// import React from 'react';
import { useState } from 'react';
import { addStock } from '../services/stockServices';

function StockForm() {
    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addStock({ productID, productName });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding stock:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h1>Hello</h1>
            <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} placeholder="Product ID" />
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default StockForm;

----

//StockList

import { useEffect, useState } from "react";
import axios from "axios";

export default function StockList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function listProduct() {
      const datas = await axios.get("http://localhost:3030/product-listing");
      console.log(datas.data);
      setData([...datas.data]);
    }
    listProduct();
  }, []);

  return (
    <>
      <table >
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Date</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
            {data.map((e)=>(
              <tr key={e._id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.quantity}</td>
                <td>{e.status}</td>
                <td>{e.date}</td>
                <td>ACTION</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
