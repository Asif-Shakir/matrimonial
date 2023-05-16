import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Card from "../components/card/Card";
import TextError from "../components/TextError";
const AddCity = () => {
    const initialValues = {
        cityName: '',
        state: '',
        status: '',
    };
    const validationSchema = Yup.object({
        cityName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
        stateName: Yup.string().required("Required"),
        status: Yup.string().required("Required"),
    });
    const handleSubmit = (values) => {
        console.log(values);
    };
    return (
        <>
            <div className="row">
                <div className="col-sm-6 col-xl-5">
                    <Card heading="Add City">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
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
                                            <Field as="select" className="form-control" name="stateName">
                                                <option value="" disabled>---Select State---</option>
                                                <option value="1">Punjab</option>
                                                <option value="2">KPK</option>
                                            </Field>
                                            <ErrorMessage name="stateName" component={TextError} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mt-2">
                                            <label className="mb-1">Status</label>
                                            <Field as="select" className="form-control" name="status" >
                                                <option value="" disabled>---Select Status---</option>
                                                <option value="1">Punjab</option>
                                                <option value="2">KPK</option>
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
            </div>
        </>
    );
};

export default AddCity;
