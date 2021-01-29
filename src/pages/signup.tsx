import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import validator from 'validator';
import tw from 'twin.macro';
import { Link } from 'gatsby';
import {
  showErrorMessage,
  FormData,
  checkErrorPresent,
} from '../utils/showErrorMessage';
import { ErrorMessage } from '../components/ErrorMessage';
import '../utils/aws';
import { Auth } from 'aws-amplify';
import { nanoid } from 'nanoid';

const FormStyles = styled.div`
  ${tw`flex flex-col items-center justify-center w-1/4`}

  h2 {
    ${tw`text-3xl text-white font-bold`}
  }

  hr {
    ${tw`bg-white w-full block h-px my-4`}
  }

  form {
    ${tw`flex flex-col w-full`}

    input {
      ${tw`my-2 w-full px-2 py-2 rounded-lg outline-none`}
    }

    button {
      ${tw`bg-red-400 py-2 text-white rounded-lg shadow mt-4 hover:bg-red-300 hover:shadow-lg`}
    }
  }

  a {
    ${tw`text-xs mt-2 hover:text-red-400`}
  }
`;

interface Props {}

export default function Login({}: Props): ReactElement {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  return (
    <FormStyles>
      <h2>Sign Up</h2>
      {isSubmitSuccessful && <div>FUCK YEAH</div>}
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Your Full Name"
          type="text"
          name="fullName"
          ref={register({ required: true })}
        />
        <input
          placeholder="Your@Email.here"
          type="text"
          name="email"
          ref={register({ required: true, validate: validator.isEmail })}
        />
        <input
          placeholder="Your Address"
          type="text"
          name="address"
          ref={register({ required: true })}
        />

        <input
          placeholder="Your Password"
          type="password"
          name="password"
          ref={register({ required: true, minLength: 7 })}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          ref={register({
            required: true,
            validate: function matchPws(pw) {
              return pw == watch('password');
            },
          })}
        />

        <button disabled={isSubmitting}>Sign Up</button>
        {checkErrorPresent(errors) && (
          <ErrorMessage error={showErrorMessage(errors)} />
        )}
      </form>
      <Link to="/login">
        <span>Or Log In</span>
      </Link>
    </FormStyles>
  );

  function onSubmit({
    email,
    password,
    address = '',
    fullName = '',
  }: FormData) {
    return Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
      },
      clientMetadata: {
        address,
        fullName,
      },
    })
      .then(function logUser(user) {
        console.log(user);
        return true;
      })
      .catch(function logError(error) {
        console.error(error);
        return false;
      });
  }
}
