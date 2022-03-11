// creating a class
class Page {
  	constructor(pageid) {
		this._pageid = pageid;
  	}
	// getter
    get pageid() {
        return this._pageid;
    }
    // setter
    set pageid(value) {
		if (value.length < 1){
			throw new Error ("id must have a value");
		}
		console.log ("in setter pageid=" + value);
        this._pageid = value;
    }
	// getter
    get name() {
        return this._name;
    }
    // setter
    set name(x) {
        this._name = x;
    }
	// getter
    get question1() {
        return this._question1;
    }
    // setter
    set question1(x) {
        this._question1 = x;
    }
  	calcArea() {
    	return this.height * this.width;
  	}

	CheckError(response) {
	  if (response.status >= 200 && response.status <= 299) {
	    return response.json();
	  } else {
	    throw Error(response.statusText);
	  }
	}
	//
	pageContent(_pageid, _sectionid){
		var _pagecontent = "";
		if (_pageid != null){
			// Now call the function inside fetch promise resolver
//				.then(this.CheckError())
			fetch("./assets/pages/data" + _pageid + ".json")
			  .then((response) => {
			    return response.json()
			  })
			  .then((data) => {
			    // Work with JSON data here
			    //console.log(data);

				this.pageid = data[0].id;
				this.name = data[0].name;
				this.question1 = data[0].question1;
				//
			   	console.log(this.pageid);
			    console.log(this.name);
				//setPageName(data[0].pagename);
				_pagecontent = "<h3>" + this.name + "</h3>"
				_pagecontent += "<p id=\"content\">";
				_pagecontent += 	"<div class=\"container\">";
				_pagecontent += 		"<button type=\"button\" class=\"collapsible section" + _sectionid + "\" onclick=\"expand_collapse(event)\">" + data[0].question1 + "</button>";
				_pagecontent += 		"<div class=\"col_content\">";
				_pagecontent += 			data[0].contents
				_pagecontent += 	"</div></div>"
				_pagecontent += 	"<div class=\"container\">";
				_pagecontent += 		"<button type=\"button\" class=\"collapsible section" + _sectionid + "\" onclick=\"expand_collapse(event)\">" + data[0].question2 + "</button>";
				_pagecontent += 		"<div class=\"col_content\">";
				_pagecontent += 			data[0].contents2
				_pagecontent += 	"</div></div>"
				_pagecontent += 	"<div class=\"container\">";
				_pagecontent += 		"<button type=\"button\" class=\"collapsible section" + _sectionid + "\" onclick=\"expand_collapse(event)\">" + data[0].question3 + "</button>";
				_pagecontent += 		"<div class=\"col_content\">";
				_pagecontent += 			data[0].contents3
				_pagecontent += 	"</div></div>"
				_pagecontent += 	"<div class=\"container\">";
				_pagecontent += 		"<button type=\"button\" class=\"collapsible section" + _sectionid + "\" onclick=\"expand_collapse(event)\">" + data[0].question4 + "</button>";
				_pagecontent += 		"<div class=\"col_content\">";
				_pagecontent += 			data[0].contents4
				_pagecontent += 	"</div></div>"
				_pagecontent += "</p>";
				
				//expand_collapse(evt)
				
				//<button class="collapsible">Open Collapsible</button>
				//console.log("_pagecontent" + _pagecontent);
				//PRINT CONTENT
				var pagecontent_Target = document.getElementById('content_main');
				pagecontent_Target.innerHTML = _pagecontent;
			  })
			  .catch((err) => {
				console.log("custom err=" + err);
			    // Do something for an error here
			  })
			
				/*fetch("./assets/pages/data" + _pageid + ".json")
				.then(response => response.json()).catch((error) => { console.log ("data" + _pageid + ".json")}) //NEW condensed.
				//.then (function (response){  //OLD VERSION OF response => response.json()
				//	return response.json();
				//})
				.then(data => this.showPage(data, _pageid)).catch((error) => { console.log ("data" + _pageid + ".json")})  //NEW VERSION ?
				*/
		}

	}
	
	setPageContents(_pagedata, _pageid){
		console.log(_pagedata);
		return _pagedata;
	}
	


}



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
