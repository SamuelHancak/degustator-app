import React, { useContext } from "react";
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
  const { setLoggedInUser } = useContext(LoggedInUserContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Neplatná e-mailová adresa!")
      .required("Pole musí byť vyplnené!"),
    password: Yup.string().required("Pole musí byť vyplnené!"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

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
          Prihláste sa
        </h3>

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
                    onBlur={() => console.log(values)}
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
                    onBlur={() => console.log(values)}
                    onChange={handleChange}
                    error={Boolean(errors.password?.length)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    disabled={!validEmails.includes(values.email)}
                    style={{
                      backgroundColor: !validEmails.includes(values.email)
                        ? "grey"
                        : "rgb(88, 24, 31)",
                    }}
                    className="submitBtn"
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setLoggedInUser(values);
                      history.push("/");
                    }}
                  >
                    Prihlásiť
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};
