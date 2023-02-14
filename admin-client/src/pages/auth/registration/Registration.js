import Card from "../../../components/card/Card";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import httpService from "../../../shared/http/httpService";
import apiRoutes from "../../../shared/routes/apiRoutes";
import { toast } from "react-toastify";
import StatusCode from "../../../shared/http/statusCode";
import { useDispatch } from "react-redux";
import { spinnerActions } from "../../../store/spinnerSlices";
import TextError from "../../../components/TextError";
const Registration = () => {
  const dispatch = useDispatch();
  const [userRoles, setUserRoles] = useState([]);
  useEffect(() => {
    const getRoles = async () => {
      dispatch(spinnerActions.show());
      const response = await httpService.get(
        apiRoutes.Authentication.GetUserRoles
      );
      console.log(response);
      dispatch(spinnerActions.hide());
      setUserRoles(response.data.resultData);
    };
    getRoles();
  }, [dispatch]);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userRole: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    userRole: Yup.string().required("Required"),
  });
  const handleSubmit = async (values) => {
    dispatch(spinnerActions.show());
    const response = await httpService.post(
      apiRoutes.Authentication.SignUp,
      values
    );
    if (response.data.status === StatusCode.Duplicate) {
      dispatch(spinnerActions.hide());
      toast.info(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (response.data.status === StatusCode.OK) {
      dispatch(spinnerActions.hide());
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(response);
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
                      <ErrorMessage name="firstName" component={TextError} />
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
                      <ErrorMessage name="lastName" component={TextError} />
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
                      <ErrorMessage name="email" component={TextError} />
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
                      <ErrorMessage name="password" component={TextError} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">User Role</label>
                      <Field
                        as="select"
                        name="userRole"
                        className="form-control"
                      >
                        <option value="" disabled>
                          ---Select Role---
                        </option>
                        {userRoles?.map((role, index) => {
                          return (
                            <option key={index} value={role._id}>
                              {role.roleName}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage name="userRole" component={TextError} />
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
  );
};

export default Registration;
