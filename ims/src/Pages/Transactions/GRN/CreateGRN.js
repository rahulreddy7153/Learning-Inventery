import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
export default function CreateGRN() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [lodder, setLodder] = React.useState(true);

  React.useEffect(() => {
    let showMessageTimeout;
    let lodderTimeout;
    if (isSubmitted) {
      showMessageTimeout = setTimeout(() => {
        setShowMessage(true);
      }, 3000);
      lodderTimeout = setTimeout(() => {
        setLodder(false);
      }, 3000);
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
  const [supplierdata, Setsupplierdata] = React.useState([]);
  const [projectdata, Setprojectdata] = React.useState([]);

  React.useEffect(() => {
    getsuppliers();
    getproject();
  }, []);
  const getsuppliers = async () => {
    let result = await fetch("http://localhost:5000/suppliers");
    result = await result.json();
    Setsupplierdata(result.reverse());
  };

  const getproject = async () => {
    let result = await fetch("http://localhost:5000/project");
    result = await result.json();
    Setprojectdata(result.reverse());
  };

  //
  // Create GRN:
  const [supplierName, setSupplierName] = React.useState("");
  const [projectname, setprojectname] = React.useState("");
  const [invoiceno, setInvoiceno] = React.useState("");
  const [invoicedate, setInviocedate] = React.useState(null);
  const [pono, setPoNo] = React.useState("");
  const [podate, setPoDate] = React.useState(null);
  const [transportername, setTransportername] = React.useState("");
  const [contactno, setContactno] = React.useState("");
  const [vehicleno, setVehicleno] = React.useState("");
  const [ewaybillno, setEwaybillno] = React.useState("");
  const [ewaybilldate, setEwaybilldate] = React.useState(null);
  const [reciptdate, setReciptdate] = React.useState(null);
  const [expirydate, setExpirydate] = React.useState(null);
  const [remark_, setRemark] = React.useState("");
  //

  //
  const [next, Setnext] = React.useState(false);
  // for error validation
  const [error, setError] = React.useState("");
  //

  //For UniqueCode-

  const handleNext = async () => {
    if (
      !remark_ ||
      !expirydate ||
      !reciptdate ||
      !ewaybilldate ||
      !ewaybillno ||
      !vehicleno ||
      !contactno ||
      !transportername ||
      !podate ||
      !pono ||
      !invoicedate ||
      !invoiceno ||
      !projectname ||
      !supplierName
    ) {
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
    if (
      !remark_ ||
      !expirydate ||
      !reciptdate ||
      !ewaybilldate ||
      !ewaybillno ||
      !vehicleno ||
      !contactno ||
      !transportername ||
      !podate ||
      !pono ||
      !invoicedate ||
      !invoiceno ||
      !projectname | !supplierName
    ) {
      setError("Please fill all required fields.");

      return;
    } else {
      let result = await fetch("http://localhost:5000/add-grn", {
        method: "POST",
        body: JSON.stringify({
          supplierName,
          projectname,
          invoiceno,
          invoicedate,
          pono,
          podate,
          transportername,
          contactno,
          vehicleno,
          ewaybillno,
          ewaybilldate,
          reciptdate,
          expirydate,
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
        let stock_ledger_id = responseData._id; // Extract the ID
        let document_number = responseData.document_number;
        // Use the ID as needed
        if (stock_ledger_id) {
          const stock_ledger = materialListData.map((data) => ({
            ...data,
            stock_ledger_id,
            document_number,
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

  const selectedSupplierData = supplierdata.find(
    (item) => item._id === supplierName
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
        <h1 className="add-product-heading"> Create GRN:</h1>
        <div style={{ display: "flex" }} className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 270, display: "flex" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Supplier
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={supplierName}
              label="suppliername"
              onChange={(e) => setSupplierName(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {supplierdata.map((item) => (
                <MenuItem key={item.name} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {!supplierName && error ? <span>Supplier is required.</span> : ""}
            </FormHelperText>
          </FormControl>
          <Box className="address-container">
            <b>Address:</b>
            <Typography>
              {supplierName
                ? `${selectedSupplierData?.address},${selectedSupplierData?.country},${selectedSupplierData?.state}, ${selectedSupplierData?.city},${selectedSupplierData?.pincode}`
                : ""}
            </Typography>
          </Box>
        </div>

        <div className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 210 }}>
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
          {/*  */}
          <TextField
            id="outlined-multiline-flexible"
            label="Invice no."
            placeholder="Invice Number:"
            multiline
            maxRows={4}
            type="number"
            value={invoiceno}
            onChange={(e) => setInvoiceno(e.target.value)}
            helperText={
              !invoiceno && error ? (
                <span style={{ color: "red" }}>Invoice no. is required</span>
              ) : (
                ""
              )
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
              <DatePicker
                label="Invoicedate"
                value={invoicedate}
                onChange={(newValue) => setInviocedate(newValue)}
              />
              <FormHelperText sx={{ color: "red" }}>
                {!invoicedate && error ? (
                  <span>Invoicedate is required.</span>
                ) : (
                  ""
                )}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>
          <TextField
            id="outlined-multiline-static"
            label="Po no."
            placeholder="Po Number:"
            multiline
            type="text"
            value={pono}
            onChange={(e) => setPoNo(e.target.value)}
            helperText={
              !pono && error ? (
                <span style={{ color: "red" }}>Po no. is required.</span>
              ) : (
                ""
              )
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
              <DatePicker
                label="Podate"
                value={podate}
                onChange={(newValue) => setPoDate(newValue)}
              />
              <FormHelperText sx={{ color: "red" }}>
                {!podate && error ? <span>podate is required.</span> : ""}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>
        </div>
        <div className="add-product-textfield">
          <TextField
            id="outlined-textarea"
            label="Transporter Name"
            placeholder="Transporter Name:"
            multiline
            type="text"
            value={transportername}
            onChange={(e) => setTransportername(e.target.value)}
            helperText={
              !transportername && error ? (
                <span style={{ color: "red", width: "max-content" }}>
                  Transporter name is required.
                </span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Contact no."
            placeholder="Contact Number:"
            multiline
            type="text"
            value={contactno}
            onChange={(e) => setContactno(e.target.value)}
            helperText={
              !contactno && error ? (
                <span style={{ color: "red" }}>contactno. is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Vehicleno"
            placeholder="Vehicle Number:"
            multiline
            type="text"
            value={vehicleno}
            onChange={(e) => setVehicleno(e.target.value)}
            helperText={
              !vehicleno && error ? (
                <span style={{ color: "red" }}>Vehicleno. is required.</span>
              ) : (
                ""
              )
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Ewaybillno."
            placeholder="Ewaybill Number:"
            multiline
            type="text"
            value={ewaybillno}
            onChange={(e) => setEwaybillno(e.target.value)}
            helperText={
              !ewaybillno && error ? (
                <span style={{ color: "red" }}>Ewaybillno. is required.</span>
              ) : (
                ""
              )
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
              <DatePicker
                label="Ewaybill date"
                value={ewaybilldate}
                onChange={(newValue) => setEwaybilldate(newValue)}
              />
              <FormHelperText sx={{ color: "red" }}>
                {!ewaybilldate && error ? (
                  <span>ewaybilldate is required.</span>
                ) : (
                  ""
                )}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>
        </div>
        <div className="add-product-textfield">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
              <DatePicker
                label="Reciptdate"
                value={reciptdate}
                onChange={(newValue) => setReciptdate(newValue)}
              />
              <FormHelperText sx={{ color: "red" }}>
                {!reciptdate && error ? (
                  <span>reciptdate is required.</span>
                ) : (
                  ""
                )}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl>
              <DatePicker
                label="Expirydate"
                value={expirydate}
                onChange={(newValue) => setExpirydate(newValue)}
              />
              <FormHelperText sx={{ color: "red" }}>
                {!expirydate && error ? (
                  <span>expirydate is required.</span>
                ) : (
                  ""
                )}
              </FormHelperText>
            </FormControl>
          </LocalizationProvider>

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
              <Table sx={{ minWidth: 650 }}>
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
                    <TableCell align="center">
                      <b> Receiving Store</b>
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
                      <TableCell align="center">
                        {data?.receivingstoreName}
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
