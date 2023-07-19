import onChange from 'on-change';

const renderError = (elements, error) => {
  const feedbackElement = elements.feedback;
  feedbackElement.textContent = error;
}


const renderToggleLanguage = (elements, value, previousValue, i18n) => {
  const languageButtons = Array.from(elements.languageButtons);
  const previousLangButton = languageButtons.find((el) => el.dataset.lng === previousValue);
  const activeLangButton = languageButtons.find((el) => el.dataset.lng === value);

  previousLangButton.classList.replace('btn-primary', 'btn-outline-primary');
  activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');

  elements.title.textContent = i18n.t('interface.title');
  elements.subtitle.textContent = i18n.t('interface.subtitle');
  elements.inputPlaceholder.textContent = i18n.t('interface.placeholder');
  elements.submitButton.textContent = i18n.t('interface.submit');
  elements.example.textContent = i18n.t('interface.example');
  elements.createdBy.innerHTML = i18n.t('interface.createdBy');
  console.log(elements.posts);

  const feedsTitle =  elements.feeds.querySelector('.card-tittle');
  const postsTitle =  elements.posts.querySelector('.card-tittle');

  if(feedsTitle || postsTitle) {
    feedsTitle.textContent = i18n.t('interface.feeds');
    postsTitle.textContent = i18n.t('interface.posts');
  }
  
  elements.posts.querySelectorAll('button')
    .forEach((button) => button.textContent = i18n.t('interface.view'));

  elements.feedback.textContent = "";
  elements.form.reset();
  elements.linkInput.classList.remove('is-invalid');
}

const renderFeeds = (container, feeds, i18n) => {
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
    p.classList.add('m-0', 'small', 'text-black-50')
    p.textContent = description;
    li.append(h3, p);
    ulForFeeds.append(li);
  });
  card.append(ulForFeeds);
}


const renderPosts = (container, posts, i18n) => {
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
  posts.forEach(({ id, title, link, description }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.classList.add('fw-normal', 'link-secondary');
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
}

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
      break;
    case 'error':
      feedbackElement.classList.add('text-danger');
      break;
    default:
      break;
  }
}

const render = (elements, i18n) => (path, value, previousValue) => {
  switch (path) {
    case 'form.valid':
      elements.linkInput.classList.toggle('is-invalid')
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
    case 'posts':
      renderPosts(elements.posts, value, i18n);
      break;
    default:
      break;
  }
}

export default (elements, initialState, i18n) => onChange(initialState, render(elements, i18n));