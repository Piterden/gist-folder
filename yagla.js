function yaglaGetFile() {
  (function (w, d) {
    var u = null;
    w.__FILE__ = (function () {
      try {
        u()
      }
      catch (err) {
        if (err.stack) {
          u = (/(http[s]?:\/\/.*):\d+:\d+/m)
            .exec(err.stack);
          if (u && u.length > 1) {
            return u[1]
          }
        }
        u = (d.scripts.length > 0) ? d.scripts[d.scripts.length - 1].src :
          "";
        if (u.length > 0 && u.indexOf("://") < 0 && u.substring(0, 1) !=
          "/") {
          u = location.protocol + "//" + location.host + "/" + u
        }
        return u
      }
    })()
  })(window, document);
  return __FILE__
}
var _YAGLA = (function () {
  var yaglaInstance = null;
  var _YAGLA = function () {
    var yagla = this;
    yagla.$_GET = function (key) {
      var s = window.location.search;
      return yagla.getParamForString(s, key)
    };
    yagla.getHash = function () {
      file = yaglaGetFile();
      return yagla.getParamForString(file, 'h')
    };
    yagla.getParamForString = function (string, key) {
      var s = string.match(new RegExp(key + '=([^&=]+)'));
      return s ? s[1] : ""
    };
    yagla.setCookie = function (name, value) {
      value = encodeURIComponent(value);
      var updatedCookie = name + '=' + value;
      updatedCookie += ";path=/";
      document.cookie = updatedCookie + ";domain=." + yagla.cookieDomain
    };
    yagla.getCookie = function (name) {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(
        /([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
      return matches ? decodeURIComponent(matches[1]) : undefined
    };
    yagla.getCookieDomain = function () {
      var cookiedomain = document.domain;
      var cdp = cookiedomain.split('.');
      if (cdp[0] == "www") cookiedomain = cdp.slice(1)
        .join('.');
      return cookiedomain
    };
    yagla.checkOldBrowser = function () {
      if (!Object.keys) {
        Object.keys = (function () {
          'use strict';
          var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
              toString: null
            })
            .propertyIsEnumerable('toString'),
            dontEnums = ['toString', 'toLocaleString', 'valueOf',
              'hasOwnProperty', 'isPrototypeOf',
              'propertyIsEnumerable', 'constructor'
            ],
            dontEnumsLength = dontEnums.length;
          return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !==
                'function' || obj === null)) {
              throw new TypeError(
                'Object.keys called on non-object');
            }
            var result = [],
              prop, i;
            for (prop in obj) {
              if (hasOwnProperty.call(obj, prop)) {
                result.push(prop)
              }
            }
            if (hasDontEnumBug) {
              for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                  result.push(dontEnums[i])
                }
              }
            }
            return result
          }
        }());
        var JQs = document.createElement('script');
        JQs.setAttribute('type', 'text/javascript');
        JQs.src =
          '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(JQs);
        YAGLA.selector_status = false
      }
    };
    yagla.log = function (mes) {
      if (yagla.logEnabled == 1) {
        console.log("yagla:" + mes)
      }
    };
    yagla.initGA = function (gaid, hostname) {
      if (typeof (gaid) !== "undefined" && gaid !== '') {
        yagla.ga = null;

        function GAFF(a, b, c, d, e, f, g) {
          a.GoogleAnalyticsObject = e, a[e] = a[e] || function () {
            (a[e].q = a[e].q || [])
            .push(arguments)
          }, a[e].l = 1 * new Date, f = b.createElement(c), g = b.getElementsByTagName(
            c)[0], f.async = 1, f.src = d, g.parentNode.insertBefore(
            f, g)
        }
        GAFF(window, document, "script",
          "//www.google-analytics.com/analytics.js", "ga_yagla");
        yagla.ga = ga_yagla || window.ga_yagla;
        yagla.ga("create", gaid, {
          'name': 'trackerY',
          'cookieName': 'trackerY',
          'cookieDomain': hostname
        });
        yagla.ga("trackerY.send", "pageview")
      }
    };
    yagla.sendRequest = function (url, get_params) {
      url += get_params;
      if (yagla.hash != '') {
        url += "&h=" + yagla.hash
      }
      if (yagla.getCampaign != '') {
        url += "&c=" + yagla.getCampaign
      }
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.onreadystatechange = function () {
        if (this.readyState == 'interactive' || document.readyState ==
          'complete') {
          this.onreadystatechange = null
        }
      };
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script)
    };
    yagla.GASendEvent = function (gacategory, gaaction, galabel) {
      if (yagla.ga != null) {
        galabel = galabel || "";
        yagla.ga('trackerY.send', 'event', gacategory, gaaction,
          galabel)
      }
    };
    yagla.cssInit = function () {
      if (document.getElementById('yagla_css')) {
        return
      }
      var css_text = " body {opacity: 0;}";
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("id", "yagla_css");
      if (style.styleSheet) {
        style.styleSheet.cssText = css_text
      }
      else {
        var css_script = document.createTextNode(css_text);
        style.appendChild(css_script)
      }
      document.getElementsByTagName('head')[0].appendChild(style);
      yagla.bodyHide = 1
    };
    yagla.openPageCss = function () {
      if (yagla.bodyHide) {
        yagla.log('openPageCss');
        var yagla_css = document.getElementById('yagla_css');
        document.body.style.visibility = "hidden";
        if (yagla_css) {
          document.getElementsByTagName('head')[0].removeChild(
            yagla_css)
        }
        setTimeout(function () {
          document.body.style.visibility = "visible"
        }, 50);
        yagla.bodyHide = 0
      }
    };
    yagla.addYaglaPanel = function () {
      if (yagla.getYagla == -1) {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.src = yagla.url + "/js/yaglapanel.js?2";
        document.getElementsByTagName('head')[0].appendChild(script);
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.href = yagla.url + "/css/yaglapanel.css?2";
        document.getElementsByTagName('head')[0].appendChild(css)
      }
    };
    yagla.insertReplaces = function (replaces_param, flags) {
      yagla.errorInsertReplace = true;
      yagla.errorComments = "";
      yagla.errorNotFound = "";
      yagla.countCorrectSelector = 0;
      var all_elements_replace = "";
      var type = 0;
      for (var i = 0;
        (Object.keys(replaces_param)
          .length) > i; i++) {
        if (typeof (replaces_param[i]) == 'undefined') {
          continue
        }
        type = replaces_param[i].type;
        if (replaces_param[i].selector !== '') {
          if (yagla.selector_status) {
            all_elements_replace = document.querySelectorAll(
              replaces_param[i].selector)
          }
          else {
            all_elements_replace = $(replaces_param[i].selector)
          }
          if (all_elements_replace.length > 0) {
            yagla.countCorrectSelector++;
            if (type == '2' && replaces_param[i].value !== '') {
              for (var j = 0; all_elements_replace.length > j; j++) {
                all_elements_replace[j].setAttribute('yagladata',
                  all_elements_replace[j].src);
                all_elements_replace[j].src = ""
              }
            }
          }
          if (all_elements_replace.length <= 0) {
            yagla.errorInsertReplace = false;
            yagla.errorComments += (" --- not found element: " +
              replaces_param[i].id);
            yagla.errorNotFound += replaces_param[i].id + "-"
          }
        }
        else {
          yagla.errorInsertReplace = false
        }
      }
      if (yagla.errorInsertReplace || (yagla.countCorrectSelector > 0 &&
          flags.ShowOnlyIfAllFind == 0)) {
        yagla.errorInsertReplace = true;
        yagla.statusReplace = 1;
        for (i = 0;
          (Object.keys(replaces_param)
            .length) > i; i++) {
          if (typeof (replaces_param[i]) == 'undefined') {
            continue
          }
          if (replaces_param[i].selector !== '') {
            if (yagla.selector_status) {
              all_elements_replace = document.querySelectorAll(
                replaces_param[i].selector)
            }
            else {
              all_elements_replace = $(replaces_param[i].selector)
            }
            type = replaces_param[i].type;
            if (all_elements_replace.length >= 0) {
              if (!(flags.ShowOriginIfEmpty == 1 && replaces_param[i].value ==
                  '')) {
                for (j = 0; all_elements_replace.length > j; j++) {
                  switch (type) {
                  case '1':
                    all_elements_replace[j].innerHTML = replaces_param[
                      i].value;
                    break;
                  case '2':
                    all_elements_replace[j].src = replaces_param[i].value;
                    break;
                  case '3':
                    all_elements_replace[j].style.backgroundImage =
                      'url(' + replaces_param[i].value + ')';
                    break;
                  case '4':
                    all_elements_replace[j].value = replaces_param[i].value;
                    break
                  }
                }
              }
            }
          }
        }
      }
      else {
        yagla.log('not found selector')
      }
    };
    yagla.replaces_param = function (name) {
      var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(
        /([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
      return matches ? decodeURIComponent(matches[1]) : undefined
    };
    yagla.getUpdateParams = function (logid) {
      return yagla.updateStat + 'id=' + logid + "&statusreplace=" +
        yagla.statusReplace + "&url=" + yagla.nowUrl + "&yagla=" +
        yagla.getYagla + "&notfound=" + yagla.errorNotFound +
        "&cookie_enable=" + yagla.cookieEnable
    };
    yagla.checkReplaces = function () {
      if (typeof (yagla_params) == "undefined" || typeof (yagla_params.replaces) ==
        "undefined") {
        if (document.body === null) {
          setTimeout(yagla.checkReplaces, yagla.checkErrorTime)
        }
        else {
          yagla.openPageCss()
        }
      }
    };
    yagla.rollBackImage = function () {
      elems = document.querySelectorAll('[yagladata]');
      for (var j = 0; elems.length > j; j++) {
        elems[j].src = elem[j].yagladata;
        elems[j].removeAttribute("yagladata")
      }
    };
    yagla.tryAnotherHash = function (hash) {
      yagla.hashPool = yagla.hashPool.filter(function (val) {
        return val != hash
      });
      if (yagla.hashPool.length > 0 && yagla.requestLimit > 0) {
        yagla.requestLimit -= 1;
        yagla.hash = yagla.hashPool[0];
        yagla.run()
      }
      else {
        yagla.openPageCss()
      }
    };
    yagla.init = function () {
      yagla.log('YaglaInit() ' + yagla.getYagla);
      if (yagla.getYagla !== '') {
        try {
          yagla.log('init TRY 1');
          if (typeof yagla_params != "undefined" && yagla_params !== '') {
            var logid = yagla_params.log;
            var replaces_param = yagla_params.replaces;
            yagla.checkHash = yagla_params['checkHash'];
            if (typeof replaces_param == 'undefined') {
              if (typeof yagla_hash != 'undefined') {
                yagla.tryAnotherHash(yagla_hash);
                return
              }
            }
            if (typeof yagla_params.yaglametrika != 'undefined') {
              yagla.metrika.id = yagla_params.yaglametrika;
              if (typeof yagla_complete === "function") {
                yagla_complete()
              }
            }
            if (typeof yagla_params.gaid != 'undefined') {
              yagla.setCookie("yagla_gaid", yagla_params.gaid);
              yagla.initGA(yagla_params.gaid, yagla.cookieDomain)
            }
            yagla.log('init TRY 2');
            if (typeof replaces_param != 'undefined') {
              if (typeof replaces_param.group != 'undefined') yagla.setCookie(
                "yagla_rep", replaces_param.group);
              InsertReplacesID = setInterval(function () {
                yagla.insertReplaces(replaces_param, yagla_params.flags);
                yagla.log(yagla.errorInsertReplace);
                if (yagla.errorInsertReplace || yagla.checkHash !=
                  null) {
                  if (typeof logid != 'undefined') {
                    update = update = yagla.getUpdateParams(logid);
                    yagla.sendRequest(YAGLA.url, update);
                    yagla.addYaglaPanel()
                  }
                  clearInterval(InsertReplacesID);
                  clearTimeout(ProtectedInsertReplaces);
                  yagla.openPageCss()
                }
              }, yagla.intervalInsert);
              ProtectedInsertReplaces = setTimeout(function () {
                if (typeof logid != 'undefined') {
                  update = yagla.getUpdateParams(logid);
                  yagla.sendRequest(YAGLA.url, update);
                  yagla.rollBackImage();
                  yagla.addYaglaPanel()
                }
                clearInterval(InsertReplacesID);
                yagla.openPageCss()
              }, yagla.checkFindReplaceTime)
            }
            else yagla.openPageCss()
          }
          else {
            yagla.log("yagla_params is undefined")
          }
        }
        catch (e) {
          yagla.log(e)
        }
      }
      else {
        yagla.log('except try Yalga (getyagla is undefined )')
      }
    };
    yagla.updatePage = function () {
      if (yaglaInstance.getYagla !== "") {
        yaglaInstance.url_component.set_replace_page()
      }
      yaglaInstance.url_component.update_replace_page()
    };
    yagla.checkYagla = function () {
      if (yagla.getYagla === "" && yagla.url_component.insert_page_status) {
        if (yagla.fromCookie === undefined || yagla.fromCookie === "" ||
          yagla.fromCookie === 0) {
          yagla.log('empty yagla params & cookie empty')
        }
        else {
          yagla.cookieEnable = 1;
          yagla.getYagla = yaglaInstance.fromCookie;
          yagla.log('Get yagla param from cookies: ' + yaglaInstance.getYagla)
        }
      }
    };
    yagla.run = function () {
      if (yagla.getYagla !== "") {
        yagla.cssInit();
        if (yagla.getYagla == -1) {
          yagla.replace = yagla.$_GET('yaglareplace');
          if (yagla.replace !== "") {
            yagla.log('download replace for preview');
            yagla.sendRequest(yagla.url + yagla.getData,
              'yagla=-1&replace=' + yagla.replace + "&token=" + yagla
              .$_GET('token'))
          }
        }
        else {
          var urlgetdatareplacesparams = 'yagla=' + yagla.getYagla;
          if (yagla.fromCookie == yagla.getYagla) {
            yagla.cookieEnable = 1;
            yagla_rep_fromcookie = yagla.getCookie("yagla_rep");
            if (typeof yagla_rep_fromcookie != 'undefined')
              urlgetdatareplacesparams += "&yagla_rep=" +
              yagla_rep_fromcookie
          }
          else {
            yagla.setCookie("yagla", yagla.getYagla)
          }
          urlgetdatareplacesparams += "&cookie_enable=" + yagla.cookieEnable;
          urlgetdatareplacesparams += "&referrer=" + encodeURIComponent(
            document.referrer);
          urlgetdatareplacesparams += "&url=" + encodeURIComponent(
            document.location.href);
          yagla.sendRequest(yagla.url + yagla.getData,
            urlgetdatareplacesparams)
        }
      }
    };
    yagla.afterAll = function () {
      if (yagla.getYagla === '') {
        yagla.metrika.visitcurrentpage();
        var gaidfromcookie = yagla.getCookie("yagla_gaid");
        if (typeof (gaidfromcookie) !== "undefined" && gaidfromcookie !==
          '') {
          yagla.initGA(gaidfromcookie, yagla.cookieDomain)
        }
        var yagla_cs = yagla.getCookie("yagla_cs");
        if (typeof (yagla_cs) !== "undefined" && yagla_cs !== '') {
          yagla.sendRequest(yagla.url + "/ajax/getservicescode?",
            'servicelist=' + yagla_cs + "&cookie_enable=" + yagla.cookieEnable
          )
        }
      }
    };
    yagla.splitYagla = function () {
      var yaglaMark = yagla.$_GET('yagla')
        .split('_');
      yagla.getCampaign = typeof yaglaMark[1] != 'undefined' ?
        yaglaMark[1] : '';
      return yaglaMark[0]
    };
    yagla.url_component = {
      insert_page_status: false,
      query_clean_urls: ['yagla', 'utm_source', 'utm_medium',
        'utm_campaign', 'utm_content', 'utm_term', 'openstat', 'from',
        'gclid', 'yclid', 'utm_position', 'utm_placement',
        'utm_position_type', 'utm_matchtype', 'utm_network', 'rs',
        'roistat', 'k50id'
      ],
      query_clean: function (url, params_array) {
        for (i = 0; typeof (params_array[i]) != 'undefined'; i++) {
          var pattern = new RegExp('(\\?|&?)(' + params_array[i] +
            '=).*?(&|$)');
          if (url.search(pattern) >= 0) {
            url = url.replace(pattern, '')
          }
        }
        return url
      },
      update_replace_page: function () {
        var replace_url = yagla.getCookie('yagla_page');
        if (typeof (replace_url) != 'undefined') {
          var now_replace_url = this.query_clean(document.location.href,
            this.query_clean_urls);
          if (replace_url == now_replace_url) {
            yagla.log('true page insert');
            this.insert_page_status = true
          }
        }
      },
      set_replace_page: function () {
        var page_url = this.query_clean(document.location.href, this.query_clean_urls);
        yagla.setCookie('yagla_page', page_url);
        this.page_url = page_url
      },
      page_url: undefined
    };
    yagla.metrika = {
      id: yagla.getCookie('yagla_metrika'),
      updatevisitor: function () {
        yagla.setCookie('yagla_metrika', this.id);
        yagla.sendRequest(yagla.metrikaUrl + '/updatevisitor?', 'id=' +
          this.id);
        yagla.log("yagla_metrika=" + this.id);
        yagla.GASendEvent('YaglaReplace', yagla_params.rtype ?
          "replace" : "origin", yagla_params.groupid)
      },
      visitcurrentpage: function () {
        this.id = yagla.getCookie('yagla_metrika');
        if (typeof this.id != 'undefined') {
          yagla.log("send eventpage: " + document.location.href);
          yagla.sendRequest(yagla.metrikaUrl + '/addevent?', 'id=' +
            this.id + '&type=page&param=' + encodeURIComponent(
              document.location.href))
        }
      },
      action: function (actionname) {
        this.id = yagla.getCookie('yagla_metrika');
        if (typeof this.id != 'undefined') {
          yagla.log("action: " + actionname);
          yagla.sendRequest(yagla.metrikaUrl + '/addevent?', 'id=' +
            this.id + '&type=action&param=' + actionname)
        }
        yagla.GASendEvent('YaglaAction', actionname)
      },
      service: function (service) {
        this.id = yagla.getCookie('yagla_metrika');
        if (typeof this.id != 'undefined') {
          yagla.log("service: " + service);
          yagla.sendRequest(yagla.metrikaUrl + '/addevent?', 'id=' +
            this.id + '&type=service&param=' + service)
        }
        yagla.GASendEvent('YaglaService', service)
      }
    };
    yagla.protocol = document.location.protocol == "https:" ? "https:" :
      "http:";
    yagla.url = yagla.protocol + '//yagla.ru';
    yagla.metrikaUrl = yagla.protocol + '//metrika.yagla.ru';
    yagla.getData = '/ajax/getReplaces?';
    yagla.updateStat = '/ajax/updateStatReplaces?';
    yagla.updateGoal = '/ajax/updateGoal?';
    yagla.selector_status = true;
    yagla.updateStatus = false;
    yagla.nowUrl = encodeURIComponent(location.origin + location.pathname);
    yagla.replace = "";
    yagla.checkErrorTime = 5000;
    yagla.checkFindReplaceTime = 5000;
    yagla.intervalInsert = 50;
    yagla.requestLimit = 10;
    yagla.errorInsertReplace = false;
    yagla.errorNotFound = "";
    yagla.errorComments = "";
    yagla.insertReplaceStatus = true;
    yagla.statusReplace = 0;
    yagla.cookieEnable = 0;
    yagla.countCorrectSelector = 0;
    yagla.process = 0;
    yagla.bodyHide = 0;
    yagla.ga = null;
    yagla.replace = null;
    yagla.hash = null;
    yagla.hashPool = [];
    yagla.checkHash = null;
    yagla.getCampaign = '';
    yagla.getYagla = yagla.splitYagla();
    yagla.logEnabled = yagla.$_GET('yaglalog');
    yagla.cookieDomain = yagla.getCookieDomain();
    yagla.fromCookie = yagla.getCookie("yagla");
    return yagla
  };
  return {
    getInstance: function () {
      if (!yaglaInstance) {
        yaglaInstance = new _YAGLA()
      }
      return yaglaInstance
    }
  }
})();
if (typeof YAGLA == "undefined") {
  var YAGLA = _YAGLA.getInstance();
  YAGLA.hash = YAGLA.getHash();
  YAGLA.hashPool.push(YAGLA.hash);
  YAGLA.checkOldBrowser();
  YAGLA.updatePage();
  YAGLA.checkYagla();
  YAGLA.run();
  YAGLA.afterAll();
  YAGLA.checkReplaces();
  yaglametrika = YAGLA.metrika
}
else {
  window.YAGLA.hashPool.push(window.YAGLA.getHash())
}
yaglaSetCookie = function (name, value) {
  YAGLA.setCookie(name, value)
};

function yaglaaction(actionname) {
  window.yaglametrika.action(actionname)
}

function yaglaservice(servicename) {
  window.yaglametrika.service(servicename)
}
