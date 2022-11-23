import './components/styles.css'
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios';
import Switch from 'react-switch'
import PopUpES from './components/PopUpES';
function PageEditStore(props) {
    const { id } = useParams()
    const [modalShow, setModalShow] = useState(false);
    const [data, setdata] = useState([])
    const history = useNavigate();
    const [StoreID, setStoreID] = useState("")
    const [StoreName, setStoreName] = useState("")
    const [OwnerName, setOwnerName] = useState("")
    const [OwnerPhone, setOwnerPhone] = useState("")
    const [StoreImage, setStoreImage] = useState("")
    let owner = JSON.parse(localStorage.getItem("Owner"))
    const [checked, setChecked] = useState(false);
    const [warningStoreName, setwarningStoreName] = useState(false);
    const [typepop, settypepop] = useState("");

    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    const POPUP = () => {
        // console.log(time); 
        if (!StoreName) {
            setwarningStoreName(true)
        }
        else {
            settypepop("U")
            setwarningStoreName(false)
            setModalShow(true)
        }
    }
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
            GetStoreByStoreID();
            if (localStorage.getItem("UstoreSc")) {
                localStorage.removeItem("UstoreSc")
                settypepop("USC")
                setModalShow(true)
            }
        }

    }, [])
    const GetStoreByStoreID = async () => {
        let StoreID = { StoreID: owner.StoreID };
        let res = await axios.post('http://localhost:8000/api/storepw', StoreID);

        // console.log(res.data)

        let data = res.data;
        setdata(data)
        setStoreID(data.StoreID)
        setStoreName(data.StoreName)
        // console.log(Boolean(data.storestatus_StoreStatus))
        if (data.storestatus_StoreStatus === 2)
            setChecked(Boolean(false))
        else
            setChecked(Boolean(data.storestatus_StoreStatus))
        setOwnerName(data.OwnerName)
        setStoreImage(data.StoreImage)
        setOwnerPhone(data.OwnerPhone)
    }

    const [file, setFile] = useState({}) //ใช้เพื่อส่งไปที่ API
    const handleUploadImage = (e) => {
        const file = e.target.files[0] // เก็บไว้ setState ลงใน file
        const reader = new FileReader(); // เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
        reader.onloadend = () => { // เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
            setFile(file) // ทำการ setState
        }
        reader.readAsDataURL(file)
    }
    return (
        <div>

            <div className="maineditmenu">

                <div className="mainmenu3">
                    <div className='row'>
                        <div className='col-4'>
                            <p className="headeditstatus">แก้ไขร้านอาหาร</p>
                        </div>
                    </div>
                    <div className='infrommenuedit'>
                        <Form>
                            <div className='row'>
                                <Form.Group className="col-5 mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fonteditstatus'>ชื่อร้าน</Form.Label>
                                    <Form.Control size="lg" className='fonteditstatus' type="text" value={StoreName} onChange={(e) => setStoreName(e.target.value)} />
                                    {
                                        warningStoreName === true ?
                                            (

                                                <p className='fontRed'>กรุณาใส่ชื่อร้านอาหาร</p>
                                            ) :
                                            (
                                                <></>
                                            )
                                    }
                                </Form.Group>
                                <div className='col-2'></div>
                                <Form.Group className="col-3 mb-3" controlId="formBasicPassword">
                                    <Form.Label className='fonteditstatus'>ชื่อเจ้าของร้าน</Form.Label>
                                    <p className='fonteditstatus'>{OwnerName}</p>
                                </Form.Group>
                                <Form.Group className="col-2 mb-3" controlId="formBasicPassword">
                                    <Form.Label className='fonteditstatus'>เบอร์โทร</Form.Label>
                                    <p className='fonteditstatus'>{OwnerPhone}</p>
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <Form.Group className="col mb-3" controlId="formBasicEmail">
                                    <Form.Label className='fonteditstatus'>สถานะร้าน</Form.Label>
                                    <br />
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
                                    <br />
                                    <br />
                                    <Form.Label className='fonteditstatus'>{checked ? "เปิด" : "ปิด"}</Form.Label>

                                </Form.Group>
                                <div className='col-2'></div>
                                <Form.Group controlId="formFileLg" className="col-5 mb-3">
                                    <Form.Label className='fonteditstatus'>อัพโหลดรูปภาพ</Form.Label>
                                    <Form.Control onChange={handleUploadImage} type="file" size="lg" />
                                    <br />
                                </Form.Group>
                            </div>
                            <div className='row'>
                                <div className='col-2'></div>
                                <div className='col-5'></div>
                                <Form.Group controlId="formFileLg" className="col-5">
                                    <Form.Label className='fonteditstatus'>รูปเดิม</Form.Label>
                                    <img className="imagemenum" src={"http://localhost:8000/uploadstore/" + StoreImage} alt="" />
                                </Form.Group>
                            </div>
                            <center>
                                <button className='button-newmenu' type="button" onClick={() => POPUP()}>
                                    ยืนยันการแก้ไข
                                </button>
                            </center>
                        </Form>
                    </div>
                </div>
            </div>
            <PopUpES
                show={modalShow}
                onHide={() => setModalShow(false)}
                storename={StoreName}
                file={file}
                storeid={StoreID}
                storestatus={checked.toString()}
                typepop={typepop}
            />
        </div>
    );
}
export default PageEditStore;