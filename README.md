## Options

To change options you need to set ```data-eu-config='{"url": "#"}'```


### Defaults
```josn
{
  cookieKey: 'eu_cookie',
  showAfter: 365,
  showDeclinedAfter: 6 * 30, // 6 months
  analyticsValue: 'analytics',
  marketingValue: 'marketing',
  url: './pravidla-cookies',
},
```

## JS
The object is available globally through ```window.euCookie```.

### Example

```html
<button onClick="euCookie.open()">Open cookie</button>
```

## PHP

### Example

```php
<?php if (!isset($_COOKIE['eu_cookie']) || $url == "pravidla-cookies"): ?>
  <link rel="stylesheet" href=="./eu_cookie.css">
  <script src="./eu_cookie.js"></script>
<?php endif; ?>}

<?php if (!empty($_COOKIE['eu_cookie']) && array_search('marketing', explode(',', $_COOKIE['eu_cookie']))): ?>
  <script src="./marketing.js"></script>
<?php endif; ?>
```

## License

This project is open source and available under the [MIT License](LICENSE).
