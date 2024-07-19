import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

export default function StockLedger() {
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
  const [companyData, setCompanydata] = React.useState([]);
  const [organizationType, setOrgnizationType] = React.useState("");
  const [projectname, setprojectname] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [contractor, Setcontractor] = React.useState([]);
  const [handleProceed, setHandleProceed] = React.useState(false);
  const getcompanyStore = async () => {
    let result = await fetch("http://localhost:5000/company");
    result = await result.json();
    setCompanydata(result.reverse());
  };

  //api call

  const getContractor = async () => {
    let result = await fetch("http://localhost:5000/contractor");
    result = await result.json();
    Setcontractor(result.reverse());
  };
  const getproject = async () => {
    let result = await fetch("http://localhost:5000/project");
    result = await result.json();
    Setprojectdata(result.reverse());
  };

  const [stockLedgerData, setStockLedgerData] = React.useState([]);
  async function getGRNmateriallistdata() {
    try {
      let response = await fetch("http://localhost:5000/GRNmateriallistdata");
      let result = await response.json();

      setStockLedgerData(result);
    } catch (error) {
      console.error("Error fetching GRN material list data:", error);
    }
  }
  // console.log(stockLedgerData, "stockLedgerData");
  React.useEffect(() => {
    getGRNmateriallistdata();
  }, []);
  const filteredStockLadegerData = React.useMemo(() => {
    if (!stockLedgerData) return []; // Return an empty array if stockLedgerData is null
    if (!organization || !projectname) return stockLedgerData;
    return stockLedgerData.filter(
      (item) =>
        item?.receivingstore?.organizationId === organization &&
        item?.stock_ledger_id?.projectname === projectname
    );
  }, [stockLedgerData, organization, projectname]);

  React.useEffect(() => {
    getproject();
    getcompanyStore();
    getContractor();
  }, []);
  const calculateNetQuantity = (data) => {
    const netQuantities = {};

    data.forEach((item) => {
      const key = `${item.name}-${item.code}`;
      if (!netQuantities[key]) {
        netQuantities[key] = {
          name: item.name,
          code: item.code,
          quantity: 0,
          uom: item.uom,
        };
      }

      if (item.document_type === "GRN") {
        netQuantities[key].quantity += parseInt(item.quantity);
      } else if (item.document_type === "MIN") {
        netQuantities[key].quantity -= parseInt(item.quantity);
      }
    });

    return Object.values(netQuantities);
  };
  const netQuantities = React.useMemo(() => {
    return calculateNetQuantity(filteredStockLadegerData);
  }, [filteredStockLadegerData]);

  const Proceed = () => {
    setHandleProceed(true);
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
        <h1 className="add-product-heading"> StockLedger:</h1>
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
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Orgnization Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={organizationType}
              label="companyStoreName"
              onChange={(e) => setOrgnizationType(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Company">
                <em>Company</em>
              </MenuItem>
              <MenuItem value="Contractor">
                <em>Contractor</em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="add-product-textfield">
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Orgnization
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={organization}
              label="Orgnization"
              onChange={(e) => setOrganization(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {organizationType === "Company" &&
                companyData.map((item) => (
                  <MenuItem key={item.name} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              {organizationType === "Contractor" &&
                contractor.map((item) => (
                  <MenuItem key={item.name} value={item._id}>
                    {item.name}
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
            onClick={Proceed}
          >
            Proceed
          </Button>
        </div>
        <br />
        <br />
        <br />
        {handleProceed ? (
          <div>
            <TableContainer sx={{ backgroundColor: "#f7f7f7" }}>
              <div style={styles.container}>
                <h1 style={styles.heading}>Material List:</h1>
              </div>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>SNo.</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Material</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Code:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Total Quantity:</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>UOM</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {netQuantities.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">{data.code}</TableCell>
                      <TableCell align="center">{data.quantity}</TableCell>{" "}
                      <TableCell align="center">{data.uom}</TableCell>
                      <Button className="dotted-button">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </Button>{" "}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

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
