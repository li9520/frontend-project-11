import onChange from 'on-change';

const renderError = (elements, error) => {
  const feedbackElement = elements.feedback;
  feedbackElement.textContent = (!error) ? '' : error.message;
}

const render = (elements) => (path, value) => {
  switch (path) {
    case 'form.error':
      renderError(elements, value)
      break;
    case 'form.valid':
      elements.linkInput.classList.toggle('is-invalid')
      break;
    default:
      break;
  }
}

export default (elements, initialState) => onChange(initialState, render(elements));