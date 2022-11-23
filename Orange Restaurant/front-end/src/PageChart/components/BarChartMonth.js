import './styles.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";


import { Table } from 'react-bootstrap';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement

);
function BarChartMonth() {

    const axios = require('axios');
    let owner = JSON.parse(localStorage.getItem("Owner"))
    const [data, setdata] = useState([]);
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        GetMostMonthByStoreID();
        if (data.length > 0) {
            //  console.log(data)
            if (data.length === 1) {
                setChartData({
                    labels: [data[0].Month],
                    datasets: [
                        {
                            label: "รายได้รวมทั้งหมด",
                            data: [data[0].OrderPrice],
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.4)",
                        },
                    ],
                });
            }
            else if (data.length === 2) {
                setChartData({
                    labels: [data[1].Month, data[0].Month],
                    datasets: [
                        {
                            label: "รายได้รวมทั้งหมด",
                            data: [data[1].OrderPrice, data[0].OrderPrice],
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.4)",
                        },
                    ],
                });
            }
            else if (data.length === 3) {
                setChartData({
                    labels: [data[2].Month, data[1].Month, data[0].Month],
                    datasets: [
                        {
                            label: "รายได้รวมทั้งหมด",
                            data: [data[2].OrderPrice, data[1].OrderPrice, data[0].OrderPrice],
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.4)",
                        },
                    ],
                });
            }
            else if (data.length === 4) {
                setChartData({
                    labels: [data[3].Month, data[2].Month, data[1].Month, data[0].Month],
                    datasets: [
                        {
                            label: "รายได้รวมทั้งหมด",
                            data: [data[3].OrderPrice, data[2].OrderPrice, data[1].OrderPrice, data[0].OrderPrice],
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.4)",
                        },
                    ],
                });
            }
            else if (data.length === 5) {
                setChartData({
                    labels: [data[4].Month, data[3].Month, data[2].Month, data[1].Month, data[0].Month],
                    datasets: [
                        {
                            label: "รายได้รวมทั้งหมด",
                            data: [data[4].OrderPrice, data[3].OrderPrice, data[2].OrderPrice, data[1].OrderPrice, data[0].OrderPrice],
                            borderColor: "rgb(53, 162, 235)",
                            backgroundColor: "rgba(53, 162, 235, 0.4)",
                        },
                    ],
                });
            }
            setChartOptions({
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "5 เมนูยอดฮิตในร้าน",
                    },
                },
            });


        }
    }, [data]);
    const GetMostMonthByStoreID = async () => {
        let StoreID = { StoreID: owner.StoreID };
        // console.log(StoreID)
        let res = await axios.post('http://localhost:8000/api/monthfood', StoreID);
        let data = res.data;
        setdata(data)
        // console.log(beforedata);
    }
    return (
        <>
            <div className="Chartgrid">
                <div className="Chartgrid-item">
                    <Line options={{
                        maintainAspectRatio: false,
                    }}
                        data={chartData}
                        height={400}
                        width={600}
                    />
                </div>
                <div className="Chartgrid-item">
                    <br />
                    <br />
                    <center><h3 className="fontheadChart" >รายงานยอดตามรายเดือน</h3></center>
                    <br />
                    <Table className='customers' >
                        <tr>
                            <th>เดือน</th>
                            <th>ยอดขายทั้งหมด</th>
                        </tr>
                        {
                            data.map((item) =>
                                <tr key={item.MonthRow}>
                                    {(() => {
                                        if (item.Month === 1) {
                                            return (
                                                <td><div>มกราคม</div></td>
                                            )
                                        } else if (item.Month === 2) {
                                            return (
                                                <td><div>กุมภาพันธ์</div></td>
                                            )
                                        } else if (item.Month === 3) {
                                            return (
                                                <td><div>มีนาคม</div></td>
                                            )
                                        } else if (item.Month === 4) {
                                            return (
                                                <td><div>เมษายน</div></td>
                                            )
                                        } else if (item.Month === 5) {
                                            return (
                                                <td> <div>พฤษภาคม</div></td>
                                            )
                                        } else if (item.Month === 6) {
                                            return (
                                                <td><div>มิถุนายน</div></td>
                                            )
                                        } else if (item.Month === 7) {
                                            return (
                                                <td><div>กรกฎาคม</div></td>
                                            )
                                        } else if (item.Month === 8) {
                                            return (
                                                <td><div>สิงหาคม</div></td>
                                            )
                                        }else if (item.Month === 9) {
                                            return (
                                                <td><div>กันยายน</div></td>
                                            )
                                        }else if (item.Month === 10) {
                                            return (
                                                <td><div>ตุลาคม</div></td>
                                            )
                                        }else if (item.Month === 11) {
                                            return (
                                                <td><div>พฤศจิกายน</div></td>
                                            )
                                        }else if (item.Month === 12) {
                                            return (
                                                <td><div>ธันวาคม</div></td>
                                            )
                                        }

                                    })()}
                                    <td>{item.OrderPrice} บาท</td>
                                </tr>
                            )
                        }
                    </Table>
                </div>

            </div>
        </>
    );
}

export default BarChartMonth;