import './style.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios';
function Four() {
    const history = useNavigate();
    let owner = JSON.parse(localStorage.getItem("Owner"))
    const [data, setdata] = useState([])

    useEffect(() => {
        if (localStorage.getItem("Owner") === null && localStorage.getItem("Customer")) {
            history("/")
        }
        else if (localStorage.getItem("Owner") === null) {
            history("/login")
        }
        else {
            // console.log(MenuID)
            GetStoreByStoreID();
        }

    }, [])

    const GetStoreByStoreID = async () =>
     {
        console.log( owner.OwnerName )
        let StoreID = { StoreID: owner.StoreID };
        let res = await axios.post('http://localhost:8000/api/storepw', StoreID);

        // console.log(res.data)

        let data = res.data;
        setdata(data)
    }
    return (
        <div className="Four">
            <center><p className="headfont3">ยินดีต้อนรับสู่ เว็ปสั่งอาหารโรงส้ม</p></center>
            <center><p className="headfont3">สำหรับร้าน{data.StoreName} </p></center>
            <center><button className="btnb" onClick={()=> history("/managemenu/")}>เริ่มต้นจัดการอาหาร  →</button></center>
        </div>
    );
}
export default Four;