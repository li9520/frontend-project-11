import * as yup from 'yup';
import watcherState from './view.js';
import axios from 'axios';
import parseRSSfeed from './parse.js';

const validate = (content, state) => {
  const schema = yup.object().shape({
    url: yup.string().url().notOneOf(state.feeds.map((feed) => feed.url)),
  });
  return schema.validate(content);
}

const dowloadRSSfeed = (url) => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`);


export default (elements, initialState, i18n) => {

  const state = watcherState(elements, initialState, i18n);

  elements.languageButtons.forEach((btn) => btn.addEventListener('click', (e) => {
    state.language = e.target.dataset.lng;
  }));

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.form.processState = 'filling';
    const form = e.target;
    const formData = new FormData(form);
    const currentURL = formData.get('url').trim();
    validate({ url:currentURL }, state)
      .then(() => {
        state.form.error = null;
        state.form.valid = true;
        state.form.processState = 'sending'
        return dowloadRSSfeed(currentURL);
      })
      .then(({data}) => {
        const {parsedFeed, parsedPosts} = parseRSSfeed(data.contents, currentURL);
        state.feeds.push(parsedFeed);
        state.posts.push(...parsedPosts);
        state.form.processState = 'finish'
      }).catch((err) => {
        console.log(err.message);
        state.form.processState = 'error';
        state.form.error = (err.message === 'Parser Error') ? i18n.t('process.error.invalidRSS') : i18n.t(`process.error.${err.message}`);
        state.form.valid = false;
      })
  })
}