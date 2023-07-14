import './styles.scss';
import 'bootstrap';
import app from './app.js'


const elements = {
  form: document.querySelector('.rss-form'),
  linkInput: document.querySelector('#url-input'),
  submitButton: document.querySelector('button[type="submit"]'),
  feedback: document.querySelector('.feedback'),
};
const initialState = {
  form: {
    valid: true,
    processState: 'filling',
    error: null,
    fields: {
      rccLink: '',
    },
  },
  links: [],
}

app(elements, initialState);