import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import './AppHeader.css';
import Container from 'react-bootstrap/Container';
import React, { useMemo, useEffect, useState } from 'react'
import axios from 'axios';
import { FaShoppingBasket, FaUserLock, FaRegClock, FaRegNewspaper, FaClock } from "react-icons/fa";
function AppHeader() {
  let user = JSON.parse(localStorage.getItem("Customer"))
  let owner = JSON.parse(localStorage.getItem("Owner"))
  const [data, setdata] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Customer") !== null) {
      GetStatusOrderByCustomerID();
      // window.location.reload(false);
    }
  }, [data])

  const GetStatusOrderByCustomerID = async () => {
    let CustomerID = { CustomerID: user.CustomerID }
    let res = await axios.post('http://localhost:8000/api/countorder', CustomerID);
    setdata(res.data)
    // console.log(data)
  }
  function logOut() {
    localStorage.clear();
    history("/login")
  }
  function getNavClass(navLinkProps) {
    let navClass = 'app-header-item';
    if (navLinkProps.isActive) navClass += ' app-header-item-active';
    return navClass;
  }
  /*
   <header className="app-header">
        <NavLink className="app-header-logo" to="/" end>ORANGE CANTEEN</NavLink>
        <div className='test'>
          <NavLink className={getNavClass} to="/" end>หน้าหลัก</NavLink>
          <NavLink className={getNavClass} to="listcanteen">โรงอาหาร</NavLink>
          <NavLink className={getNavClass} to="login">เข้าสู่ระบบ</NavLink>
  
            <NavDropdown title="nffffffff">
              <NavDropdown.Item >Logout</NavDropdown.Item>
            </NavDropdown>
          
          </div>
      </header>
  */

  return (
    <div>
      <Navbar className="app-header">
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="app-header-logo" to="/" end>ORANGE CANTEEN</NavLink>
            </Nav>
            <Nav >
              {
                localStorage.getItem('Customer') ?
                  <>
                    <NavLink className={getNavClass} to="/" end>หน้าหลัก</NavLink>
                    <NavLink className={getNavClass} to="listcanteen">โรงอาหาร</NavLink>
                    {/* <NavLink className={getNavClass} to=""><div className='badge'><FaClock />&nbsp;{data.count}</div></NavLink> */}
                    {/* <NavLink className={getNavClass} to=""><div className='badge'><FaClock/>&nbsp;1</div></NavLink> */}

                  </>
                  : localStorage.getItem('Owner') ?
                    <>
                      <NavLink className={getNavClass} to="/" end>หน้าหลัก</NavLink>
                      <NavLink className={getNavClass} to="managemenu">จัดการเมนูอาหาร</NavLink>
                      <NavLink className={getNavClass} to="statusfoodofstaff">ดูคำสั่งอาหาร</NavLink>
                    </>
                    :
                    <>
                      <NavLink className={getNavClass} to="/" end>หน้าหลัก</NavLink>
                      <NavLink className={getNavClass} to="listcanteen">โรงอาหาร</NavLink>
                    </>
              }
            </Nav>
            <Nav>
              {/* <NavLink className={getNavClass} to="" >
              <h4><FaShoppingBasket  /></h4>
              </NavLink> */}
            </Nav>
            <Nav >
              {
                localStorage.getItem('Customer') ?
                  <>
                    <NavDropdown title={user.CustomerName}>
                      <NavDropdown.Item onClick={() => history("/statusfood/" + user.CustomerID)}><FaRegClock /> สถานะอาหาร</NavDropdown.Item>
                      <NavDropdown.Item onClick={logOut}>< FaUserLock /> ออกจากระบบ</NavDropdown.Item>
                    </NavDropdown>
                  </> :
                  localStorage.getItem('Owner') ?
                    <>
                      <NavDropdown title={owner.OwnerName}>
                        {/* <NavDropdown.Item><FaRegClock /> สถานะอาหาร</NavDropdown.Item> */}
                        <NavDropdown.Item onClick={() => history("/editstore/" + owner.OwnerID)}><FaRegClock />แก้ไขร้านอาหาร</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => history("/chart/")}>< FaRegNewspaper /> รายงาน</NavDropdown.Item>
                        <NavDropdown.Item onClick={logOut}>< FaUserLock /> ออกจากระบบ</NavDropdown.Item>
                      </NavDropdown>
                    </> :
                    <>
                      <NavDropdown title="ไม่ได้เข้าสู่ระบบ">
                        <NavDropdown.Item className={getNavClass} href="/login">< FaUserLock />เข้าสู่ระบบ</NavDropdown.Item>
                      </NavDropdown>
                    </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default AppHeader;