import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CategoryIcon from "@mui/icons-material/Category";

export const sideBarArr = [
  {
    name: "Masters",
    icon: <CategoryIcon />,
    key: "masters",
    children: [
      { name: "Projects", to: "/projects", key: "project" },
      { name: "Company", to: "/company", key: "comapny" },
      { name: "Contractor", to: "contractors", key: "contractor" },
      { name: "Supplier", to: "suppliers", key: "supplier" },
      { name: "Material", to: "material", key: "material" },
    ],
  },
  {
    name: "Stores",
    icon: <StoreIcon />,
    key: "stores",
    children: [
      { name: "CompanyStore", to: "/company-stores", key: "company_store" },
      {
        name: "ContractorStore",
        to: "/contractor-stores",
        key: "contractor_Store",
      },
    ],
  },
  {
    name: "Transactions",
    icon: <ReceiptIcon />,
    key: "transactions",
    children: [
      {
        name: "Goods Recive Note(GRN)",
        key: "goods_recive_note",
        children: [
          { name: "Create GRN", to: "/create-grn", key: "create_grn" },
          { name: "GRN Recipt", to: "/grn-recipt", key: "grn_recipt" },
          { name: "Cancel GRN", to: "/create-grn", key: "cancel_grn" },
        ],
      },
      {
        name: "Material Requisition Form(MRF)",
        key: "material_reqisition_form",
        children: [
          { name: "Create MRF", to: "/create-mrf", key: "create_mrf" },
          { name: "MRF Recipt", to: "/mrf-recipt", key: "mrf_recipt" },
          { name: "Cancel MRF", to: "/create-mrf", key: "cancel_mrf" },
        ],
      },
      {
        name: "Material Isue Form(MIN)",
        key: "material_isue_from",
        children: [
          { name: "Create MIN", to: "/create-min", key: "create_min" },
          { name: "MIN Recipt", to: "/min-recipt", key: "min_recipt" },
          { name: "Cancel MIN", to: "/create-min", key: "cancel_min" },
        ],
      },
    ],
  },
  {
    name: "Stockledger",
    icon: <ShowChartIcon />,
    key: "masters",
    children: [
      {
        name: "Stocklegder List",
        to: "/stock-ledger",
        key: "stockledger_list",
      },
    ],
  },
];
