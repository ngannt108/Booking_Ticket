import React, { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useState } from '../'
import { Input } from '../../components/Input'
import emailjs from 'emailjs-com'
export const SendMail = ({ name, movieName, showtime }) => {
    // useEffect(()=>{
    const [isConfirm, setConfirm] = useState(false)
    const send = (e) => {
        emailjs.sendForm('service_zbo2i1v', 'template_u22c938', e.target, 'user_fHd8DhFxCFsbFXqbnCExx')
    }
    return (
        <div>
            <Modal show={isConfirm} onHide={() => setConfirm(false)}>
                <Modal.Header>
                    <Modal.Title>Xác nhận mua vé</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        Label="Tên khách hàng"
                        value={name}
                        type="text"
                        name='name'

                    />
                    <Input
                        Label="Tên phim"
                        value={movieName}
                        type="test"
                        name='movieName'
                    />
                    <Input
                        Label="Lịch chiếu"
                        value={showtime}
                        type="test"
                        name='showtime'
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={send}>
                        Submit
                    </button>
                    <button className="btn btn-danger" onClick={() => setConfirm(false)}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>



            {/* <Button variant="primary" type="submit">
                Submit
            </Button> */}

        </div >
    )
}

