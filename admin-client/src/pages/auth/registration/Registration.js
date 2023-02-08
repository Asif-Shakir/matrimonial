import Card from "../../../components/card/Card";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import httpService from "../../../shared/http/httpService";
import apiRoutes from "../../../shared/routes/apiRoutes";

const Registration = () => {
  const [userRoles, setUserRoles] = useState([]);
  useEffect(() => {
    const getRoles = async () => {
      const response = await httpService.get(
        apiRoutes.Authentication.GetUserRoles
      );
      setUserRoles(response.data.resultData);
      console.log(userRoles);
    };
    getRoles();
  }, []);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-8 mx-auto">
          <Card heading="Sign Up">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="row">
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">First Name</label>
                      <Field
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                      />
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">Last Name</label>
                      <Field
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name"
                      />
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">Email</label>
                      <Field
                        className="form-control"
                        name="email"
                        placeholder="Email"
                      />
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">Password</label>
                      <Field
                        name="password"
                        className="form-control"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" />
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
  );
};

export default Registration;
