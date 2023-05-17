import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Card from "../components/card/Card";
import TextError from "../components/TextError";
import httpService from '../shared/http/httpService';
import apiRoutes from '../shared/routes/apiRoutes';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { spinnerActions } from '../store/spinnerSlices';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Status from '../components/status/Status';
import Moment from 'react-moment';

const AddCity = () => {
    const dispatch = useDispatch();
    const [cityList, setCityList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [statusList, setStatus] = useState([]);
    const [cityObj, setCityObj] = useState(null);
    const [reloadCities, setReloadCities] = useState(false);
    const [action, setAction] = useState(null);
    useEffect(() => {
        const getCityList = async () => {
            dispatch(spinnerActions.show());
            const response = await httpService.get(
                apiRoutes.Configrations.GetCityList
            );
            dispatch(spinnerActions.hide());
            setCityList(response.data.resultData);
        };
        getCityList();
    }, [dispatch, reloadCities]);
    useEffect(() => {
        const getStateList = async () => {
            dispatch(spinnerActions.show());
            const response = await httpService.get(
                apiRoutes.Configrations.GetStateList
            );
            dispatch(spinnerActions.hide());
            setStateList(response.data.resultData);
        };
        getStateList();
        const getStatusList = async () => {
            dispatch(spinnerActions.show());
            const response = await httpService.get(
                apiRoutes.Configrations.GetStatus
            );
            dispatch(spinnerActions.hide());
            setStatus(response.data.resultData);
        };
        getStatusList();
    }, [dispatch]);
    const initialValues = {
        cityName: '',
        state: '',
        status: '',
    };
    const validationSchema = Yup.object({
        cityName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
        state: Yup.string().required("Required"),
        status: Yup.string().required("Required"),
    });
    const handleSubmit = async (values, { resetForm }) => {
        let response;
        console.log(resetForm);
        if (action?.actionType === 'edit') {
            response = await httpService.update(
                action.id,
                apiRoutes.Configrations.UpdateCity,
                values
            );
        }
        else {
            response = await httpService.post(
                apiRoutes.Configrations.AddCity,
                values
            );
        }
        if (response.data.status === HttpStatusCode.Conflict) {
            toast.error(response.data.message);
        } else if (
            response.data.status === HttpStatusCode.InternalServerError
        ) {
            toast.error(response.data.message);
        } else if (response.data.status === HttpStatusCode.Ok) {
            toast.success(response.data.message);
            console.log(response.data);
            setReloadCities((x) => !x);
            if (action?.actionType === 'edit') {
                setCityObj(null);
            }
            else {
                resetForm();
            }
        }
    };
    const patchValue = (item) => {
        setCityObj({ cityName: item.cityName, state: item?.state['_id'], status: item?.status['_id'] });
        setAction({ actionType: 'edit', id: item._id });
    };
    return (
        <>
            <div className="row">
                <div className="col-sm-6 col-xl-5">
                    <Card heading="Add City">
                        <Formik
                            initialValues={cityObj || initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            <Form>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mt-2">
                                            <label className="mb-1">City</label>
                                            <Field name="cityName" className="form-control" placeholder="Enter City Name" />
                                            <ErrorMessage name="cityName" component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mt-2">
                                            <label className="mb-1">State</label>
                                            <Field as="select" className="form-control" name="state">
                                                <option value="" disabled>---Select State---</option>
                                                {
                                                    stateList.length > 0 && stateList.map((state, index) => {
                                                        return (
                                                            <option key={index} value={state._id}>
                                                                {state.stateName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="state" component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mt-2">
                                            <label className="mb-1">Status</label>
                                            <Field as="select" className="form-control" name="status" >
                                                <option value="" disabled>---Select Status---</option>
                                                {
                                                    statusList.length > 0 && statusList.map((status, index) => {
                                                        return (
                                                            <option key={index} value={status._id}>
                                                                {status.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage name="status" component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className="mt-2">
                                            <button type="submit" className="btn btn-secondary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </Card>
                </div>
                <div className="col-12 mt-5">
                    <h5 className='primary-clr mb-3'>City List</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>City Name</th>
                                <th>State Name</th>
                                <th>Created By</th>
                                <th>Created ON</th>
                                <th>Updated By</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cityList?.length > 0 &&
                                cityList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item?.cityName}</td>
                                            <td>{item?.state?.stateName}</td>
                                            <td>{item?.createdBy?.email}</td>
                                            <td>
                                                <Moment format="ll">
                                                    {item?.createdAt}
                                                </Moment>
                                            </td>
                                            <td>{item?.updatedBy?.email}</td>
                                            <td>
                                                <Status type={item?.status?.name} />
                                            </td>
                                            <td>
                                                <EditIcon
                                                    onClick={() => patchValue(item)}
                                                    className="primary-clr me-1 cp"
                                                />
                                                <DeleteIcon className="text-danger cp" />
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default AddCity;
