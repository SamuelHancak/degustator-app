import React, { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./ConfigurationPage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  getScore,
  getScoreCustomUnited,
  getScoreUnited,
} from "../../functions";

export const ConfigurationPage = () => {
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const allWinesIds = useRef<string[]>([]);
  const celkoveValues = useRef<number[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/configuration/all")
      .then((response) => {
        setInitialValues(response.data[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const getAllWinesIds = (ratingValues: any[]) => {
    axios
      .get("http://localhost:4000/wines/wines/allId")
      .then((response) => {
        allWinesIds.current = response.data;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        updateAllRatings(allWinesIds.current, ratingValues);
      });
  };

  const updateAllRatings = async (ids: string[], ratingValues: any[]) => {
    Promise.all(
      ids.map((id) =>
        axios
          .get(`http://localhost:4000/wines/wines/rating/${id}`)
          .then((response) => {
            return Promise.all(
              response.data.map((val: any) => {
                return axios
                  .post(
                    `http://localhost:4000/wines/wines/rating/update/${val?._id}/${id}`,
                    {
                      hodnotenie_celkove: getScore(val, ratingValues),
                    }
                  )
                  .catch((err) => console.log(err));
              })
            );
          })
          .catch((err) => console.log(err))
      )
    ).then((result) => {
      if (result.length > 0) {
        updateWineRatings(
          ((result[result.length - 1] as any)[result.length - 1] as any).data
        );
      }
    });
  };

  const updateWineRatings = (data: any[]) => {
    allWinesIds.current.forEach((id) => {
      data.map((val: any) => celkoveValues.current.push(val));

      handleNewWineRating(
        getScoreUnited(celkoveValues.current),
        getScoreCustomUnited(celkoveValues.current),
        id
      );
      celkoveValues.current = [];
    });
  };

  const handleNewWineRating = (
    celkove: number,
    priemerne: number,
    wineId: string
  ) => {
    axios.post(`http://localhost:4000/wines/wines/one/${wineId}`, {
      hodnotenie_celkove: celkove,
      hodnotenie_priemerne: priemerne,
    });
  };

  const validationSchema = Yup.object({
    //Vzhlad values
    vzhladCirostVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladCirostVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladCirostDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladCirostUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladCirostNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    vzhladFarbaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladFarbaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladFarbaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladFarbaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    vzhladFarbaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    //Vona values
    vonaIntenzitaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    vonaIntenzitaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vonaIntenzitaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vonaIntenzitaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    vonaIntenzitaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    vonaCistotaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    vonaCistotaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vonaCistotaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vonaCistotaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    vonaCistotaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    vonaHarmoniaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    vonaHarmoniaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vonaHarmoniaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    vonaHarmoniaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    vonaHarmoniaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    //Chut values
    chutIntenzitaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    chutIntenzitaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutIntenzitaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutIntenzitaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    chutIntenzitaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    chutCistotaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    chutCistotaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutCistotaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutCistotaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    chutCistotaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    chutHarmoniaVynikajuce: Yup.string().required("Pole musí byť vyplnené!"),
    chutHarmoniaVelmiDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutHarmoniaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutHarmoniaUspokojive: Yup.string().required("Pole musí byť vyplnené!"),
    chutHarmoniaNedostatocne: Yup.string().required("Pole musí byť vyplnené!"),

    chutPerzistenciaVynikajuce: Yup.string().required(
      "Pole musí byť vyplnené!"
    ),
    chutPerzistenciaVelmiDobre: Yup.string().required(
      "Pole musí byť vyplnené!"
    ),
    chutPerzistenciaDobre: Yup.string().required("Pole musí byť vyplnené!"),
    chutPerzistenciaUspokojive: Yup.string().required(
      "Pole musí byť vyplnené!"
    ),
    chutPerzistenciaNedostatocne: Yup.string().required(
      "Pole musí byť vyplnené!"
    ),
  });

  const handleSubmit = (values: any) => {
    getAllWinesIds(values);
    axios.post("http://localhost:4000/wines/configuration/update", values);
  };

  return (
    <>
      <Tabs
        activeTab={0}
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
            <h1 className="cardTitle">Konfigurácia hodnotenia</h1>
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
                  {/** Vzhľad */}
                  <>
                    <span className="attributeGroupHeader">Vzhľad</span>

                    <h3 className="attributeNameHeader">Čírosť</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="vzhladCirostVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="vzhladCirostVynikajuce"
                        helperText={
                          errors.vzhladCirostVynikajuce
                            ? errors.vzhladCirostVynikajuce
                            : " "
                        }
                        value={values.vzhladCirostVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladCirostVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladCirostVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="vzhladCirostVelmiDobre"
                        helperText={
                          errors.vzhladCirostVelmiDobre
                            ? errors.vzhladCirostVelmiDobre
                            : " "
                        }
                        value={values.vzhladCirostVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladCirostVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladCirostDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="vzhladCirostDobre"
                        helperText={
                          errors.vzhladCirostDobre
                            ? errors.vzhladCirostDobre
                            : " "
                        }
                        value={values.vzhladCirostDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladCirostDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladCirostUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="vzhladCirostUspokojive"
                        helperText={
                          errors.vzhladCirostUspokojive
                            ? errors.vzhladCirostUspokojive
                            : " "
                        }
                        value={values.vzhladCirostUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladCirostUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladCirostNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="vzhladCirostNedostatocne"
                        helperText={
                          errors.vzhladCirostNedostatocne
                            ? errors.vzhladCirostNedostatocne
                            : " "
                        }
                        value={values.vzhladCirostNedostatocne}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladCirostNedostatocne?.length)}
                      />
                    </div>

                    <h3 className="attributeNameHeader">Farba</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="vzhladFarbaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="vzhladFarbaVynikajuce"
                        helperText={
                          errors.vzhladFarbaVynikajuce
                            ? errors.vzhladFarbaVynikajuce
                            : " "
                        }
                        value={values.vzhladFarbaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladFarbaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladFarbaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="vzhladFarbaVelmiDobre"
                        helperText={
                          errors.vzhladFarbaVelmiDobre
                            ? errors.vzhladFarbaVelmiDobre
                            : " "
                        }
                        value={values.vzhladFarbaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladFarbaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladFarbaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="vzhladFarbaDobre"
                        helperText={
                          errors.vzhladFarbaDobre
                            ? errors.vzhladFarbaDobre
                            : " "
                        }
                        value={values.vzhladFarbaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladFarbaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladFarbaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="vzhladFarbaUspokojive"
                        helperText={
                          errors.vzhladFarbaUspokojive
                            ? errors.vzhladFarbaUspokojive
                            : " "
                        }
                        value={values.vzhladFarbaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladFarbaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vzhladFarbaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="vzhladFarbaNedostatocne"
                        helperText={
                          errors.vzhladFarbaNedostatocne
                            ? errors.vzhladFarbaNedostatocne
                            : " "
                        }
                        value={values.vzhladFarbaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(errors.vzhladFarbaNedostatocne?.length)}
                      />
                    </div>

                    <span className="attributeGroupHeader">Vôňa</span>

                    <h3 className="attributeNameHeader">Intenzita</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="vonaIntenzitaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="vonaIntenzitaVynikajuce"
                        helperText={
                          errors.vonaIntenzitaVynikajuce
                            ? errors.vonaIntenzitaVynikajuce
                            : " "
                        }
                        value={values.vonaIntenzitaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.vonaIntenzitaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaIntenzitaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="vonaIntenzitaVelmiDobre"
                        helperText={
                          errors.vonaIntenzitaVelmiDobre
                            ? errors.vonaIntenzitaVelmiDobre
                            : " "
                        }
                        value={values.vonaIntenzitaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vonaIntenzitaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaIntenzitaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="vonaIntenzitaDobre"
                        helperText={
                          errors.vonaIntenzitaDobre
                            ? errors.vonaIntenzitaDobre
                            : " "
                        }
                        value={values.vonaIntenzitaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vonaIntenzitaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaIntenzitaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="vonaIntenzitaUspokojive"
                        helperText={
                          errors.vonaIntenzitaUspokojive
                            ? errors.vonaIntenzitaUspokojive
                            : " "
                        }
                        value={values.vonaIntenzitaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.vonaIntenzitaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaIntenzitaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="vonaIntenzitaNedostatocne"
                        helperText={
                          errors.vonaIntenzitaNedostatocne
                            ? errors.vonaIntenzitaNedostatocne
                            : " "
                        }
                        value={values.vonaIntenzitaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(
                          errors.vonaIntenzitaNedostatocne?.length
                        )}
                      />
                    </div>

                    <h3 className="attributeNameHeader">Čistota</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="vonaCistotaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="vonaCistotaVynikajuce"
                        helperText={
                          errors.vonaCistotaVynikajuce
                            ? errors.vonaCistotaVynikajuce
                            : " "
                        }
                        value={values.vonaCistotaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.vonaCistotaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaCistotaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="vonaCistotaVelmiDobre"
                        helperText={
                          errors.vonaCistotaVelmiDobre
                            ? errors.vonaCistotaVelmiDobre
                            : " "
                        }
                        value={values.vonaCistotaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vonaCistotaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaCistotaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="vonaCistotaDobre"
                        helperText={
                          errors.vonaCistotaDobre
                            ? errors.vonaCistotaDobre
                            : " "
                        }
                        value={values.vonaCistotaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vonaCistotaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaCistotaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="vonaCistotaUspokojive"
                        helperText={
                          errors.vonaCistotaUspokojive
                            ? errors.vonaCistotaUspokojive
                            : " "
                        }
                        value={values.vonaCistotaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.vonaCistotaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaCistotaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="vonaCistotaNedostatocne"
                        helperText={
                          errors.vonaCistotaNedostatocne
                            ? errors.vonaCistotaNedostatocne
                            : " "
                        }
                        value={values.vonaCistotaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(errors.vonaCistotaNedostatocne?.length)}
                      />
                    </div>

                    <h3 className="attributeNameHeader">Harmónia</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="vonaHarmoniaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="vonaHarmoniaVynikajuce"
                        helperText={
                          errors.vonaHarmoniaVynikajuce
                            ? errors.vonaHarmoniaVynikajuce
                            : " "
                        }
                        value={values.vonaHarmoniaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.vonaHarmoniaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaHarmoniaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="vonaHarmoniaVelmiDobre"
                        helperText={
                          errors.vonaHarmoniaVelmiDobre
                            ? errors.vonaHarmoniaVelmiDobre
                            : " "
                        }
                        value={values.vonaHarmoniaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vonaHarmoniaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaHarmoniaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="vonaHarmoniaDobre"
                        helperText={
                          errors.vonaHarmoniaDobre
                            ? errors.vonaHarmoniaDobre
                            : " "
                        }
                        value={values.vonaHarmoniaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.vonaHarmoniaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaHarmoniaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="vonaHarmoniaUspokojive"
                        helperText={
                          errors.vonaHarmoniaUspokojive
                            ? errors.vonaHarmoniaUspokojive
                            : " "
                        }
                        value={values.vonaHarmoniaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.vonaHarmoniaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="vonaHarmoniaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="vonaHarmoniaNedostatocne"
                        helperText={
                          errors.vonaHarmoniaNedostatocne
                            ? errors.vonaHarmoniaNedostatocne
                            : " "
                        }
                        value={values.vonaHarmoniaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(errors.vonaHarmoniaNedostatocne?.length)}
                      />
                    </div>

                    <span className="attributeGroupHeader">Chuť</span>

                    <h3 className="attributeNameHeader">Intenzita</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="chutIntenzitaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="chutIntenzitaVynikajuce"
                        helperText={
                          errors.chutIntenzitaVynikajuce
                            ? errors.chutIntenzitaVynikajuce
                            : " "
                        }
                        value={values.chutIntenzitaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.chutIntenzitaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutIntenzitaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="chutIntenzitaVelmiDobre"
                        helperText={
                          errors.chutIntenzitaVelmiDobre
                            ? errors.chutIntenzitaVelmiDobre
                            : " "
                        }
                        value={values.chutIntenzitaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutIntenzitaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutIntenzitaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="chutIntenzitaDobre"
                        helperText={
                          errors.chutIntenzitaDobre
                            ? errors.chutIntenzitaDobre
                            : " "
                        }
                        value={values.chutIntenzitaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutIntenzitaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutIntenzitaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="chutIntenzitaUspokojive"
                        helperText={
                          errors.chutIntenzitaUspokojive
                            ? errors.chutIntenzitaUspokojive
                            : " "
                        }
                        value={values.chutIntenzitaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.chutIntenzitaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutIntenzitaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="chutIntenzitaNedostatocne"
                        helperText={
                          errors.chutIntenzitaNedostatocne
                            ? errors.chutIntenzitaNedostatocne
                            : " "
                        }
                        value={values.chutIntenzitaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(
                          errors.chutIntenzitaNedostatocne?.length
                        )}
                      />
                    </div>

                    <h3 className="attributeNameHeader">Čistota</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="chutCistotaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="chutCistotaVynikajuce"
                        helperText={
                          errors.chutCistotaVynikajuce
                            ? errors.chutCistotaVynikajuce
                            : " "
                        }
                        value={values.chutCistotaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.chutCistotaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutCistotaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="chutCistotaVelmiDobre"
                        helperText={
                          errors.chutCistotaVelmiDobre
                            ? errors.chutCistotaVelmiDobre
                            : " "
                        }
                        value={values.chutCistotaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutCistotaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutCistotaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="chutCistotaDobre"
                        helperText={
                          errors.chutCistotaDobre
                            ? errors.chutCistotaDobre
                            : " "
                        }
                        value={values.chutCistotaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutCistotaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutCistotaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="chutCistotaUspokojive"
                        helperText={
                          errors.chutCistotaUspokojive
                            ? errors.chutCistotaUspokojive
                            : " "
                        }
                        value={values.chutCistotaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.chutCistotaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutCistotaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="chutCistotaNedostatocne"
                        helperText={
                          errors.chutCistotaNedostatocne
                            ? errors.chutCistotaNedostatocne
                            : " "
                        }
                        value={values.chutCistotaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(errors.chutCistotaNedostatocne?.length)}
                      />
                    </div>

                    <h3 className="attributeNameHeader">Harmónia</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="chutHarmoniaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="chutHarmoniaVynikajuce"
                        helperText={
                          errors.chutHarmoniaVynikajuce
                            ? errors.chutHarmoniaVynikajuce
                            : " "
                        }
                        value={values.chutHarmoniaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(errors.chutHarmoniaVynikajuce?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutHarmoniaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="chutHarmoniaVelmiDobre"
                        helperText={
                          errors.chutHarmoniaVelmiDobre
                            ? errors.chutHarmoniaVelmiDobre
                            : " "
                        }
                        value={values.chutHarmoniaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutHarmoniaVelmiDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutHarmoniaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="chutHarmoniaDobre"
                        helperText={
                          errors.chutHarmoniaDobre
                            ? errors.chutHarmoniaDobre
                            : " "
                        }
                        value={values.chutHarmoniaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutHarmoniaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutHarmoniaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="chutHarmoniaUspokojive"
                        helperText={
                          errors.chutHarmoniaUspokojive
                            ? errors.chutHarmoniaUspokojive
                            : " "
                        }
                        value={values.chutHarmoniaUspokojive}
                        onChange={handleChange}
                        error={Boolean(errors.chutHarmoniaUspokojive?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutHarmoniaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="chutHarmoniaNedostatocne"
                        helperText={
                          errors.chutHarmoniaNedostatocne
                            ? errors.chutHarmoniaNedostatocne
                            : " "
                        }
                        value={values.chutHarmoniaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(errors.chutHarmoniaNedostatocne?.length)}
                      />
                    </div>

                    <h3 className="attributeNameHeader">Perzistencia</h3>

                    <div style={{ display: "flex" }}>
                      <TextField
                        required
                        className="inputValue"
                        id="chutPerzistenciaVynikajuce"
                        label="Vynikajúce"
                        inputProps={{ min: 0 }}
                        name="chutPerzistenciaVynikajuce"
                        helperText={
                          errors.chutPerzistenciaVynikajuce
                            ? errors.chutPerzistenciaVynikajuce
                            : " "
                        }
                        value={values.chutPerzistenciaVynikajuce}
                        onChange={handleChange}
                        error={Boolean(
                          errors.chutPerzistenciaVynikajuce?.length
                        )}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutPerzistenciaVelmiDobre"
                        label="Veľmi dobré"
                        inputProps={{ min: 0 }}
                        name="chutPerzistenciaVelmiDobre"
                        helperText={
                          errors.chutPerzistenciaVelmiDobre
                            ? errors.chutPerzistenciaVelmiDobre
                            : " "
                        }
                        value={values.chutPerzistenciaVelmiDobre}
                        onChange={handleChange}
                        error={Boolean(
                          errors.chutPerzistenciaVelmiDobre?.length
                        )}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutPerzistenciaDobre"
                        label="Dobré"
                        inputProps={{ min: 0 }}
                        name="chutPerzistenciaDobre"
                        helperText={
                          errors.chutPerzistenciaDobre
                            ? errors.chutPerzistenciaDobre
                            : " "
                        }
                        value={values.chutPerzistenciaDobre}
                        onChange={handleChange}
                        error={Boolean(errors.chutPerzistenciaDobre?.length)}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutPerzistenciaUspokojive"
                        label="Uspokojivé"
                        inputProps={{ min: 0 }}
                        name="chutPerzistenciaUspokojive"
                        helperText={
                          errors.chutPerzistenciaUspokojive
                            ? errors.chutPerzistenciaUspokojive
                            : " "
                        }
                        value={values.chutPerzistenciaUspokojive}
                        onChange={handleChange}
                        error={Boolean(
                          errors.chutPerzistenciaUspokojive?.length
                        )}
                        type="number"
                      />

                      <TextField
                        required
                        className="inputValue"
                        id="chutPerzistenciaNedostatocne"
                        label="Nedostatočné"
                        inputProps={{ min: 0 }}
                        name="chutPerzistenciaNedostatocne"
                        helperText={
                          errors.chutPerzistenciaNedostatocne
                            ? errors.chutPerzistenciaNedostatocne
                            : " "
                        }
                        value={values.chutPerzistenciaNedostatocne}
                        onChange={handleChange}
                        error={Boolean(
                          errors.chutPerzistenciaNedostatocne?.length
                        )}
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
