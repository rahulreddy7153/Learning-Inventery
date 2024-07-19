import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function MinMaterialAdd({
  materialListData,
  setMaterialListData,
  setEditMaterial,
  editMaterial,
  companyStoreName,
}) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [uom, setUom] = useState("");

  const [GRNmateriallistdata, SetGRNmateriallistdata] = useState([]);
  const [error, setError] = useState(false);

  const clearform = () => {
    setCode("");
    setName("");
    setQuantity("");
    setUom("");
  };
  useEffect(() => {
    grn_materiallistdata();
  }, []);

  const grn_materiallistdata = async () => {
    let result = await fetch("http://localhost:5000/GRNmateriallistdata");
    result = await result.json();
    SetGRNmateriallistdata(result.reverse());
  };

  const totalGrnQuantityInStock = GRNmateriallistdata.filter(
    (item) =>
      item.document_type === "GRN" &&
      item.receivingstore === companyStoreName &&
      item.name === name
  ).reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.quantity),
    0
  );

  const totalMinQuantityInStock = GRNmateriallistdata.filter(
    (item) => item.document_type === "MIN" && item.name === name
  ).reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.quantity),
    0
  );
  const totalValue = (GRN, MIN) => {
    if (MIN) {
      return Number(GRN) - Number(MIN);
    } else {
      return GRN;
    }
  };
  const totalvalue = totalValue(
    totalGrnQuantityInStock,
    totalMinQuantityInStock
  );
  const AddOrUpdate = (material) => {
    if (editMaterial) {
      setMaterialListData(
        materialListData.map((item) =>
          item._id === editMaterial._id
            ? { ...material, id: editMaterial.id }
            : item
        )
      );
      setEditMaterial(null);
    } else {
      setMaterialListData([
        ...materialListData,
        { ...material, id: Date.now() },
      ]);
    }
  };

  useEffect(() => {
    if (editMaterial) {
      setCode(editMaterial.code);
      setName(editMaterial.name);
      setQuantity(editMaterial.quantity);
      setUom(editMaterial.uom);
    } else {
      clearform();
    }
  }, [editMaterial]);

  const handleAddOrUpdate = () => {
    const requiredFields = {
      code,
      name,
      quantity,
      uom,
    };

    const hasEmptyField = Object.values(requiredFields).some(
      (field) => field === "" || field === undefined
    );

    if (hasEmptyField) {
      setError(true);
      return;
    } else {
      clearform();
      setError(false);
    }

    AddOrUpdate({
      code,
      name,
      quantity,
      uom,
      id: editMaterial ? editMaterial.id : undefined,
    });
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 className="add-product-heading" style={{ padding: "10px" }}>
          Material:
        </h1>
      </div>
      <div>
        <TextField
          sx={{
            m: 1,
            minWidth: 270,
          }}
          id="outlined-multiline-static"
          label="Code"
          placeholder="Code"
          multiline
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly
        />
        <TextField
          sx={{
            m: 1,
            minWidth: 270,
          }}
          id="outlined-multiline-static"
          label="Name"
          multiline
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly
        />
      </div>
      <div>
        <TextField
          sx={{
            m: 1,
            minWidth: 270,
          }}
          id="outlined-multiline-static"
          label="Quantity"
          placeholder="Quantity:"
          multiline
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <TextField
          sx={{
            m: 1,
            minWidth: 270,
          }}
          id="outlined-multiline-static"
          label="Quantity In Stock:"
          placeholder="Quantity In Stock:"
          multiline
          type="number"
          value={totalvalue}
          readOnly
        />

        <TextField
          sx={{
            m: 1,
            minWidth: 270,
          }}
          id="outlined-multiline-static"
          label="UOM"
          placeholder="UOM:"
          multiline
          type="text"
          value={uom}
          onChange={(e) => setUom(e.target.value)}
          readOnly
        />

        {error ? (
          <span style={{ color: "red", fontSize: "16px" }}>
            Please fill all required fields:
          </span>
        ) : (
          ""
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
          {editMaterial ? "Update" : "Update"}
        </Button>
      </div>
      <br /> <br /> <br />
    </div>
  );
}

export default MinMaterialAdd;
