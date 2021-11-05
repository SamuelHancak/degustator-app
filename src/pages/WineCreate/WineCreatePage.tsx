import React from "react";
import { Button, TextField } from "@mui/material";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// styles
import "./WineCreatePage.css";
import { Tabs } from "../../components/Tabs/Tabs";
import { useHistory } from "react-router-dom";

export const WineCreatePage = () => {
  const history = useHistory();

  const validationSchema = Yup.object({
    komisia: Yup.number()
      .required("Pole musí byť vyplnené!")
      .typeError("Hodnota poľa nesmie obsahovať iné znaky ako čísla!"),
    hodnotitel: Yup.number()
      .required("Pole musí byť vyplnené!")
      .typeError("Hodnota poľa nesmie obsahovať iné znaky ako čísla!"),
    vzorka: Yup.number()
      .required("Pole musí byť vyplnené!")
      .typeError("Hodnota poľa nesmie obsahovať iné znaky ako čísla!"),
    rocnik: Yup.number()
      .required("Pole musí byť vyplnené!")
      .typeError("Hodnota poľa nesmie obsahovať iné znaky ako čísla!"),
    kategoria: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    komisia: "",
    hodnotitel: "",
    vzorka: "",
    rocnik: "",
    kategoria: "",
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
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
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
                      id="komisia"
                      name="komisia"
                      label="Komisia č."
                      helperText={errors.komisia ? errors.komisia : " "}
                      value={values.komisia}
                      onChange={handleChange}
                      error={Boolean(errors.komisia?.length)}
                    />

                    <TextField
                      required
                      className="inputInfo"
                      id="hodnotitel"
                      name="hodnotitel"
                      label="Hodnotiteľ č."
                      helperText={errors.hodnotitel ? errors.hodnotitel : " "}
                      value={values.hodnotitel}
                      onChange={handleChange}
                      error={Boolean(errors.hodnotitel?.length)}
                    />
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
                      required
                      className="inputInfo"
                      id="kategoria"
                      name="kategoria"
                      label="Kategória vín"
                      helperText={errors.kategoria ? errors.kategoria : " "}
                      value={values.kategoria}
                      onChange={handleChange}
                      error={Boolean(errors.kategoria?.length)}
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
