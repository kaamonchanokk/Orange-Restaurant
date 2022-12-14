import './components/styles.css'
import { FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import dataa from './components/Testdata';
import { useNavigate } from 'react-router-dom'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { GlobalFilter } from './components/GlobalFilter';
import PopUpSF from './components/PopUpSF';
import Dropdown from 'react-bootstrap/Dropdown';
function Pagestatusfoodofstaff() {
    const history = useNavigate();
    let owner = JSON.parse(localStorage.getItem("Owner"))
    const [beforedata, setbeforedata] = useState([]);
    const axios = require('axios');
    const [modalShow, setModalShow] = useState(false);

    const [typepop, settypepop] = useState("");
    const [status, setstatus] = useState("");
    const [id, setid] = useState("");
    const [customername, setcustomername] = useState("");
    const [menuname, setmenuname] = useState("");
    const [qty, setqty] = useState("");
    const [date, setdate] = useState("");
    const [selectstatus, setselectstatus] = useState("0")

    useEffect(() => {
        // GetMenuByStoreID();
        if (localStorage.getItem("Owner") === null && localStorage.getItem("Customer")) {
            history("/")
        }
        else if (localStorage.getItem("Owner") === null) {
            history("/login")
        }
        else {
            if (selectstatus === "0") {
                GetStatusfoodByStoreID();
            }
            else if (selectstatus === "1") {

                GetStatusfoodByStoreID1();
            }
            else if (selectstatus === "2") {

                GetStatusfoodByStoreID2();
            }
            else if (selectstatus === "3") {

                GetStatusfoodByStoreID3();
            }
            else if (selectstatus === "4") {

                GetStatusfoodByStoreID4();
            }
            if (localStorage.getItem("UPorederSc")) {
                localStorage.removeItem("UPorederSc")
                settypepop("UPSC")
                setModalShow(true)
            }
            if (localStorage.getItem("DTorederSc")) {
                localStorage.removeItem("DTorederSc")
                settypepop("DTSC")
                setModalShow(true)
            }
        }

    }, [selectstatus])

    const GetStatusfoodByStoreID = async () => {
        let StoreID = { StoreID: owner.StoreID };

        let res = await axios.post('http://localhost:8000/api/statusfoodow', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByStoreID1 = async () => {
        let StoreID = { StoreID: owner.StoreID };

        let res = await axios.post('http://localhost:8000/api/statusfoodow1', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByStoreID2 = async () => {
        let StoreID = { StoreID: owner.StoreID };

        let res = await axios.post('http://localhost:8000/api/statusfoodow2', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByStoreID3 = async () => {
        let StoreID = { StoreID: owner.StoreID };

        let res = await axios.post('http://localhost:8000/api/statusfoodow3', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const GetStatusfoodByStoreID4 = async () => {
        let StoreID = { StoreID: owner.StoreID };

        let res = await axios.post('http://localhost:8000/api/statusfoodow4', StoreID);

        let data = res.data;
        setbeforedata(data)
        // console.log(data);
    }
    const data = useMemo(() => beforedata, [beforedata]);
    const columns = useMemo(() => [
        {
            Header: "??????????????????",
            accessor: "OrderDate"
        },
        {
            Header: "??????????????????????????????",
            accessor: "OrderNameStatus"
        },
        {
            Header: "???????????????????????????",
            accessor: "OrderTime"
        },
        {
            Header: "?????????????????????????????????",
            accessor: "MenuName"
        },
        {
            Header: "???????????????/????????????",
            accessor: d => `${d.OrderQty} : ${d.OrderPrice}???`
        },
        {
            Header: "??????????????????",
            accessor: "CustomerName"
        },
        {
            Header: "??????????????????????????????????????????",
            accessor: "OrderNoteCus"
        },
        {
            Header: "?????????????????????????????????????????????????????????",
            accessor: "OrderNoteOw"
        },
        {
            Header: "???????????????",
            accessor: "",
            Cell: ({ cell }) => (
                <button className='iconbutton' onClick={() => history("/editstatusofstaff/" + cell.row.original.OrderID, { state: { OrderStatustable: cell.row.original.OrderStatus } })}><FaEdit size={28} color='#FF7000' /></button>
            )
        },
        {
            Header: "??????",
            accessor: "",
            Cell: ({ cell }) => (
                <button className='iconbutton' onClick={() => DeleteByID(cell.row.original.OrderStatus, cell.row.original.OrderID, cell.row.original.CustomerName, cell.row.original.MenuName, cell.row.original.OrderQty, cell.row.original.OrderDate)} >
                    <img className="binss" alt="" src={"https://sv1.picz.in.th/images/2022/09/14/aLBJPD.png"} />
                </button>
            )

        }
    ]);

    //???????????????????????????????????? component ???????????? ????????????????????????????????????????????? ???????????????????????????????????????????????????
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
                    ??????????????????????????????????
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="fontdropdrownstatus">
                        <Dropdown.Item onClick={() => setselectstatus("0")}>?????????????????????</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("1")}>???????????????????????????</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("2")}>???????????????????????????</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("3")}>??????????????????????????????</Dropdown.Item>
                        <Dropdown.Item onClick={() => setselectstatus("4")}>???????????????????????????</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <br />
                <br />
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
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.Header === "??????????????????????????????") {
                                            if (cell.value === "???????????????????????????") {
                                                return <td {...cell.getCellProps()} style={{ color: "black" }}><img src="https://cdn-icons-png.flaticon.com/512/1027/1027128.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;???????????????????????????</td>;
                                            }
                                            else if (cell.value === "???????????????????????????") {
                                                return <td {...cell.getCellProps()} style={{ color: "#CB3A00" }}><img src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;???????????????????????????</td>;
                                            }
                                            else if (cell.value === "??????????????????????????????") {
                                                return <td {...cell.getCellProps()} style={{ color: "green" }}><img src="https://cdn-icons-png.flaticon.com/512/7662/7662496.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;??????????????????????????????</td>;
                                            }
                                            else if (cell.value === "???????????????????????????") {
                                                return <td {...cell.getCellProps()} style={{ color: "red" }}><img src="https://cdn-icons-png.flaticon.com/512/1147/1147931.png" style={{ width: "50px", hight: "50px" }} alt="Logo" />&nbsp;???????????????????????????</td>;
                                            }
                                            else {
                                                return <td {...cell.getCellProps()}>?????????????????????????????????</td>;
                                            }
                                        }
                                        if (cell.column.Header === "??????????????????") {
                                            const date = new Date(cell.value)
                                            const datath = date.toLocaleDateString('th-TH', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                weekday: 'long',
                                            })
                                            return <td {...cell.getCellProps()}>{datath}</td>;
                                        }
                                        else if (cell.column.Header === "????????????") {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}???</td>;

                                        }
                                        else
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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
                            <p className='fontnp'>{pageIndex + 1} ????????? {pageOptions.length}</p>
                        </div>
                        <div className='col'>
                            <button className='icon-prenext' onClick={() => nextPage()} disabled={!canNextPage}><FaArrowRight /></button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    // ???????????????

    const DeleteByID = (OrderStatus, OrderID, CustomerName, MenuName, OrderQty, OrderDate) => {
        setstatus(OrderStatus)
        setid(OrderID)
        setcustomername(CustomerName)
        setmenuname(MenuName)
        setqty(OrderQty)
        const orderdate = new Date(OrderDate)
        const datath = orderdate.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        })
        setdate(datath)
        settypepop("D")
        setModalShow(true)
    }
    return (
        <div className="">

            <div className="mainstatus1">
                <div className='boxfontstatus1'>
                    <h2 className="fontstatus1">????????????????????????????????????????????????</h2>
                </div>
            </div>

            <div className='mainstatus2'>
                <div className='mainstatus21'>
                    <Table columns={columns} data={data} />
                </div>
            </div>
            <PopUpSF
                show={modalShow}
                onHide={() => setModalShow(false)}
                status={status}
                id={id}
                customername={customername}
                menuname={menuname}
                qty={qty}
                date={date}
                typepop={typepop}
            />
        </div>
    );
}
export default Pagestatusfoodofstaff;