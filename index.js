const geoip = require('geoip-lite');

const data = new Map();

function checkRate(limit) {
    if(data.get('rate') >= limit) {
        return true
    }
        return false
}

const block = (opt) => async (request, response, next) => {
    var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress 
    var country = opt.country.map(c => c.toLowerCase());
    var userCountry = geoip.lookup(ip).country.toLowerCase()

    if(country.includes(userCountry)) {
        setTimeout(() => {
            response.send(opt.message)
        }, 50);
    } else {
        next()
    }
}

const set = (opt) => async (request, response, next) => {
    var ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress 
    if(checkRate(opt.rateLimit) == false) {
        // limit aşılmadı
        data.set("rate", ((data.get("rate") == undefined) ? 0 : data.get("rate"))+1)
        next()
    } else {
        // limit aşıldı
        setTimeout(() => {
            response.send(opt.message)
        }, 50);
    }

    if(data.get("ms") !== "started") {
        data.set("ms", "started")
    } else {
        setTimeout(() => {
            data.delete("rate")
            data.delete("ms")
        }, opt.ms * 1000);
    }
}

module.exports = {
    set,
    block
};