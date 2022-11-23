import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpSc(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                {/* <Modal.Title className="fontheadPOPUP">ยืนยันการสั่งอาหาร</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/3500/3500833.png" alt="" /></center>
                <br/>
                <center><p className="fontheadPOPUP">สำเร็จ</p></center>
                <center><p className="fontPOPUP">คำสั่งอาหารของคุณ ถูกส่งไปถึงเจ้าของร้านเรียบร้อยแล้ว</p></center>
                <center><p className="fontPOPUP">กรุณาตรวจสอบสถานะ เพื่อเตรียมรอรับอาหาร</p></center>
            </Modal.Body>
            {/* <Modal.Body>หมายเลขข้อมูลที่ {props.id}</Modal.Body>
            <Modal.Body>ชื่อเมนู : {props.name}</Modal.Body>
            <Modal.Body>ราคา : {props.price}</Modal.Body> */}

            <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
                <Button variant="success" className="fontPOPUP" onClick={props.onHide}>
                    ตกลง
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUpSc;
