import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import httpRequest from "../functions/httpRequest";
import { UserInfo } from "../types";
import TextInput from "../components/TextInput";

const SignUpScreen: React.FC = () => {
  const history = useHistory();
  const [message, setMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
    admin: false,
  });

  const handleChange = (action: string, data: string | boolean): void => {
    setInfo({ ...info, [action]: data });
  };

  const submitForm = async (): Promise<any> => {
    let mounted: boolean = true;
    try {
      setLoading(true);
      const response: any = await httpRequest(
        "post",
        "http://localhost:5000/users/signup",
        info
      );
      if (mounted) setMessage(response.data.message);
      setTimeout(() => {
        history.push("/login");
      }, 1000);
      setLoading(false);

      return () => (mounted = false);
    } catch (err) {
      setLoading(false);
      setMessage(err.response.data.error);
    }
  };
  return (
    <div className={"container"}>
            <div className={"background"}></div>

      <h1 className={"header"}>Sign up!</h1>
      <form className={"inputsContainer"}>
        <TextInput
          name={"Name"}
          placeholder={"e.g. Thomas"}
          handleChange={(data) => handleChange("name", data)}
        />
        <TextInput
          name={"Email"}
          placeholder={"e.g. demo@email.com"}
          handleChange={(data) => handleChange("email", data)}
          type={"email"}
        />
        <TextInput
          name={"Password"}
          placeholder={"password"}
          handleChange={(data) => handleChange("password", data)}
          type={"password"}
        />
        <div className={"adminCheckBox"}>
          <h5>Hey you wanna become an admin?</h5>
          <input
            type={"checkbox"}
            onClick={() => handleChange("admin", !info.admin)}
          />
        </div>
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

      <Link to={"login"}>
        <h5>Already got user?</h5>
      </Link>
      {message ? (
        <h1 className={"messageResponse"}>{message.replace(/"/g, "")}</h1>
      ) : null}
    </div>
  );
};

export default SignUpScreen;
