import './components/styles.css'
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import axios from 'axios';
import PopUpM from './components/PopUpM';
import Switch from 'react-switch'
function PagesEditMenu(props) {
    const { id } = useParams()
    const [modalShow, setModalShow] = useState(false);
    const [MenuID, setMenuID] = useState(id)
    const [data, setdata] = useState([])
    const history = useNavigate();
    const [MenuName, setMenuName] = useState("")
    const [MenuPrice, setMenuPrice] = useState("")
    const [MenuDate, setMenuDate] = useState("")
    const [MenuImage, setMenuImage] = useState("")
    const [typepop, settypepop] = useState("")

    const [warningShowName, setwarningShowName] = useState(false);
    const [warningShowPrice, setwarningShowPrice] = useState(false);

    const Status = useLocation();
    const [checked, setChecked] = useState(false);

    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };


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
            if(Status.state.MenuStatus === 2)
                setChecked(false)
            else
                setChecked(Boolean(Status.state.MenuStatus))
            GetMenuByMenuID();
        }

    }, [])
    const GetMenuByMenuID = async () => {
        let result = await fetch("http://localhost:8000/api/menu/" + MenuID);
        result = await result.json();
        setdata(result)
        setMenuName(result.data.MenuName)
        setMenuPrice(result.data.MenuPrice)
        const date = new Date(result.data.MenuDate)
        const resultdate = date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })
        setMenuDate(resultdate)
        // setMenuDate(result.data.MenuDate)
        setMenuImage(result.data.MenuImage)

        // console.log(result)
        // console.log(beforedata);
    }
    // console.log(data.data.MenuDate)
    // const date = new Date(data.data.MenuDate)

    const [file, setFile] = useState({}) //ใช้เพื่อส่งไปที่ API
    const handleUploadImage = (e) => {
        const file = e.target.files[0] // เก็บไว้ setState ลงใน file
        const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
        reader.onloadend = () => { // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
            setFile(file) // ทำการ setState
        }
        reader.readAsDataURL(file)
    }

    // const onClickUpload = async () => {
    //     let formData = new FormData()
    //     formData.append('file', file)

    //     formData.append('MenuName', MenuName)
    //     formData.append('MenuPrice', MenuPrice)
    //     formData.append('MenuID', MenuID)
    //     formData.append('MenuStatus', '1')
    //     formData.append('MenuImage', MenuImage)

    //     let uploadImg = await axios({
    //         method: 'put',
    //         url: 'http://localhost:8000/api/menu',
    //         data: formData
    //     })
    //     .then((response) => {
    //         // console.log(response.data);
    //         history("/managemenu")
    //       });

    // }

    const POPUP =()=>{
        // console.log(time); 
        if (!MenuName || !MenuPrice ) {
            if (!MenuName)
                setwarningShowName(true)
            else
            setwarningShowName(false)
            if (!MenuPrice)
                setwarningShowPrice(true)
            else
                setwarningShowPrice(false)
        }
        else{
            setwarningShowName(false)
            setwarningShowPrice(false)
            settypepop("U")
            setModalShow(true) 
        }
    }
    return (
        <div>

            <div className="maineditmenu">

                <div className="mainmenu3">
                    <div className='row'>
                        <div className='col-4'>
                            <p className="headeditstatus">แก้ไขเมนูอาหาร</p>
                        </div>
                    </div>
                    <div className='infrommenuedit'>
                        <Form>
                            <div className='row'>
                                <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fonteditstatus'>วันที่เพิ่ม</Form.Label>
                                    <p className='fonteditstatus'>{MenuDate}</p>
                                </Form.Group>
                                <div className='col-2'></div>
                                <Form.Group className="col-5 mb-3" controlId="formBasicPassword">
                                    <Form.Label className='fonteditstatus'>ชื่อเมนูอาหาร</Form.Label>
                                    <Form.Control size="lg" className='fonteditstatus' type="text" value={MenuName} onChange={(e) => setMenuName(e.target.value)} />
                                    {
                                        warningShowName === true ?
                                            (

                                                <p className='fontRed'>กรุณาใส่ชื่อเมนูอาหาร</p>
                                            ) :
                                            (
                                                <></>
                                            )
                                    }
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fonteditstatus'>ราคา</Form.Label>
                                    <Form.Control className='fonteditstatus' size="lg" type="number" value={MenuPrice} onChange={(e) => setMenuPrice(e.target.value)} />
                                    {
                                        warningShowPrice === true ?
                                            (

                                                <p className='fontRed'>กรุณาใส่ราคา</p>
                                            ) :
                                            (
                                                <></>
                                            )
                                    }
                                </Form.Group>
                                <div className='col-2'></div>
                                <Form.Group controlId="formFileLg" className="col-5 mb-3">
                                    <Form.Label className='fonteditstatus'>อัพโหลดรูปภาพ</Form.Label>
                                    <Form.Control onChange={handleUploadImage} type="file" size="lg" />
                                    <br />
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Form.Group className="col-1">
                                    <Form.Label className='fonteditstatus'>สถานะเมนู</Form.Label>
                                    <Switch className='react-Switch'
                                        handleDiameter={28}
                                        offColor="#08f"
                                        onColor="#0ff"
                                        offHandleColor="#0ff"
                                        onHandleColor="#08f"
                                        height={40}
                                        width={70}
                                        id="small-radius-switch"
                                        onChange={handleChange}
                                        checked={checked}
                                    />
                                </Form.Group>
                                <Form.Group className="col-4">
                                <br/>
                                <br/>
                                <Form.Label className='fonteditstatus'>{checked ? "เปิด" : "ปิด"}</Form.Label>
                                      
                                </Form.Group>
                                <div className='col-2'></div>
                                <Form.Group controlId="formFileLg" className="col-5">
                                    <Form.Label className='fonteditstatus'>รูปเดิม</Form.Label>
                                    <img className="imagemenum" src={"http://localhost:8000/uploadsmenu/" + MenuImage} alt="" />
                                </Form.Group>
                            </div>
                            <br/>
                            <br/>
                                <center><button className='button-newmenu' type="button" onClick={() => POPUP() }>
                                    แก้ไขเมนูอาหาร
                                </button></center>
                        </Form>
                    </div>
                </div>
            </div>
            <PopUpM
                show={modalShow}
                onHide={() => setModalShow(false)}
                menuname={MenuName}
                menuprice={MenuPrice}
                file={file}
                menuid={MenuID}
                menustatus={checked.toString()}
                menuimage={MenuImage}
                typepop={typepop}
            />
        </div>
    );
}
export default PagesEditMenu;