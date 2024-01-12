//App

import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  useEffect(() => {
    async function getProduct() {
      const response = await axios.get("http://localhost:3030/product-listing");
      console.log(response.data);
    }
    getProduct();
  }, []);

  const [formData, setData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [items, setItems]=useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...formData,
      [name]: value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await axios.put(
          `http://localhost:3030/update-stock/${formData.id}`,
          formData
        );
        console.log("Edit response", response.data);
      } else {
        const response = await axios.post(
          'http://localhost:3030/add-stock',
          formData
        );
        console.log("Add Response :", response.data);
        setItems([...items,response.data])
      }
      setData({});
      setEditMode(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (data) =>{
    setData(data)
    setEditMode(true)
  }

  return (
    <>
      <form method="post" onSubmit={formHandler}>
        <label htmlFor="">ID</label>
        <input type="number" name="id" onChange={handleChange} value={formData?.id || ""}/>
        <br />
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={handleChange} value={formData?.name || ""}/>
        <br />
        <label htmlFor="">Quantity</label>
        <input type="number" name="quantity" onChange={handleChange} value={formData?.quantity || ""} />
        <br />
        <label htmlFor="">Date</label>
        <input type="date" name="date" onChange={handleChange} value={formData?.date || ""} />
        <br />
        <select name="status" id="status" onChange={handleChange} value={formData?.status || "Active"}>
          <option value="Active" selected>
            Active
          </option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">{editMode? "Save" : "Submit"}</button>
        <button type="edit" onClick={handleEdit}>
          Edit
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}


----

//Main
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import HomePage from '../components/HomePage.jsx'


import { BrowserRouter as Router, Route , Routes } from 'react-router-dom'

import './index.css'
// import StockList from '../components/stockList.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <Router>
    <Routes>
      <Route path="/" component={HomePage}/>
      <Route path="/add-product" component={App}/>

    </Routes>
  </Router>
    {/* <App /> */}
    {/* <StockList/> */}
    <HomePage/>
  </React.StrictMode>,
)

---

