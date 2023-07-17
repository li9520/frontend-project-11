import onChange from 'on-change';

const renderError = (elements, error) => {
  const feedbackElement = elements.feedback;
  feedbackElement.textContent = (!error) ? '' : error;
}


const renderToggleLanguage = (elements,  value, previousValue, i18n) => {
  const languageButtons = Array.from(elements.languageButtons);
  const previousLangButton = languageButtons.find((el) => el.dataset.lng === previousValue);
  const activeLangButton = languageButtons.find((el) => el.dataset.lng === value);

  previousLangButton.classList.replace('btn-primary', 'btn-outline-primary');
  activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');

  const feedbackMessageDataset = elements.feedback.dataset.linkMessage;
  elements.title.textContent = i18n.t('interface.title');
  elements.subtitle.textContent = i18n.t('interface.subtitle');
  elements.inputPlaceholder.textContent = i18n.t('interface.placeholder');
  elements.submitButton.textContent = i18n.t('interface.submit');
  elements.example.textContent = i18n.t('interface.example');
  elements.ceatedBy.textContent = i18n.t('interface.createdBy');
  elements.feedback.textContent = i18n.t(feedbackMessageDataset);
}

const render = (elements, i18n) => (path, value, previousValue) => {
  switch (path) {
    case 'form.error':
      renderError(elements, value)
      break;
    case 'form.valid':
      elements.linkInput.classList.toggle('is-invalid')
      break;
    case 'language': 
      i18n.changeLanguage(value).then(() => {
        renderToggleLanguage(elements,  value, previousValue, i18n);
      });
      
      break;
    default:
      break;
  }
}

export default (elements, initialState, i18n) => onChange(initialState, render(elements, i18n));