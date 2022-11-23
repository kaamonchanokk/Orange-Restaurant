import './style.css';

import { useNavigate } from 'react-router-dom'

function One() {
    const history = useNavigate();
    return (
        <div className="one">
            <h2 className="headfont">ยินดีต้อนรับสู่</h2>
            <h2 className="headfont">เว็ปสั่งอาหารโรงส้ม</h2>
            <p className="font1">เว็ปที่รวมร้านอาหาร มาไว้ให้คุณแล้ว</p>
            <button className="btna" onClick={()=> history("/listcanteen/")}>เริ่มต้นหาร้านอาหาร  →</button>
        </div>
    );
}
export default One;