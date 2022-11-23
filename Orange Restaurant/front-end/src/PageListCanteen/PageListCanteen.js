import One from "./components/One";
import Two from "./components/Two";
import data from "./components/Testdatacanteen";
import axios from 'axios';
import React, { useMemo, useEffect, useState } from 'react'
function PageListCanteen(){
    const [datac,setdata] = useState([])
    useEffect(() => {
        GetStore();
    }, [datac])
    const GetStore = async () => {
        let res = await axios.get('http://localhost:8000/api/stores');
        const data = res.data.data;
        setdata(data)
    }
    return(
        <div>
            <One/>
            <Two
              canteen={datac}
            />
        </div>
    );
}
export default PageListCanteen;