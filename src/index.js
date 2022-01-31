import '@/styles/index.scss'
import htmlTemplate from 'template/template.html'

let euCookie = {
  elem: null,
  options: {
    cookieKey: 'eu_cookie',
    showAfter: 365,
    showDeclinedAfter: 6 * 30, // 6 months
    analyticsValue: 'analytics',
    marketingValue: 'marketing',
    url: './pravidla-cookies',
  },
  init() {
    let options = document.querySelector('[data-eu-config]')?.dataset.euConfig || '{}'
    options = JSON.parse(options)
    for (let key in options) {
      this.options[key] = options[key]
    }
    let cookiePolicy = this.getCookie(this.options.cookieKey)
    if (cookiePolicy === null) this.open()
  },
  open: function () {
    let temp = document.createElement('div')
    this.modal()?.remove()
    temp.innerHTML = this.interpolate(htmlTemplate, this)
    this.elem = temp.firstChild
    temp = null
    document.body.appendChild(this.elem)
    this.addEventListener(
      'click',
      '.eu-container #eu-accept',
      function () {
        this.acceptAll()
        this.saveCookie()
      }.bind(this)
    )
    this.addEventListener(
      'click',
      '.eu-container #eu-decline',
      function () {
        this.declineAll()
        this.saveCookie()
      }.bind(this)
    )
    this.addEventListener(
      'click',
      '.eu-container #eu-custom',
      function () {
        this.hide('.eu-container #eu-basic-container')
        this.show('.eu-container #eu-custom-container')
      }.bind(this)
    )
    this.addEventListener(
      'click',
      '.eu-container #eu-accept-all',
      function () {
        this.acceptAll()
      }.bind(this)
    )
    this.addEventListener(
      'click',
      '.eu-container #eu-decline-all',
      function () {
        this.declineAll()
      }.bind(this)
    )
    this.addEventListener(
      'click',
      '.eu-container #eu-back',
      function () {
        this.hide('.eu-container #eu-custom-container')
        this.show('.eu-container #eu-basic-container')
      }.bind(this)
    )
    this.addEventListener(
      'click',
      '.eu-container #eu-save',
      function () {
        this.saveCookie()
      }.bind(this)
    )
  },
  close: function () {
    this.elem.remove()
    this.elem = null
  },
  interpolate: function (s, obj) {
    return s.replace(/[$]{([^}]+)}/g, function (_, path) {
      const properties = path.split('.')
      return properties.reduce((prev, curr) => prev && prev[curr], obj)
    })
  },
  modal: function () {
    return document.querySelector('.eu-container')
  },
  getCookie: function (key) {
    if (!key) return null
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    )
  },
  setCookie: function (key, expireDays, value) {
    const date = new Date()
    let expires = null
    if (expireDays) {
      date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000)
      expires = date.toUTCString()
    }
    document.cookie = key + '=' + value + '; SameSite=Lax; expires=' + expires + '; path=/'
  },
  setOptions(selector, checked) {
    let options = document.querySelectorAll(selector)
    for (let i = 0; i < options.length; i++) {
      options[i].checked = checked
    }
  },
  acceptAll: function () {
    this.setOptions('.eu-container input[type="checkbox"]:not([disabled])', true)
  },
  declineAll: function () {
    this.setOptions('.eu-container input[type="checkbox"]:not([disabled])', false)
  },
  saveCookie: function () {
    let options = document.querySelectorAll(
      '.eu-container input[type="checkbox"]:not([disabled]):checked'
    )
    let cookieValues = []
    for (let i = 0; i < options.length; i++) {
      cookieValues.push(options[i].value)
    }
    let expirationTime =
      cookieValues.length === 0 ? this.options.showDeclinedAfter : this.options.showAfter
    let cookieValue = cookieValues.join(',') || 0
    this.setCookie(this.options.cookieKey, expirationTime, cookieValue)

    this.close()
  },
  show: function (selector) {
    document.querySelector(selector).classList.remove('hide')
  },
  hide: function (selector) {
    document.querySelector(selector).classList.add('hide')
  },
  addEventListener: function (eventType, selector, listener) {
    ;[].forEach.call(document.querySelectorAll(selector), function (element) {
      element.addEventListener(eventType, listener)
    })
  },
}
window.euCookie = euCookie
euCookie.init()
