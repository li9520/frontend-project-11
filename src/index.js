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
  createdBy: document.querySelector('[data-createdBy]'),

  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),

  modal: {
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalFullArticle: document.querySelector('.full-article'),
    modalCloseSecondary: document.querySelector('.btn-secondary'),
    modalCloseButtons: document.querySelectorAll('[data-bs-dismiss="modal"]'),
  },
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
  uiState: {
    viewedPosts: [],
    previewPostId: null,
  },
  feeds: [],
  posts: [],
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
