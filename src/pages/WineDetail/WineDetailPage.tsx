import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useHistory, useParams } from "react-router-dom";
// styles
import "./WineDetailPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import Switch from "@mui/material/Switch";
import { getScore } from "../../functions";

export const WineDetailPage = () => {
  const history = useHistory();
  const params = useParams<{ wineId: string }>();
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingValues, setIsLoadingValues] = useState<boolean>(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);
  const [activeVzorka, setActiveVzorka] = useState<any>();
  const loggedUser = useRef<any>();
  const [users, setUsers] = useState<any[]>([]);
  const [activeRow, setActiveRow] = useState<string>();
  const [ratingValues, setRatingValues] = useState<any>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/configuration/all")
      .then((response) => {
        setRatingValues(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/wines/wines/userId/${localStorage.getItem(
          "loggedUserId"
        )}`
      )
      .then((response) => {
        loggedUser.current = response.data;
      })
      .catch((err) => console.log(err))
      .finally(() =>
        axios
          .get(
            `http://localhost:4000/wines/wines/users/${loggedUser.current?.prava}`
          )
          .then((response) => {
            if (loggedUser.current.prava === "2") {
              const usersKomisia = response.data.filter(
                (user: any) => user.komisia === loggedUser.current.komisia
              );
              setUsers(usersKomisia);
              setActiveRow(usersKomisia[0]._id);
            } else {
              setUsers(response.data);
              setActiveRow(response.data[0]._id);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoadingUsers(false))
      );
  }, []);

  useEffect(() => {
    setIsLoadingValues(true);

    axios
      .get(
        `http://localhost:4000/wines/wines/rating/${params.wineId}/${activeRow}`
      )
      .then((response) => {
        setDefaultValues(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsLoadingValues(false);
      });
  }, [activeRow]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/one/${params.wineId}`)
      .then((response) => {
        if (!!response.data) {
          setActiveVzorka(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePotvrdenieKomisie = (value: boolean) => {
    axios
      .post(`http://localhost:4000/wines/wines/one/${params.wineId}`, {
        potvrdenie: value,
      })
      .catch((err) => console.log(err));
  };

  const handlePotvrdenieHodnotenia = (value: boolean) => {
    axios.post(
      `http://localhost:4000/wines/wines/rating/update/${defaultValues._id}/${activeRow}`,
      { potvrdene: value }
    );
  };

  const handleDeleteDetail = () => {
    axios
      .post(`http://localhost:4000/wines/wines/delete/${params.wineId}`)
      .catch((err) => console.log(err));
  };

  const handleDeleteRating = () => {
    axios
      .post(`http://localhost:4000/wines/wines/rating/delete/${params.wineId}`)
      .catch((err) => console.log(err));
  };

  const attributesVzhlad = useMemo(
    () => [
      {
        name: "Čírosť",
        value: ratingValues[defaultValues?.cirost] ?? "N/A",
        notes: defaultValues?.cirostNotes ?? "N/A",
      },
      {
        name: "Farba",
        value: ratingValues[defaultValues?.farba] ?? "N/A",
        notes: defaultValues?.farbaNotes ?? "N/A",
      },
    ],
    [defaultValues]
  );

  const attributesVona = useMemo(
    () => [
      {
        name: "Intenzita",
        value: ratingValues[defaultValues?.intenzita] ?? "N/A",
        notes: defaultValues?.intenzitaNotes ?? "N/A",
      },
      {
        name: "Čistota",
        value: ratingValues[defaultValues?.cistota] ?? "N/A",
        notes: defaultValues?.cistotaNotes ?? "N/A",
      },
      {
        name: "Harmónia",
        value: ratingValues[defaultValues?.harmonia] ?? "N/A",
        notes: defaultValues?.harmoniaNotes ?? "N/A",
      },
    ],
    [defaultValues]
  );

  const attributesChut = useMemo(
    () => [
      {
        name: "Intenzita",
        value: ratingValues[defaultValues?.intenzitaChut] ?? "N/A",
        notes: defaultValues?.intenzitaChutNotes ?? "N/A",
      },
      {
        name: "Čistota",
        value: ratingValues[defaultValues?.cistotaChut] ?? "N/A",
        notes: defaultValues?.cistotaChutNotes ?? "N/A",
      },
      {
        name: "Harmónia",
        value: ratingValues[defaultValues?.harmoniaChut] ?? "N/A",
        notes: defaultValues?.harmoniaChutNotes ?? "N/A",
      },
      {
        name: "Perzistencia",
        value: ratingValues[defaultValues?.perzistencia] ?? "N/A",
        notes: defaultValues?.perzistenciaNotes ?? "N/A",
      },
    ],
    [defaultValues]
  );

  const tabs = [
    { label: "Zoznam vín", onClick: () => history.push("/") },
    {
      label: "Upraviť hodnotenie",
      onClick: () => history.push(`/wines/rate/${params.wineId}/${activeRow}`),
    },
  ];

  if (loggedUser.current?.prava !== "3") {
    tabs.push(
      {
        label: "Pridať vzorku",
        onClick: () => history.push("/wines/create"),
      },
      {
        label: "Odstrániť vzorku",
        onClick: () => {
          handleDeleteRating();
          handleDeleteDetail();
          history.push("/");
        },
      }
    );
  }

  return (
    <>
      <Tabs activeTab={false} tabs={tabs} />

      {!isLoading && !isLoadingUsers && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: "1 1 auto",
          }}
        >
          {loggedUser.current?.prava !== "3" && (
            <Card className="card">
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
                    defaultValue={users[0]?._id}
                    onChange={(e) => setActiveRow(e.target.value)}
                  >
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user?.meno && user?.priezvisko
                          ? `${user?.meno} ${user?.priezvisko}`
                          : user?.email}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            </Card>
          )}

          {!isLoadingValues && (
            <Card className="card">
              <div className="cardHeader">
                <h1 className="cardTitle">{activeVzorka?.vzorka}</h1>

                <div className="cardTitleRatingWrapper">
                  <p className="cardTitleRating">Hodnotenie vzorky</p>

                  <h1 className="cardTitleRating">
                    {String(getScore(defaultValues, ratingValues)) !== "NaN"
                      ? getScore(defaultValues, ratingValues)
                      : "N/A"}
                  </h1>
                </div>
              </div>
              <div className="cardContent">
                <AttributesSection
                  name="Vzhľad"
                  attributes={attributesVzhlad}
                />
                <AttributesSection name="Vôňa" attributes={attributesVona} />
                <AttributesSection name="Chuť" attributes={attributesChut} />
              </div>
            </Card>
          )}

          {(!isLoadingValues || loggedUser.current?.prava !== "3") && (
            <Card className="card">
              <div className="cardHeader">
                <h1 className="cardTitle">Potvrdenie hodnotenia vzorky</h1>
              </div>

              <div
                className="cardContent"
                style={{
                  padding: "20px 0",
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  Potvrdit hodnotenie pre celu komisiu
                  <Switch
                    defaultChecked={activeVzorka?.potvrdene}
                    onChange={(val) =>
                      handlePotvrdenieKomisie(val.target.checked)
                    }
                  />
                </div>

                <div>
                  Potvrdit hodnotenie pre daneho pouzivatela
                  <Switch
                    disabled={
                      String(getScore(defaultValues, ratingValues)) === "NaN"
                    }
                    defaultChecked={defaultValues?.potvrdene}
                    onChange={(val) =>
                      handlePotvrdenieHodnotenia(val.target.checked)
                    }
                  />
                </div>
              </div>
            </Card>
          )}
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
