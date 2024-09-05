// Generic function to update input fields
function updateInput(selectId, inputName) {
  const selectElement = document.getElementById(selectId);
  const inputElement = document.getElementsByName(inputName)[0];
  inputElement.value = selectElement.value;
}

document.addEventListener('DOMContentLoaded', (event) => {
  // Currency select event listener
  const currencySelect = document.getElementById('currencySelect');
  currencySelect.addEventListener('change', () => updateInput('currencySelect', 'currencyInput'));

  // Language select event listener
  const langSelect = document.getElementById('languageSelect');
  langSelect.addEventListener('change', () => updateInput('languageSelect', 'langInput'));

  // Brand select event listener
  const brandSelect = document.getElementById('brandSelect');
  brandSelect.addEventListener('change', () => updateInput('brandSelect', 'brandInput'));

  // Skin select event listener
  const skinSelect = document.getElementById('skinSelect');
  skinSelect.addEventListener('change', () => updateInput('skinSelect', 'skinInput'));

  // Game category select event listener
  const gameCategorySelect = document.getElementById('gameCategorySelect');
  gameCategorySelect.addEventListener('change', () => updateInput('gameCategorySelect', 'gameCategoryInput'));

  // Game interface select event listener
  const gameInterfaceSelect = document.getElementById('gameInterfaceSelect');
  gameInterfaceSelect.addEventListener('change', () => updateInput('gameInterfaceSelect', 'gameInterfaceInput'));

  // Table ID select event listener
  const tabeIDSelect = document.getElementById('tabeIDSelect');
  tabeIDSelect.addEventListener('change', () => updateInput('tabeIDSelect', 'tabeIDInput'));
});
