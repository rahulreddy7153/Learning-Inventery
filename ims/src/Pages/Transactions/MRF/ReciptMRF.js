import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
export default function ReciptMRF() {
  const [mrfdata, Setmrfdata] = React.useState([]);

  React.useEffect(() => {
    getmaterial();
  }, []);
  //api call

  const getmaterial = async () => {
    let result = await fetch("http://localhost:5000/mrf");
    result = await result.json();
    Setmrfdata(result);
  };

  return (
    <div className="">
      <TableContainer component={Paper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>MRF List:</h1>
        </div>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Contractor:</b>
              </TableCell>
              <TableCell align="center">
                <b>Contractor Store:</b>
              </TableCell>
              <TableCell>
                <b>Document No.</b>
              </TableCell>
              <TableCell align="center">
                <b> Project:</b>
              </TableCell>
              <TableCell align="center">
                <b> Company Store:</b>
              </TableCell>
              <TableCell align="center">
                <b>Work Order No:</b>
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
            {mrfdata.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{data.contractorName}</TableCell>
                <TableCell align="center">{data.contractorStoreName}</TableCell>
                <TableCell align="center">{data.document_number}</TableCell>

                <TableCell align="center">{data.projectname.name}</TableCell>
                <TableCell align="center">
                  {data.companyStoreName.name}
                </TableCell>

                <TableCell align="center">{data.workOrderNo}</TableCell>
                <TableCell align="center">{data.created_by.username}</TableCell>
                <TableCell align="center">{data.created_at}</TableCell>
                <TableCell align="center">{data.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
