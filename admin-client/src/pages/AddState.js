import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Card from "../components/card/Card";
import TextError from "../components/TextError";
const AddState = () => {
  const initialValues = {
    stateName: "",
  };
  const validationSchema = Yup.object({
    stateName: Yup.string().required("Required"),
  });
  const handleSubmit = (values) => {
    console.log(values);
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
                        <ErrorMessage name="stateName" component={TextError} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mt-2">
                        <button type="submit" className="btn btn-primary">
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

export default AddState;
