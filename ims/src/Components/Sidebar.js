import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { sideBarArr } from "./constant";
import { NavLink } from "react-router-dom";
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const repeatElement = (data) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          expanded={false}
        >
          <span style={{ paddingRight: "10px" }}> {data.icon}</span>
          {data.name}
        </AccordionSummary>
        <AccordionDetails>
          {data &&
            data?.children.length &&
            data?.children?.map((childData) => {
              if (childData?.children?.length) {
                return repeatElement(childData);
              } else {
                return (
                  <div>
                    <br />
                    <NavLink className="link" to={childData.to}>
                      {childData.name}
                    </NavLink>
                    <br />
                  </div>
                );
              }
            })}
        </AccordionDetails>
      </Accordion>
    );
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      {sideBarArr.map((data) => {
        return (
          <>
            {data.children && data.children.length ? (
              repeatElement(data)
            ) : (
              <div>{data.name}</div>
            )}
          </>
        );
      })}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: "white" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
