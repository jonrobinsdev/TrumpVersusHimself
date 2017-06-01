this.compareData = "";
this.getCompareData();

window.twttr = (function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0],
	t = window.twttr || {};
	if (d.getElementById(id)) return t;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js, fjs);

	t._e = [];
	t.ready = function(f) {
	t._e.push(f);
	};

	return t;
}(document, "script", "twitter-wjs"));

/*
$(window).on("load", function() {
	this.getSpecifiedArticle();
});
*/

function getSpecifiedArticle(){
	var articleNumberFromUrl = $.urlParam("articleNumber");
	if( !isNaN(articleNumberFromUrl)) {
		this.appendNewCompareElement(articleNumberFromUrl);
	}
}

function appendNewCompareElement(articleNumber){
	var newCompareElement = this.createNewCompareElement(articleNumber);
	$(".main-compare-container").append(newCompareElement);
	twttr.widgets.load(document.body); 
	this.animateNewCompareElements();
}

function animateNewCompareElements(){
	var newsElements = $(".cheeto-tweet.new");   
	var tweetElements = $(".news-article.new");  
	if ((newsElements.length == tweetElements.length) && newsElements.length > 0) {
		for (var i = 0; i < newsElements.length; i++) {
			slideInBothCompareElements()
		}
	}
}

function slideInBothCompareElements(){
	slideInLeft();
	slideInRight();
}

function slideInLeft(){
	$(".cheeto-tweet.new").addClass('animated fadeInLeft');
	$(".cheeto-tweet.new").removeClass('new');
}

function slideInRight(){
	$(".news-article.new").addClass('animated fadeInRight');
	$(".news-article.new").removeClass('new');
}

function createNewCompareElement(articleNo){
	var index = getIndexByArticleNo(this.compareData, 'articleNo', articleNo);
	console.log(index);
	var articleDate = this.compareData[index].articleDate;
	var articleUrl = this.compareData[index].articleUrl;
	var articleImageUrl = this.compareData[index].articleImageUrl;
	var articleTitle = this.compareData[index].articleTitle;
	var articleSubtitle = this.compareData[index].articleSubtitle;
	var tweetHTML = this.compareData[index].tweetHTML;
	var newCompareElement = "<div class=\"date-container\"><p class=\"date\">" + articleDate + "</p></div><div class=\"main-compare\"><!--<div class=\"date\"></div>--><div class=\"main-compare-row row small-collapse medium-uncollapse\"><div class=\"cheeto-tweet new small-12 medium-6 large-6 columns\"><div class=\"cheeto-tweet-container\">" + tweetHTML + "</div></div><div class=\"news-article new small-12 medium-6 large-6 columns\"><div class=\"news-article-container\"><a href=\"" + articleUrl + "\" target=\"_blank\"><img class=\"news-article-img\" src=\"" + articleImageUrl + "\"/></a><div class=\"news-article-title-link-container\"><h4 class=\"news-article-title\"><a class=\"news-article-title-link\" href=\"" + articleUrl + "\" target=\"_blank\">" + articleTitle + "</a></h4><a class=\"news-article-link\" href=\"" + articleUrl + "\" target=\"_blank\">" + articleSubtitle + "</a></div></div></div></div></div>";
	if (!newCompareElement.indexOf("<script>") != -1 && !newCompareElement.indexOf("<iframe") != -1 && !newCompareElement.indexOf("onerror") != -1) {
		return newCompareElement;
	} else {
		return "";
	}
}

function getIndexByArticleNo(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr].toString() === value.toString()) {
            return i;
        }
    }
    return -1;
}

function getCompareData(){
	var response;
	$.ajax ({
		url: '/js/data.json',
		dataType: 'json',
		type: 'GET',
		error: function(data){ 
			console.log("Error retrieving data.");
		}, 
		success: function(data) {
			response = JSON.parse(JSON.stringify(data));
			response.sort(dateSort);
			self.setCompareData(response);
		}  
	});
}

function dateSort(a, b) {
    return new Date(b.articleDate).getTime() - new Date(a.articleDate).getTime();
}

function setCompareData(data){
    this.compareData = data;
	this.getSpecifiedArticle();
}

$.urlParam = function(name, url) {
    if (!url) {
     url = window.location.href;
    }
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) { 
        return undefined;
    }
    return results[1] || undefined;
}