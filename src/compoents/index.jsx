import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import { Resizable } from "re-resizable";
import axios from "../axios";

const  Index = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const Reset = () => {
        localStorage.setItem('count', 0)
        window.location.replace('/')
    };
    let input = {
        "image1": "",
        "image2": "",
        "image3": ""
    }
    const [imgdata, setImgdata] = useState(input)


    useEffect(() => {
        axios.get("/")
            .then(res => {
                setImgdata(res.data)
            });
    }, [])



    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px red",
        padding:"30px"
    };

    const onSubmit = () => {
        axios.post('/', { image: image, name: name })
            .then(res => {
                let temp = parseInt(localStorage.getItem('count')) + 1
                localStorage.setItem('count', temp)
                window.location.replace('/')
            })
    };

    const onUpdate = () => {
        axios.patch('/', { image: image, name: name })
            .then(res => {
                let temp = parseInt(localStorage.getItem('count')) + 1
                localStorage.setItem('count', temp)
                window.location.replace('/')
            })
    };
    const [image, setImage] = useState('');
    const [name, setName] = useState('');

    function handleFileInputChange(e) {
        const file = e.target.files[0];
        UploadFile(file);
    }
    function handleInputChange(e) {
        let name1 = e.target.value
        setName(name1)
    }


    const UploadFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
        };
    };



    return (
        <div>
            <Container>
                <div>
                    <Button onClick={handleShow}>ADD/UPDATE</Button> <i><b>Count: {localStorage.getItem('count')} </b></i> <Button onClick={Reset}>Reset Count</Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Insert Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <DropdownButton id="dropdown-item-button" variant='danger' title="WHICH BLOCK">
                                <Dropdown.Item onClick={handleInputChange} as="button" value='1'>1</Dropdown.Item>
                                <Dropdown.Item onClick={handleInputChange} as="button" value='2'>2</Dropdown.Item>
                                <Dropdown.Item onClick={handleInputChange} as="button" value='3'>3</Dropdown.Item>
                            </DropdownButton>

                            <label>Upload Image</label>
                            <input type="file" className="form-control" name="Image" onChange={handleFileInputChange} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={onUpdate}>
                            UPDATE
                        </Button>
                        <Button variant="primary" onClick={onSubmit}>
                            ADD NEW
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div style={{ "display": "flex" }}>
                    <div >
                        <Resizable style={style}  >
                            <img src={`${imgdata.image1}`} alt="First Place" style={{ "width": "100%", "height": "100%" }} />
                        </Resizable>
                    </div>
                    <div style={{ 'paddingInline': '10px' }} >
                        <Resizable style={style}  >
                            <img src={imgdata.image2} alt="Second Place" style={{ "width": "100%", "height": "100%" }} />
                        </Resizable>
                    </div>
                </div>
                <div>
                    <div >
                        <Resizable style={style}  >
                            <img src={imgdata.image3} alt="Third Place" style={{ "width": "100%", "height": "100%" }} />
                        </Resizable>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default Index
