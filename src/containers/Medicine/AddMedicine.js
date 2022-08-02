import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { FormikProvider, useFormik, Form } from 'formik';
import { useSnackbar } from 'notistack';


function AddMedicine({ open, handleClose, loadData, update }) {
    const [updateData, setUpdateData] = useState({ name: '' })

    useEffect(
        () => {
            setUpdateData(update)
        },
        [update])

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const handleAddData = (values) => {
        let localData = JSON.parse(localStorage.getItem("medicines"));

        if (localData === null) {
            localStorage.setItem("medicines", JSON.stringify([values]));
        } else {
            localData.push(values)
            localStorage.setItem("medicines", JSON.stringify(localData));
        }

        handleClose();
        enqueueSnackbar("Medicine added successfully.",
            {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            }
        )
        loadData();
    }

    let medicineSchema = {
        name: yup.string().required("Name must be required"),
        price: yup.number().typeError("Must be a number.").required("Price must be required"),
        quantity: yup.number().typeError("Must be a number.").required("Quantity must be required"),
        expiry: yup.number().typeError("Must be a number.").required("Expiry must be required"),
    }

    let schema = yup.object().shape(medicineSchema);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: updateData !== undefined ? updateData.name : '',
            price: updateData !== undefined ? updateData.price : '',
            quantity: updateData !== undefined ? updateData.quantity : '',
            expiry: updateData !== undefined ? updateData.expiry : ''
        },
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {
            if (updateData) {
                handleUpdateData(values)
            } else {
                handleAddData(values);
            }

            resetForm();
        },
    });

    const handleUpdateData = (values) => {
        let localData = JSON.parse(localStorage.getItem("medicines"));

        let uData = {
            id: parseInt(updateData.id),
            name: values.name,
            price: parseInt(values.price),
            quantity: parseInt(values.quantity),
            expiry: parseInt(values.expiry)
        }

        let afterUpdate = localData.map((v) => {
            if (v.id === updateData.id) {
                return uData
            } else {
                return v
            }
        })

        localStorage.setItem("medicines", JSON.stringify(afterUpdate))

        enqueueSnackbar("Medicine updated successfully.",
            {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            }
        )
        setUpdateData()
        handleClose()
        loadData()
    }

    const { touched, errors, handleSubmit, handleChange, handleBlur, resetForm } = formik;

    return (
        <Dialog open={open} onClose={() => { handleClose(); resetForm() }}>
            <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                        }}
                    >
                        <DialogTitle>{updateData ? "Update Medicine" : "Add Medicine"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This is implemented using local storage.
                            </DialogContentText>
                            <TextField
                                margin="dense"
                                label="Medicine Name"
                                fullWidth
                                variant="standard"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                defaultValue={updateData ? updateData.name : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name && touched.name}
                                helperText={(errors.name && touched.name) && errors.name}
                            />
                            <TextField
                                margin="dense"
                                label="Price"
                                name="price"
                                fullWidth
                                variant="standard"
                                defaultValue={updateData ? updateData.price : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.price && touched.price}
                                helperText={(errors.price && touched.price) && errors.price}
                            />
                            <TextField
                                margin="dense"
                                label="Quantity"
                                fullWidth
                                variant="standard"
                                name="quantity"
                                defaultValue={updateData ? updateData.quantity : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.quantity && touched.quantity}
                                helperText={(errors.quantity && touched.quantity) && errors.quantity}
                            />
                            <TextField
                                margin="dense"
                                label="Expiry"
                                fullWidth
                                variant="standard"
                                defaultValue={updateData ? updateData.expiry : ''}
                                name="expiry"
                                id="expiry"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.expiry && touched.expiry}
                                helperText={(errors.expiry && touched.expiry) && errors.expiry}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { handleClose(); resetForm() }}>Cancel</Button>
                            <Button type="submit">{updateData ? "Update" : "Add"}</Button>
                        </DialogActions>
                    </Box>
                </Form>
            </FormikProvider>
        </Dialog>
    );
}

export default AddMedicine;