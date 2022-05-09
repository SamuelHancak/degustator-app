import React, { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ConfigurationHodnotitelPage = () => {
  const history = useHistory();
  const [hodnotitelia, setHodnotitelia] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingValues, setIsLoadingValues] = useState<boolean>(true);
  const [komisie, setKomisie] = useState<any[]>([]);
  const [prava, setPrava] = useState<any[]>([]);
  const [createForm, setCreateForm] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/wines/users/exact/3")
      .then((response) => {
        setHodnotitelia(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [initialValues]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/wines/komisia/all")
      .then((response) => {
        setKomisie(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/wines/prava/all")
      .then((response) => {
        setPrava(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleHodnotitelSelect = (id: string) => {
    if (id === "create") {
      setIsLoadingValues(true);
      setInitialValues({});
      setCreateForm(true);
      setTimeout(() => setIsLoadingValues(false), 1);
    } else {
      setIsLoadingValues(true);
      axios
        .get(`http://localhost:4000/wines/wines/userId/${id}`)
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoadingValues(false);
          setCreateForm(false);
        });
    }
  };

  const handleHodnotitelUpdate = (values: any) => {
    if (createForm) {
      handleHodnotitelCreate(values);
    } else {
      axios
        .post(`http://localhost:4000/wines/wines/user/${initialValues._id}`, {
          ...values,
          prava: prava.find((e) => e._id === values.pravaId)?.kod,
        })
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoadingValues(true);
          handleHodnotitelSelect(initialValues._id);
        });
    }
  };

  const handleHodnotitelCreate = (values: any) => {
    axios
      .post(`http://localhost:4000/wines/wines/user`, {
        ...values,
        heslo: "heslo", //TODO
        prava: prava.find((e) => e._id === values.pravaId)?.kod,
      })
      .then((response) => {
        setInitialValues(response.data);
        handleHodnotitelSelect(response.data._id);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingValues(false);
      });
  };

  const validationSchema = Yup.object({
    meno: Yup.string(),
    priezvisko: Yup.string(),
    pravaId: Yup.string().required("Pole musí byť vyplnené!"),
    komisia: Yup.string().required("Pole musí byť vyplnené!"),
    email: Yup.string().required("Pole musí byť vyplnené!"),
    telefon: Yup.string(),
  });

  return (
    <>
      <Tabs
        activeTab={2}
        tabs={[
          {
            label: "Konfigurácia hodnotenia",
            onClick: () => history.push("/configuration"),
          },
          {
            label: "Konfigurácia vystavovateľa",
            onClick: () => history.push("/configuration/vystavovatel"),
          },
          {
            label: "Konfigurácia hodnotiteľa",
            onClick: () => history.push("/configuration/hodnotitel"),
          },
          {
            label: "Konfigurácia komise",
            onClick: () => history.push("/configuration/komisia"),
          },
        ]}
      />

      {!isLoading && (
        <Card className="card">
          <div className="cardHeader">
            <h1 className="cardTitle">Konfigurácia hodnoteľa</h1>
          </div>
          <div className="cardContent">
            <div className="inputWrapper">
              <TextField
                select
                required
                className="inputInfo"
                id="hodnotitel"
                label="Hodnotiteľ"
                name="hodnotitel"
                helperText={" "}
                onChange={(val) => handleHodnotitelSelect(val.target.value)}
              >
                <MenuItem key={"create"} value={"create"}>
                  {<i>Vytvoriť hodnotiteľa</i>}
                </MenuItem>

                {hodnotitelia.map((val) => (
                  <MenuItem key={val._id} value={val._id}>
                    {val.meno && val.priezvisko
                      ? `${val.meno} ${val.priezvisko}`
                      : val.email}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {!isLoadingValues && (
              <Formik
                enableReinitialize
                validateOnChange
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  handleHodnotitelUpdate(values);
                  actions.setSubmitting(false);
                }}
              >
                {({ errors, values, handleChange, handleReset }) => (
                  <Form>
                    <>
                      <div className="inputWrapper">
                        <TextField
                          select
                          required
                          className="inputInfo"
                          id="komisia"
                          label="Komisia"
                          name="komisia"
                          helperText={errors.komisia ? errors.komisia : " "}
                          value={values.komisia}
                          onChange={handleChange}
                          error={Boolean(errors.komisia?.length)}
                        >
                          {komisie.map((val) => (
                            <MenuItem key={val.meno} value={val._id}>
                              {val.meno}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          select
                          required
                          className="inputInfo"
                          id="pravaId"
                          label="Práva"
                          name="pravaId"
                          helperText={errors.pravaId ? errors.pravaId : " "}
                          value={values.pravaId}
                          onChange={handleChange}
                          error={Boolean(errors.pravaId?.length)}
                        >
                          {prava.map((val) => (
                            <MenuItem key={val.nazov} value={val._id}>
                              {val.nazov}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      <div className="inputWrapper">
                        <TextField
                          className="inputInfo"
                          id="meno"
                          name="meno"
                          label="Meno"
                          helperText={errors.meno ? errors.meno : " "}
                          value={values.meno}
                          onChange={handleChange}
                          error={Boolean(errors.meno?.length)}
                        />

                        <TextField
                          className="inputInfo"
                          id="priezvisko"
                          name="priezvisko"
                          label="Priezvisko"
                          helperText={
                            errors.priezvisko ? errors.priezvisko : " "
                          }
                          value={values.priezvisko}
                          onChange={handleChange}
                          error={Boolean(errors.priezvisko?.length)}
                        />
                      </div>

                      <div className="inputWrapper">
                        <TextField
                          required
                          className="inputInfo"
                          id="email"
                          name="email"
                          label="E-mail"
                          helperText={errors.email ? errors.email : " "}
                          value={values.email}
                          onChange={handleChange}
                          error={Boolean(errors.email?.length)}
                        />

                        <TextField
                          className="inputInfo"
                          id="telefon"
                          name="telefon"
                          label="Telefon"
                          helperText={errors.telefon ? errors.telefon : " "}
                          value={values.telefon}
                          onChange={handleChange}
                          error={Boolean(errors.telefon?.length)}
                        />
                      </div>
                    </>

                    <Button
                      className="submitBtn"
                      color="success"
                      type="submit"
                      variant="contained"
                    >
                      Uložiť
                    </Button>

                    <Button
                      className="resetBtn"
                      color="inherit"
                      variant="contained"
                      onClick={handleReset}
                    >
                      Resetovať
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </Card>
      )}
    </>
  );
};
