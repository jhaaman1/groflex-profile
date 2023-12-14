import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import UploadProfile from "../ProfileImage/UploadProfile";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [interest, setInterest] = useState([]);
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("No selected File");
  const [imageData, setImageData] = useState("");
  const [imageDataType, setImageDataType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    profilePicture: {
      name: "",
      docBase: "",
      doctype: "",
    },
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? { ...prevData[name], [value]: checked } : value,
    }));
  };

 

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setInterest((previnterest) => [...previnterest, value]);
    } else {
      setInterest((previnterest) =>
        previnterest.filter((item) => item !== value)
      );
    }
  };
  console.log('check', interest)
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      dob: formData.dob,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zip: formData.zip,
      interest,
      password: formData.password,
      profilePicture: {
        name: imageName,
        docBase: imageData,
        doctype: imageDataType,
      },
    };

    dispatch(register(requestData));
    navigate('/login');

    console.log("Form Data:", requestData);
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="w-75 m-auto">
        <h2 className="text-center fst-italic">Registration</h2>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleInputChange}
            />
            <label htmlFor="male" className="form-check-label">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleInputChange}
            />
            <label htmlFor="female" className="form-check-label">
              Female
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="">Select Country</option>
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">
            Zip
          </label>
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label">Area of Interest</label>
          <div className="">
            <div className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                id="reading"
                name="interest"
                value="Reading"
                // checked={formData.gender === "Male"}
                checked={interest?.includes("Reading")}

                onChange={handleCheckboxChange}
              />
              <label htmlFor="reading" className="form-check-label">
                Reading
              </label>
            </div>
            <div className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                id="writing"
                name="interest"
                value="Writing"
                // checked={formData.interest === "Writing"}
                checked={interest?.includes("Writing")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="writing" className="form-check-label">
                Writing
              </label>
            </div>
            <div className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                id="traveling"
                name="interest"
                value="Traveling"
                // checked={formData.interest === "Traveling"}
                checked={interest?.includes("Traveling")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="traveling" className="form-check-label">
                Traveling
              </label>
            </div>
            <div className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                id="playing"
                name="interest"
                value="Playing"
                // checked={formData.interest === "Playing"}
                checked={interest?.includes("Playing")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="playing" className="form-check-label">
                Playing
              </label>
            </div>

          </div>
        </div>
        <div className="mb-3 border">

          {/* <input
            type="file"
            className="form-control"
            id="profilePicture"
            name="profilePicture"
            onChange={handleFileChange}
          /> */}
          <UploadProfile
            setHandleName={setImageName}
            setHandleDatatype={setImageDataType}
            setHandleData={setImageData}
            setHandleDoc={setImage}
            handleDoc={image}
            handleName={imageName}
            handleData={imageData}
            handleDataType={imageDataType}
            handleAllowedTypes={[
              "image/jpeg",
              "image/png",
              "image/jpg",
            ]}
            handleinput={".input-field"}
            handleClass={"input-field"}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
