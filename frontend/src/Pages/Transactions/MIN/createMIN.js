import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import MinMaterialAdd from "../../Components/MinMaterialAdd";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function MIN() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [lodder, setLodder] = React.useState(true);
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    let showMessageTimeout;
    let lodderTimeout;
    if (isSubmitted) {
      showMessageTimeout = setTimeout(() => {
        setShowMessage(true);
      }, 1000);
      lodderTimeout = setTimeout(() => {
        setLodder(false);
      }, 1000);
    }
    return () => {
      clearTimeout(showMessageTimeout);
      clearTimeout(lodderTimeout);
    };
  }, [isSubmitted]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
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
      color: "#2f4050",
    },
  };

  const [projectdata, Setprojectdata] = React.useState([]);
  const [companyStoreData, setCompanyStoredata] = React.useState([]);
  const [request_numberdata, Setrequest_numberdata] = React.useState([]);
  const [MRFmateriallistdata, SetMRFmateriallistdata] = React.useState([]);
  const [receivingstore, setReceivingStore] = React.useState("");
  const [projectname, setprojectname] = React.useState("");
  const [requestNumber, SetrequestNumber] = React.useState("");
  const [next, Setnext] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [handleEdit, SethandleEdit] = React.useState(false);
  const [editMaterial, setEditMaterial] = React.useState(null);

  const getcompanyStore = async () => {
    let result = await fetch("http://localhost:5000/companystore");
    result = await result.json();
    setCompanyStoredata(result.reverse());
  };

  const getproject = async () => {
    let result = await fetch("http://localhost:5000/project");
    result = await result.json();
    Setprojectdata(result.reverse());
  };

  const getrequest_number = async () => {
    let result = await fetch("http://localhost:5000/mrf");
    result = await result.json();
    Setrequest_numberdata(result.reverse());
  };

  const mrf_materiallistdata = React.useCallback(async () => {
    if (!requestNumber) return;
    let result = await fetch("http://localhost:5000/MRFmateriallistdata");
    result = await result.json();
    SetMRFmateriallistdata(
      result.reverse().filter((item) => item.document_number === requestNumber)
    );
  }, [requestNumber]);
  React.useEffect(() => {
    getproject();
    getcompanyStore();
    getrequest_number();
  }, []);
  React.useEffect(() => {
    mrf_materiallistdata();
  }, [mrf_materiallistdata]);

  const [Request_Number, setRequestNumber] = React.useState([]);

  React.useEffect(() => {
    const reqNumber = request_numberdata.filter(
      (item) =>
        item?.projectname?._id === projectname &&
        item?.companyStoreName?._id === receivingstore
    );
    console.log(request_numberdata);
    setRequestNumber(reqNumber);
  }, [request_numberdata, projectname, receivingstore]);
  // const mrfMaterialList = MRFmateriallistdata.filter(
  //   (item) => item.document_number === requestNumber
  // );

  // const mrfMaterialListArray = mrfMaterialList.map((item) => {
  //   const itemCopy = structuredClone(item);
  //   delete itemCopy.document_number;
  //   return itemCopy;
  // });

  // const mrfMaterialListArray = MRFmateriallistdata.map(
  //   ({
  //     document_number,
  //     created_by,
  //     created_at,
  //     updated_at,
  //     request_detail_id,
  //     _id,
  //     ...rest
  //   }) => rest
  // );

  // console.log("mrfMaterialList", mrfMaterialList);
  // console.log("mrfMaterialListArray", mrfMaterialListArray);

  const onSubmit = () => {
    if (!projectname || !receivingstore) {
      setError(true);
      return;
    } else {
      calculateTotalQuantitiesInStock();

      Setnext(true);
    }
  };

  // Add these new state variables
  const [GRNmateriallistdata, setGRNmateriallistdata] = React.useState([]);
  const [totalQuantitiesInStock, setTotalQuantitiesInStock] = React.useState(
    {}
  );

  // Add this new useEffect
  React.useEffect(() => {
    grn_materiallistdata();
  }, []);

  // Add this new function
  const grn_materiallistdata = async () => {
    let result = await fetch("http://localhost:5000/GRNmateriallistdata");
    result = await result.json();
    setGRNmateriallistdata(result.reverse());
  };

  // Add this new function to calculate total quantities in stock
  const calculateTotalQuantitiesInStock = () => {
    const totals = {};
    MRFmateriallistdata.forEach((material) => {
      const totalGrnQuantity = GRNmateriallistdata.filter(
        (item) =>
          item.document_type === "GRN" &&
          item.receivingstore._id === receivingstore &&
          item.name === material.name
      ).reduce((acc, curr) => acc + Number(curr.quantity), 0);

      const totalMinQuantity = GRNmateriallistdata.filter(
        (item) => item.document_type === "MIN" && item.name === material.name
      ).reduce((acc, curr) => acc + Number(curr.quantity), 0);

      totals[material.name] = totalGrnQuantity - totalMinQuantity;
    });
    setTotalQuantitiesInStock(totals);
  };

  // Call this function when handleEdit becomes true
  const handleEditButton = (material) => {
    return () => {
      setEditMaterial(material);
      SethandleEdit(true);
    };
  };

  const handleCancel = () => {
    window.location.reload();
  };
  const created_by_str = localStorage.getItem("user");
  const created_by_parse = JSON.parse(created_by_str);
  const created_by = created_by_parse._id;
  const created_at = new Date().toTimeString().split(" ")[0]; // Extract time in HH:MM:SS format
  const updated_at = new Date().toTimeString().split(" ")[0]; // Extract time in HH:MM:SS format

  const handleSubmit = async () => {
    if (!projectname | !receivingstore) {
      setError("Please fill all required fields.");

      return;
    } else {
      let result = await fetch("http://localhost:5000/add-min", {
        method: "POST",
        body: JSON.stringify({
          projectname,
          created_by,
          created_at,
          updated_at,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        let responseData = await result.json(); // Parse the JSON response
        let document_number = responseData.document_number;
        let document_type = responseData.document_type;
        // Use the ID as needed
        console.log("MATERIALLIST", MRFmateriallistdata);

        if (document_number) {
          const stock_ledger = MRFmateriallistdata.map((data) => ({
            ...data,
            document_number,
            receivingstore,
            document_type,
            created_by,
            created_at,
            updated_at,
          }));
          let materiallist = await fetch(
            "http://localhost:5000/add-GRNmateriallistdata",
            {
              method: "post",
              body: JSON.stringify({
                stock_ledger,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          console.log(materiallist);
        }
      } else {
        console.log("Error:", result.statusText);
      }
      setIsSubmitted(true);
    }
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
        <h1 className="add-product-heading"> Create MIN:</h1>
        <div style={{ display: "flex" }} className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Project
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={projectname}
              label="projectname"
              onChange={(e) => setprojectname(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {projectdata.map((item) => (
                <MenuItem key={item.name} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {!projectname && error ? (
                <span>Projectname is required.</span>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Company Store
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={receivingstore}
              label="companyStoreName"
              onChange={(e) => setReceivingStore(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {companyStoreData.map((item) => (
                <MenuItem key={item.name} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {!receivingstore && error ? (
                <span>Company Store is required.</span>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Request Number:
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={requestNumber}
              label="requestNumber"
              onChange={(e) => SetrequestNumber(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Request_Number.map((item) => (
                <MenuItem
                  key={item.document_number}
                  value={item.document_number}
                >
                  MRF:{item.document_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            style={{
              backgroundColor: "#2f4050",
              color: "aliceblue",
              margin: "14px",
              height: "44px",
              marginBottom: "10px",
            }}
            variant="contained"
            onClick={onSubmit}
          >
            Next
          </Button>
        </div>
        <br />
        <br />
        <br />
        {handleEdit ? (
          <MinMaterialAdd
            setMaterialListData={SetMRFmateriallistdata}
            materialListData={MRFmateriallistdata}
            setEditMaterial={setEditMaterial}
            editMaterial={editMaterial}
            companyStoreName={receivingstore}
          />
        ) : null}
        <br />
        <br />
        {next ? (
          <div>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "#f7f7f7" }}
            >
              <div style={styles.container}>
                <h1 style={styles.heading}>Material List:</h1>
              </div>
              <Table sx={{ minWidth: 1000 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Actions:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Name:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Code:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Quantity:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>UOM</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Quantity in Stock</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MRFmateriallistdata.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Button onClick={handleEditButton(data)}>
                          <EditIcon sx={{ color: "black" }} />
                        </Button>
                      </TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.code}</TableCell>
                      <TableCell align="center">{data.quantity}</TableCell>
                      <TableCell align="center">{data.uom}</TableCell>
                      <TableCell align="center">
                        {totalQuantitiesInStock[data.name] || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                style={{
                  backgroundColor: "#2f4050",
                  color: "aliceblue",
                  margin: "14px",
                  height: "44px",
                  marginBottom: "10px",
                  float: "right",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                style={{
                  backgroundColor: "#2f4050",
                  color: "aliceblue",
                  margin: "14px",
                  height: "44px",
                  marginBottom: "10px",
                  float: "right",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              {isSubmitted && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close">&times;</span>
                    {lodder && (
                      <Box sx={{ width: "100%" }}>
                        <LinearProgressWithLabel value={progress} />
                        <p>Executing...</p>
                      </Box>
                    )}

                    {showMessage && <p>Your form has been submitted!</p>}
                    {showMessage && (
                      <Button
                        style={{
                          backgroundColor: "#2f4050",
                          color: "aliceblue",
                          margin: "14px",
                          height: "44px",
                          marginBottom: "10px",
                        }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )}
              <br />
            </TableContainer>
          </div>
        ) : null}
      </Box>
    </div>
  );
}
