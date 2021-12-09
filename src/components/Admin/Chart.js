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
    useEffect(() => {
        dispatch(getListMoviePageAction())
    }, []);
    var count = 0;
    movies.map((movie, index) => {
        const date = new Date(movie.ngayKhoiChieu)
        if (date <= Date.now())
            count++;
    })
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
                            <span className="featuredMoney">$4,415</span>
                            <span className="featuredMoneyRate">
                                -1.4 <ArrowDownward className="featuredIcon negative" />
                            </span>
                        </div>
                        <span className="featuredSub">Compared to last month</span>
                    </div>
                    <div className="featuredItem">
                        <span className="featuredTitle">Cost</span>
                        <div className="featuredMoneyContainer">
                            <span className="featuredMoney">$2,225</span>
                            <span className="featuredMoneyRate">
                                +2.4 <ArrowUpward className="featuredIcon" />
                            </span>
                        </div>
                        <span className="featuredSub">Compared to last month</span>
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
