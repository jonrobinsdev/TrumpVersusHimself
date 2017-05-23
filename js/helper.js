this.articleNumber = -1;
this.compareData = "";
this.getCompareData();

$(document).ready(function(){
	//this.loadInitialCompareElements();
});

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() >= $(document).height() - ($(document).height()/30)) {
		this.appendNewCompareElement();
	}
});

function loadInitialCompareElements(){
	for(var i = 0; i < 3; i++){
		this.appendNewCompareElement();
	}
}

function appendNewCompareElement(){
	if(this.articleNumber < this.compareData.length-1){
		this.articleNumber ++;		
		var newCompareElement = this.createNewCompareElement(this.articleNumber);
		$(".main-compare-container").append(newCompareElement);
		twttr.widgets.load(document.body); 
		this.animateNewCompareElements();
	}
}

function animateNewCompareElements(){
	var newsElements = $(".cheeto-tweet.new");   
	var tweetElements = $(".news-article.new");  
	if((newsElements.length == tweetElements.length) && newsElements.length > 0){
		for(var i = 0; i < newsElements.length; i++){
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

function createNewCompareElement(index){
	var articleDate = this.compareData[index].articleDate;
	var articleUrl = this.compareData[index].articleUrl;
	var articleImageUrl = this.compareData[index].articleImageUrl;
	var articleTitle = this.compareData[index].articleTitle;
	var articleSubtitle = this.compareData[index].articleSubtitle;
	var tweetHTML = this.compareData[index].tweetHTML;
	var newCompareElement = "<div class=\"date-container\"><p class=\"date\">" + articleDate + "</p></div><div class=\"main-compare\"><!--<div class=\"date\"></div>--><div class=\"main-compare-row row small-collapse medium-uncollapse\"><div class=\"cheeto-tweet new small-12 medium-6 large-6 columns\"><div class=\"cheeto-tweet-container\">" + tweetHTML + "</div></div><div class=\"news-article new small-12 medium-6 large-6 columns\"><div class=\"news-article-container\"><a href=\"" + articleUrl + "\" target=\"_blank\"><img class=\"news-article-img\" src=\"" + articleImageUrl + "\"/></a><div class=\"news-article-title-link-container\"><h4 class=\"news-article-title\"><a class=\"news-article-title-link\" href=\"" + articleUrl + "\" target=\"_blank\">" + articleTitle + "</a></h4><a class=\"news-article-link\" href=\"" + articleUrl + "\" target=\"_blank\">" + articleSubtitle + "</a></div></div></div></div></div>";
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
	this.loadInitialCompareElements();
}