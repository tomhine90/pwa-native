// creating a class
//notation _id internal variable. 

class Menu {
  	constructor(id, sectionid) {
    	this._id = id;
		this._sectionid = sectionid;
		this._pageArray = new Array(); 
  	}
	set id(x){
		this._id = x;
	}
	get id(){
		if ((this._id == null)|| (typeof this._id == 'undefined')) this._id = 0;
		return this._id;
	}
	set parentid(x){
		this._parentid = x;
	}
	get parentid(){
		//if ((this._sectionid == null)|| (typeof this._sectionid == 'undefined')) this._sectionid = 0;
		return this._parentid;
	}
	set sectionid(x){
		this._sectionid = x;
	}
	get sectionid(){
		//if ((this._sectionid == null)|| (typeof this._sectionid == 'undefined')) this._sectionid = 0;
		return this._sectionid;
	}
	set pageid(x){
		this._pageid = x;
	}
	get pageid(){
		//if ((this._sectionid == null)|| (typeof this._sectionid == 'undefined')) this._sectionid = 0;
		return this._pageid;
	}
	
	//iterate up menu till you get to parentid = 0 then get name and go through cases. 
	set color(x){
		//based on value then set background colors and menu
		switch(x) {
		    case 1:  
		        // body of case 1
				this._bgcolor = "#1a2238"
				//loadPrimary Navigation etc  json file
		        break;
		    case 2:  
		        // body of case 2
				this._bgcolor = "#490b3d"
		        break;
		    case 3:
		        // body of case N
				this._bgcolor = "#ff6a3d"
		        break;	
		    case 4:
		        // body of case N
				this._bgcolor = "#60c2d3"
		        break;	
	    	default:
		        // body of case default
				this._bgcolor = "#fff"
		}		
		document.getElementById("header").style.backgroundColor = this._bgcolor; 

	}
	get color(){
		return this._bgcolor;
	}
	
	//METHODS
	//iterate up pages tree to find the parent node
	findParent(pages, _id, _count, _arr){
		let page = pages.find(el => el.id === parseInt(_id));
		if (_count == 0) {
			this.pageid = page["pageid"];
			this.parentid = page["parentid"];
			//console.log ("page[\"pageid\"]" + page["pageid"]);
			//console.log ("pageid" + this.pageid);
			//console.log ("parentid" + this.parentid);
		}
		//console.log (page["parentid"]);
		if ((page["parentid"] == 0) || (_count == 5)){
			this.sectionid = page["id"];
			this.sectionname = page["pagename"];
			//console.log (this.sectionname);
			this.color = page["id"];
			//return page["id"];
		}else {
			_count = _count + 1;
			this.findParent(pages, page["parentid"], _count, _arr)
		}
		_arr.push(_id);
		return _arr;
	}

