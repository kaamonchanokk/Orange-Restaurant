import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom'
async function updatebyid(id, status, note, history) {
    let item = { OrderID: id, OrderStatus: status, OrderNoteOw: note }
    let result = await fetch("http://localhost:8000/api/statusfoodow", {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });
    result = await result.json();
    localStorage.setItem("UPorederSc", "สำเร็จ")
    history("/statusfoodofstaff")
}

async function deletebyid(id) {
    let item = { id }
    let result = await fetch("http://localhost:8000/api/statusfoodow", {
        method: 'DELETE',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });
    result = await result.json();
    localStorage.setItem("DTorederSc", "สำเร็จ")
    window.location.reload(false)
}

function PopUpSF(props) {
    const history = useNavigate();
    const [note, setnote] = useState("")
    if (props.typepop === "U")
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>ยืนยันการอัพเดตสถานะ</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <center><p className="fontheadPOPUP">คุณแน่ใจว่าต้องการจะอัพเดตข้อมูลนี้?</p></center>
                </Modal.Body>
                <Modal.Body>
                    {
                        props.status === "1" ? (
                            <>
                                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" alt="" /></center>
                                <br />
                                <center><p className="fontheadPOPUP">สถานะ : กำลังปรุง</p></center>
                            </>

                        ) :
                            props.status === "2" ? (
                                <>
                                    <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" alt="" /></center>
                                    <br />
                                    <center><p className="fontheadPOPUP">สถานะ : เรียบร้อย</p></center>
                                </>
                            ) :
                                props.status === "3" ? (
                                    <>
                                        <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/7662/7662496.png" alt="" /></center>
                                        <br />
                                        <center><p className="fontheadPOPUP">สถานะ : ได้รับแล้ว</p></center>
                                    </>
                                ) :
                                    props.status === "4" ? (
                                        <>
                                            <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/1147/1147931.png" alt="" /></center>
                                            <br />
                                            <center><p className="fontheadPOPUP">สถานะ : ถูกยกเลิก</p></center>
                                        </>
                                    ) :
                                        (
                                            <Modal.Body>สถานะ : ผิดพลาด</Modal.Body>
                                        )
                    }
                </Modal.Body>
                <Modal.Body>
                    <Container>
                        {/* <Modal.Body>หมายเลขข้อมูลที่ {props.id}</Modal.Body> */}
                        <center><p className="fontPOPUP">สั่งซื้อเมื่อวันที่ : {props.date}</p></center>
                        <center><p className="fontPOPUP">ชื่อเมนู : {props.menuname} จำนวน : {props.qty} ชุด</p></center>
                        <center><p className="fontPOPUP">ผู้สั่ง : {props.customername}</p></center>
                    </Container>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label className="fontPOPUP">หมายเหตุ</Form.Label>
                            <Form.Control className="fontPOPUP" type="text" as="textarea" value={note} onChange={(e) => setnote(e.target.value)} rows={4} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{
          display: "flex",
          justifyContent: "center",
        }}>
                    <Button variant="primary" className="fontPOPUP" onClick={() => updatebyid(props.id, props.status, note, history)}>
                        ยืนยัน
                    </Button>
                    <Button variant="secondary" className="fontPOPUP" onClick={props.onHide}>
                        ยกเลิก
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    //...
    else if (props.typepop === "D") {
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
                <Modal.Body>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/5028/5028066.png" alt="" /></center>
                <br/>
                <center><p className="fontheadPOPUP">คุณแน่ใจว่าต้องการจะลบข้อมูลนี้?</p></center>
                <center><p className="fontPOPUP">หมายเลขข้อมูลที่ : {props.id}</p></center>
                <center><p className="fontPOPUP">ชื่อเมนู : {props.menuname} จำนวน : {props.qty} ชุด</p></center>
                <center><p className="fontPOPUP">ผู้สั่ง : {props.customername}</p></center>
                <center><p className="fontPOPUP">สั่งซื้อเมื่อวันที่ : {props.date}</p></center>
                </Modal.Body>
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
                    <Button variant="primary"  className="fontPOPUP" onClick={props.onHide}>
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
                    <Button  variant="primary"  className="fontPOPUP" onClick={props.onHide}>
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
                    <Button  variant="primary"  className="fontPOPUP" onClick={props.onHide}>
                        ตกลง
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default PopUpSF;
