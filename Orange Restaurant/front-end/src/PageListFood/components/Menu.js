import './style.css';
import Food from './Food';
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
function Menu(props) {
    const { cartItems, food, onAdd, onRemove } = props;
    const [searchText, setSearchText] = useState('');
    // console.log(food)
    const foodfilter = food.filter((food) => {
        return food.MenuName.includes(searchText);
    })

    const foodItem = foodfilter.map((food,index)=>{
        return <Food
        key={food.MenuID}
        food={food}
        onAdd={onAdd}
        onRemove={onRemove}
        item={cartItems.find((x) => x.MenuID === food.MenuID)}
    >

    </Food>
    });
    return (
        <div>
            <div className="app-search2">
                <div className='left-pan'><p className='icon-pan'><FaSearch /></p></div>
                <input
                    className="form-control form-control-lg form-input"
                    type="text"
                    value={searchText}
                    placeholder="ค้นหาเมนูอาหาร..."
                onChange={(event) => setSearchText(event.target.value)}
                />

            </div>
            <div className="Lfood">
                {foodItem}
            </div>
        </div>
    );
}
export default Menu;