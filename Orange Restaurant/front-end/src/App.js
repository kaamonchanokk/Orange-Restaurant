
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import PageHome from './PageHome/PageHome';
import PageListCanteen from './PageListCanteen/PageListCanteen';
import Page404 from './PageError/Page404';
import PageLogin from './PageLogin/PageLogin';
import AppHeader from './AppHeader';
import PageSignup from './PageLogin/PageSignup';
import PageListFood from './PageListFood/PageListFood';
import Pagestatusfood from './Pagestatusfood/Pagestatusfood';
import Pagestatusfoodofstaff from './Pagestatusfoodofstaff/Pagestatusfoodofstaff';
import Pageeditstatusofstaff from './Pagestatusfoodofstaff/Pageeditstatusofstaff';
import PagesManageMenu from './PagesManageMenu/PagesManageMenu';
import PagesNewMenu from './PagesManageMenu/PagesNewMenu';
import PagesEditMenu from './PagesManageMenu/PagesEditMenu';
import PageEditStore from './PageEditStore/PageEditStore';
import PageChart from './PageChart/PageChart';

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  }
  return (
    <div className="App">
      <AppHeader />
        <Wrapper>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="listcanteen" element={<PageListCanteen />} />
            <Route path="login" element={<PageLogin />} />
            <Route path="signup" element={<PageSignup />} />
            <Route path="food/:id" element={<PageListFood />} />
            <Route path="statusfood/:id" element={<Pagestatusfood />} />
            {/* ของเจ้าของร้าน */}
            <Route path="statusfoodofstaff" element={<Pagestatusfoodofstaff />} />
            <Route path="editstatusofstaff/:id" element={<Pageeditstatusofstaff />} />

            <Route path="managemenu" element={<PagesManageMenu />} />
            <Route path="newmenu" element={<PagesNewMenu />} />
            <Route path="editmenu/:id" element={<PagesEditMenu />} />
            <Route path="editstore/:id" element={<PageEditStore />} />
            <Route path="chart/" element={<PageChart />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Wrapper>
    </div>
  );
}

export default App;
