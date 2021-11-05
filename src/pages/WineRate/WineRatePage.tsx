import React from "react";
import { Button, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./WineRatePage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";

export const WineRatePage = () => {
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
        activeTab={false}
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
          <h1 className="cardTitle">Hodnotenie vzorky</h1>
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
                  <div className="attributesGroupNameWrapper">
                    <span className="attributesGroupName">Vzhľad</span>
                    <span className="attributesGroupName attributesGroupNote">
                      Poznámky
                    </span>
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cirost"
                      label="Čírosť"
                      name="cirost"
                      helperText={errors.cirost ? errors.cirost : " "}
                      value={values.cirost}
                      onChange={handleChange}
                      error={Boolean(errors.cirost?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="cirostNotes"
                      className="inputNote"
                      id="cirostNotes"
                      label="Čírosť poznámky"
                      helperText=" "
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="farba"
                      label="Farba"
                      name="farba"
                      helperText={errors.farba ? errors.farba : " "}
                      value={values.farba}
                      onChange={handleChange}
                      error={Boolean(errors.farba?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="farbaNotes"
                      className="inputNote"
                      id="farbaNotes"
                      label="Farba poznámky"
                      helperText=" "
                    />
                  </div>
                </>

                {/** Vôňa */}
                <>
                  <div className="attributesGroupNameWrapper">
                    <span className="attributesGroupName">Vôňa</span>
                    <span className="attributesGroupName attributesGroupNote">
                      Poznámky
                    </span>
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="intenzita"
                      label="Intenzita"
                      name="intenzita"
                      helperText={errors.intenzita ? errors.intenzita : " "}
                      value={values.intenzita}
                      onChange={handleChange}
                      error={Boolean(errors.intenzita?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="intenzitaNotes"
                      className="inputNote"
                      id="intenzitaNotes"
                      label="Intenzita poznámky"
                      helperText=" "
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistota"
                      label="Čistota"
                      name="cistota"
                      helperText={errors.cistota ? errors.cistota : " "}
                      value={values.cistota}
                      onChange={handleChange}
                      error={Boolean(errors.cistota?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="cistotaNotes"
                      className="inputNote"
                      id="cistotaNotes"
                      label="Čistota poznámky"
                      helperText=" "
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmonia"
                      label="Harmónia"
                      name="harmonia"
                      helperText={errors.harmonia ? errors.harmonia : " "}
                      value={values.harmonia}
                      onChange={handleChange}
                      error={Boolean(errors.harmonia?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="harmoniaNotes"
                      className="inputNote"
                      id="harmoniaNotes"
                      label="Harmónia poznámky"
                      helperText=" "
                    />
                  </div>
                </>

                {/** Chuť */}
                <>
                  <div className="attributesGroupNameWrapper">
                    <span className="attributesGroupName">Chuť</span>
                    <span className="attributesGroupName attributesGroupNote">
                      Poznámky
                    </span>
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="cistotaChut"
                      label="Čistota"
                      name="cistotaChut"
                      helperText={errors.cistotaChut ? errors.cistotaChut : " "}
                      value={values.cistotaChut}
                      onChange={handleChange}
                      error={Boolean(errors.cistotaChut?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="cistotaChutNotes"
                      className="inputNote"
                      id="cistotaChutNotes"
                      label="Čistota poznámky"
                      helperText=" "
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="harmoniaChut"
                      label="Harmónia"
                      name="harmoniaChut"
                      helperText={errors.harmoniaChut ? errors.cirost : " "}
                      value={values.harmoniaChut}
                      onChange={handleChange}
                      error={Boolean(errors.harmoniaChut?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="harmoniaChutNotes"
                      className="inputNote"
                      id="harmoniaChutNotes"
                      label="Harmónia poznámky"
                      helperText=" "
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      select
                      required
                      className="inputValue"
                      id="perzistencia"
                      label="Perzistencia"
                      name="perzistencia"
                      helperText={
                        errors.perzistencia ? errors.perzistencia : " "
                      }
                      value={values.perzistencia}
                      onChange={handleChange}
                      error={Boolean(errors.perzistencia?.length)}
                    >
                      <MenuItem key={"vynikajuce"} value={5}>
                        Vynikajúce
                      </MenuItem>
                      <MenuItem key={"velmi-dobre"} value={4}>
                        Veľmi dobré
                      </MenuItem>
                      <MenuItem key={"dobre"} value={3}>
                        Dobré
                      </MenuItem>
                      <MenuItem key={"uspokojive"} value={2}>
                        Uspokojivé
                      </MenuItem>
                      <MenuItem key={"nedostatocne"} value={1}>
                        Nedostatočné
                      </MenuItem>
                    </TextField>

                    <TextField
                      multiline
                      name="perzistenciaNotes"
                      className="inputNote"
                      id="perzistenciaNotes"
                      label="Perzistencia poznámky"
                      helperText=" "
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
