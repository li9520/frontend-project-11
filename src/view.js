import onChange from 'on-change';

const renderError = (elements, error) => {
  const feedbackElement = elements.feedback;
  feedbackElement.textContent = error;
};

const renderToggleLanguage = (elements, value, previousValue, i18n) => {
  const {
    title, subtitle, inputPlaceholder, submitButton, example,
    createdBy, feeds, posts, modal, feedback, form, linkInput,
  } = elements;
  const languageButtons = Array.from(elements.languageButtons);
  const previousLangButton = languageButtons.find((el) => el.dataset.lng === previousValue);
  const activeLangButton = languageButtons.find((el) => el.dataset.lng === value);

  previousLangButton.classList.replace('btn-primary', 'btn-outline-primary');
  activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');

  title.textContent = i18n.t('interface.title');
  subtitle.textContent = i18n.t('interface.subtitle');
  inputPlaceholder.textContent = i18n.t('interface.placeholder');
  submitButton.textContent = i18n.t('interface.submit');
  example.textContent = i18n.t('interface.example');
  createdBy.innerHTML = i18n.t('interface.createdBy');

  const feedsTitle = feeds.querySelector('.card-tittle');
  const postsTitle = posts.querySelector('.card-tittle');

  if (feedsTitle || postsTitle) {
    feedsTitle.textContent = i18n.t('interface.feeds');
    postsTitle.textContent = i18n.t('interface.posts');
  }

  modal.modalFullArticle.textContent = i18n.t('interface.modal.readMore');
  modal.modalCloseSecondary.textContent = i18n.t('interface.modal.close');

  const buttons = elements.posts.querySelectorAll('button');

  buttons.forEach((button) => {
    // eslint-disable-next-line no-param-reassign
    button.textContent = i18n.t('interface.view');
  });

  feedback.textContent = '';
  form.reset();
  linkInput.classList.remove('is-invalid');
};

const renderFeeds = (container, feeds, i18n) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h2 class='card-tittle h4'>${i18n.t('interface.feeds')}</h2>`;
  card.append(cardBody);
  container.append(card);

  const ulForFeeds = document.createElement('ul');
  ulForFeeds.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = description;
    li.append(h3, p);
    ulForFeeds.append(li);
  });
  card.append(ulForFeeds);
};

const renderPosts = (container, { uiState, posts }, i18n) => {
  // eslint-disable-next-line no-param-reassign
  container.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = `<h4 class='card-tittle'>${i18n.t('interface.posts')}</h4>`;
  card.append(cardBody);
  container.append(card);

  const ulForPosts = document.createElement('ul');
  ulForPosts.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach(({ id, title, link }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    const classList = (uiState.viewedPosts.includes(id)) ? ['fw-bold', 'link-secondary'] : ['fw-normal', 'link-secondary'];
    a.classList.add(...classList);
    a.dataset.id = id;
    a.textContent = title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.dataset.id = id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.textContent = i18n.t('interface.view');
    li.append(a, button);
    ulForPosts.append(li);
  });
  card.append(ulForPosts);
};

const readerProccessState = (elements, processState, i18n) => {
  const feedbackElement = elements.feedback;
  switch (processState) {
    case 'filling':
      feedbackElement.classList.remove('text-danger', 'text-success');
      feedbackElement.textContent = '';
      break;
    case 'sending':
      break;
    case 'finish':
      feedbackElement.classList.add('text-success');
      feedbackElement.textContent = i18n.t('process.messages.processSuccess');
      elements.form.reset();
      break;
    case 'error':
      feedbackElement.classList.add('text-danger');
      elements.form.reset();
      break;
    default:
      break;
  }
};

const renderModal = (elements, state) => {
  const {
    modalTitle, modalBody, modalFullArticle,
  } = elements.modal;

  const previewPost = state.posts
    .filter(({ id }) => id === state.uiState.previewPostId);
  const [{ title, link, description }] = previewPost;

  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalFullArticle.href = link;
};

const render = (elements, state, i18n) => (path, value, previousValue) => {
  switch (path) {
    case 'form.valid':
      elements.linkInput.classList.toggle('is-invalid');
      break;
    case 'form.error':
      if (value !== null) renderError(elements, value);
      break;
    case 'form.processState':
      readerProccessState(elements, value, i18n);
      break;
    case 'language':
      i18n.changeLanguage(value).then(() => {
        renderToggleLanguage(elements, value, previousValue, i18n);
      });
      break;
    case 'feeds':
      renderFeeds(elements.feeds, value, i18n);
      break;
    case 'uiState.viewedPosts':
    case 'posts':
      renderPosts(elements.posts, state, i18n);
      break;
    case 'uiState.previewPostId':
      renderModal(elements, state);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line max-len
export default (elements, initialState, i18n) => onChange(initialState, render(elements, initialState, i18n));
