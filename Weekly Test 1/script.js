const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const special = "!@#$%^&*()_+{}:<>?";

function getRandomUppercase() {
  return upper[Math.floor(Math.random() * upper.length)];
}

function getRandomLowercase() {
  return lower[Math.floor(Math.random() * lower.length)];
}

function getRandomNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomSpecialCharacter() {
  return special[Math.floor(Math.random() * special.length)];
}

function generatePassword() {
  const length = document.getElementById('length').value;
  const useUpper = document.getElementById('uppercase').checked;
  const useLower = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSpecial = document.getElementById('special').checked;

  let password = "";
  let availableCharacters = "";

  if (useUpper) availableCharacters += upper;
  if (useLower) availableCharacters += lower;
  if (useNumbers) availableCharacters += numbers;
  if (useSpecial) availableCharacters += special;

  if (!availableCharacters) {
    alert("Please select at least one character type.");
    return;
  }

  for (let i = 0; i < length; i++) {
    password += availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
  }

  document.getElementById('password-output').value = password;
}

document.getElementById('generate').addEventListener('click', generatePassword);

document.getElementById('copy').addEventListener('click', () => {
  const password = document.getElementById('password-output').value;
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  } else {
    alert("No password to copy.");
  }
});
