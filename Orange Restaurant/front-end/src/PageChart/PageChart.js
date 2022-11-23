import './components/styles.css'
import React, { useState, useEffect } from "react";
import BarChartMostFood from './components/BarChartMostFood';
import BarChartMonth from './components/BarChartMonth';
import BarChartDay from './components/BarChartDay';
import BarChartYear from './components/BarChartYear';
function PageChart() {
    const [showmostfood, setshowmostfood] = useState(1)
    const ChangeChart = (change) => {
        if (change === "1")
            setshowmostfood(1)
        else if (change === "2")
            setshowmostfood(2)
        else if (change === "3")
            setshowmostfood(3)
        else if (change === "4")
            setshowmostfood(4)
    }
    return (
        <>
            <div className='BLThree'>
                {/* onClick={() => POPUP()} */}
                <h3 className="fontheadChart" >รายงานยอดขาย</h3>
                <br/>
                    <div className='row'>
                        <div className="col-2">
                            <button className='button-chart1' type="button" onClick={() => ChangeChart("1")}>
                                อาหารขายดี
                            </button>
                        </div>
                        <div className="col-2">
                            <button className='button-chart2' type="button" onClick={() => ChangeChart("2")}>
                                แยกตามรายวัน
                            </button>
                        </div>
                        <div className="col-2">
                            <button className='button-chart3' type="button" onClick={() => ChangeChart("3")}>
                                แยกตามรายเดือน
                            </button>
                        </div>
                        <div className="col-2">
                            <button className='button-chart4' type="button" onClick={() => ChangeChart("4")}>
                                แยกตามรายปี
                            </button>
                        </div>
                
                </div>
            </div>
            {(function () {
                if (showmostfood === 1)
                    return <BarChartMostFood />;
                else if (showmostfood === 2)
                    return <BarChartDay />;
                else if (showmostfood === 3)
                    return <BarChartMonth />;
                else if (showmostfood === 4)
                    return <BarChartYear />;
            })()}
        </>
    );
}

export default PageChart;