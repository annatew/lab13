import React, { useState } from "react";
import '../App.css';
import  Dialog from "@mui/material/Dialog";
import  DialogActions from "@mui/material/DialogActions";
import  DialogContent from "@mui/material/DialogContent";
import  DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import PlaylistAddTwoToneIcon from '@mui/icons-material/PlaylistAddTwoTone';
import IconButton from '@mui/material/IconButton';
import { TextField } from "@mui/material";

import Stack from '@mui/material/Stack';

function AddCar(props){
    const [open,setOpen] =useState(false);
    const [car,setCar] = useState({
        brand:"",
        model:"",
        color:"",
        year:"",
        fuel:"",
        price:"",
    });

    const handleClickOpen= () => {
        setOpen(true);
    };

    const handleClose= () => {
        setOpen(false);
    };

    const handleChange= event =>{
        setCar({ ...car,[event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    };

    return (
    <div>
        <Button  style={{
            backgroundColor: "rgb(0,200,255)", width: 200, height: 50,
            paddingTop: "10px, 10px"
            }}>
        <PlaylistAddTwoToneIcon style={{
            color: "white"
        }} variant="contained" onClick={handleClickOpen}>
                New Car
            </PlaylistAddTwoToneIcon>
        </Button>
        <Dialog open={open} onClose={handleClose}>
            { <DialogTitle>New Car</DialogTitle> }
            <DialogContent>
                <Stack spacing={2} mt={1}>
                <TextField
                    label="Brand"
                    name="brand"
                    autoFocus
                    value={car.brand}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Model"
                    name="model"
                    value={car.model}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Color"
                    name="color"
                    value={car.color}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Year"
                    name="year"
                    value={car.year}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Price"
                    name="price"
                    value={car.price}
                    onChange={handleChange}
                />
                <br />
                </Stack>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose}>Annuler</button>
                <button onClick={handleSave}>Enregistrer</button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default AddCar;