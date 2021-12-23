import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();
    const goHomePage = () => {
        history.push("/");
    }
    return (
        <div
            style={{
                backgroundImage: `url('https://hostingpill.com/wp-content/uploads/2019/07/page-not-found.jpg')`,
                backgroundSize: "100% auto",
                height: '1000px',
                width: '1524px',

            }}
        >
            <button className="btn btn-primary" onClick={() => goHomePage()}>Quay về trang chủ</button>
        </div>
    )

}
export default NotFound