import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Card from "../components/card/Card";
import TextError from "../components/TextError";
const AddCity = () => {
  const initialValues = {
    stateName: "",
    cityName: "",
  };
  const validationSchema = Yup.object({
    stateName: Yup.string().required("Required"),
    cityName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <Card heading="Add City">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="row">
                    <div className="col-6">
                      <div className="mt-2">
                        <label className="mb-1">State</label>
                        <Field
                          as="select"
                          className="form-control"
                          name="stateName"
                        >
                          <option value="" disabled>
                            ---Select State---
                          </option>
                          <option value="1">Punjab</option>
                          <option value="2">KPK</option>
                        </Field>
                        <ErrorMessage name="stateName" component={TextError} />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mt-2">
                        <label className="mb-1">City</label>
                        <Field
                          name="cityName"
                          className="form-control"
                          placeholder="Enter City Name"
                        />
                        <ErrorMessage name="cityName" component={TextError} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mt-2">
                        <button type="submit" className="btn btn-success">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCity;
