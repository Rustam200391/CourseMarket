import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import style from "./style.module.scss";
import RegistrationItem from "../../components/Form/RegistrationItem.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [phoneValue, setPhoneValue] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { phoneNumber, username, email, password, re_password } = data;
    const url = "http://localhost:8000/api/v1/users/";
    // console.log(data);
    try {
      await axios
        .post(url, {
          phoneNumber: phoneNumber,
          username: username,
          email: email,
          password: password,
          re_password: re_password,
        })
        .then((res) => {
          if (res.status === 201) {
            navigate("/dashboard");
          }
        });
    } catch (err) {
      console.warn("ошибка", err);
    }
  };

  // const onChangeNumber = (event) => {
  //   const prefixNumber = (str) => {
  //     if (str === "7") {
  //       return "7 (";
  //     }

  //     if (str === "8") {
  //       return "7 (";
  //     }

  //     if (str === "9") {
  //       return "7 (9";
  //     }

  //     return "7 (";
  //   };

  //   const value = event.target.value.replace(/\D+/g, "");
  //   const numberLength = 11;

  //   let result = "+";

  //   for (let i = 0; i < value.length && i < numberLength; i++) {
  //     switch (i) {
  //       case 0:
  //         result += prefixNumber(value[i]);
  //         continue;
  //       case 4:
  //         result += ") ";
  //         break;
  //       case 7:
  //         result += "-";
  //         break;
  //       case 9:
  //         result += "-";
  //         break;
  //       default:
  //         break;
  //     }
  //     result += value[i];
  //   }

  //   setPhoneValue(result);
  // };

  const regexpPass = /^[a-z0-9!?]{8,}$/;
  //регулярное выражение для пароля состоящего из букв и цифр с нижним подчеркиванием и знаков ! и ? и все это в количестве от 8 символов

  const checkPassword = () => {
    const password = document.getElementById("password").value;
    const confirmpswd = document.getElementById("confirmpswd").value;
    return password === confirmpswd || false;
  };

  return (
    <div className={style.form}>
      <section className={style.form__container}>
        <h1 className={style.form__title}>
          Sign
          <span className={style.form__title_green}>Up</span>
        </h1>

        <form
          action="POST"
          className={style.form__registration}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.form__list}>
            <RegistrationItem title="login" error={errors.login}>
              <input
                {...register("username", { required: true })}
                type="text"
              />
            </RegistrationItem>
          </div>

          <div className={style.form__list}>
            <RegistrationItem title="Phone" error={errors.phone}>
              <input
                type="tel"
                {...register("phoneNumber", {
                  pattern: /^(\+?\d{1,})$/i,
                  required: "Mobile number is required.",
                  minLength: {
                    value: 11,
                    message: "This input must exceed 10 characters",
                  },
                })}
                // onChange={onChangeNumber}
                // value={phoneValue}
              />
              {errors.mobile?.type === "required" &&
                "Mobile Number is required"}
              {errors.mobile?.type === "minLength" &&
                "Min Length 11 characters"}
            </RegistrationItem>
          </div>

          <div className={style.form__list}>
            <RegistrationItem title="email" error={errors.email}>
              <input
                type="text"
                {...register("email", {
                  pattern:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  required: true,
                })}
              />
            </RegistrationItem>
          </div>

          <div className={style.form__list}>
            <RegistrationItem title="password" error={errors.password}>
              <input
                id="password"
                type="password"
                {...register("password", {
                  pattern: regexpPass,
                  required: true,
                  validate: checkPassword,
                })}
              />
            </RegistrationItem>
          </div>

          <div className={style.login__list}>
            <RegistrationItem
              title="confirm password"
              error={errors.confirmpwd}
            >
              <input
                id="confirmpswd"
                type="password"
                {...register("re_password", {
                  required: true,
                  validate: checkPassword,
                })}
              />
            </RegistrationItem>
          </div>

          <div className={style.form__button}>
            <Button text="Sign up" type="submit" />
          </div>
        </form>

        <div className={style.links}>
          <Link to="/">Go home</Link>
        </div>
      </section>
    </div>
  );
};
