import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

function PopUpLogin(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {/* {
                        props.textstatus ?
                            <>{
                                props.textstatus === "สมัครสมาชิกสำเร็จ กรุณากรอกเข้าสู่ระบบใหม่อีกครั้ง" ?
                                    <>
                                        <h4>สมัครสมาชิกสำเร็จ!</h4>
                                    </>
                                    :
                                    <>
                                        <h4>ไม่สามารถเข้าสู่ระบบได้</h4>
                                    </>
                            }
                            </>
                            :
                            <>
                                <h4>ไม่สามารถสมัครสมาชิกได้</h4>
                            </>
                    } */}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    props.textstatus ?
                        <>{
                            props.textstatus === "สมัครสมาชิกสำเร็จ กรุณากรอกเข้าสู่ระบบใหม่อีกครั้ง" ?
                                <>
                                    <div>
                                        <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/1721/1721585.png" alt="" /></center>
                                        <br />
                                        <center><p className="fontheadPOPUP">สมัครสมาชิกสำเร็จ</p></center>
                                        <center> <p className="fontPOPUP">
                                            {props.textstatus}
                                        </p></center>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/2550/2550327.png" alt="" /></center>
                                        <br />
                                        <center><p className="fontheadPOPUP">ไม่สามารถเข้าสู่ระบบได้</p></center>
                                        <center> <p className="fontPOPUP">
                                            {props.textstatus}
                                        </p></center>
                                    </div>
                                </>
                        }
                        </>
                        :
                        <>
                            <div>
                                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/2550/2550327.png" alt="" /></center>
                                <br />
                                <center><p className="fontheadPOPUP">ไม่สามารถสมัครสมาชิกได้</p></center>
                                <center> <p className="fontPOPUP">
                                    {props.textstatussignin}
                                </p></center>
                            </div>
                        </>
                }

            </Modal.Body>
            <Modal.Footer style={{
          display: "flex",
          justifyContent: "center",
        }}> {
                props.textstatus ?
                    <>{
                        props.textstatus === "สมัครสมาชิกสำเร็จ กรุณากรอกเข้าสู่ระบบใหม่อีกครั้ง" ?
                            <>

                                <Button onClick={props.onHide} className="fontPOPUP" variant="success">ตกลง</Button>
                            </>
                            :
                            <>

                                <Button onClick={props.onHide}  className="fontPOPUP" variant="danger">ปิด</Button>
                            </>
                    }
                    </>
                    :
                    <>

                        <Button onClick={props.onHide}  className="fontPOPUP" variant="danger">ปิด</Button>
                    </>
            }
            </Modal.Footer>
        </Modal>
    );
}

export default PopUpLogin;