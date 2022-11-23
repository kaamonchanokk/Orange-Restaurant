import './components/styles.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import PopUpLogin from './components/PopUpLogin';
function PageLogin() {
    const [User, setUser] = useState("")
    const [Col, setCol] = useState("")
    const [modalShow, setModalShow] = useState(false);
    const [status, setstatus] = useState("")
    
    const [warningShowCHUser, setwarningShowCHUser] = useState(false);
    const [warningShowCHCol, setwarningShowCHCol] = useState(false);

    const history = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("Customer") || localStorage.getItem("Owner")) {
            history("/")
        }
        else if (localStorage.getItem("StatusSign")) {
            setstatus("สมัครสมาชิกสำเร็จ กรุณากรอกเข้าสู่ระบบใหม่อีกครั้ง")
            localStorage.clear();
            setModalShow(true)
        }
    })

    async function SignUp() {
        history("/signup")
    }

    async function Login() {
        if (User.length < 7 ||  Col.length < 7) {
            if (User.length < 7)
                setwarningShowCHUser(true)
            else
                setwarningShowCHUser(false)
            if (Col.length < 7)
                setwarningShowCHCol(true)
            else
                setwarningShowCHCol(false)
        }
        else {
            setwarningShowCHUser(false)
            setwarningShowCHCol(false)

            let item = { User, Col }
            // console.warn(item)

            let result = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            result = await result.json();
            if (result.message === "เช็คกรณีพนักงาน") {
                let item = { User, Col }
                let result = await fetch("http://localhost:8000/api/loginOwner", {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    }
                })
                result = await result.json();
                if (result.message === "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" || result.message === "เนื่องจากชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง") {

                    setstatus(result.message)
                    setModalShow(true)
                    this.preventDefaul()
                }
                else {
                    localStorage.setItem("Owner", JSON.stringify(result.data))
                    history("/")
                }
            }
            else {
                localStorage.setItem("Customer", JSON.stringify(result.data))
                history("/")
            }
        }


    }
    return (
        <div className="font">
            <div className="bgcontainerleft">
            </div>
            <div className="bgcontainerright">
                <center><h1 className="mb-3">เข้าสู่ระบบ</h1></center>
                <div >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ชื่อผู้ใช้</Form.Label>
                            <Form.Control size="lg" type="text" min="8" placeholder="กรุณากรอกชื่อผู้ใช้" value={User} onChange={(e) => setUser(e.target.value)} />
                            {
                                warningShowCHUser === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกชื่อผู้ใช้มากกว่า 6 ตัวอักษร</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>รหัสผ่าน</Form.Label>
                            <Form.Control size="lg" type="password" min="8" placeholder="กรุณากรอกรหัสผ่าน" value={Col} onChange={(e) => setCol(e.target.value)} />
                            {
                                warningShowCHCol === true ?
                                    (

                                        <p className='fontRed'>กรุณากรอกรหัสผ่านมากกว่า 6 ตัวอักษร</p>
                                    ) :
                                    (
                                        <></>
                                    )
                            }
                        </Form.Group>
                        <div className="mb-3">
                            <button className='button-login' type="button" onClick={Login}>
                                เข้าสู่ระบบ
                            </button>
                        </div>
                        <center><p>ยังไม่มีบัญชี ? <a className="btnlink" href=" " onClick={SignUp}>สมัครสมาชิก</a></p></center>
                    </Form>

                </div>
            </div>
            <PopUpLogin
                show={modalShow}
                onHide={() => setModalShow(false)}
                textstatus={status}
            />
        </div>
    );
}
export default PageLogin;