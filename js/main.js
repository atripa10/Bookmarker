document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName,siteUrl)){
		return false;
	}
	

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	/*
	// local storage only stores string
	localStorage.setItem('test','Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	//console.log(bookmark);
	*/
	//console.log('hi');
	// test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// init array
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		// set to local storage
		console.log('hi');
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	else{
		// get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		// reset back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}
	//clear form
	document.getElementById('myForm').reset();
	fetchBookmarks();

	e.preventDefault();
}
// delete bookmark
function deleteBookmarks(url){
	console.log(url);
	var bookmarks =  JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for (var i = 0 ; i< bookmarks.length;i++){
		if(bookmarks[i].url == url){
			// remove from array
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// re-fetch bookmarks
	fetchBookmarks();
}


// fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//console.log(bookmarks);
	// get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	//console.log(bookmarksResults);
	//document.getElementById('bookmarksResults').innerHTML='Hello';
	bookmarksResults.innerHTML ='';
	for(var i=0; i< bookmarks.length;i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML+='<div class = "well">' + 
									'<h3>' +name+

									'<a class = "btn btn-default" target="_blank" href="'+url+'">Visit</a> ' + 
									'<a onclick ="deleteBookmarks(\''+url+'\')" class = "btn btn-danger" href="#">Delete</a> ' +  
									'</h3>' + 
									'</div>';
	}

}

function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	
	if (!siteUrl.match(regex)) {
  	alert("Use a Valid URL");
	return false;
	} 
	return true;


}
