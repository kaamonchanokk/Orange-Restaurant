import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const onClickUpload = async (MenuID, file, MenuName, MenuPrice, MenuImage, MenuStatus, history) => {
    // console.log(MenuStatus)
    let formData = new FormData()
    formData.append('file', file)

    formData.append('MenuName', MenuName)
    formData.append('MenuPrice', MenuPrice)
    formData.append('MenuID', MenuID)
    formData.append('MenuImage', MenuImage)
    formData.append('MenuStatus', MenuStatus)
    let uploadImg = await axios({
        method: 'put',
        url: 'http://localhost:8000/api/menu',
        data: formData
    })
        .then((response) => {
            // console.log(response.data);
            localStorage.setItem("UPmenuSc", "สำเร็จ")
            history("/managemenu")
        });

}
async function deletebyid(id) {
    let item = { id }
    let result = await fetch("http://localhost:8000/api/menu", {
        method: 'DELETE',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });
    result = await result.json();

    if (result.message === "ER_ROW_IS_REFERENCED_2") {

        localStorage.setItem("DTmenuSc", "ไม่สำเร็จ")
    }
    else {

        localStorage.setItem("DTmenuSc", "สำเร็จ")
    }
    window.location.reload(false)
}

function PopUpM(props) {
    const history = useNavigate();
    // console.log(props.typepop)
    if (props.typepop === "D") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการลบ</Modal.Title> */}
                </Modal.Header>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">คุณแน่ใจว่าต้องการจะลบข้อมูลนี้?</p></center>

                <center><p className="fontPOPUP">หมายเลขข้อมูลที่ {props.id}</p></center>
                <center><p className="fontPOPUP">ชื่อเมนู : {props.name}</p></center>
                <center><p className="fontPOPUP">ราคา : {props.price} บาท</p></center>

                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="danger" className="fontPOPUP" onClick={() => deletebyid(props.id)}>
                        ยืนยัน
                    </Button>
                    <Button variant="secondary" className="fontPOPUP" onClick={props.onHide}>
                        ยกเลิก
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else if (props.typepop === "U") {
        let MenuStatusint
        if (props.menustatus === "false") {
            MenuStatusint = "2";
        }
        else {
            MenuStatusint = "1";
        }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการอัพเตะ</Modal.Title> */}
                </Modal.Header>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/5184/5184592.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">คุณแน่ใจว่าต้องการจะอัพเดตข้อมูลนี้?</p></center>
                <center><p className="fontPOPUP">ชื่อเมนู : {props.menuname}</p></center>
                <center><p className="fontPOPUP">ราคา : {props.menuprice} บาท</p></center>
                {
                    MenuStatusint === "1" ? (

                        <center><p className="fontPOPUP">สถานะ : เปิดใช้งาน</p></center>
                    ) :
                        (

                            <center><p className="fontPOPUP">สถานะ : ปิดใช้งาน</p></center>
                        )

                }
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="danger" className="fontPOPUP" onClick={() => onClickUpload(
                        props.menuid,
                        props.file,
                        props.menuname,
                        props.menuprice,
                        props.menuimage,
                        MenuStatusint,
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
    else if (props.typepop === "UPSC") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการลบ</Modal.Title> */}
                </Modal.Header>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/463/463574.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">อัพเดตข้อมูลสำเร็จ!</p></center>

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
    else if (props.typepop === "DTSC") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการลบ</Modal.Title> */}
                </Modal.Header>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/463/463574.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">ลบข้อมูลสำเร็จ!</p></center>

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
    else if (props.typepop === "NSC") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการลบ</Modal.Title> */}
                </Modal.Header>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/463/463574.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">สร้างข้อมูลสำเร็จ!</p></center>

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
    else if (props.typepop === "DONTDTSC") {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการลบ</Modal.Title> */}
                </Modal.Header>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/2550/2550327.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">ลบข้อมูลไม่สำเร็จ!</p></center>
                <center><p className="fontPOPUP">เนื่องจากมีข้อมูลเมนูอาหาร</p></center>
                <center><p className="fontPOPUP">เชื่อมกับรายการสั่งอาหารของลูกค้า</p></center>

                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="danger" className="fontPOPUP" onClick={props.onHide}>
                        ตกลง
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default PopUpM;
