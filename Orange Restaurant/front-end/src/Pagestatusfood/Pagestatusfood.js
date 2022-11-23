import './components/styles.css'
import { FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import dataa from './components/Testdata';
import { useNavigate } from 'react-router-dom'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { GlobalFilter } from './components/GlobalFilter';
import PopUpSc from './components/PopUpSc';
import Dropdown from 'react-bootstrap/Dropdown';
function Pagestatusfood() {
    const history = useNavigate();
    let user = JSON.parse(localStorage.getItem("Customer"))
    const [beforedata, setbeforedata] = useState([]);
    const axios = require('axios');
    const [modalShow, setModalShow] = useState(false);
    const [selectstatus, setselectstatus] = useState("0")
    // const [PostStore,setPostStore] =  useState("1");
    useEffect(() => {
        // GetMenuByStoreID();
        if (localStorage.getItem("Customer") === null && localStorage.getItem("Owner")) {
            history("/")
        }
        else if (localStorage.getItem("Customer") === null) {
            history("/login")
        }
        else {
            if (localStorage.getItem("StatusOrderSc")) {
                localStorage.removeItem("StatusOrderSc")
                setModalShow(true)
            }
            if (selectstatus === "0") {

                GetStatusfoodByCustomerID();
            }
            else if (selectstatus === "1") {


                GetStatusfoodByCustomerID1();
            }
            else if (selectstatus === "2") {


                GetStatusfoodByCustomerID2();
            }
            else if (selectstatus === "3") {


                GetStatusfoodByCustomerID3();
            }
            else if (selectstatus === "4") {


                GetStatusfoodByCustomerID4();
            }
        }

    }, [selectstatus])
    const GetStatusfoodByCustomerID = async () => {
        let CustomerID = { CustomerID: user.CustomerID };

        let res = await axios.post('http://localhost:8000/api/statusfoodcus', CustomerID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByCustomerID1 = async () => {
        let CustomerID = { CustomerID: user.CustomerID };

        let res = await axios.post('http://localhost:8000/api/statusfoodcus1', CustomerID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByCustomerID2 = async () => {
        let CustomerID = { CustomerID: user.CustomerID };

        let res = await axios.post('http://localhost:8000/api/statusfoodcus2', CustomerID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByCustomerID3 = async () => {
        let CustomerID = { CustomerID: user.CustomerID };

        let res = await axios.post('http://localhost:8000/api/statusfoodcus3', CustomerID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByCustomerID4 = async () => {
        let CustomerID = { CustomerID: user.CustomerID };

        let res = await axios.post('http://localhost:8000/api/statusfoodcus4', CustomerID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }

    const data = useMemo(() => beforedata, [beforedata]);
    const columns = useMemo(() => [
        {
            Header: "วันที่",
            accessor: "OrderDate"
        },
        {
            Header: "ชื่อร้าน",
            accessor: "StoreName"
        },
        {
            Header: "สถานะอาหาร",
            accessor: "OrderNameStatus"
        },
        {
            Header: "เวลามารับ",
            accessor: "OrderTime"
        },
        {
            Header: "รายการอาหาร",
            accessor: "MenuName"
        },
        {
            Header: "จำนวน/ราคา",
            accessor: d => `${d.OrderQty} : ${d.OrderPrice}฿`
        },
        {
            Header: "คนสั่ง",
            accessor: "CustomerName"
        },
        {
            Header: "หมายเหตุของลูกค้า",
            accessor: "OrderNoteCus"
        },
        {
            Header: "หมายเหตุของเจ้าของร้าน",
            accessor: "OrderNoteOw"
        }
    ]);

    //พยายามแยกอีก component แล้ว แต่มันแยกไม่ได้ ขออนุญาตไว้ตรงนี้
    function Table({ columns, data }) {
        // Use the state and functions returned from useTable to build your UI

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            page,
            pageOptions,
            state,
            setGlobalFilter,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage,
            prepareRow
        } = useTable({ columns, data }, useGlobalFilter, usePagination);
        // Render the UI for your table

        const { globalFilter } = state
        const { pageIndex } = state
        return (
            <>
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <Dropdown className="d-inline mx-2">
                    <Dropdown.Toggle variant="success" className='fontdropdrownstatus' id="dropdown-autoclose-true">
                        📝สถานะอาหาร
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="fontdropdrownstatus">
                        <Dropdown.Item onClick={() => setselectstatus("0")}>ทั้งหมด</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("1")}>กำลังปรุง</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("2")}>เรียบร้อย</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("3")}>ได้รับแล้ว</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("4")}>ถูกยกเลิก</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br/>
                <br/>
                <table className='customers' {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <>
                                    <tr {...row.getRowProps()} key={row.id}>
                                        {row.cells.map((cell) => {
                                            if (cell.column.Header === "สถานะอาหาร") {
                                                if (cell.value === "กำลังปรุง") {
                                                    return <td {...cell.getCellProps()} style={{ color: "black" }}><img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;กำลังปรุง</td>;
                                                }
                                                else if (cell.value === "เรียบร้อย") {
                                                    return <td {...cell.getCellProps()} style={{ color: "#CB3A00" }}><img src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;เรียบร้อย</td>;
                                                }
                                                else if (cell.value === "ได้รับแล้ว") {
                                                    return <td {...cell.getCellProps()} style={{ color: "green" }}><img src="https://cdn-icons-png.flaticon.com/512/7662/7662496.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;ได้รับแล้ว</td>;
                                                }
                                                else if (cell.value === "ถูกยกเลิก") {
                                                    return <td {...cell.getCellProps()} style={{ color: "red" }}><img src="https://cdn-icons-png.flaticon.com/512/1147/1147931.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;ถูกยกเลิก</td>;
                                                }
                                                else {
                                                    return <td {...cell.getCellProps()}>ระบบผิดพลาด</td>;
                                                }
                                            }
                                            else if (cell.column.Header === "ชื่อร้าน") {
                                                return <td {...cell.getCellProps()}>ร้าน{cell.render("Cell")}</td>;

                                            }
                                            else if (cell.column.Header === "ราคา") {
                                                return <td {...cell.getCellProps()}>{cell.render("Cell")}฿</td>;

                                            }
                                            else if (cell.column.Header === "วันที่") {
                                                const date = new Date(cell.value)
                                                const datath = date.toLocaleDateString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })
                                                return <td {...cell.getCellProps()}>{datath}</td>;
                                            }
                                            else
                                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}

                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
                <div className='nextapre'>
                    <div className='row'>
                        <div className='col'>
                            <button className='icon-prenext' onClick={() => previousPage()} disabled={!canPreviousPage}><FaArrowLeft /></button>
                        </div>
                        <div className='col'>
                            <p className='fontnp'>{pageIndex + 1} จาก {pageOptions.length}</p>
                        </div>
                        <div className='col'>
                            <button className='icon-prenext' onClick={() => nextPage()} disabled={!canNextPage}><FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="">

            <div className="mainstatus">
                <div className='boxfontstatus1'>
                    <h2 className="fontstatus1">สถานะรายการอาหาร</h2>
                </div>
            </div>

            <div className='mainstatus2'>
                <div className='mainstatus21'>
                    <Table columns={columns} data={data} />
                    {/* <table className='customers'>
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>สถานะอาหาร</th>
                                <th>รายการอาหาร</th>
                                <th>ชื่อร้านอาหาร</th>
                                <th>จำนวน</th>
                                <th>ราคา</th>
                                <th>หมายเหตุ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>9 ต.ค. 65</td>
                                <td>กำลังปรุง</td>
                                <td>ข้าวหมึกผัดผงกะหรี่</td>
                                <td>ช้อนเงินช้องทอง ช้อนอะไรก็มาเถอะ</td>
                                <td>1</td>
                                <td>50฿</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>9 ต.ค. 65</td>
                                <td>กำลังปรุง</td>
                                <td>ข้าวหมึกผัดผงกะหรี่</td>
                                <td>ช้อนเงินช้องทอง ช้อนอะไรก็มาเถอะ</td>
                                <td>1</td>
                                <td>50฿</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>9 ต.ค. 65</td>
                                <td>กำลังปรุง</td>
                                <td>ข้าวหมึกผัดผงกะหรี่</td>
                                <td>ช้อนเงินช้องทอง ช้อนอะไรก็มาเถอะ</td>
                                <td>1</td>
                                <td>50฿</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
                <PopUpSc
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    );
}
export default Pagestatusfood;