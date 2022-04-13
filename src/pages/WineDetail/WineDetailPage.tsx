import React, { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useHistory, useParams } from "react-router-dom";
// styles
import "./WineDetailPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { LoggedInUserContext } from "../../App";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";

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

let attributesVzhlad: IAttributeProps[] = [];
let attributesVona: IAttributeProps[] = [];
let attributesChut: IAttributeProps[] = [];

export const WineDetailPage = () => {
  const loggedUser = useContext(LoggedInUserContext);
  const history = useHistory();
  const params = useParams<{ wineId: string }>();
  const [defaultValues, setDefaultValues] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const tabs = [{ label: "Zoznam vín", onClick: () => history.push("/") }];

  if (loggedUser.loggedInUser?.email !== "hodnotitel@mail.com") {
    tabs.push(
      {
        label: "Pridať vzorku",
        onClick: () => history.push("/wines/create"),
      },
      {
        label: "Upraviť hodnotenie",
        onClick: () => history.push(`/wines/rate/${params.wineId}`),
      },
      {
        label: "Odstránť vzorku",
        onClick: () => {
          handleDeleteRating();
          handleDeleteDetail();
          history.push("/");
        },
      }
    );
  }

  const handleDeleteRating = () => {
    axios
      .post(`http://localhost:4000/wines/wines/rating/delete/${params.wineId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteDetail = () => {
    axios
      .post(`http://localhost:4000/wines/wines/delete/${params.wineId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/rating/${params.wineId}`)
      .then((response) => {
        if (!!response.data) {
          setDefaultValues(response.data);
          console.log(response.data);
          // setIsRated(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  // testing data
  if (!isLoading) {
    attributesVzhlad = [
      {
        name: "Čírosť",
        value: defaultValues?.cirost ?? "N/A",
        notes: defaultValues?.cirostNotes ?? "N/A",
      },
      {
        name: "Farba",
        value: defaultValues?.farba ?? "N/A",
        notes: defaultValues?.farbaNotes ?? "N/A",
      },
    ];

    attributesVona = [
      {
        name: "Intenzita",
        value: defaultValues?.intenzita ?? "N/A",
        notes: defaultValues?.intenzitaNotes ?? "N/A",
      },
      {
        name: "Čistota",
        value: defaultValues?.cistota ?? "N/A",
        notes: defaultValues?.cistotaNotes ?? "N/A",
      },
      {
        name: "Harmónia",
        value: defaultValues?.harmonia ?? "N/A",
        notes: defaultValues?.harmoniaNotes ?? "N/A",
      },
    ];

    attributesChut = [
      {
        name: "Intenzita",
        value: defaultValues?.intenzitaChut ?? "N/A",
        notes: defaultValues?.intenzitaChutNotes ?? "N/A",
      },
      {
        name: "Čistota",
        value: defaultValues?.cistotaChut ?? "N/A",
        notes: defaultValues?.cistotaChutNotes ?? "N/A",
      },
      {
        name: "Harmónia",
        value: defaultValues?.harmoniaChut ?? "N/A",
        notes: defaultValues?.harmoniaChutNotes ?? "N/A",
      },
      {
        name: "Perzistencia",
        value: defaultValues?.perzistencia ?? "N/A",
        notes: defaultValues?.perzistenciaNotes ?? "N/A",
      },
    ];
  }

  return (
    <>
      <Tabs activeTab={false} tabs={tabs} />

      {!isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            columnGap: "20px",
            flex: "1 1 auto",
          }}
        >
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
                  defaultValue="7"
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
              <h1 className="cardTitle">{params.wineId}</h1>

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
      )}
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
