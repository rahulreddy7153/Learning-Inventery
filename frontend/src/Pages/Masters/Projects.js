import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

//Important learn by Rishi Sir!

// import { styled } from "@mui/material";
// const TableCellStyled = styled(TableCell)(() => ({
//   // "& .MuiTableCell-root": {
//   background: "red",

//   // },
// }));

export default function Projects() {
  const [project, setProject] = React.useState([]);
  //basically delete hone pr phle wale api dekh rhe the isliye useEffect use kiya h
  React.useEffect(() => {
    getProject();
  }, []);
  //api call

  const getProject = async () => {
    let result = await fetch("http://localhost:5000/project");
    result = await result.json();
    setProject(result.reverse());
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
    //Important learn by Rishi Sir!
    // tableCell: {
    //   "& .MuiTableCell-root": {
    //     background: "red",
    //   },
    // },
  };
  // delete api call
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/project/${id}`, {
      method: "Delete",
    });

    if (result) {
      alert("Your project is deleted:");
      result = await result.json();
      getProject();
    }
  };
  // console.log(products);
  return (
    <div className="">
      <TableContainer component={Paper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Projects List:</h1>
          <NavLink to="/add-project">
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
                <b>Project Name:</b>
              </TableCell>
              <TableCell align="center">
                <b>Code</b>
              </TableCell>
              <TableCell align="center">
                <b> Order No:</b>
              </TableCell>
              <TableCell align="center">
                <b>Start Date:</b>
              </TableCell>
              <TableCell align="center">
                <b> Signed Date:</b>
              </TableCell>
              <TableCell align="center">
                <b>End Date:</b>
              </TableCell>
              <TableCell align="left">
                <b>Oprations:</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {project.map((data, index) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.code}</TableCell>
                <TableCell align="center">{data.orderno}</TableCell>
                <TableCell align="center">
                  {dayjs(data.startdate).format("DD-MM-YYYY")}{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {dayjs(data.signeddate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {dayjs(data.enddate).format("DD-MM-YYYY")}
                </TableCell>
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
                  onClick={() => deleteProduct(data._id)}
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
