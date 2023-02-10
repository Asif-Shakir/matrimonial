import Card from "../../../components/card/Card";
import style from "./login.module.css";
import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import httpService from "../../../shared/http/httpService";
import apiRoutes from "../../../shared/routes/apiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../store/auth-slice";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log(user);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = async (values) => {
    const data = { ...values, url: apiRoutes.Authentication.Login };
    dispatch(loginThunk(data));
    // const response = await httpService.post(
    //   apiRoutes.Authentication.Login,
    //   values
    // );
    // console.log(response.data);
  };
  return (
    <div className={style.login_wrapper}>
      <div className="container">
        <div className="row">
          <div className="col-6 mx-auto">
            <Card heading="Login">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="row">
                    <div className="col-12">
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
                    <div className="col-12">
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
    </div>
  );
};

export default Login;
