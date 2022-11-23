import React from "react";
import { FaSearch } from "react-icons/fa";
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className="app-search">
            <div className='left-pan'><p className='icon-pan'><FaSearch /></p></div>
            <input
                className="form-control form-control-lg form-input"
                type="text"
                placeholder="ค้นหาคำสั่งซื้อ..."
                onChange={(e) => setFilter(e.target.value)}
            />

        </div>
    )
}