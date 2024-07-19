const express = require("express");
const cors = require("cors");
require("./config/mongoose");
const Product = require("./models/Product");
const Contractor = require("./models/Contractor");
const Suppliers = require("./models/Suppliers");
const Company = require("./models/Company");
const Companystore = require("./models/CompanyStore");
const Contractorstore = require("./models/Contractorstore");
const Material = require("./models/Material");
const CreateGRN = require("./models/stockLedgerDetails");
const GRNMaterialList = require("./models/stockLedgers");
const CreateMRF = require("./models/RequestDetails");
const MRFMaterialList = require("./models/Request");
const app = express();
app.use(express.json());
app.use(cors());
// signup api
const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);
// Product Api

app.post("/add-project", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

//Product Api

app.get("/project", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product found" });
  }
});

//Delete Api

app.delete("/project/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// app.get("/", (req, resp) => {
//   resp.send("app is working....");
// });

//Add-Contractor Api
app.post("/add-contractor", async (req, resp) => {
  let contractor = new Contractor(req.body);
  let result = await contractor.save();
  resp.send(result);
});

//Contractor Api

app.get("/contractor", async (req, resp) => {
  let contractor = await Contractor.find();
  if (contractor.length > 0) {
    resp.send(contractor);
  } else {
    resp.send({ result: "No Contractor found" });
  }
});
//Delete Contractor

app.delete("/contractor/:id", async (req, resp) => {
  let result = await Contractor.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//add-suppliers api
app.post("/add-suppliers", async (req, resp) => {
  let suppliers = new Suppliers(req.body);
  let result = await suppliers.save();
  resp.send(result);
});

//suppliers api
app.get("/suppliers", async (req, resp) => {
  let suppliers = await Suppliers.find();
  if (suppliers.length > 0) {
    resp.send(suppliers);
  } else {
    resp.send({ result: "No Contractor found" });
  }
});
//delete suppliers api

app.delete("/suppliers/:id", async (req, resp) => {
  let result = await Suppliers.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//add-company api
app.post("/add-company", async (req, resp) => {
  let company = new Company(req.body);
  let result = await company.save();
  resp.send(result);
});

//company api
app.get("/company", async (req, resp) => {
  let company = await Company.find();
  if (company.length > 0) {
    resp.send(company);
  } else {
    resp.send({ result: "No Company found" });
  }
});
//delete company api

app.delete("/company/:id", async (req, resp) => {
  let result = await Company.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//add-material api
app.post("/add-material", async (req, resp) => {
  let material = new Material(req.body);
  let result = await material.save();
  resp.send(result);
});

//material api
app.get("/material", async (req, resp) => {
  let material = await Material.find();
  if (material.length > 0) {
    resp.send(material);
  } else {
    resp.send({ result: "No material found" });
  }
});
//delete material api

app.delete("/material/:id", async (req, resp) => {
  let result = await Material.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//add-companystore api
app.post("/add-companystore", async (req, resp) => {
  let companystore = new Companystore(req.body);
  let result = await companystore.save();
  resp.send(result);
});

//companystore api
app.get("/companystore", async (req, resp) => {
  let companystore = await Companystore.find().populate("organizationId");
  if (companystore.length > 0) {
    resp.send(companystore);
  } else {
    resp.send({ result: "No companystore found" });
  }
});
//delete companystore api

app.delete("/companystore/:id", async (req, resp) => {
  let result = await Companystore.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//add-contractorstore api
app.post("/add-contractorstore", async (req, resp) => {
  let contractorstore = new Contractorstore(req.body);
  let result = await contractorstore.save();
  resp.send(result);
});

//contractorstore api
app.get("/contractorstore", async (req, resp) => {
  let contractorstore = await Contractorstore.find().populate("organizationId");
  if (contractorstore.length > 0) {
    resp.send(contractorstore);
  } else {
    resp.send({ result: "No contractorstore found" });
  }
});
//delete contractorstore api

app.delete("/contractorstore/:id", async (req, resp) => {
  let result = await Contractorstore.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// //add-materiallist api
// app.post("/add-materiallist", async (req, resp) => {
//   let materiallist = new Materiallist(req.body);
//   let result = await materiallist.save();
//   resp.send(result);
// });

// //materiallist api
// app.get("/materiallist", async (req, resp) => {
//   let materiallist = await Materiallist.find();
//   if (materiallist.length > 0) {
//     resp.send(materiallist);
//   } else {
//     resp.send({ result: "No materiallist found" });
//   }
// });
// //delete materiallist api

// app.delete("/materiallist/:id", async (req, resp) => {
//   let result = await Materiallist.deleteOne({ _id: req.params.id });
//   resp.send(result);
// });
// app.get("/materiallist/:id", async (req, resp) => {
//   let result = await Materiallist.findOne({ _id: req.params.id });
//   if (result) {
//     resp.send(result);
//   } else {
//     resp.send({ result: "No Record found" });
//   }
// });

//GRN
app.post("/add-grn", async (req, res) => {
  try {
    const grnData = { ...req.body, document_type: "GRN" };
    const newGRN = new CreateGRN(grnData);
    await newGRN.save();
    res.status(201).send(newGRN);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send({ error: error.message });
  }
});

app.post("/add-min", async (req, res) => {
  try {
    const minData = { ...req.body, document_type: "MIN" };
    const newMIN = new CreateGRN(minData);
    await newMIN.save();
    res.status(201).send(newMIN);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send({ error: error.message });
  }
});

app.get("/grn", async (req, resp) => {
  let grn = await CreateGRN.find({ document_type: "GRN" })
    .populate("created_by")
    .populate("projectname")
    .populate("supplierName");
  if (grn.length > 0) {
    resp.send(grn);
  } else {
    resp.send({ result: "No grn found" });
  }
});

//MRF
app.post("/add-mrf", async (req, resp) => {
  let mrf = new CreateMRF(req.body);
  let result = await mrf.save();
  resp.send(result);
});

app.get("/mrf", async (req, resp) => {
  let mrf = await CreateMRF.find()
    .populate("created_by")
    .populate("projectname")
    .populate("companyStoreName");

  if (mrf.length > 0) {
    resp.send(mrf);
  } else {
    resp.send({ result: "No grn found" });
  }
});
//
// app.post("/add-grn", async (req, resp) => {
//   let createGRN = new CreateGRN(req.body);

//   const transaction = new Transaction();

//   try {
//     let result = await createGRN.insertMany({ transction });
//     const { _id: transactionId } = result;

//     const { materialList: materialListFromBody } = req.body;

//     let materiallist = new MaterialList(
//       materialListFromBody.map((materialListItem) => ({
//         ...materialListItem,
//         uniquecode: transactionId,
//       }))
//     );

//     const materialSaveResult = await materiallist.save({ transaction });

//     transaction.commit();
//   } catch {
//     transaction.rollback();
//     resp.send({ message: "Error" });
//   }
//   resp.send({ result, materialSaveResult });
// });
//
//Add-GRNmateriallist Api
app.post("/add-GRNmateriallistdata", async (req, resp) => {
  let materiallist = GRNMaterialList.insertMany(req.body.stock_ledger);
  // let result = await materiallist.save();
  resp.send(materiallist);
});
// app.post("/add-MINmateriallistdata", async (req, resp) => {
//   let materiallist = GRNMaterialList.insertMany(req.body.stock_ledger);
//   // let result = await materiallist.save();
//   resp.send(materiallist);
// });
app.get("/GRNmateriallistdata", async (req, resp) => {
  let GRNmateriallistdata = await GRNMaterialList.find()
    .populate("stock_ledger_id")
    .populate("created_by")
    .populate("receivingstore");
  if (GRNmateriallistdata.length > 0) {
    resp.send(GRNmateriallistdata);
  } else {
    resp.send({ result: "No GRNmateriallistdata found" });
  }
});
//for stockledeger
// app.get("/stockledegerdata", async (req, resp) => {
//   try {
//     const { organization, projectname } = req.query;

//     // Initial query object
//     let query = { document_type: "GRN" };

//     // Add filters to the query object if they exist
//     if (organization) {
//       query["receivingstore.organizationId"] = organization;
//     }
//     if (projectname) {
//       query["stock_ledger_id.projectname"] = projectname;
//     }

//     let stockledegerdata = await GRNMaterialList.find(query)
//       .populate("stock_ledger_id")
//       .populate("created_by")
//       .populate("receivingstore");

//     if (stockledegerdata.length > 0) {
//       resp.status(200).send(stockledegerdata);
//     } else {
//       resp.status(404).send({ result: "No stockledegerdata found" });
//     }
//   } catch (error) {
//     console.error("Error fetching GRN material list data:", error);
//     resp.status(500).send({ error: "Internal Server Error" });
//   }
// });

//Add-MRFmateriallist Api
app.post("/add-MRFmateriallistdata", async (req, resp) => {
  let materiallist = MRFMaterialList.insertMany(req.body.request);
  // let result = await materiallist.save();
  resp.send(materiallist);
});

app.get("/MRFmateriallistdata", async (req, resp) => {
  let MRFmateriallistdata = await MRFMaterialList.find();

  if (MRFmateriallistdata.length > 0) {
    resp.send(MRFmateriallistdata);
  } else {
    resp.send({ result: "No MRFmateriallistdata found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
