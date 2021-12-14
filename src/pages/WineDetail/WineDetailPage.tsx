import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useHistory } from "react-router-dom";
// styles
import "./WineDetailPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { LoggedInUserContext } from "../../App";
import { TextField, MenuItem } from "@mui/material";

// testing data
const attributesVzhlad: IAttributeProps[] = [
  {
    name: "Čírosť",
    value: 5,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Farba",
    value: 1,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const attributesVona: IAttributeProps[] = [
  {
    name: "Intenzita",
    value: 5,
  },
  {
    name: "Čistota",
    value: 1,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.",
  },
  {
    name: "Harmónia",
    value: 1,
  },
];

const attributesChut: IAttributeProps[] = [
  {
    name: "Čistota",
    value: 1,
  },
  {
    name: "Harmónia",
    value: 1,
    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "Perzistencia",
    value: 5,
  },
];

// let rows: GridRowsProp = [
//   {
//     id: 1,
//     name: "User Admin",
//     prava: "Admin",
//     komisia: "-",
//   },
//   {
//     id: 2,
//     name: "User Prezident",
//     prava: "Prezident výstavy",
//     komisia: "Komisia 2",
//   },
//   {
//     id: 3,
//     name: "User Predseda",
//     prava: "Prezident výstavy",
//     komisia: "Komisia 3",
//   },
//   {
//     id: 4,
//     name: "User Hodnotiteľ 1",
//     prava: "Hodnotiteľ",
//     komisia: "Komisia 3",
//   },
//   {
//     id: 5,
//     name: "User Hodnotiteľ 2",
//     prava: "Hodnotiteľ",
//     komisia: "Komisia 3",
//   },
//   {
//     id: 6,
//     name: "User Hodnotiteľ 3",
//     prava: "Hodnotiteľ",
//     komisia: "Komisia 3",
//   },
//   {
//     id: 7,
//     name: "User Hodnotiteľ 4",
//     prava: "Hodnotiteľ",
//     komisia: "Komisia 3",
//   },
// ];

// // Test data
// const columns: GridColDef[] = [
//   {
//     field: "id",
//     headerName: "ID",
//     hide: true,
//     flex: 0.5,
//     align: "center",
//     headerAlign: "center",
//     minWidth: 50,
//   },
//   { field: "name", headerName: "Name", flex: 2.5, minWidth: 250 },
//   {
//     field: "prava",
//     headerName: "Práva",
//     flex: 1.5,
//     minWidth: 150,
//   },
//   {
//     field: "komisia",
//     headerName: "Komisia",
//     flex: 1.5,
//     align: "center",
//     minWidth: 150,
//   },
// ];

export const WineDetailPage = () => {
  const loggedUser = useContext(LoggedInUserContext);
  const history = useHistory();
  // const params = useParams<{ wineId: string }>();
  // const screenHeight = window.innerHeight - BOTTOM_PADDING;
  // const [hodnotenieVal, setHodnotenieVal] = useState<any>("celkove");

  // const rowsFiltered = useMemo(() => {
  //   switch (loggedUser.loggedInUser?.email) {
  //     case "hodnotitel@mail.com":
  //       return rows.filter((i) => i.name === "User Hodnotiteľ 1");
  //     case "prezident@mail.com":
  //       return rows.filter((i) => i.name !== "User Admin");
  //     case "predseda@mail.com":
  //       return rows.filter((i) => i.komisia === "Komisia 3");
  //     default:
  //       return rows;
  //   }
  // }, [loggedUser.loggedInUser?.email]);

  const [activeRow, setActiveRow] = useState<string>("hodnotitel-1");

  useEffect(() => {
    if (loggedUser.loggedInUser?.email === "admin@mail.com") {
      setActiveRow("10");
    } else if (loggedUser.loggedInUser?.email === "prezident@mail.com") {
      setActiveRow("12");
    } else if (loggedUser.loggedInUser?.email === "predseda@mail.com") {
      setActiveRow("8");
    } else {
      setActiveRow("11");
    }
  }, [loggedUser.loggedInUser?.email]);

  // const rowCount = rowsFiltered.reduce((val) => {
  //   return val + 1;
  // }, 0);

  // const tableHeight =
  //   (rowCount + 1.5) * ROW_HEIGHT > screenHeight
  //     ? screenHeight - 30
  //     : (rowCount + 1.5) * ROW_HEIGHT;

  const tabs = [{ label: "Zoznam vín", onClick: () => history.push("/") }];

  if (loggedUser.loggedInUser?.email !== "hodnotitel@mail.com") {
    tabs.push(
      {
        label: "Pridať vzorku",
        onClick: () => history.push("/wines/create"),
      },
      {
        label: "Upraviť hodnotenie",
        onClick: () => history.push(`/wines/rate/${activeRow}`), //TODO
      },
      {
        label: "Odstránť vzorku",
        onClick: () => history.push("/"), //TODO
      }
    );
  }

  return (
    <>
      <Tabs activeTab={false} tabs={tabs} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          columnGap: "20px",
        }}
      >
        {/* <Card className="card firstColumn" style={{ maxHeight: tableHeight }}>
          <div className="cardHeader">
            <h1 className="cardTitle">Zoznam hodnotitelov</h1>
          </div>

          <div style={{ height: tableHeight - 25, width: "100%" }}>
            <DataGrid
              // disableVirtualization //TODO: check with larger data
              className="tableGrid firstColTable"
              style={{ boxShadow: "none" }}
              hideFooter
              headerHeight={0}
              rows={rowsFiltered}
              columns={columns}
              onCellClick={undefined}
              onRowClick={({ id }) => {
                setActiveRow(id);
                history.push(`/wines/detail/${id}`);
              }}
              selectionModel={activeRow}
            />
          </div>
        </Card> */}

        <Card className="card" style={{ marginBottom: "15px" }}>
          <div className="cardHeader">
            <h1 className="cardTitle">Vyberte hodnotiteľa</h1>
          </div>

          <div className="cardContent">
            <div
              className="inputWrapper"
              style={{ width: "100%", display: "unset" }}
            >
              <TextField
                select
                required
                className="inputInfo"
                id="hodnotitel"
                label="Hodnotiteľ"
                name="hodnotitel"
                defaultValue="10"
                onChange={(e) => setActiveRow(e.target.value)}
              >
                {loggedUser.loggedInUser?.email === "admin@mail.com" && (
                  <MenuItem key={"admin"} value={"10"}>
                    Admin
                  </MenuItem>
                )}
                {loggedUser.loggedInUser?.email !== "predseda@mail.com" && (
                  <MenuItem key={"prezident"} value={"12"}>
                    Prezident výstavy
                  </MenuItem>
                )}
                {loggedUser.loggedInUser?.email !== "hodnotitel@mail.com" && (
                  <MenuItem key={"predseda"} value={"8"}>
                    Predseda komisie
                  </MenuItem>
                )}
                <MenuItem key={"hodnotitel-1"} value={"11"}>
                  Hodnotiteľ 1
                </MenuItem>
                <MenuItem key={"hodnotitel-2"} value={"13"}>
                  Hodnotiteľ 2
                </MenuItem>
                <MenuItem key={"hodnotitel-3"} value={"14"}>
                  Hodnotiteľ 3
                </MenuItem>
                <MenuItem key={"hodnotitel-4"} value={"7"}>
                  Hodnotiteľ 4
                </MenuItem>
              </TextField>
            </div>
          </div>
        </Card>

        <Card className="card">
          <div className="cardHeader">
            <h1 className="cardTitle">Name of the wine</h1>

            <div className="cardTitleRatingWrapper">
              <p className="cardTitleRating">celkové hodnotenie</p>

              <h1 className="cardTitleRating">{activeRow}</h1>
            </div>
          </div>
          <div className="cardContent">
            <AttributesSection name="Vzhľad" attributes={attributesVzhlad} />
            <AttributesSection name="Vôňa" attributes={attributesVona} />
            <AttributesSection name="Chuť" attributes={attributesChut} />
          </div>
        </Card>
      </div>
    </>
  );
};

interface IAttributeProps {
  name: string;
  value: number;
  notes?: string;
}

interface IAttributesSectionProps {
  /**
   * Name of the attributes group
   */
  name: string;
  /**
   * Attributes array with values
   */
  attributes: IAttributeProps[];
}

const AttributesSection = ({ name, attributes }: IAttributesSectionProps) => {
  return (
    <div className="attributeSection">
      <div className="attributeSectionWrapper">
        <div className="attributesGroupNameWrapper">
          <span className="attributesGroupName">{name}</span>
          <span className="attributesGroupName attributesGroupNote">
            Poznámky
          </span>
        </div>

        {attributes.map(({ name, notes, value }) => (
          <div key={name} className="attributeWrapper">
            <div className="attributeValuesSection">
              <div className="attributeName">{name}</div>
              <div className="attributeValue">{value}</div>
            </div>

            <div className="attributeNotesSection">
              <div className="attributeNotes">{notes || "N/A"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
