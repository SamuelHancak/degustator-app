import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";

export const ConfigurationHodnotitelPage = () => {
  const history = useHistory();

  const validationSchema = Yup.object({
    hodnotitel: Yup.string().required("Pole musí byť vyplnené!"),
    meno: Yup.string().required("Pole musí byť vyplnené!"),
    priezvisko: Yup.string().required("Pole musí byť vyplnené!"),
    prava: Yup.string().required("Pole musí byť vyplnené!"),
    komisia: Yup.string().required("Pole musí byť vyplnené!"),
    email: Yup.string().required("Pole musí byť vyplnené!"),
    telefon: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    hodnotitel: "",
    meno: "",
    priezvisko: "",
    prava: "",
    komisia: "",
    email: "",
    telefon: "",
  };

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

      <Card className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Konfigurácia hodnoteľa</h1>
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
                      id="hodnotitel"
                      label="Hodnotiteľ"
                      name="hodnotitel"
                      helperText={errors.hodnotitel ? errors.hodnotitel : " "}
                      value={values.hodnotitel}
                      onChange={handleChange}
                      error={Boolean(errors.hodnotitel?.length)}
                    >
                      <MenuItem key={"hodnotitel-1"} value={"hodnotitel-1"}>
                        Hodnotiteľ 1
                      </MenuItem>
                      <MenuItem key={"hodnotitel-2"} value={"hodnotitel-2"}>
                        Hodnotiteľ 2
                      </MenuItem>
                      <MenuItem key={"hodnotitel-3"} value={"hodnotitel-3"}>
                        Hodnotiteľ 3
                      </MenuItem>
                      <MenuItem key={"hodnotitel-4"} value={"hodnotitel-4"}>
                        Hodnotiteľ 4
                      </MenuItem>
                      <MenuItem key={"hodnotitel-5"} value={"hodnotitel-5"}>
                        Hodnotiteľ 5
                      </MenuItem>
                    </TextField>

                    <TextField
                      select
                      required
                      className="inputInfo"
                      id="prava"
                      label="Práva"
                      name="prava"
                      helperText={errors.prava ? errors.prava : " "}
                      value={values.prava}
                      onChange={handleChange}
                      error={Boolean(errors.prava?.length)}
                    >
                      <MenuItem key={"Admi"} value={"Admi"}>
                        Admin
                      </MenuItem>
                      <MenuItem key={"prezident"} value={"prezident"}>
                        Prezident výstavy
                      </MenuItem>
                      <MenuItem key={"predseda"} value={"predseda"}>
                        Predseda komisie
                      </MenuItem>
                      <MenuItem key={"hodnotitel"} value={"hodnotitel"}>
                        Hodnotiteľ
                      </MenuItem>
                    </TextField>
                  </div>

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
                      <MenuItem key={"komisia-1"} value={"komisia-1"}>
                        Komisia 1
                      </MenuItem>
                      <MenuItem key={"komisia-2"} value={"komisia-2"}>
                        Komisia 2
                      </MenuItem>
                      <MenuItem key={"komisia-3"} value={"komisia-3"}>
                        Komisia 3
                      </MenuItem>
                      <MenuItem key={"komisia-4"} value={"komisia-4"}>
                        Komisia 4
                      </MenuItem>
                      <MenuItem key={"komisia-5"} value={"komisia-5"}>
                        Komisia 5
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
