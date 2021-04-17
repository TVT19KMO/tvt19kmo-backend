const i18next = require("i18next");
const Backend = require("i18next-node-fs-backend");
const middleware = require("i18next-http-middleware");

/**
 * This module contains setup logic for
 * i18n localization middleware.
 *
 * @module locales/i18n
 */

const i18n = () => {
  i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      fallbackLng: "en",
      preload: ["en", "fi"],
      ns: ["translation"],
      defaultNS: "translation",
      backend: {
        loadPath: "locales/{{lng}}/{{ns}}.json",
      },
    });

  return middleware.handle(i18next);
};

module.exports = i18n;
