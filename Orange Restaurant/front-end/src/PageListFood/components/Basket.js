import './style.css';
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-bootstrap-time-picker';
import React, { useEffect, useState } from "react";
import PopUpLF from './PopUpLF';
function Basket(props) {
    const { cartItems, onAdd, onRemove, getorder, Store } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.MenuPrice, 0);
    const totalPrice = itemsPrice;
    const [note, setnote] = useState("")
    const [time, settime] = useState("0")
    const [modalShow, setModalShow] = useState(false);
    const [warningShow, setwarningShow] = useState(false);
    // function handleTimeChange(time) {
    //     console.log(time);     // <- prints "3600" if "01:00" is picked
    //     settime({ time });
    // }
    const POPUP = () => {
        // console.log(time); 
        if (time === "0") {
            setwarningShow(true)
        }
        else {
            setwarningShow(false)
            setModalShow(true)
        }
    }
    return (

        <div className='fontbill'>
            <center><h3 >ร้าน{Store.StoreName}</h3></center>
            <center><p >เพิ่มเมนูอาหาร ในตะกร้าของคุณ</p></center>
            <center><hr></hr></center>
            {cartItems.length === 0 && <div className="row">
                <center><p >ไม่ได้ทำรายการ</p></center>
            </div>}
            {cartItems.map((item) => (
                <div key={item.MenuID}>
                    <div className="row">
                        <div className="col-6">
                            <p >{item.MenuName}</p>
                        </div>
                        <div className="col-1">
                            <button onClick={() => onAdd(item)} className="addfood">+</button>
                        </div>
                        <div className="col-1">
                            <p >&nbsp;{item.qty}</p>
                        </div>
                        <div className="col-2">
                            <button onClick={() => onRemove(item)} className="removefood">-</button>
                        </div>
                        <div className="col-1">
                            <p >{item.MenuPrice * item.qty}฿</p>
                        </div>
                    </div>
                </div>
            ))}
            {/* <br />
            <br />
            <br /> */}
            {/* <br />
            <br /> */}
            <br />
            {/* <center><hr></hr></center> */}
            {/* 
            <div className="row">
                <div className="col">
                    <p >รวมราคาทั้งหมด</p>
                </div>
                <div className="col-2">
                    <p >{totalPrice}฿</p>
                </div>
            </div> */}
            {
                cartItems.length !== 0 ? (
                    <div>
                        <center><hr></hr></center>
                        <div className="row">
                            <div className="col">
                                <p >รวมราคาทั้งหมด</p>
                            </div>
                            <div className="col-2">
                                <p >{totalPrice}฿</p>
                            </div>
                        </div>
                        <p >เวลามารับอาหาร</p>
                        <Form.Select className="mb-2"
                            value={time}
                            onChange={e => {
                                settime(e.target.value);
                            }}>
                            <option>เลือกเวลา</option>
                            <option value="09.00 น.">09.00 น.</option>
                            <option value="10.00 น.">10.00 น.</option>
                            <option value="11.00 น.">11.00 น.</option>
                            <option value="12.00 น.">12.00 น.</option>
                            <option value="13.00 น.">13.00 น.</option>
                            <option value="14.00 น.">14.00 น.</option>
                            <option value="15.00 น.">15.00 น.</option>
                            <option value="16.00 น.">16.00 น.</option>
                        </Form.Select>
                        {
                            warningShow === true ?
                                (

                                    <p className='fontRed'>กรุณาเลือกเวลามารับอาหาร</p>
                                ) :
                                (
                                    <></>
                                )
                        }
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>หมายเหตุ</Form.Label>
                                <Form.Control type="text" as="textarea" placeholder="" value={note} onChange={(e) => setnote(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <div className="row">
                            <button className='button-login' onClick={() => POPUP()}>
                                สั่งอาหาร
                            </button>
                        </div>
                    </div>
                ) :
                    (
                        <div className="row">
                        </div>
                    )
            }
            <PopUpLF
                show={modalShow}
                onHide={() => setModalShow(false)}
                cartitems={cartItems}
                getorder={getorder}
                note={note}
                time={time}
                storename={Store.StoreName}
                totalPrice={totalPrice}
            />
        </div>
    )
}
export default Basket;