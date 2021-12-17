import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Chart.css'
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getListMoviePageAction } from "../../store/actions/adminAction";
import axios from "axios";

export const ChartAdmin = () => {
    const data = [
        {
            name: 'January',
            Iphone: 4000
        },
        {
            name: "March",
            Iphone: 1000,
        },
        {
            name: "May",
            Iphone: 4000,
        },
        {
            name: "July",
            Iphone: 800,
        },
        {
            name: "October",
            Iphone: 1500,
        },
    ];
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.admin.listMovie);
    const [total, setTotal] = useState('')
    useEffect(async () => {
        dispatch(getListMoviePageAction())

        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios({
            url: "http://localhost:5000/admin/goodSales",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        setTotal(res.data)

    }, []);
    let count = 0;
    movies.map((movie, index) => {
        const date = new Date(movie.ngayKhoiChieu)
        if (date <= Date.now())
            count++;
    })
    const Format = (x) => {
        return x.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <>
            <div>
                <div className="featured">
                    <div className="featuredItem">
                        <span className="featuredTitle">Tổng phim đang chiếu</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">{count}</span>
                            <span className="featuredMoneyRate">
                                PHIM
                            </span>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <span className="featuredTitle">Tổng doanh thu</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">{Format(total)}</span>
                            <span className="featuredMoneyRate">
                                {/* -1.4 <ArrowDownward className="featuredIcon negative" /> */}
                            </span>
                        </div>

                    </div>
                    <div className="featuredItem">
                        <span className="featuredTitle"></span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney"></span>
                            <span className="featuredMoneyRate">
                                {/* +2.4 <ArrowUpward className="featuredIcon" /> */}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="chart">
                <h3 className="chartTitle">Phim được yêu thích</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#5550bd" />
                        <Line type="monotone" dataKey="name" stroke="#5550bd" />
                        <Tooltip />
                        {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
