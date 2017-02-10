+(function (document) {
  /**
   * Переменные
   */
  var
    phoneWrapperStyle = 'padding-top:10px',
    cookieValue = document.cookie
      .replace(/(?:(?:^|.*;\s*)_phone\s*\=\s*([^;]*).*$)|^.*$/, '$1'),

    /**
     * Вспомогательные функции
     */
    getParams = function (url) {
      var
        params = {},
        paramsArray = url.match(/\?(?:.+)$/g)[0]
          .replace(/^\?/g, '')
          .split('&')
          .map(function (param) {
            return param.split('=');
          });

      paramsArray.forEach(function (param) {
        params[param[0]] = param[1];
      });

      return params;
    },

    /**
     * Парсит реферрер и вынимает параметры
     *
     * @return     {number}  10-значный телефонный номер
     */
    getUrlParams = function () {
      var referrerParams = getParams(document.referrer);
      return getParams(referrerParams.u);
    },

    /*
     * Приведение номера к машинному виду
     *
     * @param      {mixed}  phone   The phone
     * @return     {string}
     */
    phoneMachine = function (phone) {
      return '+7' + String(phone);
    },

    /**
     * Приведение номера к человеческому виду
     *
     * @param      {mixed}   phone   The phone
     * @return     {string}  { description_of_the_return_value }
     */
    phoneMan = function (phone) {
      phone = String(phone);
      return '8 ' + phone.substr(0, 3) + ' ' + phone.substr(3, 3) + ' ' +
        phone.substr(6, 2) + ' ' + phone.substr(8, 2);
    },

    /**
     * Заменяет телефоны
     */
    replacePhones = function () {
      var
        urlParams = getUrlParams(),
        phoneForMan = phoneMan(urlParams.num),
        phoneForMachine = phoneMachine(urlParams.num),
        selector = decodeURIComponent(urlParams.selector),
        elements = document.querySelectorAll(selector);

      elements.forEach(function (element) {
        element.innerHTML =
        '<div style="' + phoneWrapperStyle + '">' +
        '  <a href="tel:' + phoneForMachine + '">' + phoneForMan + '</a>' +
        '</div>';
      });
    };

  /**
   * Начало работы
   */
  document.addEventListener('DOMContentLoaded', function () {
    /**
     * Если человек пришел с инстаграма
     */
    if (document.referrer.match(/instagram/) || cookieValue) {
      history.replaceState({}, document.title, document.location.pathname);

      // Пишем куку
      document.cookie = 'phone=true';

      replacePhones();
    }
  });
})(document);
