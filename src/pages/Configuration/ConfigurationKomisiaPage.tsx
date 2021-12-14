import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";

export const ConfigurationKomisiaPage = () => {
  const history = useHistory();

  const validationSchema = Yup.object({
    nazov: Yup.string().required("Pole musí byť vyplnené!"),
    hodnotenie: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    nazov: "",
    hodnotenie: "celkove",
  };

  return (
    <>
      <Tabs
        activeTab={3}
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
          <h1 className="cardTitle">Konfigurácia komisie</h1>
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
                      required
                      className="inputInfo"
                      id="nazov"
                      name="nazov"
                      label="Nazov"
                      helperText={errors.nazov ? errors.nazov : " "}
                      value={values.nazov}
                      onChange={handleChange}
                      error={Boolean(errors.nazov?.length)}
                    />

                    <TextField
                      select
                      required
                      className="inputInfo"
                      id="hodnotenie"
                      name="hodnotenie"
                      label="Hodnotenie"
                      helperText={errors.hodnotenie ? errors.hodnotenie : " "}
                      value={values.hodnotenie}
                      onChange={handleChange}
                      error={Boolean(errors.hodnotenie?.length)}
                    >
                      <MenuItem selected key={"celkove"} value={"celkove"}>
                        Celkové
                      </MenuItem>
                      <MenuItem key={"priemerne"} value={"priemerne"}>
                        Priemerné
                      </MenuItem>
                    </TextField>
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
