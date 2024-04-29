import { nanoid } from "@reduxjs/toolkit";
import {
  useGetAllUsersQuery,
  useGetAllUsersStatisticQuery,
} from "entities/User";
import {
  RegisterFormValues,
  useRegisterUserMutation,
  useRegisterUserStatisticMutation,
} from "features/Authorization";
import { FC, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { classNames } from "shared/lib/classNames/classNames";
import { Block, BlockFlex } from "shared/ui/Block/Block";
import { Button, ButtonTheme } from "shared/ui/Button/Button";

import cls from "./RegistrationForm.module.scss";
import { USER_LOCALSTORAGE_ID } from "shared/const/localstorage";
import { useNavigate } from "react-router-dom";

const resolver: Resolver<RegisterFormValues> = async (values) => {
  let errors = {};

  if (!values.username) {
    errors = {
      ...errors,
      username: {
        type: "required",
        message: "username is required",
      },
    };
  }
  if (!values.password) {
    errors = {
      ...errors,
      password: {
        type: "required",
        message: "password is required",
      },
    };
  } else if (values.password.length < 6) {
    errors = {
      ...errors,
      password: {
        type: "minLength",
        message: "password must be at least 6 characters long",
      },
    };
  }

  if (!values.verifyPassword) {
    errors = {
      ...errors,
      verifyPassword: {
        type: "required",
        message: "verify password is required",
      },
    };
  } else if (values.verifyPassword !== values.password) {
    errors = {
      ...errors,
      verifyPassword: {
        type: "match",
        message: "Passwords do not match.",
      },
    };
  }

  return { values, errors };
};

const RegistrationForm: FC = () => {
  const {
    register: registerValues,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver });
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { refetch } = useGetAllUsersQuery("");
  const { refetch: refetchStatistic } = useGetAllUsersStatisticQuery("");

  const [registerUser] = useRegisterUserMutation();
  const [registerUserStatistic] = useRegisterUserStatisticMutation();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (newUser) => {
    try {
      const userId = nanoid(3);
      registerUser({
        id: userId,
        username: newUser.username,
        password: newUser.password,
      });

      await registerUserStatistic({
        id: userId,
        username: newUser.username,
      });

      setRegisterSuccess(true);
      refetch();
      refetchStatistic();
      reset();
      localStorage.setItem(USER_LOCALSTORAGE_ID, String(userId));
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Block flex={BlockFlex.COLUMN} className={cls.wrapper}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h4>register</h4>
          {registerSuccess ? (
            <span style={{ color: "green" }}>account created</span>
          ) : null}
        </div>
        <span className={cls.description}>
          username{" "}
          {errors.username ? (
            <p className={cls.error_message}>({errors.username.message}) </p>
          ) : null}
        </span>
        <input
          {...registerValues("username")}
          placeholder="username"
          className={classNames(cls.input, {}, [
            errors.username ? cls.error_detected : "",
          ])}
        />

        <span className={cls.description}>
          password{" "}
          {errors.password ? (
            <p className={cls.error_message}>({errors.password.message}) </p>
          ) : null}
        </span>
        <input
          {...registerValues("password")}
          placeholder="password"
          type="password"
          className={classNames(cls.input, {}, [
            errors.password ? cls.error_detected : "",
          ])}
        />
        <span className={cls.description}>
          confirm password{" "}
          {errors.verifyPassword ? (
            <p className={cls.error_message}>
              ({errors.verifyPassword.message}){" "}
            </p>
          ) : null}
        </span>
        <input
          {...registerValues("verifyPassword", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 10 characters",
            },
          })}
          type="password"
          placeholder="verify password"
          className={classNames(cls.input, {}, [
            errors.verifyPassword ? cls.error_detected : "",
          ])}
        />
        <Button
          type="submit"
          theme={ButtonTheme.BACKGROUND}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </Block>
    </form>
  );
};

export default RegistrationForm;
