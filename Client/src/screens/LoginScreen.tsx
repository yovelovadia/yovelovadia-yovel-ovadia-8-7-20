import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import httpRequest from "../functions/httpRequest";
import { UserInfo } from "../types";
import TextInput from "../components/TextInput";

const LoginScreen = () => {
  const history = useHistory();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const handleChange = (action: string, data: string): void => {
    setInfo({ ...info, [action]: data });
  };

  const submitForm = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: any = await httpRequest(
        "post",
        "http://localhost:5000/users/login",
        info
      );
      setMessage(response.data.message);
      localStorage.setItem("jwt", response.data.token);
      setTimeout(() => {
        setLoading(false);
        history.push("/tasks");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setMessage(err.response.data.error);
    }
  };

  return (
    <div className={"container"}>
            <div className={"background"}></div>

      <h1 className={"header"}>Login!</h1>
      <form className={"inputsContainer"}>
        <TextInput
          name={"Email"}
          type={"email"}
          placeholder={"email"}
          handleChange={(data) => handleChange("email", data)}
        />
        <TextInput
          name={"Password"}
          type={"password"}
          placeholder={"password"}
          handleChange={(data) => handleChange("password", data)}
        />
      </form>
      {loading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <input
          className={"submitButton"}
          type={"button"}
          value={"Submit"}
          onClick={submitForm}
        />
      )}
      <Link to={"/"}>
        <h5>No user?</h5>
      </Link>
      {message ? (
        <h1 className={"messageResponse"}>{message.replace(/"/g, "")}</h1>
      ) : null}{" "}
    </div>
  );
};
export default LoginScreen;
