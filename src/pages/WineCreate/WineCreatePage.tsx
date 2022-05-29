import React, { useEffect, useState } from "react";
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
  const [komisie, setKomisie] = useState<any[]>([]);
  const [vystavovatelia, setVystavovatelia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const validationSchema = Yup.object({
    komisia: Yup.string().required("Pole musí byť vyplnené!"),
    vzorka: Yup.string().required("Pole musí byť vyplnené!"),
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/configuration/vystavovatel/all")
      .then((response) => {
        setVystavovatelia(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/komisia/all`)
      .then((response) => {
        setKomisie(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = (values: any) => {
    axios.post("http://localhost:4000/wines/wines/create", values);
    history.push("/wines");
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

      {!isLoading && (
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
                        required
                        className="inputInfo"
                        id="vzorka"
                        name="vzorka"
                        label="Vzorka"
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
                        id="komisia"
                        label="Komisia"
                        name="komisia"
                        helperText={errors.komisia ? errors.komisia : " "}
                        value={values.komisia}
                        onChange={handleChange}
                        error={Boolean(errors.komisia?.length)}
                      >
                        {komisie.map((item) => (
                          <MenuItem key={item.meno} value={item._id}>
                            {item.meno}
                          </MenuItem>
                        ))}
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
                        {vystavovatelia.map((val) => (
                          <MenuItem key={val._id} value={val._id}>
                            {`${val.meno} ${val.priezvisko}`}
                          </MenuItem>
                        ))}
                      </TextField>
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
                        <MenuItem key={"kategoria-1"} value={"Biele suché"}>
                          Biele suché
                        </MenuItem>
                        <MenuItem key={"kategoria-2"} value={"Biele polosuché"}>
                          Biele polosuché
                        </MenuItem>
                        <MenuItem
                          key={"kategoria-3"}
                          value={"Biele polosladké"}
                        >
                          Biele polosladké
                        </MenuItem>
                        <MenuItem key={"kategoria-4"} value={"Ružové suché"}>
                          Ružové suché
                        </MenuItem>
                        <MenuItem
                          key={"kategoria-5"}
                          value={"Ružové polosuché"}
                        >
                          Ružové polosuché
                        </MenuItem>
                        <MenuItem key={"kategoria-6"} value={"Červené"}>
                          Červené
                        </MenuItem>
                        <MenuItem key={"kategoria-7"} value={"Šumivé"}>
                          Šumivé
                        </MenuItem>
                        <MenuItem
                          key={"kategoria-8"}
                          value={"Sladké (ľadový zber, slamové)"}
                        >
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
      )}
    </>
  );
};
