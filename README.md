## geliştirme

- [@burakbbyrmm](https://www.instagram.com/burakbbyrmm)

## genel

**express-anti-ddos**, express.js projelerinin ipv4 kullanıcı trafiklerini eylemlere göre sınırlar ve web sitesini ddos gibi dış saldırılara karşı korur.

kullanıcı trafiği limitlendirmeleri kolay bir şekilde tamamen ayarlanabilir ve projeye yük bindirmez. 

## kurulum

```npm
npm install express-anti-ddos
```

```yarn
yarn add express-anti-ddos
```

## basit kullanım örnekleri

```javascript
const express = require('express')
const limiter = require('express-anti-ddos')
const app = express()

const rateOptions = limiter.set({
  rateLimit: 1000, // trafik
  ms: 5, // saniye
  message: "varsayılan ziyaret limiti aşıldı, lütfen daha sonra tekrar deneyin."
})

// korumayı tüm isteklere karşı açar
app.use(rateOptions)

// korumayı sadece /login rotasına karşı açar
app.get('/login', rateOptions, (request, response) => {
	//...
})
```

`limiter.set` yönergesi ile trafik limitlendirmesi ayarlanabilir. web sitesine **5** saniye içinde **1000**'den fazla istek gönderilirse koruma aktifleşir. `rateLimit` parametresi trafiği belirtir ve sınırsız bir şekilde ayarlanabilir. `ms` parametresi ise saniye cinsinden ziyaret aralığını belirler. `message` parametresi ile kullanıcıya gösterilecek mesaj ayarlanır.

```javascript
const express = require('express')
const limiter = require('express-anti-ddos')
const app = express()

const blockCountry = limiter.block({
  country: ["nl"],
  message: "bu siteye bu ülkeden erişemezsiniz."
})

// korumayı tüm isteklere karşı açar
app.use(blockCountry)

// korumayı sadece /login rotasına karşı açar
app.get('/login', blockCountry, (request, response) => {
	//...
})
```

`limiter.block` yönergesi ile trafiği belirli ülkelere kapatır. örnekte web sitesinin trafik hollanda'ya kapatılmıştır. `country` parametresine sınırsız veri girilebilir. [ülke kodları](https://www.nationsonline.org/oneworld/country_code_list.htm) **alpha 2** cinsinden kabul edilir. 