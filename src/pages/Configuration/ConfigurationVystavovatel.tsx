import React, { useEffect, useRef, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ConfigurationVystavovatelPage = () => {
  const history = useHistory();
  const [vystavovatelia, setVystavovatelia] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingValues, setIsLoadingValues] = useState<boolean>(true);
  const [createForm, setCreateForm] = useState<boolean>(false);

  const validationSchema = Yup.object({
    meno: Yup.string().required("Pole musí byť vyplnené!"),
    priezvisko: Yup.string().required("Pole musí byť vyplnené!"),
    email: Yup.string().required("Pole musí byť vyplnené!"),
    telefon: Yup.string().required("Pole musí byť vyplnené!"),
    adresa: Yup.string().required("Pole musí byť vyplnené!"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/configuration/vystavovatel/all")
      .then((response) => {
        setVystavovatelia(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [initialValues]);

  const handleVystavovatelSelect = (id: string) => {
    if (id === "create") {
      setIsLoadingValues(true);
      setInitialValues({});
      setCreateForm(true);
      setTimeout(() => setIsLoadingValues(false), 1);
    } else {
      setIsLoadingValues(true);
      axios
        .get(`http://localhost:4000/wines/configuration/vystavovatel/${id}`)
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

  const handleVystavovatelUpdate = (values: any) => {
    if (createForm) {
      handleVystavovatelCreate(values);
    } else {
      axios
        .post(
          `http://localhost:4000/wines/configuration/vystavovatel/${initialValues._id}`,
          values
        )
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoadingValues(false);
          handleVystavovatelSelect(initialValues._id);
        });
    }
  };

  const handleVystavovatelCreate = (values: any) => {
    axios
      .post(`http://localhost:4000/wines/configuration/vystavovatel`, values)
      .then((response) => {
        setInitialValues(response.data);
        handleVystavovatelSelect(response.data._id);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingValues(false);
      });
  };

  return (
    <>
      <Tabs
        activeTab={1}
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
            <h1 className="cardTitle">Konfigurácia vystavovateľa</h1>
          </div>
          <div className="cardContent">
            <div className="inputWrapper">
              <TextField
                select
                required
                className="inputInfo"
                id="vystavovatel"
                label="Vystavovateľ"
                name="vystavovatel"
                helperText={" "}
                onChange={(val) => handleVystavovatelSelect(val.target.value)}
              >
                <MenuItem key={"create"} value={"create"}>
                  {<i>Vytvoriť vystavovateľa</i>}
                </MenuItem>

                {vystavovatelia.map((val) => (
                  <MenuItem key={val._id} value={val._id}>
                    {`${val.meno} ${val.priezvisko}`}
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
                  handleVystavovatelUpdate(values);
                  actions.setSubmitting(false);
                }}
              >
                {({ errors, values, handleChange, handleReset }) => (
                  <Form>
                    <>
                      <div className="inputWrapper">
                        <TextField
                          required
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
                          required
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
                          required
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

                      <div className="inputWrapper">
                        <TextField
                          required
                          className="inputInfo"
                          id="adresa"
                          name="adresa"
                          label="Adresa"
                          helperText={errors.adresa ? errors.adresa : " "}
                          value={values.adresa}
                          onChange={handleChange}
                          error={Boolean(errors.adresa?.length)}
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
