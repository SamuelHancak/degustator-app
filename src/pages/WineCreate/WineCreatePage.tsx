import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./WineCreatePage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const WineCreatePage = () => {
  const history = useHistory();

  const validationSchema = Yup.object({
    komisia: Yup.string().required("Pole musí byť vyplnené!"),
    vzorka: Yup.number()
      .required("Pole musí byť vyplnené!")
      .typeError("Hodnota poľa nesmie obsahovať iné znaky ako čísla!"),
    rocnik: Yup.number()
      .required("Pole musí byť vyplnené!")
      .typeError("Hodnota poľa nesmie obsahovať iné znaky ako čísla!"),
    kategoria: Yup.string().required("Pole musí byť vyplnené!"),
    vystavovatel: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    komisia: "",
    vzorka: "",
    rocnik: "",
    kategoria: "",
    vystavovatel: "",
  };

  const handleSubmit = (values: any) => {
    axios.post("http://localhost:4000/wines/create", values);
  };

  return (
    <>
      <Tabs
        activeTab={1}
        tabs={[
          { label: "Zoznam vín", onClick: () => history.push("/") },
          {
            label: "Pridať vzorku",
            onClick: () => history.push("/wines/create"),
          },
        ]}
      />

      <Card className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Pridať vzorku</h1>
        </div>
        <div className="cardContent">
          <Formik
            validateOnChange
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              handleSubmit(values);
              actions.setSubmitting(false);
            }}
          >
            {({ errors, values, handleChange, handleReset }) => (
              <Form>
                <>
                  <div className="attributesGroupNameWrapper">
                    <span className="attributesGroupName">Info</span>
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
                      id="vzorka"
                      name="vzorka"
                      label="Vzorka č."
                      helperText={errors.vzorka ? errors.vzorka : " "}
                      value={values.vzorka}
                      onChange={handleChange}
                      error={Boolean(errors.vzorka?.length)}
                    />

                    <TextField
                      required
                      className="inputInfo"
                      id="rocnik"
                      name="rocnik"
                      label="Ročník"
                      helperText={errors.rocnik ? errors.rocnik : " "}
                      value={values.rocnik}
                      onChange={handleChange}
                      error={Boolean(errors.rocnik?.length)}
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputInfo"
                      id="kategoria"
                      label="Kategória"
                      name="kategoria"
                      helperText={errors.kategoria ? errors.kategoria : " "}
                      value={values.kategoria}
                      onChange={handleChange}
                      error={Boolean(errors.kategoria?.length)}
                    >
                      <MenuItem key={"kategoria-1"} value={"kategoria-1"}>
                        Biele suché
                      </MenuItem>
                      <MenuItem key={"kategoria-2"} value={"kategoria-2"}>
                        Biele polosuché
                      </MenuItem>
                      <MenuItem key={"kategoria-3"} value={"kategoria-3"}>
                        Biele polosladké
                      </MenuItem>
                      <MenuItem key={"kategoria-4"} value={"kategoria-4"}>
                        Ružové suché
                      </MenuItem>
                      <MenuItem key={"kategoria-5"} value={"kategoria-5"}>
                        Ružové polosuché
                      </MenuItem>
                      <MenuItem key={"kategoria-6"} value={"kategoria-6"}>
                        Červené
                      </MenuItem>
                      <MenuItem key={"kategoria-7"} value={"kategoria-7"}>
                        Šumivé
                      </MenuItem>
                      <MenuItem key={"kategoria-8"} value={"kategoria-8"}>
                        Sladké (ľadový zber, slamové)
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
