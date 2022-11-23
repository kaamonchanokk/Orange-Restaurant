import './styles.css'
import Canteenitem from './Canteenitem';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
function Two(props) {
    const { canteen } = props;
    // const [selectedfood, setSelectedfood] = useState(null);
    const [searchText, setSearchText] = useState('');
    // console.log(canteen)
    const canteenfilter = canteen.filter((canteen) => {
        return canteen.StoreName.includes(searchText);
    })

    const canteenItem = canteenfilter.map((canteen,index)=>{
        return <Canteenitem key={canteen.StoreID} canteen={canteen}> </Canteenitem>
    });

    return (
        <div>
            <div className="twocanteen">
                <h2 className="headfontcanteen">รายชื่อร้านอาหาร</h2>
            </div>
            {/* <center> */}
            <div className="app-search">
                <div className='left-pan'><p className='icon-pan'><FaSearch /></p></div>
                <input
                    className="form-control form-control-lg form-input"
                    type="text"
                    value={searchText}
                    placeholder="ค้นหาร้านอาหาร..."
                    onChange={(event) => setSearchText(event.target.value)}
                />

            </div>
            {/* </center> */}
            <div className='main2'>
                {canteenItem}
            </div>
        </div>
    );
}
export default Two;