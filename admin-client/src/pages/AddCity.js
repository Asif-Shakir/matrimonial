import React from 'react';
import { useFormik } from 'formik';
import Card from '../components/card/Card';
const AddCity = () => {
  const cityForm = useFormik({
    initialValues: {
      stateName: null,
      cityName: '',
    },
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Card>
              <form>
                <div className="row">
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">State</label>
                      <select
                        className="form-control"
                        name="stateName"
                        onChange={cityForm.handleChange}
                        value={cityForm.values.stateName}
                      >
                        <option selected disabled>
                          ---Select State---
                        </option>
                        <option value="1">Punjab</option>
                        <option value="2">KPK</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-2">
                      <label className="mb-1">City</label>
                      <input
                        type="text"
                        onChange={cityForm.handleChange}
                        value={cityForm.values.cityName}
                        name="cityName"
                        className="form-control"
                        placeholder="Enter City Name"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCity;
