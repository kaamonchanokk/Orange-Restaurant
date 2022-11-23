import './styles.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar ,Pie,Doughnut} from "react-chartjs-2";
import React, { useState, useEffect } from "react";


import { Table } from 'react-bootstrap';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
function BarChartMostFood() {

  const axios = require('axios');
  let owner = JSON.parse(localStorage.getItem("Owner"))
  const [data, setdata] = useState([]);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    GetMostFoodByStoreID();
    if (data.length > 0) {
      //  console.log(data)
      if (data.length === 1) {
        setChartData({
          labels: [data[0].MenuName],
          datasets: [
            {
              label: "รายได้รวมทั้งหมด",
              data: [data[0].OrderMostPrice],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      }
      else if (data.length === 2) {
        setChartData({
          labels: [data[0].MenuName, data[1].MenuName],
          datasets: [
            {
              label: "รายได้รวมทั้งหมด",
              data: [data[0].OrderMostPrice, data[1].OrderMostPrice],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      }
      else if (data.length === 3) {
        setChartData({
          labels: [data[0].MenuName, data[1].MenuName, data[2].MenuName],
          datasets: [
            {
              label: "รายได้รวมทั้งหมด",
              data: [data[0].OrderMostPrice, data[1].OrderMostPrice, data[2].OrderMostPrice],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      }
      else if (data.length === 4) {
        setChartData({
          labels: [data[0].MenuName, data[1].MenuName, data[2].MenuName, data[3].MenuName],
          datasets: [
            {
              label: "รายได้รวมทั้งหมด",
              data: [data[0].OrderMostPrice, data[1].OrderMostPrice, data[1].OrderMostPrice, data[2].OrderMostPrice],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      }
      else if (data.length === 5) {
        setChartData({
          labels: [data[0].MenuName, data[1].MenuName, data[2].MenuName, data[3].MenuName, data[4].MenuName],
          datasets: [
            {
              label: "รายได้รวมทั้งหมด",
              data: [data[0].OrderMostPrice, data[1].OrderMostPrice, data[2].OrderMostPrice, data[3].OrderMostPrice, data[4].OrderMostPrice],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
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
  const GetMostFoodByStoreID = async () => {
    let StoreID = { StoreID: owner.StoreID };
    // console.log(StoreID)
    let res = await axios.post('http://localhost:8000/api/mostfood', StoreID);
    let data = res.data;
    setdata(data)
    // console.log(beforedata);
  }
  return (
    <>
            <div className="Chartgrid">
                <div className="Chartgrid-item">
                    <Doughnut
                        data={chartData}
                        options={{
                          maintainAspectRatio: false,
                      } }
                          height={400}
                          width={600}
                    />
                </div>
                <div className="Chartgrid-item">
                    <br />
                    <br />
                    <center><h3 className="fontheadChart" >รายงานยอดขายเมนูที่นิยมที่สุด</h3></center>
                    <br />
                    <Table className='customers' >
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อเมนู</th>
                            <th>ยอดขายทั้งหมด</th>
                        </tr>
                        {
                            data.map((item) =>
                                <tr key={item.MostfoodRow}>
                                          <td>{item.MostfoodRow}</td>
                                    <td>{item.MenuName}</td>
                                    <td>{item.OrderMostPrice} บาท</td>
                                </tr>
                            )
                        }
                    </Table>
                </div>

            </div>
        </>
  );
}

export default BarChartMostFood;