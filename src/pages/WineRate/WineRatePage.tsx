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
import axios from "axios";

export const WineRatePage = () => {
  const history = useHistory();
  const params = useParams<{ wineId: string; userId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRated, setIsRated] = useState<boolean>(false);
  const [ratingValues, setRatingValues] = useState<any>([]);
  const [activeVzorka, setActiveVzorka] = useState<any>();

  const loggedUser = useRef<any>();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/wines/wines/userId/${localStorage.getItem(
          "loggedUserId"
        )}`
      )
      .then((response) => {
        loggedUser.current = response.data;
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/configuration/all")
      .then((response) => {
        setRatingValues(response.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleSubmit = (values: any) => {
    isRated
      ? axios.post(
          `http://localhost:4000/wines/wines/rating/update/${defaultValues._id}/${params.userId}`,
          values
        )
      : axios.post("http://localhost:4000/wines/wines/rating/create", {
          ...values,
          hodnotitel_id: params.userId,
        });
    history.push(`/wines/detail/${params.wineId}`);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/wines/wines/rating/${params.wineId}/${params.userId}`
      )
      .then((response) => {
        if (!!response.data) {
          setDefaultValues(response.data);
          setIsRated(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/one/${defaultValues.vzorka_id}`)
      .then((response) => {
        if (!!response.data) {
          setActiveVzorka(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const tabs = [{ label: "Zoznam vín", onClick: () => history.push("/") }];

  if (loggedUser.current?.prava !== "3") {
    tabs.push({
      label: "Pridať vzorku",
      onClick: () => history.push("/wines/create"),
    });
  }

  return (
    <>
      <Tabs activeTab={false} tabs={tabs} />

      {!isLoading && (
        <Card className="card">
          <div className="cardHeader">
            <h1 className="cardTitle">{`Hodnotenie vzorky ${activeVzorka?.vzorka}`}</h1>
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"vzhladCirostVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.vzhladCirostVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"vzhladCirostVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.vzhladCirostVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"vzhladCirostDobre"}>
                          {`Dobré (${ratingValues.vzhladCirostDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"vzhladCirostUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.vzhladCirostUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"vzhladCirostNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.vzhladCirostNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"vzhladFarbaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.vzhladFarbaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"vzhladFarbaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.vzhladFarbaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"vzhladFarbaDobre"}>
                          {`Dobré (${ratingValues.vzhladFarbaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"vzhladFarbaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.vzhladFarbaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"vzhladFarbaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.vzhladFarbaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"vonaIntenzitaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.vonaIntenzitaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"vonaIntenzitaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.vonaIntenzitaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"vonaIntenzitaDobre"}>
                          {`Dobré (${ratingValues.vonaIntenzitaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"vonaIntenzitaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.vonaIntenzitaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"vonaIntenzitaNedostatocne"}
                        >
                          {` Nedostatočné (${ratingValues.vonaIntenzitaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"vonaCistotaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.vonaCistotaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"vonaCistotaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.vonaCistotaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"vonaCistotaDobre"}>
                          {`Dobré (${ratingValues.vonaCistotaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"vonaCistotaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.vonaCistotaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"vonaCistotaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.vonaCistotaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"vonaHarmoniaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.vonaHarmoniaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"vonaHarmoniaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.vonaHarmoniaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"vonaHarmoniaDobre"}>
                          {`Dobré (${ratingValues.vonaHarmoniaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"vonaHarmoniaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.vonaHarmoniaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"vonaHarmoniaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.vonaHarmoniaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"chutIntenzitaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.chutIntenzitaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"chutIntenzitaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.chutIntenzitaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"chutIntenzitaDobre"}>
                          {`Dobré (${ratingValues.chutIntenzitaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"chutIntenzitaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.chutIntenzitaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"chutIntenzitaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.chutIntenzitaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"chutCistotaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.chutCistotaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"chutCistotaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.chutCistotaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"chutCistotaDobre"}>
                          {`Dobré (${ratingValues.chutCistotaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"chutCistotaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.chutCistotaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"chutCistotaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.chutCistotaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"chutHarmoniaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.chutHarmoniaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"chutHarmoniaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.chutHarmoniaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"chutHarmoniaDobre"}>
                          {`Dobré (${ratingValues.chutHarmoniaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"chutHarmoniaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.chutHarmoniaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"chutHarmoniaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.chutHarmoniaNedostatocne})`}
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
                        <MenuItem
                          key={"vynikajuce"}
                          value={"chutPerzistenciaVynikajuce"}
                        >
                          {`Vynikajúce (${ratingValues.chutPerzistenciaVynikajuce})`}
                        </MenuItem>
                        <MenuItem
                          key={"velmi-dobre"}
                          value={"chutPerzistenciaVelmiDobre"}
                        >
                          {`Veľmi dobré (${ratingValues.chutPerzistenciaVelmiDobre})`}
                        </MenuItem>
                        <MenuItem key={"dobre"} value={"chutPerzistenciaDobre"}>
                          {`Dobré (${ratingValues.chutPerzistenciaDobre})`}
                        </MenuItem>
                        <MenuItem
                          key={"uspokojive"}
                          value={"chutPerzistenciaUspokojive"}
                        >
                          {`Uspokojivé (${ratingValues.chutPerzistenciaUspokojive})`}
                        </MenuItem>
                        <MenuItem
                          key={"nedostatocne"}
                          value={"chutPerzistenciaNedostatocne"}
                        >
                          {`Nedostatočné (${ratingValues.chutPerzistenciaNedostatocne})`}
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
