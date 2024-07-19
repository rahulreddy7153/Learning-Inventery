import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

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
export default function ReciptGRN() {
  const [grndata, Setgrndata] = React.useState([]);

  const getmaterial = async () => {
    let result = await fetch("http://localhost:5000/grn");
    result = await result.json();
    Setgrndata(result);
  };
  React.useEffect(() => {
    getmaterial();
  }, []);

  return (
    <div className="">
      <TableContainer component={Paper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>GRN List:</h1>
        </div>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Project:</b>
              </TableCell>
              <TableCell align="center">
                <b>Supplier:</b>
              </TableCell>
              <TableCell align="center">
                <b> Document Number:</b>
              </TableCell>
              <TableCell align="center">
                <b> Eway Bill No:</b>
              </TableCell>
              <TableCell align="center">
                <b>Eway Bill Date:</b>
              </TableCell>
              <TableCell align="center">
                <b> Transporter Name:</b>
              </TableCell>
              <TableCell align="center">
                <b>Contact No.</b>
              </TableCell>
              <TableCell align="center">
                <b>Created By:</b>
              </TableCell>
              <TableCell align="center">
                <b>Created At:</b>
              </TableCell>
              <TableCell align="center">
                <b>Updated At:</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grndata.map((data, index) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.projectname.name}</TableCell>
                <TableCell align="center">{data.supplierName.name}</TableCell>
                <TableCell align="center">{data.document_number}</TableCell>
                <TableCell align="center">{data.ewaybillno}</TableCell>
                <TableCell align="center">
                  {" "}
                  {dayjs(data.ewaybilldate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center">{data.transportername}</TableCell>
                <TableCell align="center">{data.contactno}</TableCell>
                <TableCell align="center">{data.created_by.username}</TableCell>
                <TableCell align="center">
                  {" "}
                  {dayjs(data.created_at).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center">{data.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
