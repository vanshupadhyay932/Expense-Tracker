/**
 * Check if a value is empty.
 */
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== "";
};

/**
 * Validate email address.
 */
export const isValidEmail = (email) => {
  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailRegex.test(email);
};

/**
 * Validate password.
 * Minimum 8 characters
 * At least one uppercase letter
 * At least one lowercase letter
 * At least one number
 * At least one special character
 */
export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  return passwordRegex.test(password);
};

/**
 * Validate name.
 */
export const isValidName = (name) => {
  return name.trim().length >= 3;
};

/**
 * Validate amount.
 */
export const isValidAmount = (amount) => {
  return !isNaN(amount) && Number(amount) > 0;
};

/**
 * Validate transaction description.
 */
export const isValidDescription = (description) => {
  return description.trim().length <= 250;
};

/**
 * Validate date.
 */
export const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

/**
 * Return validation errors for login form.
 */
export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!isRequired(email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isRequired(password)) {
    errors.password = "Password is required.";
  }

  return errors;
};

/**
 * Return validation errors for register form.
 */
export const validateRegister = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name = "Name is required.";
  } else if (!isValidName(name)) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!isRequired(email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isRequired(password)) {
    errors.password = "Password is required.";
  } else if (!isValidPassword(password)) {
    errors.password =
      "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters.";
  }

  if (!isRequired(confirmPassword)) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

/**
 * Return validation errors for transaction form.
 */
export const validateTransaction = ({
  type,
  category,
  amount,
  description,
  date,
}) => {
  const errors = {};

  if (!isRequired(type)) {
    errors.type = "Transaction type is required.";
  }

  if (!isRequired(category)) {
    errors.category = "Category is required.";
  }

  if (!isValidAmount(amount)) {
    errors.amount = "Enter a valid amount greater than zero.";
  }

  if (description && !isValidDescription(description)) {
    errors.description =
      "Description must not exceed 250 characters.";
  }

  if (!isRequired(date)) {
    errors.date = "Date is required.";
  } else if (!isValidDate(date)) {
    errors.date = "Please select a valid date.";
  }

  return errors;
};