var equal = require('assert').equal,
	WikiFetch = require('../lib').WikiFetch;

exports.tests = {
		'title should be parsed from wikipedia article': function(finished, prefix) {
			var wikiFetch = new WikiFetch();
			wikiFetch.fetch('Dog', function(err, articleObject) {
				equal('Dog', articleObject.title, prefix + ' title of article was not parsed.');
				finished();
			});
		},
		'article links should be extracted and a lookup table created': function(finished, prefix) {
			var wikiFetch = new WikiFetch();
			wikiFetch.fetch('Dog', function(err, articleObject) {
				equal('Working dogs', articleObject.links['Working_dogs'].title, prefix + ' links not extracted.');
				equal('working dogs', articleObject.links['Working_dogs'].text, prefix + ' links not extracted.');
				finished();
			});
		},
		'text of article should be split into sections': function(finished, prefix) {
			var wikiFetch = new WikiFetch();
			wikiFetch.fetch('Dog', function(err, articleObject) {
				equal(true, articleObject.sections['Dog'].text.indexOf('domestic') > 0, prefix + ' sections not parsed.');
				equal(true, articleObject.sections['Taxonomy'].text.indexOf('gray wolf') > 0, prefix + ' sections not parsed.');
				finished();
			});
		},
		'text contents of article should have links replaced': function(finished, prefix) {
			var wikiFetch = new WikiFetch();
			wikiFetch.fetch('Dog', function(err, articleObject) {
				equal(true, articleObject.sections['Dog'].text.indexOf('[[Domestication_of_the_dog]]') > 0, prefix + ' links not replaced.');
				finished();
			});
		},
		'images should be extracted from article sections': function(finished, prefix) {
			var wikiFetch = new WikiFetch();
			wikiFetch.fetch('Dog', function(err, articleObject) {
				equal('http://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cavalier_King_Charles_Spaniel_trio.jpg/220px-Cavalier_King_Charles_Spaniel_trio.jpg', articleObject.sections['Types and breeds'].images[0], prefix + ' article image not extracted.');
				finished();
			});
		}
};
