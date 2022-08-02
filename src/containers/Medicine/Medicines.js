import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton from '@mui/material/IconButton';
import { addMedicine, getMedicines } from '../../redux/action/medicines.action'
import { useDispatch, useSelector } from 'react-redux'



function Medicines(props) {

    const [open, setOpen] = useState(false);
    const [dopen, setDOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiry, setExpiry] = useState('');
    const [datamed, setDatamed] = useState([]);
    const [did, setDid] = useState("");
    const [update, setUpdata] = useState(false);
    const [udate, setUdata] = useState();
    const [uid, setUid] = useState();
    const [filterdata, setFilterdata] = useState([]);


    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleDOpen = (id) => {
        setDOpen(true);
        setDid(id);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };


    const handleClickEditOpen = (params) => {
        setOpen(true);
        console.log(params.row);
        formik.setValues({
            name: params.row.name,
            price: params.row.price,
            quantity: params.row.quantity,
            expiry: params.row.expiry,

        }
        )
        setUid(params.id);
        console.log(params.id);
        setUpdata(true);

    };


    const handleSubmit = (values) => {
        // console.log(name,price,quantity,expiry);


        let data = {
            id: Math.floor(Math.random() * 1000),
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            expiry: values.expiry
        }

        dispatch(addMedicine(data))
        
        // let medicinesdata = JSON.parse(localStorage.getItem('Medicines'));

        // if (medicinesdata === null) {
        //     localStorage.setItem('Medicines', JSON.stringify([data]));

        // } else {
        //     medicinesdata.push(data)
        //     localStorage.setItem('Medicines', JSON.stringify(medicinesdata));
        // }

        handleClose();
        getData();
        setName('');
        setPrice('');
        setQuantity('');
        setExpiry('');



    }
    const getData = () => {
        let getMedData = JSON.parse(localStorage.getItem('Medicines'));

        if (getMedData !== null) {
            setDatamed(getMedData);
        }

    }

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getMedicines())
        },
        [])


    const handleDelete = () => {
        let removedata = JSON.parse(localStorage.getItem("Medicines"));

        let filterdata = removedata.filter((r, i) => r.id !== did);

        localStorage.setItem("Medicines", JSON.stringify(filterdata));
        getData();
        setDOpen(false);

    }


    const columns = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <Button startIcon={<DeleteIcon />} onClick={() => handleDOpen(params.id)}></Button>

                        <IconButton aria-label="edit" onClick={() => handleClickEditOpen(params)}><ModeEditIcon /></IconButton>

                    </>
                )
            }

        },
    ];
    let schema = yup.object().shape({
        name: yup.string().required("please enter medicine name"),
        price: yup.string().required("please enter medicine price"),
        quantity: yup.string().required("please enter medicine quantity"),
        expiry: yup.string().required("please enter medicine expiry"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                handleUpdatedata(values);
            } else {
                handleSubmit(values);
            }
            // alert(JSON.stringify(values, null, 2));

            resetForm();
        },
    });



    const handleUpdatedata = (values) => {
        console.log(values);

        let udata = JSON.parse(localStorage.getItem("Medicines"));

        console.log(udata);

        let editdata = udata.map((e) => {

            if (e.id === uid) {
                console.log(uid);
                return (
                    { id: uid, ...values }
                )
            } else {
                return e;

            }

        }
        );

        localStorage.setItem("Medicines", JSON.stringify(editdata));


        getData();
        setOpen(false);
        setDOpen(false);

    }


    const handlesearch = (sermed) => {
        console.log(sermed);
        let medsearch = JSON.parse(localStorage.getItem("Medicines"))

        let fdata = medsearch.filter((f) => (

            f.id.toString().includes(sermed) ||
            f.name.toString().includes(sermed) ||
            f.price.toString().includes(sermed) ||
            f.quantity.toString().includes(sermed) ||
            f.expiry.toString().includes(sermed)

        ))
        setFilterdata(fdata)
        console.log(fdata);
    }

    const filtermeddata = filterdata.length > 0 ? filterdata : datamed

    const medicine = useSelector(state => state.medicines)

    return (
        <div>
            <h1>Medicines Component</h1>

            <TextField
                autoFocus
                margin="dense"
                id="search"
                name="search"
                label="Search Medicines"
                fullWidth
                variant="standard"
                onChange={(e) => handlesearch(e.target.value)}
            />



            <Button variant="outlined" onClick={handleClickOpen}>
                Add Medicines
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={medicine.medicines}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Medicines</DialogTitle>

                <Formik values={formik}>
                    <Form key={formik} onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                label="Medicines Name"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price"
                                name="price"
                                value={formik.values.price}
                                label="Medicines price"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}

                            />
                            {formik.errors.price ? <p>{formik.errors.price}</p> : null}

                            <TextField
                                autoFocus
                                margin="dense"
                                id="quantity"
                                name="quantity"
                                value={formik.values.quantity}
                                label="Medicines quantity"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}

                            />
                            {formik.errors.quantity ? <p>{formik.errors.quantity}</p> : null}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="expiry"
                                name="expiry"
                                value={formik.values.expiry}
                                label="Medicines expiry"
                                fullWidth
                                variant="standard"
                                onChange={formik.handleChange}

                            />
                            {formik.errors.expiry ? <p>{formik.errors.expiry}</p> : null}
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>Submit</Button>
                            </DialogActions>

                        </DialogContent>
                    </Form>
                </Formik>

            </Dialog>

            <Dialog
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure Delete Data?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete()} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}

export default Medicines;