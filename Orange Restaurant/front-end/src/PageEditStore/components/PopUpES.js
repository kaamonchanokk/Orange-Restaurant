import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const onClickUpload = async (StoreID, StoreName, file, StoreStatus, history) => {
    let formData = new FormData()
    formData.append('file', file)
    formData.append('StoreName', StoreName)
    formData.append('StoreStatus', StoreStatus)
    formData.append('StoreID', StoreID)

    let uploadImg = await axios({
        method: 'put',
        url: 'http://localhost:8000/api/storepw',
        data: formData
    })
        .then((response) => {
            localStorage.setItem("UstoreSc", "สำเร็จ")
            window.location.reload(false);
        });

}

function PopUpES(props) {
    const history = useNavigate();
    // console.log(props.Storestatus)
    // let StoreStatusint = props.storestatus ? "1" : "0";
    let StoreStatusint
    if (props.storestatus === "false") {
        StoreStatusint = "2";
    }
    else {
        StoreStatusint = "1";
    }

    if (props.typepop === "U") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการอัพเดต</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/5184/5184592.png" alt="" /></center>
                    <br />
                    <center><p className="fontheadPOPUP">คุณแน่ใจว่าต้องการจะอัพเดตข้อมูลนี้?</p></center>
                    <center><p className="fontPOPUP">ชื่อร้าน {props.storename}</p></center>
                    {
                        StoreStatusint === "1" ? (
                            <center><p className="fontPOPUP">สถานะร้าน : เปิด</p></center>

                        ) :
                            (
                                <center><p className="fontPOPUP">สถานะร้าน : ปิด</p></center>

                            )
                    }
                </Modal.Body>
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="danger" className="fontPOPUP" onClick={() => onClickUpload(
                        props.storeid,
                        props.storename,
                        props.file,
                        StoreStatusint,
                        history)}>
                        ยืนยัน
                    </Button>
                    <Button variant="secondary" className="fontPOPUP" onClick={props.onHide}>
                        ยกเลิก
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else if (props.typepop === "USC") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการอัพเดต</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/463/463574.png" alt="" /></center>
                    <br />
                    <center><p className="fontheadPOPUP">อัพเดตข้อมูลสำเร็จ!</p></center>
                </Modal.Body>
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="primary" className="fontPOPUP" onClick={props.onHide}>
                        ตกลง
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PopUpES;
