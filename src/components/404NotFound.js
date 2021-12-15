import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();
    const goHomePage = () => {
        history.push("/");
    }
    return (
        <div>
            <h4>
                Địa chỉ URL bạn yêu cầu không được tìm thấy.
            </h4>
            <button style={{ marginTop: '10px' }} className="btn btn-primary" onClick={() => goHomePage()}>Quay về trang chủ</button>
        </div>
    )

}
export default NotFound