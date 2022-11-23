import './style.css';
import { useState, useEffect } from 'react';
function Food(props) {

    const { item, food, onAdd, onRemove } = props;
    // const [st, at] = useState()
    return (
        <div className="Lfood-item">
            <img src={"http://localhost:8000/uploadsmenu/" + food.MenuImage} alt="" />
            <div className='fontfoodbox'>
                <div className='row'>
                    <div className="col">
                        <p className='fontinfoodbox'>{food.MenuName}</p>
                    </div>
                    <div className="col-3">
                        <p className='fontinfoodbox'>{food.MenuPrice}฿</p>
                    </div>
                    {/* {st === '5' ? (
                        <div className="col-3">
                            <p className='fontinfoodbox'>{food.price}฿</p>
                        </div>
                    ) : (
                    <div className="col-3">
                        <p className='fontinfoodbox'>{food.price}฿</p>
                    </div>
                    )
                    } */}

                </div>
                {/* <div className='row'>
                    <div className="col-1">
                        <input type="radio"
                            name="AA"
                            value="1"
                            checked={st === '1'}
                            onChange={(e)=> at(e.target.value)}
                        />
                    </div>
                    <div className="col-4">
                        <p className='fontinfoodbox'>ธรรมดา</p>
                    </div>

                    <div className="col-1">
                    </div>
                    <div className="col-2">
                    </div>
                    <div className="col-1">
                        <input
                            type="radio"
                            name="BB"
                            value="5"
                            checked={st === '5'}
                            onChange={(e)=> at(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <p className='fontinfoodbox'>พิเศษ</p>
                    </div>
                </div> */}
                {
                    item ? (
                        <div>
                            <center>
                                <button className='button-add' onClick={() => onAdd(item)}>
                                    +
                                </button>
                                <span className='fontqty'>{item.qty}</span>
                                <button className='button-remove' onClick={() => onRemove(item)}>
                                    -
                                </button>
                            </center>
                        </div>
                    ) :
                        (
                            food.MenuStatus === 1 ?
                                (
                                    <button className='button-cart' onClick={() => onAdd(food)}>
                                        สั่งอาหาร
                                    </button>
                                ) :
                                (
                                    <div className='closebuttoncart'>
                                        ไม่เปิดให้บริการ
                                    </div>
                                )
                        )
                }

            </div>
        </div >
    );
}
export default Food;