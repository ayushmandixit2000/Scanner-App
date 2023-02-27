import React, { useState, useEffect } from "react";
import ScannerList from "./ScannerList";

const Form = () => {
  const [formValues, setFormValues] = useState({
    projectName: "",
    scanningMode: "",
    scanDimensionsX: 0,
    scanDimensionsY: 0,
    scannerFrequency: 0,
  });

  const [scannerList, setScannerList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const errors = validateForm();
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors(validateForm());
  };

  const validateForm = () => {
    const errors = {};
    if (formValues.scannerFrequency <= 0) {
      errors.display = "Scanner frequency must be above 0!";
    } else if (formValues.scannerFrequency.toString().split(".").length !== 2) {
      errors.display = "Scanner frequency must have one decimal place!";
    } else if (
      formValues.scannerFrequency.toString().split(".")[1].length !== 1
    ) {
      errors.display = "Scanner frequency must have one decimal place!";
    }
    if (formValues.projectName.length <= 3) {
      errors.display = "Project Name should have more than 3 characters!";
    }

    if (formValues.scanDimensionsX < 1 || formValues.scanDimensionsY < 1) {
      errors.display = "Both X and Y need to be more than or equal to one!";
    }
    setIsFormValid(Object.keys(errors).length === 0); // set isFormValid based on errors
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMessage("Invalid input. Please check the form and try again.");
      setErrors(errors);
    } else {
      fetch("https://wavescan-internship.saurabhmudgal.repl.co/success", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch scanner list");
          }
        })
        .then((data) => {
          setScannerList(data);
          console.log("Data:", data);
          console.log("Scanner List:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div class="flex justify-center items-center">
        <form
          className="mt-16 border-zinc-400 border-opacity-50 shadow-inner inset shadow-white md:w-1/3 w-2/3 2p-4 mx-auto justify-center rounded-lg bg-gradient-to-tr from-slate-700 via-black to-slate-700"
          onSubmit={handleSubmit}
        >
          <div className="mt-4">
            <div className="mx-auto w-2/3">
              <div className="text-white text-sm p-1 text-left">
                Project Name
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formValues.projectName}
                onChange={handleChange}
                className="bg-white rounded-2xl px-3 py w-2/3 text-gray-900"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mx-auto w-2/3">
              <div className="text-white text-sm p-1 text-left">
                Scanning Mode
              </div>
            </div>

            <select
              id="scanningMode"
              name="scanningMode"
              value={formValues.scanningMode}
              onChange={handleChange}
              className="bg-white rounded-2xl px-2 py w-2/3 text-gray-900"
            >
              <option value="">Choose Scanning Mode</option>
              <option value="GANTRY">Gantry</option>
              <option value="CRAWLER">Crawler</option>
              <option value="AUTO">Auto</option>
              <option value="MANUAL">Manual</option>
              <option value="ARM">Arm</option>
            </select>
          </div>

          <div className="mt-4">
            <div className="mx-auto w-2/3">
              <div className="text-white text-sm p-1 text-left">
                Scan Dimensions (cm)
              </div>
            </div>
            <div className="flex flex-row sm:flex-row justify-center">
              <div className="flex items-center mb-0 mr-4">
                <label className="text-white mr-2" htmlFor="scanDimensionsX">
                  X
                </label>
                <input
                  className="w-16 rounded-2xl text-center"
                  type="number"
                  id="scanDimensionsX"
                  name="scanDimensionsX"
                  value={formValues.scanDimensionsX}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <label className="text-white mr-2" htmlFor="scanDimensionsY">
                  Y
                </label>
                <input
                  className="w-16 rounded-2xl text-center"
                  type="number"
                  id="scanDimensionsY"
                  name="scanDimensionsY"
                  value={formValues.scanDimensionsY}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mx-auto w-2/3">
              <div className="text-white text-sm p-1 text-left">
                Scanner Frequency (GHz)
              </div>
            </div>
            <input
              type="number"
              step="0.1"
              id="scannerFrequency"
              name="scannerFrequency"
              value={formValues.scannerFrequency}
              onChange={handleChange}
              className="bg-white rounded-2xl px-3 py w-2/3 text-gray-900"
            />
            {errors.display && (
              <p className="error text-white mt-8">{errors.display}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className="bg-gradient-to-tr from-blue-700 via-cyan-800 to-cyan-700 text-white rounded-2xl px-4 py-2 mt-2 w-2/3 mb-4"
            >
              SCAN
            </button>
          </div>
        </form>
      </div>
      {scannerList.length > 0 && <ScannerList scanners={scannerList} />}
    </div>
  );
};

export default Form;
