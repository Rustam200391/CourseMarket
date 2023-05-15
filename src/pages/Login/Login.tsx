import RegistrationItem from "../../components/Form/RegistrationItem";
import style from "./style.module.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    for (const dataKey in data) {
        localStorage.setItem(dataKey, JSON.stringify(data[dataKey]))
    }
};
 
  return (
    <div className={`${style.login}`}>
      <section className={`${style.login__container}`}>
        <h1 className={`${style.login__title}`}>
          Log
          <span className={`${style.login__title} ${style.login__title_green}`}>
            In
          </span>
        </h1>
        <form action="POST" className={`${style.login__form}`} onSubmit={handleSubmit(onSubmit)} >
          <div className={`${style.login__item}`}>
            <RegistrationItem
              {...register("username", {
                required: "Username name is required",
              })} 
              type="text"
              title="login"
              error={false}
            />
            {errors.name && (
          <p>{"The Name Field is Required and must be > 49 characters"}</p>
          )}
          </div>
          <div className={`${style.login__item}`}>
            <RegistrationItem 
             {...register("password", {
              required: "Password is required",
            })}
            title="password" 
            type="password" 
            error={false} />
          </div>

          <div className={`${style.login__memory} ${style.memory}`}>
            <input
              className={`${style.memory__inp}`}
              id="remember-user"
              type="checkbox"
            />
            {/* сделать пользовательский чекбокс */}
            <label className={`${style.memory__label}`} htmlFor="remember-user">
              Remember me
            </label>
          </div>

          <div className={`${style.login__button}`}>
            <Button text="Sign In" type="submit" />
          </div>
        </form>

        <div className={`${style.links}`}>
          <Link to="/forgotPwd">Forget password?</Link>
          <Link to="/registration">Create new account</Link>
        </div>
      </section>
    </div>
  );
};
