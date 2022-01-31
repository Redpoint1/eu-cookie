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
**Attention!** The JS file **MUST** be imported in ```<body>```

The object is available globally through ```window.euCookie```.

### Example

```html
<button onClick="euCookie.open()">Open cookie</button>
```

## Cookie

| Value                | Description                             |
|----------------------|-----------------------------------------|
| 0                    | User declined all cookies               |
| marketing            | User accepted only the marketing cookie |
| analytics            | User accepted only the analytics cookie |
| analytics,marketing  | User accepted only all cookies          |

## PHP

### Example

```php
<?php if (!isset($_COOKIE['eu_cookie']) || $url == "pravidla-cookies"): ?>
  <link rel="stylesheet" href="./eu_cookie.css">
  <script src="./eu_cookie.js"></script> <!-- don't try to load in head -->
<?php endif; ?>}
```

```php
<?php if (!empty($_COOKIE['eu_cookie']) && in_array('marketing', explode(',', $_COOKIE['eu_cookie']))): ?>
  <script src="./marketing.js"></script>
<?php endif; ?>
```

## License

This project is open source and available under the [MIT License](LICENSE).
