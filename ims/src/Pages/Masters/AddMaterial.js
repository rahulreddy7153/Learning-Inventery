import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function Addmaterial() {
  const [name, SetName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [description, Setdescription] = React.useState("");
  const [measurement, SetMeasurement] = React.useState("");
  const [remark, SetRemark] = React.useState("");
  const [serialno, SetSerialno] = React.useState("");

  //
  const [error, setError] = React.useState("");
  //

  const addmaterial = async () => {
    if (!name || !code) {
      setError("Please fill all required fields.");
      return;
    }
    // console.log(name, code, remark, measurement, dercription, serialno);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5000/add-material", {
      method: "post",
      body: JSON.stringify({
        name,
        code,
        description,
        measurement,
        remark,
        serialno,
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
        <h1 className="add-product-heading"> Add Material :</h1>
        <div className="add-product-textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="Material Name:"
            placeholder="Enter material Name"
            multiline
            maxRows={4}
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            helperText={
              !name && error ? (
                <span style={{ color: "red" }}>
                  Contractor name is required.
                </span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-textarea"
            label="Code:"
            placeholder="Enter material Code"
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
            id="outlined-textarea"
            label="Description:"
            placeholder="Description"
            multiline
            type="text"
            value={description}
            onChange={(e) => Setdescription(e.target.value)}
            helperText={
              !code && error ? (
                <span style={{ color: "red" }}>Description is required.</span>
              ) : (
                ""
              )
            }
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Unit of Measurement
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={measurement}
              label="Measurement"
              sx={{ height: 60 }}
              onChange={(e) => SetMeasurement(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="number ">
                <em>Number</em>
              </MenuItem>
              <MenuItem value="kg ">
                <em>Kg</em>
              </MenuItem>
              <MenuItem value=" km">
                <em>Km</em>
              </MenuItem>
              <MenuItem value=" mtr">
                <em>Mtr</em>
              </MenuItem>
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {!measurement && error ? (
                <span>Measurement is required.</span>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>
          <TextField
            id="outlined-textarea"
            label="Remark:"
            placeholder="Remark"
            value={remark}
            onChange={(e) => SetRemark(e.target.value)}
            multiline
            type="text"
            helperText={
              !remark && error ? (
                <span style={{ color: "red" }}>Remark is required.</span>
              ) : (
                ""
              )
            }
          />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              IsSerial:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => SetSerialno(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <FormHelperText sx={{ color: "red" }}>
              {!serialno && error ? <span>Serial no. is required.</span> : ""}
            </FormHelperText>
          </FormControl>
        </div>

        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {!name || !code ? <p style={{ color: "red" }}>{error}</p> : ""}

        <Button
          style={{
            backgroundColor: "#2f4050",
            color: "aliceblue",
            marginLeft: "auto",
            width: "150px",
          }}
          onClick={addmaterial}
          variant="contained"
        >
          {name && code ? (
            <NavLink to="/material" className="link">
              Submit
            </NavLink>
          ) : (
            <NavLink to="/add-material" className="link">
              Submit
            </NavLink>
          )}
        </Button>
      </Box>
    </div>
  );
}
