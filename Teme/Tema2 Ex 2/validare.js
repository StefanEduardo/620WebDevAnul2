function validateForm() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let isValid = true;

  // Verificare nume și prenume
  if (firstName === '') {
    firstNameError.textContent = 'Input your first name.';
    isValid = false;
  } else {
    firstNameError.textContent = '';
  }

  if (lastName === '') {
    lastNameError.textContent = 'Input your first last name.';
    isValid = false;
  } else {
    lastNameError.textContent = '';
  }

  // Verificare email
  if (email === '') {
    emailError.textContent = 'Input your email';
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = 'Please use a valid e-mail address.';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  // Verificare parolă
  if (password === '') {
    passwordError.textContent = 'Input your password';
    isValid = false;
  } else if (!isValidPassword(password)) {
    passwordError.textContent = 'Password must contain atleast 8 characters and include at least one capital letter and a number.';
    isValid = false;
  } else {
    passwordError.textContent = '';
  }

  // Verificare confirmare parolă
  if (confirmPassword === '') {
    confirmPasswordError.textContent = 'Confirm your password.';
    isValid = false;
  } else if (confirmPassword !== password) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    isValid = false;
  } else {
    confirmPasswordError.textContent = '';
  }

  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

function appendErrorMessage(message) {
  const errorMessages = document.getElementById('errorMessages');
  const errorMessageElement = document.createElement('div');
  errorMessageElement.textContent = message;
  errorMessages.appendChild(errorMessageElement);
}