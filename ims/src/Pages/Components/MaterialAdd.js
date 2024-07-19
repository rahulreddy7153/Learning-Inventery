import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function MaterialAdd({
  materialListData,
  setMaterialListData,
  setEditMaterial,
  editMaterial,
  SethandleAdd,

  showReceivingStore = true,
  showRate_TaxAndValue = true, // Default to true if not provided
}) {
  const [materiallist, setMateriallist] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [receivingstore, setReceivingStore] = useState("");
  const [quantity, setQuantity] = useState("");
  const [uom, setUom] = useState("");
  const [rate, setRate] = useState("");
  const [tax, setTax] = useState("");
  const [value, setValue] = useState("");
  const [materialdata, setMaterialdata] = useState([]);
  const [companystore, setCompanystore] = useState([]);

  // const [grnData, SetGRNdata] = useState([]);
  const [error, setError] = useState(false);
  //
  const commonStyles = {
    m: 1,
    minWidth: 270, // Adjust the width as needed
  };
  const ModifiedStyles = {
    m: 1,
    minWidth: 300, // Adjust the width as needed
  };
  const NameCodeStyle =
    showReceivingStore && showRate_TaxAndValue ? commonStyles : ModifiedStyles;
  const clearform = () => {
    setMateriallist("");
    setCode("");
    setName("");
    setReceivingStore("");
    setQuantity("");
    setUom("");
    setRate("");
    setTax("");
    setValue("");
  };
  //
  const receivingstoreName = companystore.find(
    (item) => item._id === receivingstore
  )?.name;
  //
  const AddOrUpdate = (material) => {
    const existingMaterial = materialListData.find(
      (item) => item.code === material.code && item.name === material.name
    );
    if (editMaterial) {
      setMaterialListData(
        materialListData.map((item) =>
          item.id === editMaterial.id ? material : item
        )
      );
      setEditMaterial(null);
    } else {
      if (existingMaterial) {
        setMaterialListData(
          materialListData.map((item) =>
            item.id === existingMaterial.id ? material : item
          )
        );
      } else {
        setMaterialListData([
          ...materialListData,
          { ...material, id: Date.now() },
        ]);
      }
    }
  };
  useEffect(() => {
    if (editMaterial) {
      setMateriallist(editMaterial.code + editMaterial.name);
      setCode(editMaterial.code);
      setName(editMaterial.name);
      setReceivingStore(editMaterial.receivingstore);
      setQuantity(editMaterial.quantity);
      setUom(editMaterial.uom);
      setRate(editMaterial.rate);
      setTax(editMaterial.tax);
      setValue(editMaterial.value);
    } else {
      clearform();
    }
  }, [editMaterial]);

  useEffect(() => {
    getMaterial();
    getCompanystore();
  }, []);

  const getMaterial = async () => {
    let result = await fetch("http://localhost:5000/material");
    result = await result.json();
    setMaterialdata(result.reverse());
  };

  const getCompanystore = async () => {
    let result = await fetch("http://localhost:5000/companystore");
    result = await result.json();
    setCompanystore(result.reverse());
  };

  // const getQuantityInStock = getQuantityInStockData.map(
  //   (item) => item.quantity
  // );

  // const totalQuantityInStock = getQuantityInStock.reduce(
  //   (accumulator, currentValue) => +accumulator + +currentValue,
  //   0
  // );

  // console.log("ftfc0", totalQuantityInStock);

  useEffect(() => {
    const selectMaterialData = materialdata.find(
      (data) => data.code + data.name === materiallist
    );
    if (selectMaterialData) {
      setCode(selectMaterialData.code);
      setName(selectMaterialData.name);
      setUom(selectMaterialData.measurement);
    }
    const computedValue = quantity * rate;
    setValue(computedValue);
  }, [materialdata, materiallist, quantity, rate]);

  const handleAddOrUpdate = () => {
    // Define a validation object to dynamically check required fields
    const requiredFields = {
      materiallist,
      code,
      name,
      receivingstore: showReceivingStore ? receivingstore : true,
      quantity,
      uom,
      rate: showRate_TaxAndValue ? rate : true,
      tax: showRate_TaxAndValue ? tax : true,
      value: showRate_TaxAndValue ? value : true,
    };

    // Check if any required field is empty
    const hasEmptyField = Object.values(requiredFields).some(
      (field) => field === "" || field === undefined
    );

    if (hasEmptyField) {
      setError(true);
      return;
    } else {
      clearform();
      SethandleAdd(true);
      setError(false);
    }

    AddOrUpdate({
      materiallist,
      code,
      name,
      receivingstore,
      receivingstoreName,
      quantity,
      uom,
      rate,
      tax,
      value,
      id: editMaterial ? editMaterial.id : undefined,
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 className="add-product-heading" style={{ padding: "10px" }}>
          Material:
        </h1>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Material List
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={materiallist}
            onChange={(e) => setMateriallist(e.target.value)}
            label="materialname"
            sx={{ height: 60 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {materialdata.map((material) => (
              <MenuItem
                key={material._id}
                value={`${material.code}${material.name}`}
              >
                {material.code + material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          sx={NameCodeStyle}
          id="outlined-multiline-static"
          label="Code"
          placeholder="Code"
          multiline
          type="text"
          value={code}
          readOnly
        />
        <TextField
          sx={NameCodeStyle}
          id="outlined-multiline-static"
          label="Name"
          multiline
          type="text"
          value={name}
          readOnly
        />

        {showReceivingStore && (
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Receiving Store
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={receivingstore}
              label="receivingstore"
              onChange={(e) => setReceivingStore(e.target.value)}
              sx={{ height: 60 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {companystore.map((data) => (
                <MenuItem key={data._id} value={data._id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <div>
        <TextField
          sx={ModifiedStyles}
          id="outlined-multiline-static"
          label="Quantity"
          placeholder="Quantity:"
          multiline
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <TextField
          sx={ModifiedStyles}
          id="outlined-multiline-static"
          label="UOM"
          placeholder="UOM:"
          multiline
          type="text"
          value={uom}
          readOnly
        />
        {showRate_TaxAndValue && (
          <>
            <TextField
              sx={{ m: 1, minWidth: 50 }}
              id="outlined-multiline-static"
              label="Rate%"
              placeholder="Rate%"
              multiline
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <TextField
              sx={{ m: 1, minWidth: 50 }}
              id="outlined-multiline-static"
              label="Tax"
              placeholder="Tax:"
              multiline
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
            <TextField
              sx={{ m: 1, minWidth: 50 }}
              id="outlined-multiline-static"
              label="Value"
              placeholder="Value:"
              multiline
              type="number"
              value={value}
              readOnly
            />
          </>
        )}
        {error ? ( // Display error message only if there's an error
          <span style={{ color: "red", fontSize: "16px" }}>
            Please fill all required fields:
          </span>
        ) : (
          "" // Empty string if no errors and validation passes
        )}
        <Button
          style={{
            backgroundColor: "#2f4050",
            color: "aliceblue",
            marginLeft: "auto",
            marginTop: "20px",
            width: "100px",
            marginBottom: "10px",
          }}
          onClick={handleAddOrUpdate}
        >
          {editMaterial ? "Update" : "Add"}
        </Button>
      </div>
      <br /> <br /> <br />
    </div>
  );
}

export default MaterialAdd;
