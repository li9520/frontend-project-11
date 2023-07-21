export default {
  translation: {
    interface: {
      title: 'RSS reader',
      subtitle: "Start reading RSS today! It's easy, it's pretty.",
      placeholder: 'RSS link',
      example: 'Examples: https://ru.hexlet.io/lessons.rss',
      submit: 'Add',
      createdBy: `created by <a href="https://ru.hexlet.io/professions/frontend/projects/11"
      target="_blank">Hexlet</a>`,

      view: 'Preview',
      posts: 'Posts',
      feeds: 'Feeds',

      modal: {
        readMore: 'Read more',
        close: 'Close',
      },
    },
    process: {
      messages: {
        processSuccess: 'RSS uploaded successfully',
      },
      error: {
        invalidRSS: 'The resource does not contain a valid RSS',
        network: 'Network error',
        invalidURL: 'The link must be a valid URL',
        duplicateErr: 'RSS already exists',
      },
    },
  },
};
