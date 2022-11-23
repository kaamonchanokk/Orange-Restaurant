import Two from "./components/css/Two";
import One from "./components/css/One";
import Three from "./components/css/Three";
import Four from "./components/css/Four";
function PageHome() {
    let user = JSON.parse(localStorage.getItem("Customer"))
    let owner = JSON.parse(localStorage.getItem("Owner"))
    return (
        <div className="app-grid">
            {
                localStorage.getItem('Owner') ?
                    <>
                        <Four />

                    </>
                    :
                    <>
                        <One />
                        <Two />
                        <Three />
                    </>
            }
        </div>
    );
}
export default PageHome;