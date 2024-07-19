import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddcontractorStore() {
  //for organisation saction
  const [organizationId, setSelectedOrganization] = React.useState("");

  const handleChange = (event) => {
    setSelectedOrganization(event.target.value);
  };
  //
  //Organization me select kerne pr contractor name ke value k liye
  const [contractor, Setcontractor] = React.useState([]);

  React.useEffect(() => {
    getcontractor();
  }, []);

  const getcontractor = async () => {
    let result = await fetch("http://localhost:5000/contractor");
    result = await result.json();
    Setcontractor(result.reverse());
  };
  //
  //
  const [name, SetName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [email, Setemail] = React.useState("");
  const [mobileno, Setmobileno] = React.useState(null);
  const [gstno, Setgstno] = React.useState(null);
  //
  const [error, setError] = React.useState("");
  //
  const [address, setAddress] = React.useState(null);
  const [country, Setcountry] = React.useState("");
  const [state, Setstate] = React.useState("");
  const [city, SetCity] = React.useState("");
  const [pincode, Setpincode] = React.useState("");

  const addcontractor = async () => {
    if (
      !organizationId ||
      !name ||
      !code ||
      !email ||
      !mobileno ||
      !gstno ||
      !address ||
      !country ||
      !state ||
      !city ||
      !pincode
    ) {
      setError("Please fill all required fields.");
      return;
    }
    console.log(organizationId);
    // console.log(name, code, orderno, startdate, signeddate, enddate);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5000/add-contractorstore", {
      method: "post",
      body: JSON.stringify({
        organizationId,
        name,
        code,
        email,
        mobileno,
        gstno,
        address,
        country,
        state,
        city,
        pincode,
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
        <h1 className="add-product-heading"> Add Contractor Store :</h1>
        <div className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Organization
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={organizationId}
              label="Organization"
              onChange={handleChange}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {contractor.map((organization) => (
                <MenuItem key={organization.name} value={organization._id}>
                  {organization.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-flexible"
            label="contractorStore Name:"
            placeholder="ContractorStore Name"
            multiline
            maxRows={4}
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            helperText={
              !name && error ? (
                <span style={{ color: "red" }}>
                  ContractorStore-Name is required
                </span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-textarea"
            label="Code:"
            placeholder="Enter contractor Code"
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
            label="Email"
            placeholder="abc@gmail.com"
            multiline
            type="text"
            value={email}
            onChange={(e) => Setemail(e.target.value)}
            helperText={
              !email && error ? (
                <span style={{ color: "red" }}>Email is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Mobile no."
            placeholder="Enter mobile no."
            multiline
            type="text"
            value={mobileno}
            onChange={(e) => Setmobileno(e.target.value)}
            helperText={
              !mobileno && error ? (
                <span style={{ color: "red" }}>Mobile no. is required.</span>
              ) : (
                ""
              )
            }
          />{" "}
        </div>
        <div className="add-product-textfield">
          <TextField
            id="outlined-multiline-static"
            label="GST no."
            placeholder="Enter GST no."
            multiline
            type="text"
            value={gstno}
            onChange={(e) => Setgstno(e.target.value)}
            helperText={
              !gstno && error ? (
                <span style={{ color: "red" }}>GSTno. is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Address:"
            placeholder="Enter Address."
            multiline
            maxRows={4}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            helperText={
              !address && error ? (
                <span style={{ color: "red" }}>Address is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-textarea"
            label="Country:"
            placeholder="Enter Your Country."
            multiline
            type="text"
            value={country}
            onChange={(e) => Setcountry(e.target.value)}
            helperText={
              !country && error ? (
                <span style={{ color: "red" }}>Country is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="State:"
            placeholder="Enter Your State."
            multiline
            type="text"
            value={state}
            onChange={(e) => Setstate(e.target.value)}
            helperText={
              !state && error ? (
                <span style={{ color: "red" }}>State is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="City:"
            placeholder="Enter Your City."
            multiline
            type="text"
            value={city}
            onChange={(e) => SetCity(e.target.value)}
            helperText={
              !city && error ? (
                <span style={{ color: "red" }}>City is required.</span>
              ) : (
                ""
              )
            }
          />{" "}
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Pin Code:"
            placeholder="Enter Your Pin Code."
            sx={{ display: "flex", flexDirection: "column" }}
            multiline
            type="text"
            value={pincode}
            onChange={(e) => Setpincode(e.target.value)}
            helperText={
              !pincode && error ? (
                <span style={{ color: "red" }}>PinCode is required.</span>
              ) : (
                ""
              )
            }
          />
        </div>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        {!name ||
        !code ||
        !email ||
        !mobileno ||
        !gstno ||
        !address ||
        !country ||
        !state ||
        !city ||
        !pincode ? (
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
            marginBottom: "10px",
          }}
          onClick={addcontractor}
          variant="contained"
        >
          {name && code && email && mobileno && gstno ? (
            <NavLink to="/contractor-stores" className="link">
              Submit
            </NavLink>
          ) : (
            <NavLink to="/add-contractor-stores" className="link">
              Submit
            </NavLink>
          )}
        </Button>
      </Box>
    </div>
  );
}
