import './components/styles.css'
import Table from 'react-bootstrap/Table';
import { FaEdit, FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
// import datam from './components/Testdata';
import { useNavigate } from 'react-router-dom'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { GlobalFilter } from './components/GlobalFilter';
import PopUpM from './components/PopUpM';
import Dropdown from 'react-bootstrap/Dropdown';
// import PopUpLogin from '../PageLogin/components/PopUpLogin';
function PagesManageMenu() {
    const [modalShow, setModalShow] = useState(false);
    const [beforedata, setbeforedata] = useState([]);
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [id, setid] = useState("");
    const [typepop, settypepop] = useState("")
    const [selectstatus, setselectstatus] = useState("0")
    const axios = require('axios');
    let owner = JSON.parse(localStorage.getItem("Owner"))
    const history = useNavigate();
    
    useEffect(() => {
        // GetMenuByStoreID();
        if (localStorage.getItem("Owner") === null && localStorage.getItem("Customer")) {
            history("/")
        }
        else if (localStorage.getItem("Owner") === null) {
            history("/login")
        }
        else {
            // console.log(selectstatus)
            if(selectstatus === "0")
            {
                GetMenuByStoreID();
            }
            else if(selectstatus === "1")
            {
                GetMenuByStoreID1();
            }
            else if(selectstatus === "2")
            {
                GetMenuByStoreID2();
            }
            if (localStorage.getItem("UPmenuSc")) {
                localStorage.removeItem("UPmenuSc")
                settypepop("UPSC")
                setModalShow(true)
            }
            if (localStorage.getItem("DTmenuSc")) {
                if (localStorage.getItem("DTmenuSc") === "สำเร็จ") {
                    settypepop("DTSC")
                    setModalShow(true)
                }
                else if (localStorage.getItem("DTmenuSc") === "ไม่สำเร็จ") {
                    settypepop("DONTDTSC")
                    setModalShow(true)
                }
                localStorage.removeItem("DTmenuSc")
            }
            if (localStorage.getItem("NmenuSc")) {
                localStorage.removeItem("NmenuSc")
                settypepop("NSC")
                setModalShow(true)
            }
        }

    }, [selectstatus])
    const GetMenuByStoreID = async () => {
        let StoreID = { StoreID: owner.StoreID };
        // console.log(StoreID)
        let res = await axios.post('http://localhost:8000/api/menu', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(beforedata);
    }
    const GetMenuByStoreID1 = async () => {
        let StoreID = { StoreID: owner.StoreID };
        // console.log(StoreID)
        let res = await axios.post('http://localhost:8000/api/menu1', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(beforedata);
    }
    const GetMenuByStoreID2 = async () => {
        let StoreID = { StoreID: owner.StoreID };
        // console.log(StoreID)
        let res = await axios.post('http://localhost:8000/api/menu2', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(beforedata);
    }
    // KMCH ผู้มีความพยายามที่จะแก้ error ขอตั้งวิธีนี้เป็นอนุสรณ์ไว้ครับผม
    // axios.get('http://localhost:8000/api/menu').then(resp => {
    //     console.log(resp.data);
    // });
    
    const data = useMemo(() => beforedata, [beforedata]); //แก้บัคตรงนี้เสร็จประมาณตี 2:54 นาที
    // console.log(data)
    const columns = useMemo(() => [
        {
            Header: "วันที่เพิ่ม",
            accessor: "MenuDate",
            width: 500,
        },
        {
            Header: "รูปภาพ",
            accessor: "",
            Cell: ({ cell }) => (
                <>
                    <img className="imagemenum" src={"http://localhost:8000/uploadsmenu/" + cell.row.original.MenuImage} alt="" />
                </>
            ),
            width: 800,
        },
        {
            Header: "รายการอาหาร",
            accessor: "MenuName",
            width: 300,
        },
        {
            Header: "ราคา",
            accessor: "MenuPrice"
        },
        {
            Header: "สถานะ",
            accessor: "MenuNameStatus"
        },
        {
            Header: "แก้ไข",
            accessor: "",
            Cell: ({ cell }) => (
                <button className='iconbutton' type='button' onClick={() => history("/editmenu/" + cell.row.original.MenuID, { state: { MenuStatus: cell.row.original.MenuStatus } })}><FaEdit size={28} color='#FF7000' /></button>

            )
        },
        {
            Header: "ลบ",
            accessor: "",
            Cell: ({ cell }) =>
            (
                <button className='iconbutton' onClick={() => DeleteByID(cell.row.original.MenuID, cell.row.original.MenuName, cell.row.original.MenuPrice)}>
                    <img className="binss" alt="" src={"https://sv1.picz.in.th/images/2022/09/14/aLBJPD.png"} />
                </button>
            )

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
                    📝สถานะเมนูอาหาร
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="fontdropdrownstatus">
                        <Dropdown.Item  onClick={()=>setselectstatus("0")}>ทั้งหมด</Dropdown.Item>
                        <Dropdown.Item  onClick={()=>setselectstatus("1")}>เปิด</Dropdown.Item>
                        <Dropdown.Item  onClick={()=>setselectstatus("2")}>ปิด</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                <br />
                <table className='customers' {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps({ style: { minWidth: column.minWidth, width: column.width } })}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.Header === "วันที่เพิ่ม") {
                                            const date = new Date(cell.value)
                                            const datath = date.toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                weekday: 'long',
                                            })
                                            return <td {...cell.getCellProps()}>{datath}</td>;
                                        }
                                        // else if (cell.column.Header === "สถานะ") {
                                        //     if (cell.value === 0) {
                                        //         return <td {...cell.getCellProps()}>ปิดใช้งาน</td>;
                                        //     }
                                        //     else {
                                        //         return <td {...cell.getCellProps()}>เปิดใช้งาน</td>;
                                        //     }
                                        // }
                                        else if (cell.column.Header === "ราคา") {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}฿</td>;

                                        }
                                        else {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        }
                                    })}

                                </tr>
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

    // การลบ

    const DeleteByID = (MenuID, MenuName, MenuPrice) => {
        setname(MenuName)
        setid(MenuID)
        setprice(MenuPrice)
        settypepop("D")
        setModalShow(true)
    }
    return (
        <div className="">

            <div className="mainstatus1">
                <div className='boxfontstatus1'>
                    <h2 className="fontstatus1">รายการอาหาร</h2>
                </div>
            </div>

            <div className='mainstatus2'>
                <div className='boxaddmenu'><button className='button-addmenu' onClick={() => history("/newmenu/")}><FaPlus /> เพิ่มรายการอาหาร</button></div>
                <div className='mainstatus21'>
                    <Table columns={columns} data={data} />
                </div>
            </div>
            <PopUpM
                show={modalShow}
                onHide={() => setModalShow(false)}
                name={name}
                price={price}
                id={id}
                typepop={typepop}
            />
        </div>
    );
}
export default PagesManageMenu;