	//using filter to first filter out parent pages THEN print the rest of the menu
	////menu.filter_populateMenu(data, _menuid) call from pages-edit from result of 	
	filter_populateMenu(pages, _menuid){
		//add in eventlistener
		//item.addEventListener("click", toggleItem, false);
		var _html_menu = "";			
		var current_page = "";
		var sCMenu;
		var _count = 0;
		var html_count_string = ""
		var titleTarget = "", editViewUrl = "";
		
		//this.id is set in the setters and getters above when Menu class is instantiated.
		//-----------finds SECTION details -------------------------///
		//iterates up the tree to find the sectionID - can use to get an Array - starting with the sectionID and each [] node down.
		var arr = [];
		this.findParent(pages, this.id, 0, arr); //setting the sectionid
console.log("arr=" + arr); //array returns [4,8,10,11]  in order from top to bottom...

		//console.log("this.sectionid=" + this.sectionid);
		//console.log("this.sectionname=" + this.sectionname);
		if (gEditView) editViewUrl = "-edit";
		if (this.sectionname != null ){
			titleTarget = document.getElementById('section_title');
			titleTarget.innerHTML = this.sectionname;
			_html_menu += "<li id=\"" + this.sectionid + "\" class=\"no-break\"><a href=\"./\">Home&nbsp;&nbsp;></a><a href=\"./pages" + editViewUrl + "?id=" + this.sectionid  + "\">&nbsp;&nbsp;Section Home</a></li>";	
		}		
		//check filter function		
		var parentpages = this.filterParentPages(pages);		
		var bExpandedText = "";
		//**INFO*/this loop stops me from merging the two functions - because I quickly grab the parentpages - ie, parentid = 0 and create menu from there. 
		//rather than passing through pages (data from fetch) and using for loop to find page objects where parentid = 0 
		//which would allow me to merge the two functions. 
		for (var page of parentpages)  //looping around the parentpages
		{
			//[shared start]
			current_page = "";
			html_count_string = "";
			bExpandedText = "false";
			
			console.log("page.id=" + page.id + " this.id=" + this.id);
			//need to know if the page.id is a sub-or sub-sub page.etc. 
			if(page.id == this.id) current_page = " class=\"current\" "; //can I open the parent page by using current class?
			if (arr[1]==page.id) bExpandedText = "true";
			//call populateSubPages to get substring and count 
			sCMenu = this.populateSubPages(pages, page.id, "", 0, arr); //passing through the whole pages data returned by json.fetch
			//console.log("/////" + page.pagename + "|||" + sCMenu[0]+ "|||" + sCMenu[1] + "//////");
			if (sCMenu[1] != 0 ) html_count_string = "<div class=\"right-align\">[" + sCMenu[1] + "]</div>";	
			//aria-expanded=\"false\"  update to aria_expanded to true if arr[1]=page.id
			_html_menu +=  "<li id='" + page.id + "' aria-expanded=\"" + bExpandedText + "\" " + current_page + ">"  
			_html_menu +=  	"<a onclick=\"menuItem_click(event," + page.pageid + "," + page.parentid + "," + this.sectionid + ")\" href=''" + current_page + ">" + page.pagename + html_count_string + "</a>";
			_html_menu +=  		sCMenu[0];			
			_html_menu +=  "</li>";
			_count = _count + 1
			//[shared finish]
		}		
		//PRINT MENU
		var menuTarget = document.getElementById('html_menu');
		menuTarget.innerHTML = _html_menu;
		return "";
		//temp call pageUpdate from here. 
		
		//console.log(_html_menu)
		//menuTarget.appendChild(this.renderList(this.x));
	}
	populateSubPages(pages, _parentid, _html_menu, _count, _arr){
		var current_page = "";
		var html_count_string = "";
		var sCMenu;
		var bExpandedText = "";

		_html_menu = _html_menu + "<ul>";
		for (var page of pages) {
	   		if(page.parentid == _parentid) {
				//[shared start]
				current_page = "";
				html_count_string = "";
				bExpandedText = "false";

				console.log("page.id=" + page.id + " this.id=" + this.id);
				if(page.id == this.id) current_page = " class=\"current\" ";
				if (_arr[2]==page.id) bExpandedText = "true";

				//call populateSubPages to get substring and count 
				sCMenu = this.populateSubPages(pages, page.id, "", 0, _arr); //passing through the whole pages data returned by json.fetch
				//console.log("/////" + page.pagename + "|||" + sCMenu[0]+ "|||" + sCMenu[1] + "//////");
				if (sCMenu[1] != 0 ) html_count_string = "<div class=\"right-align\">[" + sCMenu[1] + "]</div>";	
				_html_menu = _html_menu + "<li id='" + page.id + "' aria-expanded=\"" + bExpandedText + "\" " + current_page + ">"  
				_html_menu = _html_menu +	"<a onclick=\"menuItem_click(event," + page.pageid + "," + page.parentid + "," + this.sectionid + ")\" href=''" + current_page + ">" + page.pagename + html_count_string + "</a>";
				_html_menu = _html_menu + sCMenu[0];			
				_html_menu = _html_menu + "</li>";
				_count = _count + 1
				//[shared finish]
	   		}
		}	

		_html_menu = _html_menu + "</ul>";
		return [_html_menu, _count];				
	}
	
	
		//var result = pages.filter(function(page){
 		//   return page.parentid === 0;
		//});
		//if(result.length){         // If there are any results, then
    		//console.log(result[0]) // `result[0]` is the app with the right name.
    		//console.log(result.length) // `result[0]` is the app with the right name.
		//}
		//need to iterate up the tree to find node with parentid = 0 
		//if this.id.parentid = 0 then change header color. 
	filterParentPages(pages){
		var parent_pages_filter = pages.filter( page => page.parentid == this.sectionid)
		//console.log(parent_pages_filter)
		return parent_pages_filter;
	}

	populateMenuArray(pages){
		//**if I ever need to convert the JSON object to an array */
		this.menuArray = Array.from(pages, x=>x);
	}
	//?either use array or not 
	//find all nodes with parent id = 0 then parent id = last parentid etc. 
	//
	populateMenu(pages){
		//**if I ever need to convert the JSON object to an array */
		//this.menuArray = Array.from(pages, x=>x);
		var html_menu = "";
		for (var page of pages) 
		{
			html_menu = html_menu + "<li><a class=\"content\" href=\"?id=" + page.id + "\">" + page.pagename + "</li>"
			//console.log(page.pagename); // John
 		 	//document.write(page.name + "<br />");
		}
		//PRINT MENU
		var menuTarget = document.getElementById('html_menu');
		//menuTarget.appendChild(this.renderList(this.x));
		menuTarget.innerHTML = html_menu;		
	}
	
	renderList(obj) {
		//for every level of our JSON object, we create a ul element
		var result = document.createElement('ul');
		//for every key in the object
	  	for (key in obj) {
			//create a li element and create/add a capitalized copy of the key
	    	var list = document.createElement('li')
	    	var textnode = document.createTextNode(key);
	    	list.appendChild(textnode);
			//     if there's another level to the object, recursively call our function
			//     this will create a new ul which we'll add after our text
	    	if (typeof obj[key] === 'object') {
	      		list.appendChild(renderList(obj[key]));
	    	} else {
				//       otherwise it must be a price. add ': ' and the value to the text
	      		textnode.textContent += ': ' + obj[key];
	    	}
			//     add our completed li to the ul
	    	result.appendChild(list); 
	  	}
		//console.log(result);

		return result;
	}
}
///close of cMenu 

