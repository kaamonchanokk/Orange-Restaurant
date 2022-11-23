import './components/style.css';
import Menu from './components/Menu';
import data from './components/Testdata';
import axios from 'axios';
import React, { useMemo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Basket from './components/Basket';
// import PopUpLF from './components/PopUpLF';
function PageListFood() {
    const { food } = data;
    const [cartItems, setCartItems] = useState([]);
    const [fooddata, setfooddata] = useState([]);
    const { id } = useParams()
    const [StoreIDparams, setStoreIDparams] = useState(id)
    const [Store,setStore] = useState([])
    const axios = require('axios');
    const date = new Date()
    // const [modalShow, setModalShow] = useState(false);
    const datath = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    })

    const history = useNavigate();
    let user = JSON.parse(localStorage.getItem("Customer"))

    useEffect(() => {
        if (localStorage.getItem("Customer") === null && localStorage.getItem("Owner")) {
            history("/")
        }
        else if (localStorage.getItem("Customer") === null) {
            history("/login")
        }
        else {
            
        GetMenuByStoreID();
        }
    }, [fooddata])
    
    const GetMenuByStoreID = async () => {
        let StoreID = {StoreID : StoreIDparams}
        let res = await axios.post('http://localhost:8000/api/menu', StoreID);
        let res2 = await axios.post('http://localhost:8000/api/storename', StoreID);
        setfooddata(res.data)
        setStore(res2.data)
    }
    const onAdd = (food) => {
        const exist = cartItems.find((x) => x.MenuID === food.MenuID);
        //หาอาหารใน obj food ที่รับมาว่ามี obj food ที่เลือกใน cartItems ไหม ซึ่ง cartItems เป็นตัวแทนของตะกร้า
        if (exist) { //ถ้ามีให้ + 1
            setCartItems(
                cartItems.map((x) =>
                    x.MenuID === food.MenuID ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {  //ถ้าไม่มีให้สร้างเพิ่มใน cartItems โดยมีจำนวน qty เพิ่มไปด้วย
            setCartItems([...cartItems, { ...food, qty: 1 }]);
        }
    };

    const onRemove = (food) => {
        const exist = cartItems.find((x) => x.MenuID === food.MenuID);
        //หาอาหารใน obj food ที่รับมาว่ามี obj food ที่เลือกใน cartItems ไหม ซึ่ง cartItems เป็นตัวแทนของตะกร้า
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.MenuID !== food.MenuID));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.MenuID === food.MenuID ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    const getorder = async (cartItems,note,time) => {
        cartItems.forEach((c)=>{
            AddOrder(c,note,time);
        })
    };

    const AddOrder = async (cartItems,note,time) => {
        let item = { 
            OrderDate : date,
            OrderTime : time, 
            OrderStatus : "1",
            OrderQty : cartItems.qty, 
            OrderPrice : cartItems.MenuPrice*cartItems.qty,
            CustomerID : user.CustomerID, 
            OrderNoteCus : note,
            MenuID : cartItems.MenuID, 
            StoreID : StoreIDparams
        }  
        let result2 = await fetch("http://localhost:8000/api/order", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result2 = await result2.json();
        localStorage.setItem("StatusOrderSc", "สำเร็จ")
        history("/statusfood/"+user.CustomerID)
    };
    return (
        <div>
            <div>
                <div className="Lone">
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <div className="Ltwo">
                    <h3>ร้าน{Store.StoreName}</h3>
                    <p>ผู้ขาย : {Store.OwnerName} </p>
                    <p>เบอร์โทร : {Store.OwnerPhone}</p>
                </div>
                <div className='Lheadmenu'>
                    <p>รายการอาหาร</p>
                </div>
              
                <Menu
                    cartItems={cartItems}
                    food={fooddata}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />

            </div>
            <div className='Lthree'>
                <Basket
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    getorder={getorder}
                    Store={Store}
                />
            </div>
        </div>
    );
}
export default PageListFood;