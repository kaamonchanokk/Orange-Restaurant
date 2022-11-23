import './styles.css'
import { useNavigate } from 'react-router-dom'
function Canteenitem(props) {
    const { canteen } = props;
    const history = useNavigate();
    return (
        <div className="food-item">
            <img src={"http://localhost:8000/uploadstore/" + canteen.StoreImage} alt="" />
            <p className='fontcanteeninbox'>ร้าน{canteen.StoreName} </p>
            <p className='fontcanteenpeopleinbox'>ผู้ขาย : {canteen.OwnerName} </p>
            {
                canteen.storestatus_StoreStatus === 1 ? (

                    <button className='button-canteen' onClick={() => history("/food/" + canteen.StoreID)}>
                        ดูเมนูอาหาร
                    </button>
                ) :
                    (
                        <center><p className='boxcanteenclose'>ร้านปิด</p></center>
                )
            }
        </div>
    );
}
export default Canteenitem;