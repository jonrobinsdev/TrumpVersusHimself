$(document).ready(function(){
	animateInitialElements();
});

$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() >= $(document).height() - ($(document).height()/30)) {
		var mainCompareElement = "<div class=\"main-compare\"><div class=\"main-compare-row row small-collapse medium-uncollapse\"><div class=\"news-article new small-12 medium-6 large-6 columns\"><div class=\"news-article-container\"><a href=\"http://www.cnn.com/2017/05/18/politics/donald-trump-robert-mueller-appointment/\" target=\"_blank\"><img class=\"news-article-img\" src=\"http://i2.cdn.turner.com/cnn/2017/images/05/08/trump-russia-interactive.jpg\"/></a><div class=\"news-article-title-link-container\"><h4 class=\"news-article-title\"><a class=\"news-article-title-link\" href=\"http://www.cnn.com/2017/05/18/politics/donald-trump-robert-mueller-appointment/\" target=\"_blank\">Trump says special counsel appointment 'hurts our country'</a></h4><a class=\"news-article-link\" href=\"http://www.cnn.com/2017/05/18/politics/donald-trump-robert-mueller-appointment/\" target=\"_blank\">Read the article on cnn.com ></a></div></div></div><!--<div class=\"date\"></div>--><div class=\"cheeto-tweet new small-12 medium-6 large-6 columns\"><div class=\"cheeto-tweet-container\"><blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">This is the single greatest witch hunt of a politician in American history!</p>&mdash; Donald J. Trump (@realDonaldTrump) <a href=\"https://twitter.com/realDonaldTrump/status/865173176854204416\">May 18, 2017</a></blockquote></div></div></div></div>";

		//mainCompareElement.innerHTML = "<blockquote class=\"twitter-tweet\" data-lang=\"en\"><p lang=\"en\" dir=\"ltr\">This is the single greatest witch hunt of a politician in American history!</p>&mdash; Donald J. Trump (@realDonaldTrump) <a href=\"https://twitter.com/realDonaldTrump/status/865173176854204416\">May 18, 2017</a></blockquote><script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>";
		
		//console.log(mainCompareElement);

		$(".main-compare-container").append(mainCompareElement);
		twttr.widgets.load(document.body); 
		animateNewElements();
	}
});

function animateInitialElements(){
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