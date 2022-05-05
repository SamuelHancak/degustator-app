import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
// styles
import "./ProfilePage.css";
import { TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const ProfilePage = () => {
  const loggedUserId = localStorage.getItem("loggedUserId");
  // const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/wines/wines/userId/${loggedUserId}`)
      .then((response) => {})
      .catch((err) => console.log(err));
  }, []);

  const validationSchema = Yup.object({
    meno: Yup.string().required("Pole musí byť vyplnené!"),
    priezvisko: Yup.string().required("Pole musí byť vyplnené!"),
    oldPassword: Yup.string().required("Pole musí byť vyplnené!"),
    newPassword: Yup.string().required("Pole musí byť vyplnené!"),
    confirmPassword: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    meno: "Meno",
    priezvisko: "Priezvisko",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleNameUpdate = (values: any) => {
    axios
      .post(
        `http://localhost:4000/wines/wines/user/${localStorage.getItem(
          "loggedUserId"
        )}`,
        values
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Meno priezvisko</h1>
        </div>
        <div className="cardContent">
          <Formik
            validateOnChange
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              console.log({ values, actions });
              alert(JSON.stringify(values, null, 2));
              handleNameUpdate(values);
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
                      id="meno"
                      name="meno"
                      label="Meno"
                      helperText={errors.meno ? errors.meno : " "}
                      value={values.meno}
                      onChange={handleChange}
                      error={Boolean(errors.meno?.length)}
                    />

                    <TextField
                      required
                      autoComplete="off"
                      type="text"
                      className="inputInfo"
                      id="priezvisko"
                      name="priezvisko"
                      label="Priezvisko"
                      helperText={errors.priezvisko ? errors.priezvisko : " "}
                      value={values.priezvisko}
                      onChange={handleChange}
                      error={Boolean(errors.priezvisko?.length)}
                    />
                  </div>

                  <div className="attributesGroupNameWrapper">
                    <span className="attributesGroupName">
                      Nastavenie hesla
                    </span>
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      autoComplete="new-password"
                      type="password"
                      className="inputInfo"
                      id="oldPassword"
                      name="oldPassword"
                      label="Staré heslo"
                      helperText={errors.oldPassword ? errors.oldPassword : " "}
                      value={values.oldPassword}
                      onChange={handleChange}
                      error={Boolean(errors.oldPassword?.length)}
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      autoComplete="new-password"
                      type="password"
                      className="inputInfo"
                      id="newPassword"
                      name="newPassword"
                      label="Nové heslo"
                      helperText={errors.newPassword ? errors.newPassword : " "}
                      value={values.newPassword}
                      onChange={handleChange}
                      error={Boolean(errors.newPassword?.length)}
                    />
                  </div>

                  <div className="inputWrapper">
                    <TextField
                      autoComplete="new-password"
                      type="password"
                      className="inputInfo"
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Potvrďte nové heslo"
                      helperText={
                        errors.confirmPassword ? errors.confirmPassword : " "
                      }
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={Boolean(errors.confirmPassword?.length)}
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
