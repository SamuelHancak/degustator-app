import React, { useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card/Card";
// styles
import "./ProfilePage.css";
import { TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const ProfilePage = () => {
  const [loggedUser, setLoggedUser] = useState<any>();
  const [initialValues, setInitialValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/wines/wines/userId/${localStorage.getItem(
          "loggedUserId"
        )}`
      )
      .then((response) => {
        setLoggedUser(response.data);
        setInitialValues({
          meno: response.data?.meno,
          priezvisko: response.data?.priezvisko,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  const validationSchema = Yup.object({
    meno: Yup.string().required("Pole musí byť vyplnené!"),
    priezvisko: Yup.string().required("Pole musí byť vyplnené!"),
    oldPassword: Yup.string().required("Pole musí byť vyplnené!"),
    newPassword: Yup.string().required("Pole musí byť vyplnené!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Heslá sa musia zhodovať!")
      .required("Pole musí byť vyplnené!"),
  });

  const handleUpdate = (values: any) => {
    console.log(values);
    setIsLoading(true);

    axios
      .post(
        `http://localhost:4000/wines/wines/user/${localStorage.getItem(
          "loggedUserId"
        )}`,
        values
      )
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdatePassword = (values: any) => {
    console.log(values);

    axios
      .post(
        `http://localhost:4000/wines/wines/user/${localStorage.getItem(
          "loggedUserId"
        )}`,
        values
      )
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {!isLoading && (
        <Card className="card">
          <div className="cardHeader">
            <h1 className="cardTitle">
              {loggedUser?.meno && loggedUser?.priezvisko
                ? `${loggedUser.meno} ${loggedUser.priezvisko}`
                : loggedUser?.email}
            </h1>
          </div>
          <div className="cardContent">
            <Formik
              key="credentials-formik"
              enableReinitialize
              validateOnChange
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log(values);
                handleUpdate(values);
                actions.setSubmitting(false);
              }}
            >
              {({
                setSubmitting,
                errors,
                values,
                handleChange,
                handleReset,
              }) => (
                <Form id="credentials">
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

                  <Button
                    className="submitBtn"
                    color="success"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setSubmitting(false);
                      handleUpdate(values);
                    }}
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

          <div className="cardContent">
            <div style={{ borderTop: "2px solid #80808063" }}>
              <Formik
                key="password-formik"
                enableReinitialize
                validateOnChange
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(actions) => actions.setSubmitting(false)}
              >
                {({
                  setSubmitting,
                  errors,
                  values,
                  handleChange,
                  resetForm,
                }) => (
                  <Form id="password">
                    <div style={{ marginBottom: "10px", marginTop: "18px" }}>
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
                          helperText={
                            errors.oldPassword ? errors.oldPassword : " "
                          }
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
                          helperText={
                            errors.newPassword ? errors.newPassword : " "
                          }
                          value={values.newPassword}
                          onChange={handleChange}
                          error={Boolean(errors.newPassword?.length)}
                        />

                        <TextField
                          autoComplete="new-password"
                          type="password"
                          className="inputInfo"
                          id="confirmPassword"
                          name="confirmPassword"
                          label="Potvrďte nové heslo"
                          helperText={
                            errors.confirmPassword
                              ? errors.confirmPassword
                              : " "
                          }
                          value={values.confirmPassword}
                          onChange={handleChange}
                          error={Boolean(errors.confirmPassword?.length)}
                        />
                      </div>
                    </div>

                    <Button
                      className="submitBtn"
                      color="success"
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        handleUpdatePassword({ heslo: values.confirmPassword });
                        setSubmitting(false);
                        resetForm();
                      }}
                    >
                      Uložiť
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
