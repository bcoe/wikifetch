var cheerio = require('cheerio'),
		request = require('request'),
		sexy = require('sexy-args');

function WikiFetch(params) {
	sexy.args([this, 'object1'], {
		'object1': {
			articlePrefix: 'http://en.wikipedia.org/wiki/'
		}
	}, function() {
		sexy.extend(this, params);
	});
};

WikiFetch.prototype.fetch = function(articleName, callback) {
	var _this = this;

	this.loadArticle(articleName, function(err, article) {
		if (err) {
			callback(err, null);
			return;
		}
		parsedArticle = {};
		_this.parseTitle(article, parsedArticle);
		_this.parseLinks(article, parsedArticle);
		_this.parseSections(article, parsedArticle);
		callback(null, parsedArticle);
	});
};

WikiFetch.prototype.parseTitle = function(article, parsedArticle) {
	parsedArticle.title = article('#firstHeading').text();
};

WikiFetch.prototype.parseLinks = function(article, parsedArticle) {

	parsedArticle.links = {};

	article('#bodyContent p a').each(function() {
		var element = cheerio(this),
			href = element.attr('href'),
			entityName = href.replace('/wiki/', '');

		// Only extract article links.
		if ( href.indexOf('/wiki/') < 0 ) return;

		// Create or update the link lookup table.
		if ( parsedArticle.links[entityName] ) {
			parsedArticle.links[entityName].occurrences++;
		} else {
			parsedArticle.links[href.replace('/wiki/', '')] = {
				title: element.attr('title'),
				occurrences: 1,
				text: element.text()
			};
		}

		// Replace the element in the page with a reference to the link.
		element.replaceWith('[[' + entityName + ']]');
	});
};

WikiFetch.prototype.parseSections = function(article, parsedArticle) {
	var currentHeadline = parsedArticle.title;

	parsedArticle.sections = {};

	article('#bodyContent p,h2,h3,img').each(function() {
		var element = cheerio(this);

		// Load new headlines as we observe them.
		if (element.is('h2') || element.is('h3')) {
			currentHeadline = element.text().trim();
			return;
		}

		// Initialize the object for this section.
		if (!parsedArticle.sections[currentHeadline]) {
			parsedArticle.sections[currentHeadline] = {
				text: '',
				images: []
			};
		}

		// Grab images from the section don't grab spammy ones.
		if (element.is('img') && element.attr('width') > 50) {
			parsedArticle.sections[currentHeadline].images.push( element.attr('src').replace('//', 'http://') );
			return;
		}

		parsedArticle.sections[currentHeadline].text += element.text();
	});
};

WikiFetch.prototype.loadArticle = function(articleName, callback) {
	request({
		url: this.articlePrefix + articleName
	}, function(err, res, body) {
		var error = err || (res.statusCode != 200 ? res.statusCode : false);
		if (error) {
			callback(error, null);
			return;
		}
		callback(null, cheerio.load(body));
	});
};

exports.WikiFetch = WikiFetch;
