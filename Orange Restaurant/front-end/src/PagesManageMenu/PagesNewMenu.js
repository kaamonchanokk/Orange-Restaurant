import './components/styles.css'
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function PagesNewMenu(props) {
    const date = new Date()
    const owner = JSON.parse(localStorage.getItem("Owner"))
    let StoreID
    if (owner) {
        StoreID = owner.StoreID
    }
    const [MenuName, setMenuName] = useState("")
    const [MenuPrice, setMenuPrice] = useState("")
    const [warningShowName, setwarningShowName] = useState(false);
    const [warningShowPrice, setwarningShowPrice] = useState(false);
    const [warningShowImage, setwarningShowImage] = useState(false);
    const history = useNavigate();

    const result = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    })

    useEffect(() => {
        if (localStorage.getItem("Owner") === null && localStorage.getItem("Customer")) {
            history("/")
        }
        else if (localStorage.getItem("Owner") === null) {
            history("/login")
        }
    })

    const [file, setFile] = useState({}) //ใช้เพื่อส่งไปที่ API
    const handleUploadImage = (e) => {
        const file = e.target.files[0] // เก็บไว้ setState ลงใน file
        const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
        reader.onloadend = () => { // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
            setFile(file) // ทำการ setState
        }
        reader.readAsDataURL(file)
    }

    const onClickUpload = async () => {
        // console.log(file.toString())
        if (!MenuName || !MenuPrice || file.toString() === "[object Object]") {
            if (!MenuName)
                setwarningShowName(true)
            else
                 setwarningShowName(false)
            if (!MenuPrice)
                setwarningShowPrice(true)
            else 
                setwarningShowPrice(false)
            if (file.toString() === "[object Object]")
                setwarningShowImage(true)
            else 
                setwarningShowImage(false)
        }
        else {
            setwarningShowName(false)
            setwarningShowPrice(false)
            setwarningShowImage(false)
            let formData = new FormData()
            const MenuDate = date.getFullYear() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getDate();
            // const MenuDate = result;
            formData.append('file', file)

            formData.append('MenuName', MenuName)
            formData.append('MenuPrice', MenuPrice)
            formData.append('MenuDate', MenuDate)
            formData.append('MenuStatus', '1')
            formData.append('StoreID', StoreID)

            let uploadImg = await axios({
                method: 'post',
                url: 'http://localhost:8000/api/uploadsmenu',
                data: formData
            })
                .then((response) => {
                    // console.log(response.data);
                    localStorage.setItem("NmenuSc", "สำเร็จ")
                    history("/managemenu")
                });
        }
    }
    return (
        <div>

            <div className="maineditstatus">

                <div className="mainmenu2">
                    <div className='row'>
                        <div className='col-4'>
                            <p className="headeditstatus">เพิ่มเมนูอาหาร</p>
                        </div>
                    </div>
                    <div className='infrommenu'>
                        <Form>
                            <div className='row'>
                                <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fonteditstatus'>วันที่เพิ่ม</Form.Label>
                                    <p className='fonteditstatus'>{result}</p>
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
                                    {
                                        warningShowImage === true ?
                                            (

                                                <p className='fontRed'>กรุณาใส่รูปภาพ</p>
                                            ) :
                                            (
                                                <></>
                                            )
                                    }
                                </Form.Group>
                            </div>
                            <div className='infrommenu2'>
                                <button className='button-newmenu' type="button" onClick={onClickUpload}>
                                    เพิ่มเมนูอาหาร
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PagesNewMenu;