import uniqueId from 'lodash/uniqueId.js';

export default (data, url) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "application/xml");

  const parserErrorCheck = doc.querySelector('parsererror');

  if (parserErrorCheck) {
    const error = new Error();
    error.message = 'Parser Error';
    throw error;
  }

  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;
  const feedId = uniqueId();
  const parsedFeed = { id: feedId, title, description, url };

  const parsedPosts = Array.from(doc.querySelectorAll('item')).map((item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const id = uniqueId();
    const description = item.querySelector('description').textContent;
    return { id, feedId, title, link, description };
  })

  return { parsedFeed, parsedPosts };
}