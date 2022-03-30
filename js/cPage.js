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
		//console.log ("in setter pageid=" + value);
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
	//page.pageContentEdit(pagedata, _pageid, _url_id, _parentid, _sectionid);
	pageContent(data, _pageid, _sectionid){
		var _pagecontent = "";
		if (_pageid != null){
			// Now call the function inside fetch promise resolver
//				.then(this.CheckError())
			    // Work with JSON data here
			    //console.log(data);
				this.pageid = data.id;
				this.name = data[0].name;
				//this.question1 = data[0].question1;
				//
			_pagecontent = "<h3>" + this.name + "</h3>"
			_pagecontent += "<p id=\"content\">";
			_pagecontent += 	data[0].content
			for (let i = 0; i < data[0].questions.length-1; i++) {
				_pagecontent += 	"<div class=\"container\">";
				_pagecontent += 		"<button type=\"button\" class=\"collapsible section" + _sectionid + "\" onclick=\"expand_collapse(event)\">" + data[0].questions[i].question + "</button>";
				_pagecontent += 		"<div class=\"col_content\">";
				_pagecontent += 			data[0].questions[i].contents
				_pagecontent += 	"</div>"
			//	console.log(data[0].questions[i].question);
			//  text += data[0].questions[i] + ", ";
			}
			_pagecontent += "</div>";
			_pagecontent += "</p>";
				
				//<button class="collapsible">Open Collapsible</button>
				//console.log("_pagecontent" + _pagecontent);
				//PRINT CONTENT
				var pagecontent_Target = document.getElementById('content_main');
				pagecontent_Target.innerHTML = _pagecontent;
			
				/*fetch("./assets/pages/data" + _pageid + ".json")
				.then(response => response.json()).catch((error) => { console.log ("data" + _pageid + ".json")}) //NEW condensed.
				//.then (function (response){  //OLD VERSION OF response => response.json()
				//	return response.json();
				//})
				.then(data => this.showPage(data, _pageid)).catch((error) => { console.log ("data" + _pageid + ".json")})  //NEW VERSION ?
				*/
		}
	}
	//page.pageContentEdit(pagedata, _pageid, _url_id, _parentid, _sectionid);
	pageContentEdit(data, _pageid, _id, _parentid, _sectionid){
		if (_pageid != null){
			// Now call the function inside fetch promise resolver
//				.then(this.CheckError())
console.log("data[0].id=" + data[0].id);
console.log("data[0].name=" + data[0].name);
				this.pageid = data[0].id;
				this.name = data[0].name;
				//this.question1 = data[0].question1;
				//
/* 
					  ID <input type="text"  id="editable_id" class="small">
					  ParentID <input type="text"  id="editable_parentid" class="small">
					  PageID <input type="text"  id="editable_pageid" class="small">
					  Page Name: <input type="text"  id="editable_name" class="med"><br/>
						<strong>Content:</strong>
						<textarea id="editable_content" name="editable_content" class="editor-content wide">

*/
				//console.log("data[0].id" + data[0].id);
			    //console.log("data[0]" + data[0]);
			    //console.log("data[0].contents1" + data[0].contents1);

				////
				var page_editable_id = document.getElementById('editable_id');
				page_editable_id.value = _id;

				var page_editable_parentid = document.getElementById('editable_parentid');
				page_editable_parentid.value = _parentid;
				
				var page_editable_pageid = document.getElementById('editable_pageid');
				page_editable_pageid.value = data[0].id;

				var page_editable_name = document.getElementById('editable_name');
				page_editable_name.value = data[0].name;

				tinymce.get("editable_content").setContent(data[0].content);
				//console.log(data[0].content);

				var question_text  = "editable_question1";
				var answer_text = "editable_answer1";
				var page_question = "";

				for (let i = 0; i < data[0].questions.length; i++) {
					//console.log(data[0].questions[i].question);
					//console.log(data[0].questions[i].contents);
					question_text = ("editable_question" + i).toString();
					answer_text = ("editable_answer" + i).toString();

					console.log(question_text);
					console.log(answer_text);
					
					page_question = document.getElementById(question_text);
					page_question.value = data[0].questions[i].question;
					
					tinymce.get(answer_text).setContent(data[0].questions[i].contents);
					//  text += data[0].questions[i] + ", ";
				}	
				/*
				var page_question2= document.getElementById('editable_question2');
				page_question2.value = data[0].question2;
				tinymce.get("editable_answer2").setContent(data[0].contents2);
				
				var page_question3= document.getElementById('editable_question3');
				page_question3.value = data[0].question3;
				tinymce.get("editable_answer3").setContent(data[0].contents3);
				
				var page_question4= document.getElementById('editable_question4');
				page_question4.value = data[0].question4;
				tinymce.get("editable_answer4").setContent(data[0].contents4);
				*/
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
