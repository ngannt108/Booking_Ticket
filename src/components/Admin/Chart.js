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
    YAxis,
    Legend,
    BarChart,
    Bar,
    PieChart,
    Pie,
} from "recharts";
import { getListMoviePageAction } from "../../store/actions/adminAction";
import { getListUserPageAction } from "../../store/actions/adminAction";
import axios from "axios";

export const ChartAdmin = () => {
    // const data = [
    //     {
    //         name: 'January',
    //         Iphone: 4000
    //     },
    //     {
    //         name: "March",
    //         Iphone: 1000,
    //     },
    //     {
    //         name: "May",
    //         Iphone: 4000,
    //     },
    //     {
    //         name: "July",
    //         Iphone: 800,
    //     },
    //     {
    //         name: "October",
    //         Iphone: 1500,
    //     },
    // ];
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.admin.listMovie);
    const [total, setTotal] = useState('')
    const [topMovies, setTopMovies] = useState('')
    useEffect(async () => {
        dispatch(getListMoviePageAction())
        dispatch(getListUserPageAction())
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios({
            url: "http://localhost:5000/admin/goodSales",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const response = await axios({
            url: "http://localhost:5000/admin/movie/topMovies",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 200)
            setTopMovies(response.data.data)
        if (res.status === 200)
            setTotal(res.data)
        console.log('top phim', topMovies)
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
    const users = useSelector((state) => state.admin.listUser);

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
                        <span className="featuredTitle">Khách có tài khoản</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">{users.length}</span>
                            <span className="featuredMoneyRate">
                                KHÁCH
                                {/* +2.4 <ArrowUpward className="featuredIcon" /> */}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="chart">
                <h3 className="chartTitle">Phim được yêu thích</h3>

                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <BarChart
                        width={1000}
                        height={50}
                        data={topMovies}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={60}
                    >
                        <XAxis
                            dataKey="tenPhim"
                            scale="" //point
                            // margin={{ left: 40 }}
                            padding={{ left: 40, right: 10 }}
                            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar name="Số lượng vé bán" dataKey="soLuongBan" fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </>
    )
}
