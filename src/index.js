import './styles.scss';
import 'bootstrap';
import app from './app.js';
import i18n from 'i18next';
import resources from './locales/index.js';
import * as yup from 'yup';

const elements = {
  form: document.querySelector('.rss-form'),
  linkInput: document.querySelector('#url-input'),
  submitButton: document.querySelector('button[type="submit"]'),
  feedback: document.querySelector('.feedback'),
  languageButtons: document.querySelectorAll('[data-lng]'),

  title: document.querySelector('h1'),
  subtitle: document.querySelector('.lead'),
  inputPlaceholder: document.querySelector('[data-label]'),
  example: document.querySelector('[data-example]'),
  ceatedBy: document.querySelector('[data-createdBy]'),
};


const defaultLng = 'ru';

const initialState = {
  language: defaultLng,
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


const i18nInstance = i18n.createInstance();
i18nInstance.init({
  lng: defaultLng,
  debug: false,
  resources,
}).then(() => {
  yup.setLocale({
    mixed: {
      notOneOf: 'duplicateErr',
    },
    string: {
      url: 'invalidURL',
    },
  });
  app(elements, initialState, i18nInstance);
})
