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
import axios from "axios";

export const LogInPage = () => {
  const history = useHistory();
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [newUserCreated, setNewUserCreated] = useState<boolean>(false);
  const [lowestPrava, setLowestPrava] = useState<any>(null);

  useEffect(() => {
    if (!!localStorage.getItem("loggedUserId")?.length) {
      history.push("/");
    }
  }, [loggedInUser]);

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

  useEffect(() => {
    axios
      .get("http://localhost:4000/wines/wines/prava/lowest")
      .then((response) => setLowestPrava(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleRegistration = (values: any) => {
    setUserNotFound(false);
    setWrongPassword(false);

    axios
      .post("http://localhost:4000/wines/wines/user", {
        ...values,
        prava: lowestPrava.kod,
        pravaId: lowestPrava._id,
      })
      .then(() => setIsLogin(true))
      .catch((err) => console.log(err))
      .finally(() => setNewUserCreated(true));
  };

  const handleLogin = (values: any) => {
    axios
      .get(`http://localhost:4000/wines/wines/user/${values.email}`)
      .then((response) => {
        if (!response.data) {
          setUserNotFound(true);
        } else {
          handlePasswordCheck(values.password, values.email, response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordCheck = (
    password: string,
    email: string,
    userData: any
  ) => {
    axios
      .get(
        `http://localhost:4000/wines/wines/userPassword/${password}/${email}`
      )
      .then((response) => {
        setWrongPassword(!response.data);

        if (response.data) {
          setLoggedInUser(userData);
          localStorage.setItem("loggedUserId", userData._id);
          history.push("/wines");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="loginLayout"
        style={{
          position: "fixed",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
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

        {newUserCreated && (
          <Card className="loginCard">
            <h3 style={{ color: "green" }}>Nový používateľ bol vytvorený</h3>
          </Card>
        )}

        <Card className="loginCard">
          <h3 style={{ textAlign: "center", color: "rgb(88, 24, 31)" }}>
            {isLogin ? "Prihlásenie" : "Registrácia"}
          </h3>

          {isLogin ? (
            <Formik
              enableReinitialize
              validateOnChange
              validationSchema={validationSchemaLogin}
              initialValues={initialValuesLogin}
              onSubmit={(values, actions) => {
                handleLogin(values);
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
                        style={{
                          backgroundColor: "rgb(88, 24, 31)",
                        }}
                        className="submitBtn"
                        color="primary"
                        type="submit"
                        variant="contained"
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
              enableReinitialize
              validateOnChange
              validationSchema={validationSchemaRegistration}
              initialValues={initialValuesRegistration}
              onSubmit={(values, actions) => {
                handleRegistration({
                  email: values.email,
                  heslo: values.confirmPassword,
                });
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
                        style={{
                          backgroundColor: "rgb(88, 24, 31)",
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

          {wrongPassword && (
            <div
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              Zlé heslo!
            </div>
          )}

          {userNotFound && (
            <div
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              Používateľ sa nenašiel!
            </div>
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
            onClick={() => {
              setIsLogin((prev) => !prev);
              setUserNotFound(false);
              setWrongPassword(false);
            }}
          >
            {isLogin ? "Vytvoriť konto" : "Späť na prihlásenie"}
          </span>
        </Card>
      </div>

      <div
        style={{
          fontSize: "12px",
          fontStyle: "italic",
          fontFamily: "emoji",
          padding: "30px 0",
          position: "fixed",
          width: "100%",
          display: "flex",
          alignItems: "center",
          bottom: 0,
          left: 0,
          zIndex: 100000,
          color: "#fff",
          flexDirection: "column",
        }}
      >
        <p>Malokarpatská vínna oblasť</p>
        <p>&copy; DegustatorApp 2022</p>
      </div>
    </>
  );
};
