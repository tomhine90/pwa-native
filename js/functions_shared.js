
/*******global variables*****/
var gEditView = false;
var url = window.location;
if (url.toString().includes("pages-edit")) gEditView = true;

//get url param id and use to pass to lamda service to call content from mongodb
var urlParams = new URLSearchParams(url.search);
url_id = urlParams.get('id');
if ((url_id == "")||(url_id == null)){
	url_id = "1";	
}
/*******global variables*****/


/*******end of event listeners*****/
/*FUNCTIONS*/
function menuItem_click(evt, _pageid, _parentid, _sectionid){
	evt.preventDefault();
	var parElem = evt.target.parentElement;
	//parElem.style.backgroundColor = "red";
	if (parElem.getAttribute('aria-expanded') == 'false' || parElem.getAttribute('aria-expanded') ==  null) {
		parElem.setAttribute('aria-expanded', "true");
	} else {
		parElem.setAttribute('aria-expanded', "false");
	}
	//let result2 = url.toString().includes("pages-edit");
	if (gEditView){
		history.pushState('data to be passed', 'Page Title', "pages-edit?id=" + parElem.id);
	}else{
		history.pushState('data to be passed', 'Page Title', "pages?id=" + parElem.id);
	}		
	getContent(_pageid, parElem.id, _parentid, _sectionid)
	//alert(parElem.id);
	//getContent and update page. 
	//updatePage(_pageid, parElem.id, _parentid, _sectionid);					
}
function expand_collapse(evt){
	//var coll = document.getElementsByClassName("collapsible");
	//var i;
	//for (i = 0; i < coll.length; i++) {
	//  coll[i].addEventListener("click", function() {
	//var parElem = evt.target.parentElement;
	//alert(evt.target);
	var event_Button = evt.target;
	event_Button.classList.toggle("active");
//event_Button.style.backgroundColor = "red"; //only updates on click
	var content = event_Button.nextElementSibling;
	if (content.style.maxHeight){
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	} 
	//});
//}
}

function addEvent(cItem){
	cItem.addEventListener( 'click', evnt => {
		//check to see if menuItem if menuItem check to see if has Children
		//evnt.preventDefault();
		closeNav();
	});
}
function changeNavState() {
	var sideNav = document.getElementById("mySidenav");
	if (sideNav.getAttribute("class") == "sidenav"){
		sideNav.style.width = "210px";	
		sideNav.setAttribute("class", "sidenav open");
	}else{
		sideNav.style.width = "0px";
		sideNav.setAttribute('class', "sidenav");
	}
}
function closeNav() {
	var sideNav = document.getElementById("mySidenav");
	sideNav.style.width = "0";
	sideNav.setAttribute('class', "sidenav");
	//document.getElementById("main").style.marginLeft= "0";
}


/******* *****/
//TODO push into offline indexeddb
//need to call lamda and mongo to get menu content based on param id. 
function getMenu(_menuid){
	//instatiate menu class  
	let menu = new Menu(_menuid);  	

	//passing through -1 gets the entire menu json file
	fetch("https://sm5a54kkhi.execute-api.eu-west-1.amazonaws.com/default/listPages?id=-1")
		.then(response => response.json()) //NEW condensed
		.then(data => {
			menu.filter_populateMenu(data, _menuid) //prints out menu of section we are in --> see cMenu.js
			//console.log("in getMenu then statement=" + _url_id)
			//console.log ("_url_id" + _url_id);
			//console.log ("menu.pageid" + menu.pageid);
			getContent(menu.pageid, _menuid, menu.parentid, menu.sectionid); //getContent function in cPage class js file
			//primary_nav.sectionid
		})
}	
//called from getMenu as data needed from menu.json to populate page. 
//call listPages - ie --> return data from ListPages lamda from Pages data. 
function getContent(_pageid, _menuid, _parentid, _sectionid){
	//instatiate page class  
	//console.log("IN getContent()=" + _pageid)
	let page = new Page(_pageid);  	
		
	//console.log("in getContent after new Page() _url_id=" + _url_id)
	//console.log ("_pageid" + _pageid);
	fetch("https://sm5a54kkhi.execute-api.eu-west-1.amazonaws.com/default/listPages?content_id=" + _pageid + "")
		  .then((response) => response.json())
		  .then((pagedata) => {
				if(gEditView){
					page.pageContentEdit(pagedata, _pageid, _menuid, _parentid, _sectionid);				
				}else{
					page.pageContent(pagedata, _pageid, _menuid, _parentid, _sectionid);
				}
				//console.log("in getContent after then statement _url_id=" + _url_id)
				//console.log("pagedata[0]=" + pagedata[0]);
				//pageContent(_pageid, _sectionid)
			})
		  .catch((err) => {
		  	console.log("custom err=" + err);
		     //Do something for an error here
		  })
	//I guess more of a push than a pull 
	//so once this is done it pushes (callsback)
}
	/*
  	plugins: 'link',
  	menubar: 'insert',
  	toolbar: 'link'
	*/
	//plugins: 'lists',
  	//toolbar: 'numlist bullist'
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
