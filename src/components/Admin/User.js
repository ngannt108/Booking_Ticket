import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import { getListUserPageAction } from "../../store/actions/adminAction";

export const User = () => {
    const columns = [
        {
            name: "",
            label: "",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, update) => {
                    let rowIndex = Number(tableMeta.rowIndex) + 1;
                    return <span>{rowIndex}</span>;
                },
            },
        },
        {
            name: "tentaiKhoan",
            label: "Tên tài khoản",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "hoTen",
            label: "Họ tên",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "SDT",
            label: "Số điện thoại",
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: false,
                sort: false,
            },
        },
    ];

    const options = {
        filterType: "checkbox",
        selectableRows: false, // tắt ô checkbox row
    };

    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.listUser);
    // const [tentaiKhoan, setTentaiKhoan] = useState("");
    // const [email, setEmail] = useState("");
    // const [hoTen, setHoTen] = useState("");
    // const [SDT, setSDT] = useState("");

    useEffect(() => {
        dispatch(getListUserPageAction())
    }, []);

    return (
        <div>
            <div className="list">
                <MUIDataTable
                    title={"Danh sách người dùng"}
                    data={users} //Array.isArray(users) ? users : []
                    columns={columns}
                    options={options}
                />

            </div>
        </div>
    )
}
