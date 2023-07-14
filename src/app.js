import * as yup from 'yup';
import watcherState from './view.js';

const validate = (content, state) => {
  const schema = yup.object().shape({
    rccLink: yup.string().url('Ссылка должна быть валидным URL').notOneOf(state.links, 'RSS уже существует'),
  });
  return schema.validate(content);
}


export default (elements, initialState) => {
  
  const state = watcherState(elements, initialState);

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
        state.form.error = err;
        state.form.valid = false;
      });
  })
}