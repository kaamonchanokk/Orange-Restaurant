import './styles.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";


import { Table } from 'react-bootstrap';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function BarChartYear() {

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
          labels: [data[0].Year+543],
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
          labels: [data[1].Year+543, data[0].Year+543],
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
          labels: [data[2].Year+543, data[1].Year+543, data[0].Year+543],
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
          labels: [data[3].Year+543, data[2].Year+543, data[1].Year+543, data[0].Year+543],
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
          labels: [data[4].Year+543, data[3].Year+543, data[2].Year+543, data[1].Year+543, data[0].Year+543],
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
  const GetMostFoodByStoreID = async () => {
    let StoreID = { StoreID: owner.StoreID };
    // console.log(StoreID)
    let res = await axios.post('http://localhost:8000/api/yearfood', StoreID);
    let data = res.data;
    setdata(data)
    // console.log(beforedata);
  }
  return (
    <>
    <div className="Chartgrid">
        <div className="Chartgrid-item">
            <Bar options={{
                maintainAspectRatio: false,
            } }
                data={chartData}
                height={400}
                width={600}
            />
        </div>
        <div className="Chartgrid-item">
            <br />
            <br />
            <center><h3 className="fontheadChart" >รายงานยอดตามรายปี</h3></center>
            <br />
            <Table className='customers' >
                <tr>
                    <th>รายปี</th>
                    <th>ยอดขายทั้งหมด</th>
                </tr>
                {
                    data.map((item) =>
                        <tr key={item.YearRow}>
                            <td>พ.ศ. {item.Year+543}</td>
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

export default BarChartYear;