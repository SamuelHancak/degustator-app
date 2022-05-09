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

export const ConfigurationKomisiaPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingValues, setIsLoadingValues] = useState<boolean>(true);
  const [hodnotenia, setHodnotenia] = useState<any[]>([]);
  const [komisie, setKomisie] = useState<any[]>([]);
  const initialValues = useRef<any>({});
  const [createForm, setCreateForm] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/komisia/all`)
      .then((response) => {
        setKomisie(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/hodnotenie/all`)
      .then((response) => {
        setHodnotenia(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const validationSchema = Yup.object({
    nazov: Yup.string().required("Pole musí byť vyplnené!"),
    hodnotenie: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const handleKomisiaSelect = (id: string) => {
    if (id === "create") {
      setIsLoadingValues(true);
      initialValues.current = {};
      setCreateForm(true);
      setTimeout(() => setIsLoadingValues(false), 1);
    } else {
      setIsLoadingValues(true);
      axios
        .get(`http://localhost:4000/wines/wines/komisia/${id}`)
        .then((response) => {
          handleHodnotenieSelect(response.data.hodnotenie);
        })
        .catch((err) => console.log(err))
        .finally(() => setCreateForm(false));
    }
  };

  const handleHodnotenieSelect = (id: string) => {
    axios
      .get(`http://localhost:4000/wines/wines/hodnotenie/${id}`)
      .then((response) => {
        initialValues.current = {
          ...response.data,
          hodnotenie: response.data?._id,
        };
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingValues(false));
  };

  const handleKomisialUpdate = (values: any) => {
    if (createForm) {
      handleKomisiaCreate(values);
    } else {
      axios
        .post(
          `http://localhost:4000/wines/wines/komisia/${initialValues.current._id}`,
          values
        )
        .then((response) => {
          initialValues.current = response.data;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoadingValues(false);
          handleKomisiaSelect(initialValues.current._id);
        });
    }
  };

  const handleKomisiaCreate = (values: any) => {
    axios
      .post(`http://localhost:4000/wines/wines/komisia`, values)
      .then((response) => {
        initialValues.current = response.data;
        handleKomisiaSelect(response.data._id);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingValues(false);
      });
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

      {!isLoading && (
        <Card className="card">
          <div className="cardHeader">
            <h1 className="cardTitle">Konfigurácia komisie</h1>
          </div>
          <div className="cardContent">
            <div className="inputWrapper">
              <TextField
                select
                required
                className="inputInfo"
                id="nazov"
                name="nazov"
                label="Nazov"
                helperText={" "}
                onChange={(val) => handleKomisiaSelect(val.target.value)}
              >
                <MenuItem key={"create"} value={"create"}>
                  {<i>Vytvoriť komisiu</i>}
                </MenuItem>

                {komisie.map((item) => (
                  <MenuItem key={item.meno} value={item._id}>
                    {item.meno}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {!isLoadingValues && (
              <Formik
                enableReinitialize
                validateOnChange
                validationSchema={validationSchema}
                initialValues={initialValues.current}
                onSubmit={(values, actions) => {
                  handleKomisialUpdate(values);
                  actions.setSubmitting(false);
                }}
              >
                {({ errors, values, handleChange, handleReset }) => (
                  <Form>
                    <>
                      <div className="inputWrapper">
                        {createForm && (
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
                        )}

                        <TextField
                          select
                          required
                          className="inputInfo"
                          id="hodnotenie"
                          name="hodnotenie"
                          label="Hodnotenie"
                          helperText={
                            errors.hodnotenie ? errors.hodnotenie : " "
                          }
                          value={values.hodnotenie}
                          onChange={handleChange}
                          error={Boolean(errors.hodnotenie?.length)}
                        >
                          {hodnotenia.map((item) => (
                            <MenuItem key={item.nazov} value={item._id}>
                              {item.nazov}
                            </MenuItem>
                          ))}
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
            )}
          </div>
        </Card>
      )}
    </>
  );
};
