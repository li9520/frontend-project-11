export default {
  translation: {
    interface: {
      title: 'RSS-агрегатор',
      subtitle: 'Начните читать RSS сегодня! Это легко, это красиво.',
      placeholder: 'Ссылка RSS',
      example: 'Примеры: https://ru.hexlet.io/lessons.rss',
      submit: 'Добавить',
      createdBy: `создано в <a href="https://ru.hexlet.io/professions/frontend/projects/11"
      target="_blank">Hexlet</a>`,

      view: 'Просмотр',
      posts: 'Посты',
      feeds: 'Фиды',

      modal: {
        readMore: 'Читать полностью',
        closeModal: 'Закрыть',
      },
    },
    process: {
      messages: {
        processSuccess: 'RSS успешно загружен',
      },
      error: {
        invalidRSS: 'Ресурс не содержит валидный RSS',
        network: 'Ошибка сети',
        invalidURL: 'Ссылка должна быть валидным URL',
        duplicateErr: 'RSS уже существует',
      },
    },
  },
};
