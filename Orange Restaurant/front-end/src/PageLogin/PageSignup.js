import './components/styles.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PopUpLogin from './components/PopUpLogin';
function PageSignup() {
    const [CustomerUser, setCustomerUser] = useState("")
    const [CustomerCol, setCustomerCol] = useState("")
    const [CustomerConCol, setCustomerConCol] = useState("")
    const [CustomerName, setCustomerName] = useState("")
    const [CustomerPhone, setCustomerPhone] = useState("")
    const [modalShow, setModalShow] = useState(false);
    const [status, setstatus] = useState("")
    const history = useNavigate();

    const [warningShowName, setwarningShowName] = useState(false);
    const [warningShowUser, setwarningShowUser] = useState(false);
    const [warningShowPhone, setwarningShowPhone] = useState(false);
    const [warningShowCol, setwarningShowCol] = useState(false);
    const [warningShowCHCol, setwarningShowCHCol] = useState(false);

    async function Signup() {
        let item = { CustomerCol, CustomerUser, CustomerName, CustomerPhone }
        if (!CustomerName
            || CustomerUser.length < 7
            || CustomerCol.length < 7
            || CustomerCol != CustomerConCol
            || CustomerPhone.length < 9
            || CustomerPhone.length > 11) {

            if (!CustomerName)
                setwarningShowName(true)
            else
                setwarningShowName(false)
            if (CustomerUser.length < 7)
                setwarningShowUser(true)
            else
                setwarningShowUser(false)
            if (CustomerCol.length < 7)
                setwarningShowCol(true)
            else
                setwarningShowCol(false)
            if (CustomerCol != CustomerConCol || !CustomerConCol)
                setwarningShowCHCol(true)
            else
                setwarningShowCHCol(false)
            if (CustomerPhone.length < 9 || CustomerPhone.length > 11)
                setwarningShowPhone(true)
            else
                setwarningShowPhone(false)
        }
        else {
            let result2 = await fetch("http://localhost:8000/api/checkmember", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            result2 = await result2.json();
            if (result2.message === "เนื่องจากมีชื่อผู้ใช้นี้อยู่ในระบบแล้ว") {
                setstatus("เนื่องจากมีชื่อผู้ใช้นี้อยู่ในระบบแล้ว")
                setModalShow(true)
            }
            else {
                let result = await fetch("http://localhost:8000/api/signup", {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    }
                })
                result = await result.json();
                localStorage.setItem("StatusSign", "สำเร็จ")
                history("/login")
            }

        }


    }
    return (
        <div className="font">
            <div className="bgcontainerleft2">
            </div>
            <div className="bgcontainerright2">
                <center><h1 className="mb-3">สมัครสมาชิก</h1></center>
                <div >
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>ชื่อ-นามสกุล</Form.Label>
                            <Form.Control size="lg" type="text" value={CustomerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="กรอกชื่อ-นามสกุล" />
                            {
                                warningShowName === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกชื่อ-นามสกุล</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                            <Form.Control size="lg" type="text" value={CustomerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="กรอกเบอร์โทรศัพท์" />
                            {
                                warningShowPhone === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกเบอร์โทร 9-11 ตัวอักษร</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>ชื่อผู้ใช้</Form.Label>
                            <Form.Control size="lg" type="text" value={CustomerUser} onChange={(e) => setCustomerUser(e.target.value)} placeholder="กรอกชื่อผู้ใช้" />
                            {
                                warningShowUser === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกชื่อผู้ใช้มากกว่า 6 ตัวอักษร</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>รหัสผ่าน</Form.Label>
                            <Form.Control size="lg" value={CustomerCol} onChange={(e) => setCustomerCol(e.target.value)} type="password" placeholder="กรอกรหัสผ่าน" />
                            {
                                warningShowCol === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกรหัสผ่านมากกว่า 6 ตัวอักษร</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="กรอกยืนยันรหัสผ่าน" value={CustomerConCol} onChange={(e) => setCustomerConCol(e.target.value)} />
                            {
                                warningShowCHCol === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>
                        <br />
                        <div className="mb-3">
                            <button className='button-login' type="button" onClick={Signup}>
                                สมัครสมาชิก
                            </button>
                        </div>

                    </Form>

                </div>
            </div>
            {/* ขี้เกียจเปลี่ยนชื่อ ใช้อันเดียวกัน */}
            <PopUpLogin
                show={modalShow}
                onHide={() => setModalShow(false)}
                textstatussignin={status}
            />
        </div>
    );
}
export default PageSignup;