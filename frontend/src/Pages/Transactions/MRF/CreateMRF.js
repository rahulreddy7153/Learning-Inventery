import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import MaterialAdd from "../../Components/MaterialAdd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";

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
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
export default function CreateMRF() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [lodder, setLodder] = React.useState(true);

  React.useEffect(() => {
    let showMessageTimeout;
    let lodderTimeout;
    if (isSubmitted) {
      showMessageTimeout = setTimeout(() => {
        setShowMessage(true);
      }, 2000);
      lodderTimeout = setTimeout(() => {
        setLodder(false);
      }, 2000);
    }
    return () => {
      clearTimeout(showMessageTimeout);
      clearTimeout(lodderTimeout);
    };
  }, [isSubmitted]);

  const [progress, setProgress] = React.useState(10);

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

  //
  const [materialListData, setMaterialListData] = React.useState([]);
  const [editMaterial, setEditMaterial] = React.useState(null);
  const [handleAdd, SethandleAdd] = React.useState(false);

  const handleEdit = (material) => {
    setEditMaterial(material);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      setMaterialListData(
        materialListData.filter((material) => material.id !== id)
      );
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };

  //
  const [contractordata, Setcontractordata] = React.useState([]);
  const [projectdata, Setprojectdata] = React.useState([]);
  const [companyStoreData, setCompanyStoredata] = React.useState([]);
  const [contractorStoreData, setContractorStoredata] = React.useState([]);
  React.useEffect(() => {
    getcontractor();
    getcontractorStore();
    getproject();
    getcompanyStore();
  }, []);
  const getcontractor = async () => {
    let result = await fetch("http://localhost:5000/contractor");
    result = await result.json();
    Setcontractordata(result.reverse());
  };

  const getcontractorStore = async () => {
    let result = await fetch("http://localhost:5000/contractorstore");
    result = await result.json();
    setContractorStoredata(result.reverse());
  };
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
  //
  // Create GRN:
  const [contractorName, setContactorName] = React.useState("");
  const [contractorStoreName, setContractorStroreName] = React.useState("");
  const [companyStoreName, setcompanyStroreName] = React.useState("");

  const [projectname, setprojectname] = React.useState("");

  const [workOrderNo, setWorkOrderNo] = React.useState("");

  const [remark_, setRemark] = React.useState("");
  //

  //
  const [next, Setnext] = React.useState(false);
  // for error validation
  const [error, setError] = React.useState("");
  //

  //For UniqueCode-

  const handleNext = async () => {
    if (!remark_ || !contractorName) {
      Setnext(false);
      setError("Please fill all required fields.");

      return;
    } else {
      Setnext(true);
    }
  };
  // const clearform = () => {
  //   setSupplierName("");
  //   setprojectname("");
  //   setInvoiceno("");
  //   setInviocedate(null);
  //   setPoDate(null);
  //   setPoNo("");
  //   setTransportername("");
  //   setContactno("");
  //   setVehicleno("");
  //   setEwaybilldate(null);
  //   setEwaybillno("");
  //   setReciptdate(null);
  //   setExpirydate(null);
  //   setRemark("");
  // };
  const created_by_str = localStorage.getItem("user");
  const created_by_parse = JSON.parse(created_by_str);
  const created_by = created_by_parse._id;
  const created_at = new Date().toTimeString().split(" ")[0]; // Extract time in HH:MM:SS format
  const updated_at = new Date().toTimeString().split(" ")[0]; // Extract time in HH:MM:SS format

  const addGRN_MaterialList = async () => {
    if (!remark_ || !contractorStoreName | !contractorName) {
      setError("Please fill all required fields.");

      return;
    } else {
      let result = await fetch("http://localhost:5000/add-mrf", {
        method: "POST",
        body: JSON.stringify({
          contractorName,
          contractorStoreName,
          companyStoreName,
          projectname,
          workOrderNo,
          remark_,
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
        let request_detail_id = responseData._id; // Extract the ID
        let document_number = responseData.document_number;
        if (request_detail_id) {
          const request = materialListData.map((data) => ({
            ...data,
            request_detail_id,
            document_number,
            created_by,
            created_at,
            updated_at,
          }));
          let materiallist = await fetch(
            "http://localhost:5000/add-MRFmateriallistdata",
            {
              method: "post",
              body: JSON.stringify({
                request,
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

  // const selectedSupplierData = supplierdata.find(
  //   (item) => item.name === supplierName
  // );
  console.log(contractorStoreData);
  const selectedContractorData = contractorStoreData.filter(
    (item) => item.organizationId._id === contractorName
  );
  const selectedContractorStoreData = contractorStoreData.filter(
    (item) => item.name === contractorStoreName
  );
  const selectedCompanyStoreData = companyStoreData.find(
    (item) => item._id === companyStoreName
  );
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
        <h1 className="add-product-heading"> Create MRF:</h1>
        <div style={{ display: "flex" }} className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 300, display: "flex" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Contractor
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={contractorName}
              label="suppliername"
              onChange={(e) => setContactorName(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {contractordata.map((item) => (
                <MenuItem key={item.name} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {!contractorName && error ? (
                <span>Contractor is required.</span>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Contractor Store
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={contractorStoreName}
              label="contractorStoreName"
              onChange={(e) => setContractorStroreName(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {selectedContractorData.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {!contractorStoreName && error ? (
                <span>Contractor name is required.</span>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>
          <Box sx={{ marginLeft: 2, minWidth: 300 }}>
            <b>Address:</b>
            <Typography>
              {contractorStoreName ? (
                <div>
                  {selectedContractorStoreData.map((item, index) => (
                    <div key={index} style={{ display: "flex" }}>
                      <p> {item.address},</p>
                      <p> {item.country},</p>
                      <p> {item.state},</p>
                      <p>{item.city},</p>
                      <p>{item.pincode}</p>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </div>
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
              value={companyStoreName}
              label="companyStoreName"
              onChange={(e) => setcompanyStroreName(e.target.value)}
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
              {!companyStoreName && error ? (
                <span>Company Store is required.</span>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>
          <Box sx={{ marginLeft: 2, minWidth: 300 }}>
            <b>Address:</b>

            <Typography>
              <div>
                {companyStoreName ? (
                  <p>
                    {selectedCompanyStoreData?.address},
                    {selectedCompanyStoreData?.country},
                    {selectedCompanyStoreData?.state},
                    {selectedCompanyStoreData?.city},
                    {selectedCompanyStoreData?.pincode}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </Typography>
          </Box>
        </div>

        <div className="add-product-textfield">
          <TextField
            sx={{ m: 1, minWidth: 300, display: "flex" }}
            id="outlined-multiline-static"
            label="Work Order No."
            placeholder="Work Order Number:"
            multiline
            type="text"
            value={workOrderNo}
            onChange={(e) => setWorkOrderNo(e.target.value)}
            helperText={
              !workOrderNo && error ? (
                <span style={{ color: "red" }}>
                  work Order No. is required.
                </span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Remark"
            placeholder="Remark"
            multiline
            type="text"
            value={remark_}
            onChange={(e) => setRemark(e.target.value)}
            helperText={
              !remark_ && error ? (
                <span style={{ color: "red" }}>Remark is required.</span>
              ) : (
                ""
              )
            }
          />
          <Button
            style={{
              backgroundColor: "#2f4050",
              color: "aliceblue",
              margin: "14px",
              height: "44px",
              marginBottom: "10px",
            }}
            onClick={handleNext}
            variant="contained"
          >
            Next
          </Button>
        </div>
        <br />
        <br />
        <br />

        {next ? (
          <MaterialAdd
            setMaterialListData={setMaterialListData}
            materialListData={materialListData}
            setEditMaterial={setEditMaterial}
            editMaterial={editMaterial}
            SethandleAdd={SethandleAdd}
            showReceivingStore={false} //Hide Reciving Store
            showRate_TaxAndValue={false} // Hide Rate tax and value fields
          />
        ) : null}
        <br />
        <br />
        <br />

        {handleAdd ? (
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
                      <b>Actions</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Name:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Code:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b> Quantity:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>UOM</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materialListData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Button onClick={() => handleEdit(data)}>
                          <EditIcon sx={{ color: "black" }} />
                        </Button>
                        <Button onClick={() => handleDelete(data.id)}>
                          <DeleteIcon sx={{ color: "black" }} />
                        </Button>
                      </TableCell>

                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.code}</TableCell>
                      <TableCell align="center">{data.quantity}</TableCell>
                      <TableCell align="center">{data.uom}</TableCell>
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
                onClick={addGRN_MaterialList}
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
