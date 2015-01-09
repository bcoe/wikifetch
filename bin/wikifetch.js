#!/usr/bin/env node
var WikiFetch = require('../lib').WikiFetch,
		argv = require('optimist').argv,
		fs = require('fs');

if (!argv.article) {
	console.log('usage: wikifetch --article=[article_name]')
} else {
	var article = argv.article;

	console.log('Fetching article ' + argv.article + '.');

	var articleObject = (new WikiFetch()).fetch(article, function(err, articleObject) {
		if (err) {
			console.log('Could not fetch article: ' + err);
		} else {
			fs.writeFileSync(article + '.json', JSON.stringify(articleObject));
		}
	});
}
