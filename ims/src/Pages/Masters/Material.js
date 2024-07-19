import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export default function Material() {
  const [material, Setmaterial] = React.useState([]);
  //basically delete hone pr phle wale api dekh rhe the isliye useEffect use kiya h
  React.useEffect(() => {
    getmaterial();
  }, []);
  //api call

  const getmaterial = async () => {
    let result = await fetch("http://localhost:5000/material");
    result = await result.json();
    Setmaterial(result.reverse());
  };
  //
  // style
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      margin: "10px",
    },
    heading: {
      margin: 0,
    },
  };
  // delete api call
  const deletematerial = async (id) => {
    let result = await fetch(`http://localhost:5000/material/${id}`, {
      method: "Delete",
    });

    if (result) {
      alert("Your material list is deleted:");
      result = await result.json();
      getmaterial();
    }
  };
  // console.log(products);
  return (
    <div className="">
      <TableContainer component={Paper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Material List:</h1>
          <NavLink to="/add-material">
            <AddIcon
              style={{
                backgroundColor: "#2f4050",
                color: "aliceblue",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </NavLink>
        </div>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Sno.</b>
              </TableCell>
              <TableCell align="center">
                <b>Name:</b>
              </TableCell>
              <TableCell align="center">
                <b> Code:</b>
              </TableCell>
              <TableCell align="center">
                <b> Description:</b>
              </TableCell>
              <TableCell align="center">
                <b>UOM:</b>
              </TableCell>
              <TableCell align="center">
                <b> Remark:</b>
              </TableCell>
              <TableCell align="center">
                <b>IsSerial::</b>
              </TableCell>
              <TableCell align="center">
                <b>Oprations:</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {material.map((data, index) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.code}</TableCell>
                <TableCell align="center">{data.description}</TableCell>
                <TableCell align="center">{data.measurement}</TableCell>
                <TableCell align="center">{data.remark}</TableCell>
                <TableCell align="center">{data.serialno}</TableCell>

                <br />
                <br />
                <Button
                  variant="outlined"
                  style={{
                    color: "black", // Change button text color
                    borderColor: "black", // Change button border color
                    marginRight: "0px",
                    "&:hover": {
                      backgroundColor: "#2f4050", // Change button background color on hover
                      // Change button border color on hover
                      color: "#ffffff", // Change button text color on hover
                    },
                  }}
                  onClick={() => deletematerial(data._id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <br />
                <br />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
