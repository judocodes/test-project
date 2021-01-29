import { DeepMap, FieldError } from 'react-hook-form';

export function checkErrorPresent(
  errors: DeepMap<FormData, FieldError>
): boolean {
  return !!(
    errors.email ||
    errors.address ||
    errors.confirmPassword ||
    errors.password ||
    errors.fullName
  );
}

export function showErrorMessage(errors: DeepMap<FormData, FieldError>) {
  var error;
  if (errors.fullName) {
    switch (errors.fullName.type) {
      case 'required':
        error = 'Provide your Full Name.';
        break;
    }
  } else if (errors.email) {
    switch (errors.email.type) {
      case 'validate':
        error = 'Please provide a valid Email.';
        break;
      case 'required':
        error = 'You need to provide an Email.';
        break;
    }
  } else if (errors.address) {
    switch (errors.address.type) {
      case 'required':
        error = 'Please provide your address.';
        break;
    }
  } else if (errors.password) {
    switch (errors.password.type) {
      case 'required':
        error = 'Please fill in your password.';
        break;
      case 'minLength':
        error = 'Your password needs to be at least 7 characters.';
        break;
    }
  } else if (errors.confirmPassword) {
    switch (errors.confirmPassword.type) {
      case 'required':
        error = 'Please confirm your password.';
        break;
      case 'validate':
        error = 'Please make sure your passwords match.';
        break;
    }
  }
  return error;
}

export interface FormData {
  fullName?: string;
  email: string;
  address?: string;
  password: string;
  confirmPassword?: string;
}
