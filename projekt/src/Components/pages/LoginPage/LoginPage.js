import React, { useContext, useEffect } from "react";
import style from "./LoginPage.module.css";
import images from "../../../images/FarmZone.png";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "./ValidationLoginPage";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/config";
import { AppContext } from "../../../AppContext/AppContext";
import Home from "../Home/Home";

export function FormField({ name, errors, touched, value }) {
  return (
    <div>
      <label>{name} </label>
      <Field name={name} value={value} />
      {errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
    </div>
  );
}

export const LoginPage = () => {
  const [login, setLogin] = useState("");

  const [userLogin, setUserLogin] = useState("");

  const [errorForm, setErrorForm] = useState(null);

  const { userLog } = useContext(AppContext);
  const { isUserLogged } = useContext(AppContext);
  const { toLogin } = useContext(AppContext);

  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getUserLogin();
  }, []);

  const getUserLogin = async () => {
    let { data: User, error } = await supabase.from("User").select("*");
    if (error) {
      setErrorForm("Błąd");
      console.log(error);
    }
    if (User) {
      setUserLogin(User);
      setErrorForm(null);
    }
  };
  const checked = () => {
    login ? console.log("tak") : console.log("nie");
  };
  return (
    <>
      <Formik
        initialValues={{
          id: 1,
          Login: "",
          Password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setLogin(values);
          console.log(userLogin);
          console.log(login);
          checked();
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <div>
            <Form onSubmit={handleSubmit} className={style.container}>
              <img
                src={images}
                className={style.container__images}
                alt="logo"
              />
              <div className={style.login}>
                <h1 className={style.login__title}>Logowanie do systemu</h1>
                <Field name={"Login"}>
                  {({ field, meta }) => (
                    <div>
                      <input
                        className={style.login__input}
                        type="text"
                        placeholder="Login"
                        {...field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Login}
                      />
                      {meta.touched && meta.error && (
                        <div className={style.error}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                <Field name={"Password"}>
                  {({ field, meta }) => (
                    <div>
                      <input
                        className={style.login__input}
                        type="Password"
                        placeholder="Password"
                        {...field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Password}
                      />
                      {meta.touched && meta.error && (
                        <div className={style.error}>{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
                {errorForm}
                <button type="submit" className={style.login__btn}>
                  Zaloguj
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;
