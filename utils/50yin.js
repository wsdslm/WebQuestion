/**
 * 50音数据的采集
 * Created by wsdslm <wsdslm@gmail.com> on 2015/3/27.
 */
var http = require('http'),
    fs = require('fs'),
    $ = require('cheerio');

http.get('http://en.wikipedia.org/wiki/Romanization_of_Japanese', function (res) {
    var body = '';
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        var list = parseHtml(body);
        var json = JSON.stringify(list);
        fs.writeFile(__dirname + '/../app/data/50yin.json', json);
    })
});

function parseHtml(html) {
    var list = [];
    $('table.wikitable', html).eq(1).find('tr').each(function (idx, obj) {
        if (idx == 0)
            return;
        var iragana = $(obj).find('td').eq(0).text();
        var katakana = $(obj).find('td').eq(1).text();
        var roman = $(obj).find('td').eq(2).text();
        list.push({
            iragana: iragana,
            katakana: katakana,
            roman: roman
        });
    });
    return list;
}