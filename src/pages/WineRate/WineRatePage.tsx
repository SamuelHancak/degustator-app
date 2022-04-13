import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./WineRatePage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory, useParams } from "react-router-dom";
import { LoggedInUserContext } from "../../App";
import axios from "axios";

export const WineRatePage = () => {
  const loggedUser = useContext(LoggedInUserContext);
  const history = useHistory();
  const params = useParams<{ wineId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRated, setIsRated] = useState<boolean>(false);

  const initialValues = {
    vzorka_id: params.wineId,
    cirost: "",
    farba: "",
    intenzita: "",
    cistota: "",
    harmonia: "",
    intenzitaChut: "",
    cistotaChut: "",
    harmoniaChut: "",
    perzistencia: "",
    cirostNotes: "",
    farbaNotes: "",
    intenzitaNotes: "",
    cistotaNotes: "",
    harmoniaNotes: "",
    intenzitaChutNotes: "",
    cistotaChutNotes: "",
    harmoniaChutNotes: "",
    perzistenciaNotes: "",
  };

  const [defaultValues, setDefaultValues] = useState<any>(initialValues);

  const validationSchema = Yup.object({
    vzorka_id: Yup.string().required(),
    cirost: Yup.string().required("Pole musí byť vyplnené!"),
    farba: Yup.string().required("Pole musí byť vyplnené!"),
    intenzita: Yup.string().required("Pole musí byť vyplnené!"),
    cistota: Yup.string().required("Pole musí byť vyplnené!"),
    harmonia: Yup.string().required("Pole musí byť vyplnené!"),
    intenzitaChut: Yup.string().required("Pole musí byť vyplnené!"),
    cistotaChut: Yup.string().required("Pole musí byť vyplnené!"),
    harmoniaChut: Yup.string().required("Pole musí byť vyplnené!"),
    perzistencia: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const tabs = [{ label: "Zoznam vín", onClick: () => history.push("/") }];

  if (loggedUser.loggedInUser?.email !== "hodnotitel@mail.com") {
    tabs.push({
      label: "Pridať vzorku",
      onClick: () => history.push("/wines/create"),
    });
  }

  const handleSubmit = (values: any) => {
    isRated
      ? axios.post(
          `http://localhost:4000/wines/wines/rating/update/${defaultValues._id}`,
          values
        )
      : axios.post("http://localhost:4000/wines/wines/rating/create", values);
    history.push(`/wines/detail/${params.wineId}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/rating/${params.wineId}`)
      .then((response) => {
        if (!!response.data) {
          setDefaultValues(response.data);
          setIsRated(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Tabs activeTab={false} tabs={tabs} />

      {!isLoading && (
        <Card className="card">
          <div className="cardHeader">
            <h1 className="cardTitle">{`Hodnotenie vzorky ${params.wineId}`}</h1>
          </div>
          <div className="cardContent">
            <Formik
              validateOnChange
              validationSchema={validationSchema}
              initialValues={defaultValues}
              onSubmit={(values, actions) => {
                handleSubmit(values);
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
                          Vynikajúce (5)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={4}>
                          Veľmi dobré (4)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={3}>
                          Dobré (3)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={2}>
                          Uspokojivé (2)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={1}>
                          Nedostatočné (1)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="cirostNotes"
                        className="inputNote"
                        id="cirostNotes"
                        label="Čírosť poznámky"
                        helperText=" "
                        value={values.cirostNotes}
                        onChange={handleChange}
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
                          Vynikajúce (5)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={4}>
                          Veľmi dobré (4)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={3}>
                          Dobré (3)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={2}>
                          Uspokojivé (2)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={1}>
                          Nedostatočné (1)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="farbaNotes"
                        className="inputNote"
                        id="farbaNotes"
                        label="Farba poznámky"
                        helperText=" "
                        value={values.farbaNotes}
                        onChange={handleChange}
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
                        <MenuItem key={"vynikajuce"} value={8}>
                          Vynikajúce (8)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={7}>
                          Veľmi dobré (7)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={6}>
                          Dobré (6)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={4}>
                          Uspokojivé (4)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={2}>
                          Nedostatočné (2)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="intenzitaNotes"
                        className="inputNote"
                        id="intenzitaNotes"
                        label="Intenzita poznámky"
                        helperText=" "
                        value={values.intenzitaNotes}
                        onChange={handleChange}
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
                        <MenuItem key={"vynikajuce"} value={6}>
                          Vynikajúce (6)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={5}>
                          Veľmi dobré (5)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={4}>
                          Dobré (4)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={3}>
                          Uspokojivé (3)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={2}>
                          Nedostatočné (2)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="cistotaNotes"
                        className="inputNote"
                        id="cistotaNotes"
                        label="Čistota poznámky"
                        helperText=" "
                        value={values.cistotaNotes}
                        onChange={handleChange}
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
                        <MenuItem key={"vynikajuce"} value={16}>
                          Vynikajúce (16)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={14}>
                          Veľmi dobré (14)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={12}>
                          Dobré (12)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={10}>
                          Uspokojivé (10)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={8}>
                          Nedostatočné (8)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="harmoniaNotes"
                        className="inputNote"
                        id="harmoniaNotes"
                        label="Harmónia poznámky"
                        helperText=" "
                        value={values.harmoniaNotes}
                        onChange={handleChange}
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
                        id="intenzitaChut"
                        label="Intenzita"
                        name="intenzitaChut"
                        helperText={
                          errors.intenzitaChut ? errors.intenzitaChut : " "
                        }
                        value={values.intenzitaChut}
                        onChange={handleChange}
                        error={Boolean(errors.intenzitaChut?.length)}
                      >
                        <MenuItem key={"vynikajuce"} value={8}>
                          Vynikajúce (8)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={7}>
                          Veľmi dobré (7)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={6}>
                          Dobré (6)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={4}>
                          Uspokojivé (4)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={2}>
                          Nedostatočné (2)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="intenzitaChutNotes"
                        className="inputNote"
                        id="intenzitaChutNotes"
                        label="Intenzita poznámky"
                        helperText=" "
                        value={values.intenzitaChutNotes}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputWrapper">
                      <TextField
                        select
                        required
                        className="inputValue"
                        id="cistotaChut"
                        label="Čistota"
                        name="cistotaChut"
                        helperText={
                          errors.cistotaChut ? errors.cistotaChut : " "
                        }
                        value={values.cistotaChut}
                        onChange={handleChange}
                        error={Boolean(errors.cistotaChut?.length)}
                      >
                        <MenuItem key={"vynikajuce"} value={6}>
                          Vynikajúce (6)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={5}>
                          Veľmi dobré (5)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={4}>
                          Dobré (4)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={3}>
                          Uspokojivé (3)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={2}>
                          Nedostatočné (2)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="cistotaChutNotes"
                        className="inputNote"
                        id="cistotaChutNotes"
                        label="Čistota poznámky"
                        helperText=" "
                        value={values.cistotaChutNotes}
                        onChange={handleChange}
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
                        <MenuItem key={"vynikajuce"} value={22}>
                          Vynikajúce (22)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={19}>
                          Veľmi dobré (19)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={16}>
                          Dobré (16)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={13}>
                          Uspokojivé (13)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={10}>
                          Nedostatočné (10)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="harmoniaChutNotes"
                        className="inputNote"
                        id="harmoniaChutNotes"
                        label="Harmónia poznámky"
                        helperText=" "
                        value={values.harmoniaChutNotes}
                        onChange={handleChange}
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
                        <MenuItem key={"vynikajuce"} value={8}>
                          Vynikajúce (8)
                        </MenuItem>
                        <MenuItem key={"velmi-dobre"} value={7}>
                          Veľmi dobré (7)
                        </MenuItem>
                        <MenuItem key={"dobre"} value={6}>
                          Dobré (6)
                        </MenuItem>
                        <MenuItem key={"uspokojive"} value={5}>
                          Uspokojivé (5)
                        </MenuItem>
                        <MenuItem key={"nedostatocne"} value={4}>
                          Nedostatočné (4)
                        </MenuItem>
                      </TextField>

                      <TextField
                        multiline
                        name="perzistenciaNotes"
                        className="inputNote"
                        id="perzistenciaNotes"
                        label="Perzistencia poznámky"
                        helperText=" "
                        value={values.perzistenciaNotes}
                        onChange={handleChange}
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
      )}
    </>
  );
};
