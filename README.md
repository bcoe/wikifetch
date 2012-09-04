WikiFetch
=========

Author: [@benjamincoe](https://twitter.com/#/benjamincoe)

Problem
-------

For some NLP research I'm currently doing, I was interested in parsing structured information from Wikipedia articles.

I did not want to use a full-featured MediaWiki parser:

* this would be heavy-handed, all I really wanted was: the text contents from articles, images, and links to other articles.
* I wanted to be able to extend the approach to other websites, e.g., news sites.
* I wanted to use a crawler-based approach, rather than downloading a massive dataset.

The Solution
------------

WikiFetch Crawls a Wikipedia article using Node.js and jQuery. It returns a structured JSON-representation of the page:

```javscript
	{
		"title": "Foobar Article",
		"links": {
			"Link_to_another_article: {
				"text": "Another article.", // the text that was linked.
				"title": "Another_article.", // title attribute <a/> tag.
				"occurrences": 1 // number of times this article was linked.
			}
		},
		"sections": {
			"Section Heading": {
				text: "text contents of section.",
				images: ["http://foobar.jpg"] // images occurring within this section.
			}
		}
	}
```

* Links within sections are replaced with [[article name]], which will have a corresponding entry in **links**.

Usage
-----

```bash
npm install wikifetch -g
wikifetch --article=Dog
```