export const validate = (username,email,text) => {
  const errors = {};

  // Validate username
  if (!username.trim()) {
    errors.username = "Поле имени не должно быть пустым";
  }

  // Validate email
  if (!email.trim()) {
    errors.email = "Поле email не должно быть пустым";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Проверьте правильность email";
  }

  // Validate text
  if (!text.trim()) {
    errors.text = "Поле текст не должно быть пустым";
  }

  return errors;
};