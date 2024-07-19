import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function AddProject() {
  const [name, SetName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [orderno, SetOrderNo] = React.useState("");
  //
  const [startdate, SetStartDate] = React.useState(null);
  const [signeddate, SetSignedDate] = React.useState(null);
  const [enddate, SetEndDate] = React.useState(null);
  const [error, setError] = React.useState("");

  const addProduct = async () => {
    if (!name || !code || !orderno) {
      setError("Please fill all required fields.");
      return;
    }
    // console.log(name, code, orderno, startdate, signeddate, enddate);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5000/add-project", {
      method: "post",
      body: JSON.stringify({
        name,
        code,
        orderno,
        startdate,
        signeddate,
        enddate,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    console.log(result);
  };

  return (
    <div className="add-product-container">
      <Box
        className="add-product-form"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h1 className="add-product-heading"> Add-Project :</h1>
        <div className="add-product-textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="Project Name:"
            placeholder="Enter Project Name"
            multiline
            maxRows={4}
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            helperText={
              !code && error ? (
                <span style={{ color: "red" }}>Project name is required.</span>
              ) : (
                ""
              )
            }
          />

          <TextField
            id="outlined-textarea"
            label="Code:"
            placeholder="Enter Project Code"
            multiline
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            helperText={
              !code && error ? (
                <span style={{ color: "red" }}>Code is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Work Order No."
            placeholder="Enter Work Order No."
            multiline
            type="text"
            value={orderno}
            onChange={(e) => SetOrderNo(e.target.value)}
            helperText={
              !orderno && error ? (
                <span style={{ color: "red" }}>OrderNo is required.</span>
              ) : (
                ""
              )
            }
          />
        </div>
        <div className="add-product-textfield">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startdate}
              onChange={(newValue) => SetStartDate(newValue)}
            />
          </LocalizationProvider>
          {/*  */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Contract Signed Date"
              value={signeddate}
              onChange={(newValue) => SetSignedDate(newValue)}
            />
          </LocalizationProvider>
          {/*  */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={enddate}
              onChange={(newValue) => SetEndDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {!name || !code || !orderno || !startdate || !signeddate || !enddate ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          ""
        )}
        <Button
          style={{
            backgroundColor: "#2f4050",
            color: "aliceblue",
            marginLeft: "auto",

            width: "150px",
          }}
          onClick={addProduct}
          variant="contained"
        >
          {name && code && orderno ? (
            <NavLink to="/projects" className="link">
              Submit
            </NavLink>
          ) : (
            <NavLink to="/add-project" className="link">
              Submit
            </NavLink>
          )}
        </Button>
      </Box>
    </div>
  );
}
