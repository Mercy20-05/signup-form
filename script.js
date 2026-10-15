document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const strengthMeter = document.getElementById("strengthMeter");
  const strengthText = document.getElementById("strengthText");
  const successBanner = document.getElementById("successMessage");

  // Regex Patterns
  const nameRegex = /^[a-zA-Z\s]{3,40}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Helper function to set inline error
  function setError(input, message) {
    const group = input.closest(".form-group");
    const errorEl = group.querySelector(".error-msg");
    group.classList.remove("success");
    group.classList.add("error");
    errorEl.textContent = message;
  }

  // Helper function to set inline success
  function setSuccess(input) {
    const group = input.closest(".form-group");
    const errorEl = group.querySelector(".error-msg");
    group.classList.remove("error");
    group.classList.add("success");
    errorEl.textContent = "";
  }

  // Clear state when empty
  function clearState(input) {
    const group = input.closest(".form-group");
    const errorEl = group.querySelector(".error-msg");
    group.classList.remove("error", "success");
    errorEl.textContent = "";
  }

  // Validation: Full Name
  function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
      setError(nameInput, "Full name is required.");
      return false;
    }
    if (!nameRegex.test(val)) {
      setError(nameInput, "Name should contain only letters (at least 3 characters).");
      return false;
    }
    setSuccess(nameInput);
    return true;
  }

  // Validation: Email
  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      setError(emailInput, "Email address is required.");
      return false;
    }
    if (!emailRegex.test(val)) {
      setError(emailInput, "Please enter a valid email address (e.g., name@domain.com).");
      return false;
    }
    setSuccess(emailInput);
    return true;
  }

  // Password Strength Evaluator
  function evaluatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // Range 0 to 4
  }

  // Update Strength Meter UI
  function updatePasswordStrengthUI(password) {
    strengthMeter.classList.remove("strength-weak", "strength-fair", "strength-good", "strength-strong");

    if (!password) {
      strengthText.textContent = "Password Strength";
      return 0;
    }

    const score = evaluatePasswordStrength(password);

    switch (score) {
      case 1:
        strengthMeter.classList.add("strength-weak");
        strengthText.textContent = "Strength: Weak";
        break;
      case 2:
        strengthMeter.classList.add("strength-fair");
        strengthText.textContent = "Strength: Fair";
        break;
      case 3:
        strengthMeter.classList.add("strength-good");
        strengthText.textContent = "Strength: Good";
        break;
      case 4:
        strengthMeter.classList.add("strength-strong");
        strengthText.textContent = "Strength: Strong";
        break;
      default:
        strengthMeter.classList.add("strength-weak");
        strengthText.textContent = "Too short";
        break;
    }

    return score;
  }

  // Validation: Password
  function validatePassword() {
    const val = passwordInput.value;
    const score = updatePasswordStrengthUI(val);

    if (!val) {
      setError(passwordInput, "Password is required.");
      return false;
    }

    if (val.length < 8) {
      setError(passwordInput, "Password must be at least 8 characters long.");
      return false;
    }

    if (score < 3) {
      setError(passwordInput, "Include at least an uppercase letter, a number, and a symbol.");
      return false;
    }

    setSuccess(passwordInput);
    return true;
  }

  // Toggle Password Visibility
  togglePasswordBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePasswordBtn.textContent = isPassword ? "🙈" : "👁️";
  });

  // Real-time input listeners (Inline Feedback)
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim() === "") clearState(nameInput);
    else validateName();
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() === "") clearState(emailInput);
    else validateEmail();
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value === "") {
      clearState(passwordInput);
      updatePasswordStrengthUI("");
    } else {
      validatePassword();
    }
  });

  // Form Submit Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default submission

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    // Prevent submission until all fields are valid
    if (isNameValid && isEmailValid && isPasswordValid) {
      successBanner.style.display = "block";
      
      // Clear form inputs
      form.reset();
      
      // Clean up styles
      [nameInput, emailInput, passwordInput].forEach(clearState);
      updatePasswordStrengthUI("");

      setTimeout(() => {
        successBanner.style.display = "none";
      }, 5000);
    }
  });
});