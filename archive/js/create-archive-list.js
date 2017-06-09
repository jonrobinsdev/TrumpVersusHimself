this.compareData = "";
this.getCompareData();
this.lastDate;

/*
$(window).on("load", function() {
	this.createArticleList();
});*/

function createArticleList(){
	for(var i = 0; i < this.compareData.length; i++){
		var createdArchiveListElement = this.createNewCompareElement(i);
		$(".article-list").append(createdArchiveListElement);
	}
}

function createNewCompareElement(index){
	var articleNumber = this.compareData[index].articleNo;
	var articleDate = this.compareData[index].articleDate;
	var articleTitle = this.compareData[index].articleTitle;

	if (this.lastDate == articleDate) {
		articleDate = "";
	} else {
		this.lastDate = articleDate;
	}
	
	var newArchiveListElement = "<h3 class=\"date\">" + articleDate + "</h3><a class=\"article-link\" href=\"http://www.trumpversushimself.com/article?articleNumber=" + articleNumber + "\">" + articleTitle + "</a>";
	if (!newArchiveListElement.indexOf("<script>") != -1 && !newArchiveListElement.indexOf("<iframe") != -1 && !newArchiveListElement.indexOf("onerror") != -1) {
		return newArchiveListElement;
	} else {
		return "";
	}
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
	this.createArticleList();
}