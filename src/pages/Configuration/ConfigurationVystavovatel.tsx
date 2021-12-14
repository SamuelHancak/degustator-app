import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";

export const ConfigurationVystavovatelPage = () => {
  const history = useHistory();

  const validationSchema = Yup.object({
    vystavovatel: Yup.string().required("Pole musí byť vyplnené!"),
    meno: Yup.string().required("Pole musí byť vyplnené!"),
    priezvisko: Yup.string().required("Pole musí byť vyplnené!"),
    email: Yup.string().required("Pole musí byť vyplnené!"),
    telefon: Yup.string().required("Pole musí byť vyplnené!"),
    adresa: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    vystavovatel: "",
    meno: "",
    priezvisko: "",
    email: "",
    telefon: "",
    adresa: "",
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

      <Card className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Konfigurácia vystavovateľa</h1>
        </div>
        <div className="cardContent">
          <Formik
            validateOnChange
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
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
                      id="vystavovatel"
                      label="Vystavovateľ"
                      name="vystavovatel"
                      helperText={
                        errors.vystavovatel ? errors.vystavovatel : " "
                      }
                      value={values.vystavovatel}
                      onChange={handleChange}
                      error={Boolean(errors.vystavovatel?.length)}
                    >
                      <MenuItem key={"vystavovatel-1"} value={"vystavovatel-1"}>
                        Vystavovateľ 1
                      </MenuItem>
                      <MenuItem key={"vystavovatel-2"} value={"vystavovatel-2"}>
                        Vystavovateľ 2
                      </MenuItem>
                      <MenuItem key={"vystavovatel-3"} value={"vystavovatel-3"}>
                        Vystavovateľ 3
                      </MenuItem>
                      <MenuItem key={"vystavovatel-4"} value={"vystavovatel-4"}>
                        Vystavovateľ 4
                      </MenuItem>
                      <MenuItem key={"vystavovatel-5"} value={"vystavovatel-5"}>
                        Vystavovateľ 5
                      </MenuItem>
                    </TextField>
                  </div>

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
                      helperText={errors.priezvisko ? errors.priezvisko : " "}
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
        </div>
      </Card>
    </>
  );
};
