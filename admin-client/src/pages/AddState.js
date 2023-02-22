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
const AddState = () => {
  const dispatch = useDispatch();
  const [stateList, setStateList] = useState([]);
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
  }, [dispatch]);
  console.log(stateList);
  const initialValues = {
    stateName: '',
  };
  const validationSchema = Yup.object({
    stateName: Yup.string().required('Required'),
  });
  const handleSubmit = async (values) => {
    const response = await httpService.post(
      apiRoutes.Configrations.AddState,
      values
    );
    console.log(response.data);
    if (response.data.status === HttpStatusCode.Conflict) {
      toast.error(response.data.message);
    } else if (response.data.status === HttpStatusCode.Ok) {
      toast.error(response.data.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <Card heading="Add State">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="row">
                    <div className="col-12">
                      <div className="mt-2">
                        <label className="mb-1">State Name</label>
                        <Field
                          name="stateName"
                          className="form-control"
                          placeholder="State Name"
                        />
                        <ErrorMessage
                          name="stateName"
                          component={TextError}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </Card>
          </div>
          <div className="col-12 mt-5">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>State Name</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stateList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.stateName}</td>
                      <td>{item?.userId?.email}</td>
                      <td>
                        <EditIcon className="me-1 text-info cp" />
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
