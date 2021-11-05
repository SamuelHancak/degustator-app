import React from "react";
import { Button, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";

export const ConfigurationPage = () => {
  const history = useHistory();

  const validationSchema = Yup.object({
    cirost: Yup.string().required("Pole musí byť vyplnené!"),
    farba: Yup.string().required("Pole musí byť vyplnené!"),
    intenzita: Yup.string().required("Pole musí byť vyplnené!"),
    cistota: Yup.string().required("Pole musí byť vyplnené!"),
    harmonia: Yup.string().required("Pole musí byť vyplnené!"),
    cistotaChut: Yup.string().required("Pole musí byť vyplnené!"),
    harmoniaChut: Yup.string().required("Pole musí byť vyplnené!"),
    perzistencia: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    cirost: "",
    farba: "",
    intenzita: "",
    cistota: "",
    harmonia: "",
    cistotaChut: "",
    harmoniaChut: "",
    perzistencia: "",
  };

  return (
    <>
      <Tabs
        activeTab={2}
        tabs={[
          { label: "Zoznam vín", onClick: () => history.push("/") },
          {
            label: "Pridať vzorku",
            onClick: () => history.push("/wines/create"),
          },
          {
            label: "Konfigurácia hodnotenia",
            onClick: () => history.push("/configuration"),
          },
        ]}
      />

      <Card className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Konfigurácia hodnotenia</h1>
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
                {/** Vzhľad */}
                <>
                  <span className="attributeGroupHeader">Vzhľad</span>

                  <h3 className="attributeNameHeader">Čírosť</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <h3 className="attributeNameHeader">Farba</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <span className="attributeGroupHeader">Vôňa</span>

                  <h3 className="attributeNameHeader">Intenzita</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <h3 className="attributeNameHeader">Čistota</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <h3 className="attributeNameHeader">Harmónia</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <span className="attributeGroupHeader">Chuť</span>

                  <h3 className="attributeNameHeader">Čistota</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <h3 className="attributeNameHeader">Harmónia</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    />
                  </div>

                  <h3 className="attributeNameHeader">Perzistencia</h3>

                  <div style={{ display: "flex" }}>
                    <TextField
                      required
                      className="inputValue"
                      id="cirost"
                      label="Vynikajúce"
                      inputProps={{ min: 0 }}
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                      type="number"
                    />

                    <TextField
                      required
                      className="inputValue"
                      id="farba"
                      label="Veľmi dobré"
                      inputProps={{ min: 0 }}
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Dobré"
                      inputProps={{ min: 0 }}
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Uspokojivé"
                      inputProps={{ min: 0 }}
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                      type="number"
                    />

                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Nedostatočné"
                      inputProps={{ min: 0 }}
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
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
