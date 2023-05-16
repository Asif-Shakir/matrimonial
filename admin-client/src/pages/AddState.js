import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Card from '../components/card/Card';
import TextError from '../components/TextError';
import httpService from '../shared/http/httpService';
import apiRoutes from '../shared/routes/apiRoutes';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { spinnerActions } from '../store/spinnerSlices';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Status from '../components/status/Status';
const AddState = () => {
    const dispatch = useDispatch();
    const [stateList, setStateList] = useState([]);
    const [stateObj, setStateObj] = useState(null);
    const [reloadStates, setReloadStates] = useState(false);
    const [action, setAction] = useState(null);
    const [statusList,setStatus] = useState([]);
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
    }, [dispatch, reloadStates]);
    useEffect(() => {
        const getStatusList = async () => {
            dispatch(spinnerActions.show());
            const response = await httpService.get(
                apiRoutes.Configrations.GetStatus
            );
            dispatch(spinnerActions.hide());
            setStatus(response.data.resultData);
        };
        getStatusList();
    },[])
    console.log(stateList);
    console.log(statusList);
    const initialValues = {
        stateName: '',
        status: '',
    };
    const validationSchema = Yup.object({
        stateName: Yup.string().required('Required'),
        status: Yup.string().required('Required'),
    });
    const handleSubmit = async (values) => {
        let response;
        if (action?.actionType === 'edit') {
            response = await httpService.update(
                action.id,
                apiRoutes.Configrations.UpdateState,
                values
            );
        }
        else {
            response = await httpService.post(
                apiRoutes.Configrations.AddState,
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
            setReloadStates((x) => !x);
            setStateObj(null);
        }
    };
    const patchValue = async (item) => {
        setStateObj({ stateName: item.stateName, status: item['status'] });
        setAction({ actionType: 'edit', id: item._id });
    };
    return (
        <>
            <div className="">
                <div className="row">
                    <div className="col-sm-6 col-xl-5">
                        <Card heading="Add State">
                            <Formik
                                initialValues={stateObj || initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                <Form>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mt-2">
                                                <label className="mb-1">State Name</label>
                                                <Field name="stateName" className="form-control" placeholder="State Name" />
                                                <ErrorMessage name="stateName" component={TextError}/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mt-2">
                                                <label className="mb-1 d-block">Status</label>
                                                <Field name="status" as="select" className="form-control">
                                                    <option value="" disabled>---Select Status---</option>
                                                    {
                                                        statusList.length > 0 && statusList.map((status,index) => {
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
                                                <button type="submit" className="btn btn-secondary"> Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </Card>
                    </div>
                    <div className="col-12 mt-5">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>State Name</th>
                                    <th>Created By</th>
                                    <th>Updated By</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stateList?.length > 0 &&
                                    stateList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item?.stateName}</td>
                                                <td>{item?.userId?.email}</td>
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
            </div>
        </>
    );
};

export default AddState;
