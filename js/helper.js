this.articleNumber = 0;
this.compareData = "";
getCompareData();

$(document).ready(function(){
	loadInitialElements();
});

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() >= $(document).height() - ($(document).height()/30)) {
		var newCompareElement = createNewCompareElement(this.articleNumber );
		$(".main-compare-container").append(newCompareElement);
		twttr.widgets.load(document.body); 
		animateNewElements();	
this.articleNumber ++;		
	}
});

function loadInitialElements(){
	var newsElements = $(".cheeto-tweet");   
	var tweetElements = $(".news-article");  
	if((newsElements.length == tweetElements.length) && newsElements.length > 0){
		for(var i = 0; i < newsElements.length; i++){
			slideFadeInBothElements(newsElements[i], tweetElements[i]);
		}
	}
}

function animateNewElements(){
	var newsElements = $(".cheeto-tweet.new");   
	var tweetElements = $(".news-article.new");  
	if((newsElements.length == tweetElements.length) && newsElements.length > 0){
		for(var i = 0; i < newsElements.length; i++){
			slideFadeInBothElements(newsElements[i], tweetElements[i]);
		}
	}
}

function slideFadeInBothElements(newsElem, tweetElem){
	slideFadeInLeft(newsElem);
	slideFadeInRight(tweetElem);
}

function slideFadeInLeft(elem){
	elem.classList.remove("new");
	var pos = 350;
	var opacity = 0;
	var id = setInterval(frame, 10);
	function frame() {
		if (pos <= 0) {
		clearInterval(id);
		} else {
		pos -= 5; 
		opacity = (350 - pos)/350;
		elem.style.left = pos + 'px'; 
		elem.style.opacity = opacity;
		}
	}
}

function slideFadeInRight(elem){
	elem.classList.remove("new");
	var pos = -350;
	var opacity = 0;
	var id = setInterval(frame, 10);
	function frame() {
		if (pos >= 0) {
		clearInterval(id);
		} else {
		pos += 5; 
		opacity = (-350 - pos)/-350;
		elem.style.left = pos + 'px'; 
		elem.style.opacity = opacity;
		}
	}
}

function createNewCompareElement(index){
	var articleNumber = this.compareData[index].articleNumber;
	var articleUrl = this.compareData[index].articleUrl;
	var articleImageUrl = this.compareData[index].articleImageUrl;
	var articleTitle = this.compareData[index].articleTitle;
	var articleSubtitle = this.compareData[index].articleSubtitle;
	var tweetHTML = this.compareData[index].tweetHTML;

	var newCompareElement = "<div class=\"main-compare\"><div class=\"main-compare-row row small-collapse medium-uncollapse\"><div class=\"news-article new small-12 medium-6 large-6 columns\"><div class=\"news-article-container\"><a href=\"" + articleUrl + "\" target=\"_blank\"><img class=\"news-article-img\" src=\"" + articleImageUrl + "\"/></a><div class=\"news-article-title-link-container\"><h4 class=\"news-article-title\"><a class=\"news-article-title-link\" href=\"" + articleUrl + "\" target=\"_blank\">" + articleTitle + "</a></h4><a class=\"news-article-link\" href=\"" + articleUrl + "\" target=\"_blank\">" + articleSubtitle + "</a></div></div></div><!--<div class=\"date\"></div>--><div class=\"cheeto-tweet new small-12 medium-6 large-6 columns\"><div class=\"cheeto-tweet-container\">" + tweetHTML + "</div></div></div></div>";
	
	return newCompareElement;
}

function getCompareData(){
	var response;

	$.ajax ({
		url: 'js/data.json',
		dataType: 'json',
		type: 'GET',
		error: function(data){ 
			console.log("Error retrieving data.");
		}, 
		success: function(data) {
			response = JSON.parse(JSON.stringify(data));
			setCompareData(response);
		}  
	});
}

function setCompareData(data){
    this.compareData = data;
}