import React , {useEffect, useState}from "react";
import { SERVER_URL } from '../Constants.js'
import { DataGrid } from '@mui/x-data-grid';
import  Snackbar from '@mui/material/Snackbar';
import AddCar from "./AddCar.js";
import EditCar from "./EditCar.js";
import { Stack } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import TextField from '@mui/material/TextField';
//import Stack from '@mui/material/Stack';

function Carlist(){
    const [cars, setCars] = useState([]);
    useEffect(()=>{
        fetchCars();
    }, []);

    const [open, setOpen] = useState(false);

    const fetchCars= () =>{
        fetch(SERVER_URL +'api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    };

    const onDelClick = url =>{
        if(window.confirm("Are you sure to delete?")){
            fetch(url, {method:"DELETE"})
                .then(response => {
                    if(response.ok){
                        fetchCars();
                        setOpen(true);
                    } else {
                        alert("Quelque s'est mal passé !");
                    }
                
            })
            .catch(err => console.error(err));
        }
    };

    const columns = [
        { field: 'brand', headerName: 'Marque', width: 200 },
        { field: 'model', headerName: 'Modèle', width: 200 },
        { field: 'color', headerName: 'Couleur', width: 200 },
        { field: 'year', headerName: 'Année', width: 150 },
        { field: 'price', headerName: 'Prix', width: 150 },
        {
            field:"_links.car.href",
            headerName:"",
            sortable: false,
            filterable: false,
            renderCell: row =><EditCar data={row} updateCar={updateCar}/>
        },
        {
            field: "_links.self.href",
            headerName:"",
            sortable: false,
            filterable: false,
            renderCell: row =>(
                <IconButton onClick={() => onDelClick(row.id)}>
                    <DeleteIcon color="error"/> 
                </IconButton>
            ),
        },
    ];

    const addCar= car =>{
        fetch(SERVER_URL + "api/cars", {
            method: "POST",
            headers: { "Content-Type" :"application/json"},
            body: JSON.stringify(car),
        })
        .then (response =>{
            if (response.ok){
                fetchCars();
            } else {
                alert("Something went wrong");
            }
        })
        .catch(err => console.error(err));
    }

    const updateCar = (car,link) => {
        fetch(link, {
            method: "PUT",
            headers: { "Content-Type" :"application/json"},
            body: JSON.stringify(car),
        })
        .then (response =>{
            if (response.ok){
                fetchCars();
            } else {
                alert("Something went wrong");
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <React.Fragment>
        <div style={{
            height: 310, width: '100%', 
            backgroundColor: "rgba(0, 134, 255, 0.34)" 
            }}>
            <h1>Liste des Voitures</h1>
            <DataGrid style={{
                width: "100%", 
                height: "100%", 
                backgroundColor: "rgba(0, 255, 255, 0.34)",
            }}
                rows={cars}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row._links.self.href}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Voiture supprimée"
            />
        </div>
        <Stack style={{
            marginTop:"100px",
        }} mt={2} mb={2}>
            <AddCar  addCar={addCar}/>
        </Stack>
        </React.Fragment>
    );
}



export default Carlist;