import React, { useRef, useEffect } from "react";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookingTicketAction } from "../../store/actions/bookingAction";
const Paypal = ({ total, setIsSucessPaypal }) => {

    const paypal = useRef();
    const dispatch = useDispatch();



    //const [isSuccess, setIsSucess] = useState(false)
    console.log('tổng tiền', total)
    // const totalBill = useSelector(state => state.user.totalCurrentBill)
    // const [bill, setBill] = useState('')
    // console.log(totalBill)
    useEffect(async () => {

        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Thanh toán vé phim",
                                amount: {
                                    currency_code: 'CAD', //CAD
                                    value: (total / 23000).toFixed(2),  //Math.round
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    setIsSucessPaypal(true)
                    //dispatch(bookingTicketAction(showTimeCode, biDanh, { danhSachGhe: chairArray }));
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);

    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
export default Paypal