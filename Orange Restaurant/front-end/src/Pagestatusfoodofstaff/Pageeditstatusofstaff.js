import './components/styles.css'
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios';
import PopUpSF from './components/PopUpSF';
function Pageeditstatusofstaff(props) {
    const OrderStatustable = useLocation();
    const { id } = useParams()
    const [OrderID, setOrderID] = useState(id)
    const [data, setdata] = useState([])
    const [OrderDate, setOrderDate] = useState(0)
    // const [Radio, setRadio] = useState("")
    const [Radio, setRadio] = useState(String(OrderStatustable.state.OrderStatustable))
    const [modalShow, setModalShow] = useState(false);
    const [typepop, settypepop] = useState("");
    // console.log(String(OrderStatustable.state.OrderStatus))
    // console.log(String(OrderStatustable.state.OrderStatustable))

    const history = useNavigate();
    useEffect(() => {
        // GetMenuByStoreID();
        if (localStorage.getItem("Owner") === null && localStorage.getItem("Customer")) {
            history("/")
        }
        else if (localStorage.getItem("Owner") === null) {
            history("/login")
        }
        else {
            // console.log(MenuID)
            GetOrderByOrderID();
        }

    }, [data])
    const GetOrderByOrderID = async () => {
        let result = await fetch("http://localhost:8000/api/statusfoodow/" + OrderID);
        result = await result.json();
        setdata(result.data)
        const date = new Date(result.data.OrderDate)
        const resultdate = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })
        setOrderDate(resultdate)
        // setRadio(String(result.data.OrderStatus))
        // console.log(Radio)
    }
    return (
        <div>

            <div className="maineditstatus">

                <div className="maineditstatus3">
                    {/* <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control size="lg" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="Password" />
                        </Form.Group>
                        <div className="mb-3">
                            <button className='button-login'>
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </Form> */}
                    <div className='row'>
                        <div className='col-4'>
                            <p className="headeditstatus">สถานะรายการอาหาร</p>
                        </div>
                    </div>
                    <div className='infromeditstatus'>
                        <Form>
                            <fieldset disabled>
                                <div className='row'>
                                    <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                        <Form.Label className='fonteditstatus'>วันที่</Form.Label>
                                        <Form.Control size="lg" className='fonteditstatus' type="email" placeholder={OrderDate} />
                                    </Form.Group>
                                    <div className='col-2'></div>
                                    <Form.Group className="col-5 mb-3" controlId="formBasicPassword">
                                        <Form.Label className='fonteditstatus'>เวลาที่สั่งอาหาร</Form.Label>
                                        <Form.Control size="lg" className='fonteditstatus' type="text" placeholder={data.OrderTime} />
                                    </Form.Group>
                                </div>
                                <div className='row'>
                                    <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                        <Form.Label className='fonteditstatus'>รายการอาหาร</Form.Label>
                                        <Form.Control className='fonteditstatus' size="lg" type="email" placeholder={data.MenuName} />
                                    </Form.Group>
                                    <div className='col-2'></div>
                                    <Form.Group className="col-2 mb-3" controlId="formBasicPassword">
                                        <Form.Label className='fonteditstatus'>จำนวน</Form.Label>
                                        <Form.Control className='fonteditstatus' size="lg" type="text" placeholder={data.OrderQty} />
                                    </Form.Group>
                                    <Form.Group className="col-3 mb-3" controlId="formBasicPassword">
                                        <Form.Label className='fonteditstatus'>ราคา</Form.Label>
                                        <Form.Control className='fonteditstatus' size="lg" type="text" placeholder={data.OrderQty + "฿"} />
                                    </Form.Group>
                                </div>
                                <div className='row'>
                                    <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                        <Form.Label className='fonteditstatus'>รายชื่อคนสั่ง</Form.Label>
                                        <Form.Control size="lg" className='fonteditstatus' type="email" placeholder={data.CustomerName} />
                                    </Form.Group>
                                    <div className='col-2'></div>
                                    <Form.Group className="col-5" controlId="formBasicPassword">
                                        <Form.Label className='fonteditstatus'>หมายเหตุ</Form.Label>
                                        <Form.Control size="lg" className='fonteditstatus' type="text" placeholder={data.OrderNoteCus} />
                                    </Form.Group>
                                </div>
                                <div className='row mb-3'>
                                    <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                        <Form.Label className='fonteditstatus'>เบอร์โทร</Form.Label>
                                        <Form.Control size="lg" className='fonteditstatus' type="email" placeholder={data.CustomerPhone} />
                                    </Form.Group>
                                </div>
                            </fieldset>
                            <div className="gridstatus">
                                <div className="boxgridstatus">
                                    <div>
                                        <input className="form-check-input lg"
                                            type="radio"
                                            value="1"
                                            checked={Radio === "1"}
                                            onChange={(e) => { setRadio(e.target.value) }}
                                        /> กำลังปรุง
                                    </div>
                                    <br/>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />
                                    </div>
                                </div>
                                <div className="boxgridstatus">
                                    <div>
                                        <input className="form-check-input"
                                            type="radio"
                                            value="2"
                                            checked={Radio === "2"}
                                            onChange={(e) => { setRadio(e.target.value) }}
                                        /> เรียบร้อย
                                    </div>
                                    <br/>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />
                                    </div>
                                </div>
                                <div className="boxgridstatus">
                                    <div>
                                        <input className="form-check-input"
                                            type="radio"
                                            value="3"
                                            checked={Radio === "3"}
                                            onChange={(e) => { setRadio(e.target.value) }}
                                        /> ได้รับแล้ว
                                    </div>
                                    <br/>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/512/7662/7662496.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />
                                    </div>
                                </div>
                                <div className="boxgridstatus">
                                    <div>
                                        <input className="form-check-input"
                                            type="radio"
                                            value="4"
                                            checked={Radio === "4"}
                                            onChange={(e) => { setRadio(e.target.value) }}
                                        /> ถูกยกเลิก
                                    </div>
                                    <br/>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/512/1147/1147931.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='row mb-4'>
                                <div className='col-2'>
                                </div>
                                <div className='col-2'>
                                    <input className="form-check-input lg"
                                        type="radio"
                                        value="1"
                                        checked={Radio === "1"}
                                        onChange={(e) => { setRadio(e.target.value) }}
                                    /> กำลังปรุง
                                </div>
                                <div className='col-2'>
                                    <input className="form-check-input"
                                        type="radio"
                                        value="2"
                                        checked={Radio === "2"}
                                        onChange={(e) => { setRadio(e.target.value) }}
                                    /> เรียบร้อย
                                </div>
                                <div className='col-2'>
                                    <input className="form-check-input"
                                        type="radio"
                                        value="3"
                                        checked={Radio === "3"}
                                        onChange={(e) => { setRadio(e.target.value) }}
                                    /> ได้รับแล้ว
                                </div>
                                <div className='col-2'>
                                    <input className="form-check-input"
                                        type="radio"
                                        value="4"
                                        checked={Radio === "4"}
                                        onChange={(e) => { setRadio(e.target.value) }}
                                    /> ถูกยกเลิก
                                </div>
                            </div> */}
                            {/* <div className='row mb-4'>
                                <div className='col-2'>
                                </div>
                                <div className='col-2'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />

                                </div>
                                <div className='col-2'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />

                                </div>
                                <div className='col-2'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />

                                </div>
                                <div className='col-2'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "120px", hight: "120px" }} alt="Logo" />

                                </div>
                            </div> */}
                            <div className="mb-3">
                                <div className='row '>
                                    <div className='col-4'></div>
                                    <div className='col-1'>
                                        <button className='button-login' type="button" onClick={() => { setModalShow(true); settypepop("U"); }}>
                                            อัพเดตสถานะ
                                        </button>
                                    </div>
                                    <div className='col-3'></div>

                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <PopUpSF
                show={modalShow}
                onHide={() => setModalShow(false)}
                status={Radio}
                id={data.OrderID}
                customername={data.CustomerName}
                menuname={data.MenuName}
                qty={data.OrderQty}
                date={OrderDate}
                typepop={typepop}
            />
        </div>
    );
}
export default Pageeditstatusofstaff;