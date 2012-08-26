WikiFetch
=========

Author: [@benjamincoe](https://twitter.com/#/benjamincoe)

Problem
-------

For an NLP project I'm currently working on, I wanted to parse structured information from Wikipedia.

I did not want to use a full-featured MediaWiki parser:

* this would be a bit heavy-handed, all I really wanted was: the text content of the article, images, and links to other articles.
* I wanted to use an approach that I could potentially extend to other websites, e.g., news articles.

The Solution
------------

WikiFetch Crawls a Wikipedia article using Node.js and jQuery, returning a structured representation of the page.

```json
	{
		"title": "Foobar Article",
		"links": {
			"Another_article: {
				"text": "text content of link.",
				"title": "title attribute of link.",
				"
			}
		}
	}
```

