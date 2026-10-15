# Signup Form with Validation

A responsive client-side signup form featuring regular expression validations, real-time inline error messaging, and an interactive password strength indicator.

---

## 📌 Project Overview
The objective of this project is to practice robust client-side form validation, regex-based input verification, accessible UI styling, and real-time user feedback without relying on external libraries.

---

## 🚀 Deliverables & Features

1. **Input Fields**:
   - **Full Name**: Validates letters and whitespace with a minimum length of 3 characters.
   - **Email Address**: Validates standard email patterns (`local@domain.extension`).
   - **Password**: Enforces a minimum length of 8 characters, checking for uppercase letters, numbers, and symbols.
2. **Inline Validation Messages**:
   - Clear, accessible error messages appear directly below each field upon typing or submission.
   - Visual cues indicate status (`red` border for errors, `green` border for valid inputs).
3. **Password Strength Indicator**:
   - A 4-stage visual progress bar dynamically classifies passwords into **Weak**, **Fair**, **Good**, or **Strong**.
4. **Prevent Submission Until Valid**:
   - Blocks `submit` events using `event.preventDefault()` until all inputs pass verification.
5. **Bonus UX Feature**:
   - Show/Hide toggle button for password visibility.

---

## 🛠️ Tech Stack & Tools

- **HTML5**: Semantic tags, field grouping, and accessibility attributes.
- **CSS3**: Modern layout (Flexbox/Grid), transitions, and responsive styling.
- **JavaScript (ES6+)**: Event listeners, DOM manipulation, regular expressions, and strength calculations.

---

## 💡 Approach

1. **Semantic HTML Architecture**:
   - Built with `<form novalidate>` to disable default browser tooltips and allow unified custom JavaScript validation.
   - Wrapped inputs with relative containers to support status icons and toggle buttons cleanly.

2. **Regex-Based Validation**:
   - **Email**: Uses `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` to check for valid characters and domain structure.
   - **Name**: Uses `/^[a-zA-Z\s]{3,40}$/` to disallow numbers or symbols.

3. **Incremental Password Strength Algorithm**:
   - Evaluates 4 criteria: length ($\ge 8$), uppercase character (`[A-Z]`), digit (`[0-9]`), and special symbol (`[^A-Za-z0-9]`).
   - Scores mapped to CSS classes updating the 4-bar indicator in real-time.

4. **Event Handling**:
   - Used `input` listeners for immediate feedback as users type.
   - Used a centralized `submit` validator to guarantee no invalid payload can be submitted.

---

## 🏁 Outcome

- Clean, distraction-free user registration experience.
- Immediate inline guidance that helps users resolve input errors before submitting.
- Reliable protection against empty or malformed inputs.