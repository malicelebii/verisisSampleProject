import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/index.css";

function UserForm() {
  let { id } = useParams();
  const [username, setusername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("");
  const [department, setdepartment] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [email, setemail] = useState("");
  const [activate, setactivate] = useState(false);
  const [hiringDate, sethiringDate] = useState("");
  const [birthDate, setbirthDate] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((user) => {
          setusername(user.data.username);
          setfirstName(user.data.firstName);
          setlastName(user.data.lastName);
          setpassword(user.data.password);
          setdepartment(user.data.department);
          setimgUrl(user.data.imgUrl);
          setemail(user.data.email);
          setactivate(user.data.activate);
          sethiringDate(user.data.hiringDate);
          setbirthDate(user.data.birthDate);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const onUsernameChange = (e) => {
    setusername(e.target.value);
  };

  const onFirstNameChange = (e) => {
    setfirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setlastName(e.target.value);
  };

  const onDepartmentChange = (e) => {
    setdepartment(e.target.value);
  };

  const onPasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const onImgUrlChange = (e) => {
    setimgUrl(e.target.value);
  };

  const onEmailChange = (e) => {
    setemail(e.target.value);
  };

  const onActivateChange = (e) => {
    setactivate(e.target.value);
  };

  const onHiringDateChange = (e) => {
    sethiringDate(e.target.value);
  };

  const onBirthDateChange = (e) => {
    setbirthDate(e.target.value);
  };

  const checkStringForNumbers = (input) => {
    let str = String(input);
    for (let i = 0; i < str.length; i++) {
      if (!isNaN(str.charAt(i))) {
        return true;
      }
    }
  };

  const validate = () => {
    if (!username) {
      alert("You should pass an username");
      return false;
    } else if (!firstName) {
      alert("You should pass an firstname");
      return false;
    } else if (!lastName) {
      alert("You should pass an lastname");
      return false;
    } else if (!department) {
      alert("You should pass an department");
      return false;
    }else if(password.includes(birthDate.slice(0,4))){
        alert("Your password can not contain your birthdate")
        return false;
    } 
    else if (password.toLowerCase() === password) {
      alert("Password must contain at least one upper case");
      return false;
    } else if (password.toUpperCase() === password) {
      alert("Password must contain at least one lower case");
      return false;
    } else if (!checkStringForNumbers(password)) {
      alert("Password must contain at least one number");
      return false;
    } else if (password.length < 8 || password.length > 16) {
      alert("Password must be 8-16 letter");
      return false;
    } else if (!imgUrl) {
      alert("You should pass an image url");
      return false;
    } else if (!hiringDate) {
      alert("You should pass an hiring date");
      return false;
    } else if (!birthDate) {
      alert("You should pass an birth date");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      username,
      firstName,
      lastName,
      department,
      password,
      imgUrl,
      email,
      activate,
      hiringDate,
      birthDate,
    };

    if (validate()) {
      if (id) {
        axios
          .put(`/api/users/${id}`, newUser)
          .then((user) => {
            window.location = "/";
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post("/api/users", newUser)
          .then((user) => {
            window.location = "/";
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={onUsernameChange}
          type="text"
          name="username"
          id="username"
          value={username}
        />
        <label htmlFor="firstName">First name</label>
        <input
          onChange={onFirstNameChange}
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          onChange={onLastNameChange}
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
        />
        <label htmlFor="department">Department</label>
        <select
          onChange={onDepartmentChange}
          id="department"
          value={department}
        >
          <option value="">Choose..</option>
          <option value="IT">IT</option>
          <option value="business">Business</option>
        </select>
        <label htmlFor="password">Password</label>
        <input
          onChange={onPasswordChange}
          type="password"
          name="password"
          id="password"
          value={password}
        />
        <label htmlFor="img">Image Url</label>
        <input
          onChange={onImgUrlChange}
          value={imgUrl}
          type="text"
          name="img"
          id="img"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={onEmailChange}
          value={email}
          type="email"
          name="email"
          id="email"
        />
        <div id="activate">
          <input
            onChange={onActivateChange}
            type="radio"
            name="activate"
            id="active"
            value={true}
          />
          <label htmlFor="active">Active user</label>
          <input
            onChange={onActivateChange}
            type="radio"
            name="activate"
            id="passive"
            value={false}
          />
          <label htmlFor="passive">Passive user</label>
        </div>
        <label htmlFor="hiringDate">Hiring date</label>
        <input
          onChange={onHiringDateChange}
          type="date"
          value={hiringDate}
          id="hiringDate"
        />
        <label htmlFor="birthDate">Birthdate</label>
        <input
          onChange={onBirthDateChange}
          type="date"
          value={birthDate}
          id="birthDate"
        />
        <button id="submit" onSubmit={onSubmit}>
          {id ? "Save changes" : "Add user"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
