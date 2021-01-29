import React, { ReactElement } from 'react';
import { Router } from '@reach/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import validator from 'validator';
import tw from 'twin.macro';
import { Link, navigate } from 'gatsby';
import {
  showErrorMessage,
  FormData,
  checkErrorPresent,
} from '../utils/showErrorMessage';
import { ErrorMessage } from '../components/ErrorMessage';
import '../utils/aws';
import { Auth } from 'aws-amplify';

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
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  return (
    <FormStyles>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="mymail@mail.com"
          type="text"
          name="email"
          ref={register({ required: true, validate: validator.isEmail })}
        />
        <input
          placeholder="password123"
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        <button>Log In</button>
        {checkErrorPresent(errors) && (
          <ErrorMessage error={showErrorMessage(errors)} />
        )}
      </form>
      <Link to="/signup">
        <span>Or Sign Up</span>
      </Link>
      <Link to="/login/anything">Or go here whatever</Link>
      <Router basepath="/">
        <SomeComponent path="/login/anything" />
      </Router>
    </FormStyles>
  );

  interface LogInForm {
    email: string;
    password: string;
  }

  function onSubmit({ email, password }: LogInForm) {
    Auth.signIn({
      username: email,
      password: password,
    }).then(() => {
      console.log('SUCCESS');
      navigate('/app/dashboard');
    });
  }
}

function SomeComponent({ path }: { path: string }): ReactElement {
  return <div>{path}</div>;
}
