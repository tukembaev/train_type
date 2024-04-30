import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Resolver, useForm } from "react-hook-form";
import {
  User,
  useGetUserByIdQuery,
  useUpdateUserInfoMutation,
} from "entities/User";
import { Button, ButtonTheme } from "shared/ui/Button/Button";

import cls from "./EditUser.module.scss";

const resolver: Resolver<User> = async (values) => {
  let errors = {};

  if (values.bio.length >= 140) {
    errors = {
      ...errors,
      bio: {
        type: "maxLenght",
        message: "Only 140 characters in bio",
      },
    };
  }
  if (values.keyboard_model.length >= 30) {
    errors = {
      ...errors,
      keyboard_model: {
        type: "maxLenght",
        message: "Only 30 characters in keyboard_model",
      },
    };
  }

  return { values, errors };
};

interface EditUserProps {
  closeEditUser: (arg: boolean) => void;
}
const EditUser: FC<EditUserProps> = ({ closeEditUser }) => {
  const { data: userData } = useGetUserByIdQuery("");
  const [mutate] = useUpdateUserInfoMutation();
  const {
    register: updateUserData,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<User>({ resolver });

  const onSubmit = handleSubmit(async (newUser) => {
    try {
      if (userData) {
        const updatedData = {
          ...userData, // Сохраняем старые данные
          bio: !newUser.bio ? userData.bio : newUser?.bio,
          keyboard_model: !newUser?.keyboard_model
            ? userData.bio
            : newUser.keyboard_model,
        };
        await mutate({ data: updatedData });
      }

      closeEditUser(false);
      reset();
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className={classNames(cls.wrapper, {}, [])}>
        <h1>Edit profile</h1>
        <span className={cls.description}>
          bio{" "}
          {errors.bio ? (
            <p className={cls.error_message}>({errors.bio.message}) </p>
          ) : null}
          <textarea
            {...updateUserData("bio")}
            placeholder="bio"
            defaultValue={userData?.bio}
            className={classNames(cls.input, {}, [
              errors.bio ? cls.error_detected : "",
            ])}
          />
        </span>
        <span className={cls.description}>
          keyboard{" "}
          {errors.keyboard_model ? (
            <p className={cls.error_message}>
              ({errors.keyboard_model.message}){" "}
            </p>
          ) : null}
          <textarea
            {...updateUserData("keyboard_model")}
            placeholder="keyboard_model"
            defaultValue={userData?.keyboard_model}
            className={classNames(cls.input, {}, [
              errors.keyboard_model ? cls.error_detected : "",
            ])}
          />
        </span>
        <Button
          type="submit"
          // onClick={() => reset()}
          theme={ButtonTheme.BACKGROUND}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <h3 style={{ textAlign: "center" }}>
          Development in progress , stay in tune <br /> Will be available in
          version 2.00
        </h3>
        {/* <span className={cls.description}>
                    github{' '}
                    {errors.github_url ? (
                        <p className={cls.error_message}>
                            ({errors.github_url.message}){' '}
                        </p>
                    ) : null}
                    <input
                        {...updateUserData('github_url')}
                        placeholder="github_url"
                        className={classNames(cls.input, {}, [
                            errors.github_url ? cls.error_detected : '',
                        ])}
                    />
                </span> */}
        {/* <span className={cls.description}>
                    country{' '}
                    {errors.country ? (
                        <p className={cls.error_message}>
                            ({errors.country.message}){' '}
                        </p>
                    ) : null}
                    <input
                        {...updateUserData('country')}
                        placeholder="country"
                        className={classNames(cls.input, {}, [
                            errors.country ? cls.error_detected : '',
                        ])}
                    />
                </span> */}
      </div>
    </form>
  );
};

export default EditUser;
