import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "../../components/Card/Card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { LoggedInUserContext } from "../../App";
// styles
import "./LogInPage.css";

export const validEmails = [
  "hodnotitel@mail.com",
  "predseda@mail.com",
  "prezident@mail.com",
  "admin@mail.com",
];

export const LogInPage = () => {
  const history = useHistory();
  const { loggedInUser, logIn, signUp } = useContext(LoggedInUserContext);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => console.log(loggedInUser), [loggedInUser]);

  const validationSchemaLogin = Yup.object({
    email: Yup.string()
      .email("Neplatná e-mailová adresa!")
      .required("Pole musí byť vyplnené!"),
    password: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const validationSchemaRegistration = Yup.object({
    email: Yup.string()
      .email("Neplatná e-mailová adresa!")
      .required("Pole musí byť vyplnené!"),
    password: Yup.string().required("Pole musí byť vyplnené!"),
    confirmPassword: Yup.string()
      .required("Pole musí byť vyplnené!")
      .oneOf([Yup.ref("password")], "Heslá sa nezhodujú!"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const initialValuesRegistration = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // const onSubmit = ({values})

  return (
    <div
      className="loginLayout"
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(88, 24, 31)",
        height: "100vh",
        width: "100%",
        zIndex: 100000,
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          fontSize: "2rem",
          marginLeft: "20%",
          marginRight: "20%",
        }}
      >
        <div>
          <div>
            <FontAwesomeIcon
              className="loginIconLeft"
              icon="wine-glass-alt"
              size="10x"
            />

            <FontAwesomeIcon
              className="loginIconRight"
              icon="wine-glass-alt"
              size="10x"
            />
          </div>

          <div>
            <FontAwesomeIcon
              className="loginIconBottomRight"
              icon="wine-glass-alt"
              size="10x"
            />

            <FontAwesomeIcon
              className="loginIconBottomLeft"
              icon="wine-glass-alt"
              size="10x"
            />
          </div>
        </div>
      </div>

      <Card className="loginCard">
        <h3 style={{ textAlign: "center", color: "rgb(88, 24, 31)" }}>
          {isLogin ? "Prihlásenie" : "Registrácia"}
        </h3>

        {isLogin ? (
          <Formik
            validateOnChange
            validationSchema={validationSchemaLogin}
            initialValues={initialValuesLogin}
            onSubmit={(values, actions) => {
              // console.log({ values, actions });
              // alert(JSON.stringify(values, null, 2));
              logIn({ email: values.email, password: values.password });
              history.push("/");
              actions.setSubmitting(false);
            }}
          >
            {({ errors, values, handleChange }) => (
              <Form>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <TextField
                      required
                      id="email"
                      inputProps={{ style: { textAlign: "center" } }}
                      name="email"
                      label="E-mail"
                      helperText={errors.email ? errors.email : " "}
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(errors.email?.length)}
                    />
                  </div>

                  <div>
                    <TextField
                      required
                      type="password"
                      id="password"
                      inputProps={{ style: { textAlign: "center" } }}
                      name="password"
                      label="Heslo"
                      helperText={errors.password ? errors.password : " "}
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(errors.password?.length)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      // disabled={!validEmails.includes(values.email)}
                      style={{
                        backgroundColor: !validEmails.includes(values.email)
                          ? "grey"
                          : "rgb(88, 24, 31)",
                      }}
                      className="submitBtn"
                      color="primary"
                      type="submit"
                      variant="contained"
                      // onClick={() => {
                      //   setLoggedInUser(values);
                      //   history.push("/");
                      // }}
                    >
                      Prihlásiť
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            validateOnChange
            validationSchema={validationSchemaRegistration}
            initialValues={initialValuesRegistration}
            onSubmit={(values, actions) => {
              signUp({ email: values.email, password: values.confirmPassword });
              actions.setSubmitting(false);
            }}
          >
            {({ errors, values, handleChange }) => (
              <Form>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <TextField
                      required
                      id="email"
                      inputProps={{ style: { textAlign: "center" } }}
                      name="email"
                      label="E-mail"
                      helperText={errors.email ? errors.email : " "}
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(errors.email?.length)}
                    />
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <TextField
                      required
                      type="password"
                      id="password"
                      inputProps={{ style: { textAlign: "center" } }}
                      name="password"
                      label="Heslo"
                      helperText={errors.password ? errors.password : " "}
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(errors.password?.length)}
                    />
                  </div>

                  <div>
                    <TextField
                      required
                      type="password"
                      id="confirmPassword"
                      inputProps={{ style: { textAlign: "center" } }}
                      name="confirmPassword"
                      label="Potvrdiť heslo"
                      helperText={
                        errors.confirmPassword ? errors.confirmPassword : " "
                      }
                      value={values.confirmPassword}
                      onChange={handleChange}
                      error={Boolean(errors.confirmPassword?.length)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      // disabled={!validEmails.includes(values.email)}
                      style={{
                        backgroundColor: !validEmails.includes(values.email)
                          ? "grey"
                          : "rgb(88, 24, 31)",
                      }}
                      className="submitBtn"
                      color="primary"
                      type="submit"
                      variant="contained"
                    >
                      Registrovať
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        <span
          style={{
            color: "rgb(88, 24, 31)",
            fontSize: 14,
            display: "flex",
            justifyContent: "center",
            width: "full",
            marginTop: 5,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Vytvoriť konto" : "Späť na prihlásenie"}
        </span>
      </Card>
    </div>
  );
};
