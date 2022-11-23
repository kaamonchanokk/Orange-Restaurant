import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopUpLF(props) {
    const { getorder, note, time, cartitems, storename, totalPrice } = props;
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
                <center><img className="iconPOP" src="https://cdn-icons-png.flaticon.com/512/5184/5184592.png" alt="" /></center>
                <br />
                <center><p className="fontheadPOPUP">ยืนยันการสั่งอาหาร</p></center>
                <center><div className='fontbill'>
                    <center><h3 >ร้าน{storename}</h3></center>
                    <center><hr></hr></center>
                    {cartitems.map((item) => (
                        <div key={item.MenuID}>
                            <div className="row">
                                <div className="col-5">
                                    <p >{item.MenuName}</p>
                                </div>
                                <div className="col-1">
                                    {/* <button onClick={() => onRemove(item)} className="removefood">-</button> */}
                                </div>
                                <div className="col-3">
                                    <p >&nbsp;{item.qty} ชุด</p>
                                </div>
                                <div className="col-1">
                                    <p >{item.MenuPrice * item.qty}฿</p>
                                </div>
                            </div>
                        </div>

                    ))}
                    <center><hr></hr></center>
                    <div>
                        <div className="row">
                            <div className="col-5">
                                <p >รวมราคาทั้งหมด</p>
                            </div>
                            <div className="col-1">
                            </div>
                            <div className="col-3">
                            </div>
                            <div className="col-1">
                                <p >{totalPrice}฿</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <p >เวลามารับอาหาร</p>
                            </div>
                            <div className="col-1">
                            </div>
                            <div className="col-2">
                            </div>
                            <div className="col-4">
                                <p >{time}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <p>หมายเหตุ</p>
                            </div>
                            <div className="col-3">
                            </div>
                            <div className="col-4">
                                {
                                    note === "" ? (
                                        <p >-</p>
                                    ) :
                                    (
                                        <p >{note}</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                </center>
                <br/>
                <center><p className="fontPOPUP">คุณแน่ใจว่าต้องการที่จะสั่งอาหาร?</p></center>
            </Modal.Body>
            {/* <Modal.Body>หมายเลขข้อมูลที่ {props.id}</Modal.Body>
            <Modal.Body>ชื่อเมนู : {props.name}</Modal.Body>
            <Modal.Body>ราคา : {props.price}</Modal.Body> */}

            <Modal.Footer style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Button variant="danger" className="fontPOPUP" onClick={() => getorder(cartitems, note, time)}>
                    ยืนยัน
                </Button>
                <Button variant="secondary" className="fontPOPUP" onClick={props.onHide}>
                    ยกเลิก
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUpLF;
