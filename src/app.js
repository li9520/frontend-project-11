import * as yup from 'yup';
import watcherState from './view.js';

const validate = (content, state) => {
  const schema = yup.object().shape({
    rccLink: yup.string().url().notOneOf(state.links),
  });
  return schema.validate(content);
}


export default (elements, initialState, i18n) => {

  const state = watcherState(elements, initialState, i18n);


  elements.languageButtons.forEach((btn) => btn.addEventListener('click', (e) => {
    state.language = e.target.dataset.lng;
  }));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    state.form.fields.rccLink = formData.get('url');

    validate(state.form.fields, state)
      .then(() => {
        state.form.error = null;
        state.form.valid = true;
        state.links.push(state.form.fields.rccLink);
      }).catch((err) => {
        state.form.error = i18n.t(`form.error.${err.message}`);
        state.form.valid = false;
      });
  })
}