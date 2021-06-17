import React, { useEffect, useState } from "react";
import {
  Button,
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
  Fab
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Resizable } from "re-resizable";
import axios from "../axios";

const Index = () => {
  let input = {
    image1: "",
    image2: "",
    image3: "",
  };
  const places = [
    {
      value: '1',
      label: 'Field 1',
    },
    {
      value: '2',
      label: 'Field 2',
    },
    {
      value: '3',
      label: 'Field 3',
    }
  ]

  const [imgdata, setImgdata] = useState(input);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    UploadFile(file);
  }
  const handleChange = (e) => {
    let name1 = e.target.value;
    setName(name1);
  }

  const Reset = () => {
    localStorage.setItem("count", 0);
    window.location.replace("/");
  };

  useEffect(() => {
    axios.get("/").then((res) => {
      setImgdata(res.data);
    });
  }, []);

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 2px #301B3F",
    padding: "30px",
  };

  const updateCount = () =>{
    let temp = parseInt(localStorage.getItem("count")) + 1;
      localStorage.setItem("count", temp);
      window.location.replace("/");
  }

  const onSubmit = () => {
    axios.post("/", { image: image, name: name }).then((res) => {
     updateCount();
    });
  };

  const onUpdate = () => {
    axios.patch("/", { image: image, name: name }).then((res) => {
      updateCount();
    });
  };

  
  const UploadFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <div style={{ height: "100vh",width: '100%',
    overflowY:'auto',
    overflowX:'hidden',
    scrollbarWidth: 'none'
    }}>
      <AppBar
        position="fixed"
        centerTitle="true"
        style={{ background: "#2E3B55" }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ padding: "10px", flexGrow: "3" }}>
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{
                backgroundColor: "#709FB0",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: "bolder",
              }}
            >
              Add / Update
            </Button>
            <Button
              variant="contained"
              onClick={Reset}
              style={{
                backgroundColor: "#7D0633",
                color: "#FFFFFF",
                textTransform: "none",
                fontWeight: "bolder",
                marginLeft: "20px",
              }}
            >
              Reset Count
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexGrow: "3",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i>
              Count:{" "}
              <b style={{ color: "yellow" }}>
                {localStorage.getItem("count")}{" "}
              </b>
            </i>
          </div>
        </div>
      </AppBar>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10%",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <Resizable style={style}>
                <img
                  src={`${imgdata.image1}`}
                  alt="First Place"
                  style={{ width: "100%", height: "100%" }}
                />
              </Resizable>
            </div>
            <div style={{ paddingInline: "10px" }}>
              <Resizable style={style}>
                <img
                  src={imgdata.image2}
                  alt="Second Place"
                  style={{ width: "100%", height: "100%" }}
                />
              </Resizable>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Resizable style={style}>
              <img
                src={imgdata.image3}
                alt="Third Place"
                style={{ width: "100%", height: "100%" }}
              />
            </Resizable>
          </div>
        </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{display:'flex',justifyContent:'center', color:'brown'}}>Insert Image</DialogTitle>
        <DialogContent style={{display:'flex', flexDirection:'column',  justifyContent:'space-between'}}>
          
          <TextField
          select
          label="Choose Field"
          value={name}
          onChange={handleChange}
          variant="outlined"
        >
          {places.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          
        </TextField>
        <label htmlFor="upload-photo" style={{marginTop:'10px',display:'flex',justifyContent:'center'}}>
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleFileInputChange}

        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <AddCircleIcon /> Add photo
        </Fab>
       </label>
       
        </DialogContent>
        <DialogActions>
          <Button variant="contained" 
           style={{
            backgroundColor: "#7D0633",
            color: "#FFFFFF",
            textTransform: "none",
          }} onClick={handleClose}>Close</Button>
          <Button variant="contained" 
          style={{
            backgroundColor: "#519872",
            color: "#FFFFFF",
            textTransform: "none",
          }} onClick={onUpdate}>Update</Button>
          <Button variant="contained"
          style={{
            backgroundColor: "#1E5F74",
            color: "#FFFFFF",
            textTransform: "none",
          }} onClick={onSubmit}>Add New</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Index;
