import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function AddCompany() {
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

  const addCompany = async () => {
    if (
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
    // console.log(name, code, orderno, startdate, signeddate, enddate);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5000/add-company", {
      method: "post",
      body: JSON.stringify({
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
        <h1 className="add-product-heading"> Add-Company :</h1>
        <div className="add-product-textfield">
          <TextField
            id="outlined-multiline-flexible"
            label="Company Name:"
            placeholder="Enter Company Name"
            multiline
            maxRows={4}
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            helperText={
              !name && error ? (
                <span style={{ color: "red", width: "max-content" }}>
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
            placeholder="Enter Company Code"
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
        </div>
        <div className="add-product-textfield">
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
          <TextField
            id="outlined-multiline-static"
            label="Pin Code:"
            placeholder="Enter Your Pin Code."
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
          }}
          onClick={addCompany}
          variant="contained"
        >
          {name && code && email && mobileno && gstno ? (
            <NavLink to="/company" className="link">
              Submit
            </NavLink>
          ) : (
            <NavLink to="/add-company" className="link">
              Submit
            </NavLink>
          )}
        </Button>
      </Box>
    </div>
  );
}
