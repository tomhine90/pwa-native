//********************GET CONTENT on initial page load************************///////
//as called from event Click - getContent(_pageid, parElem.id, _parentid, _sectionid)


//********************SAVE CONTENT - either Page (on form submit) or AddSubPage()************************///////
/* from Download function
	jsonData  += "\"questions\": [";
	jsonData  += writeSubArray();
	jsonData  +=  	"]}]"
*/
	//const parser = new URL(url || window.location);
	//parser.searchParams.set("id", parsedData.id);
	//window.location = parser.href;
	/* already set above 
	var url = window.location;
	var urlParams = new URLSearchParams(url.search);
	url_id = urlParams.get('id');
	if (url_id != parsedData.id){
		//const url = new URL(window.location);
		//url.searchParams.set('id', parsedData.id);
		//window.history.pushState({}, '', url);			
		//window.location.href = url;	
	}
	*/
	//""{\"lastErrorObject\":{\"n\":1,\"updatedExisting\":false,\"upserted\":\"627114e132b7365bcc4fbb9c\"},\"value\":null,\"ok\":1,\"$clusterTime\":{\"clusterTime\":{\"$timestamp\":\"7093473844685439028\"},\"signature\":{\"hash\":\"mO8lHoTMVye5DPUjubZvusuuR90=\",\"keyId\":{\"low\":16,\"high\":1636813032,\"unsigned\":false}}},\"operationTime\":{\"$timestamp\":\"7093473844685439028\"}}""
	//""{\"lastErrorObject\":{\"n\":1,\"updatedExisting\":true},\"value\":{\"_id\":\"6270fca0504b97b8be4d0457\",\"id\":4,\"pageid\":4,\"parentid\":0,\"pagename\":\"Thames valley critical care course\"},\"ok\":1,\"$clusterTime\":{\"clusterTime\":{\"$timestamp\":\"7093468703609585712\"},\"signature\":{\"hash\":\"+1hyZkQ9OtzmoQTfBd8q93g7BLQ=\",\"keyId\":{\"low\":16,\"high\":1636813032,\"unsigned\":false}}},\"operationTime\":{\"$timestamp\":\"7093468703609585712\"}}{\"acknowledged\":true,\"modifiedCount\":0,\"upsertedId\":null,\"upsertedCount\":0,\"matchedCount\":1}""
	//""{\"lastErrorObject\":{\"n\":1,\"updatedExisting\":false,\"upserted\":\"627116ab32b7365bcc525d60\"},\"value\":null,\"ok\":1,\"$clusterTime\":{\"clusterTime\":{\"$timestamp\":\"7093475811780460563\"},\"signature\":{\"hash\":\"9ia98AeqSXEZUxf3jja2cueYWHg=\",\"keyId\":{\"low\":16,\"high\":1636813032,\"unsigned\":false}}},\"operationTime\":{\"$timestamp\":\"7093475811780460563\"}}{\"acknowledged\":true,\"modifiedCount\":0,\"upsertedId\":\"627116ab32b7365bcc525db5\",\"upsertedCount\":1,\"matchedCount\":0}""
	
	//	var a = document.createElement("a");
	//	a.href = URL.createObjectURL(new Blob([result.body], { type: "text/plain" }));
	//    a.download =  "data" + document.getElementById("editable_pageid").value + ".json";
	//    a.click();

/*
[{"_id":"62671229494b8a8d29895518","id":"21","content":"<p></p>","name":"","questions":"[{\"question\":\"Question 1 title \", \"contents\":\"<p>Question 1 content</p>\"}]"}]
	//fetch('https://bbx8g5lf6a.execute-api.eu-west-1.amazonaws.com/default/addpage', { method: 'POST', body: jsonData })
  	//	.then(response => response.json())
  	//	.then(data => console.log(data));

	//console.log ("jsonData" + jsonData);
    //let response = await 
	//fetch('https://bbx8g5lf6a.execute-api.eu-west-1.amazonaws.com/default/addpage', { method: 'POST', body: jsonData });
    //let result = await response.json();
*/
//pass -1 through to the lamda function where it allocates an updated id. 
function addSubPgae(){
	var _menuid = "-1";
	var _parentid = document.getElementById("editable_id").value;
	var _sectionid =  document.getElementById("editable_sectionid").value;
	//create new blank (effectively) page object
	let page = new Page("-1");  		

	//jsonData2 = JSON.stringify('[{"_id":"62671229494b8a8d29895518","id":"-1","content":"<p></p>","name":"","questions":"[{\"question\":\"Question 1 title \", \"contents\":\"<p>Question 1 content</p>\"}]"}]')
	const jsonData = '[{"id": "-1", "name": "", "content": "testing", "questions": "[]"}]';
	const obj = JSON.parse(jsonData);
	console.log(obj.content);
	//page.pageContentEdit(pagedata, _pageid, _menuid, _parentid, _sectionid);
	page.pageContentEdit(obj, "-1", "-1", _parentid, _sectionid);
}

/*used to be called from the download button - now commented out. */
function download() {
	//content, fileName
	//const jsonData = { age: 12, name: "Someone" };
	//"id": 9, "name": "Physiology", "content": "", "question1":
	//var page_questions = document.getElementById('questions');
	//console.log("page_questions" + page_questions);
	//var nameValue = document.getElementById("uniqueID").value;	
	
	//.replace(/(&nbsp;)*/g, "")).replace(/(<p>)*/g, "")).replace(/<(\/)?p[^>]*>/g, "");
	jsonData   = 	"[{" 
	jsonData  +=  	JSON.stringify("id") + ":" + JSON.stringify(document.getElementById("editable_id").value) + ","
	jsonData  +=  	JSON.stringify("parentid") + ":" + JSON.stringify(document.getElementById("editable_parentid").value) + ","
	jsonData  +=  	JSON.stringify("pageid") + ":" + JSON.stringify(document.getElementById("editable_pageid").value) + ","
	jsonData  +=  	JSON.stringify("pagename") + ":" + JSON.stringify(document.getElementById("editable_name").value) + ","
	jsonData  +=  	JSON.stringify("content") + ":" + JSON.stringify(tinyMCE.get('editable_content').getContent()) + ","
	jsonData  += "\"questions\": [";
	jsonData  += writeSubArray();
	jsonData  +=  	"]}]";

    var a = document.createElement("a");
	//JSON.stringify(formJSON, null, 2);
    //var file = new Blob(jsonstring, {type: "text/plain"})
	a.href = URL.createObjectURL(new Blob([jsonData], { type: "text/plain" }));
    a.download =  "data" + document.getElementById("editable_pageid").value + ".json";
    a.click();
}


function handleSubmit(event) {
	event.preventDefault();
	var parElem = event.target.parentElement;
	 const data = new FormData(parElem);
	console.log(tinyMCE.get('editable_content').getContent());
	const value = Object.fromEntries(data.entries());
	// const value = data.get('editable_id');
  	console.log({ value });
}
/*{
  "id": 9922,
  "parentid": 0,
  "pageid": 9922,
  "pagename": "new test", 
  "content" : "content for the pages collection/table"
}*/
//download(jsonData, 'json.txt', 'text/plain');
	


//********************FUNCTIONS************************///////
/*This function is called from each Menu click*/
/** called from cMenu-page.js***/
function updatePage(_pageid, _id, _parentid, _sectionid){
	let page1 = new Page(_pageid);
	let result2 = url.toString().includes("pages-edit");
	if (result2){
		page1.pageContentEdit(_pageid, _id, _parentid,  _sectionid);								
	}else{
		page1.pageContent(_pageid, _sectionid);					
	}		
}
/*
<div>  	
	Question: <input type="text"  id="editable_question4" class="wide">
	<textarea id="editable_answer4" name="editable_answer4" class="editor-content wide"></textarea>
</div>
*/
/*add Questions dynamically*/
/*add Question div?*/
//adds blank question //need to combine to add blank content OR populated content 
function addQuestion(_bwithContent){
	//var elem = document.getElementById('container');
	var page_questions = document.getElementById('questions');
	var questions_count = page_questions.childNodes.length;

	updated_number = questions_count;
	console.log("updated_number="+ updated_number);
	 
	var text_string = "Expandable text " + updated_number;
	var question_string = "editable_question" +  updated_number.toString();
	var answer_string = "editable_answer" +  updated_number.toString();

	const text_elem = document.createTextNode(text_string);
	const input_elem = document.createElement("input");
	input_elem.setAttribute('id', question_string);
	input_elem.setAttribute('type', "text");
	input_elem.setAttribute('class', "med");
		
	const textarea_elem = document.createElement("textarea");
	textarea_elem.setAttribute('id', answer_string);
	textarea_elem.setAttribute('name', answer_string);
	textarea_elem.setAttribute('class', "editor-content wide");

	const div_elem = document.createElement("div");
	div_elem.appendChild(text_elem);
	div_elem.appendChild(input_elem);
	div_elem.appendChild(textarea_elem);
	page_questions.appendChild(div_elem);

	console.log(_bwithContent);		
	//called from AddPage click when _bwithContent = false //called from cPage - pageContentEdit with _bwithContent == true
	if (_bwithContent == false){

	    tinymce.init({
	    	selector: '.editor-content',
			plugins: 'table code lists fullscreen',
	  		toolbar: 'undo redo | formatselect | bold italic | ' +
	    	'alignleft aligncenter alignright alignjustify | indent outdent | ' +
			'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol'    });
	}
	//tinyMCE.execCommand("mceAddControl", false, textarea_elem.id)
	//page_questions.append("Question5: <input type=\"text\"  id=\"editable_question5\" class=\"wide\">");
	//page_questions.append("<textarea id=\"editable_answer1\" name=\"editable_answer5\" class=\"editor-content wide\"></textarea>");

}	

	//primary_nav.menuID(url_id);
	//primary_nav.setColor();
	//not filled as async .......
	//console.log(primary_nav.menuArray);
	//not filled as async .......
	//class declaration for Page
	//page1 is an instance of Page class

/*
		const div_elem = document.createElement("div");
		div_elem.appendChild(text_elem);
		div_elem.appendChild(input_elem);
		div_elem.appendChild(textarea_elem);
		page_questions.appendChild(div_elem);
*/
//called from jsonData above once submit has been pressed. 
//Need to stop submit from being pressed just for adding editable area. 
function writeSubArray(){
	//var subArray  = "\"questions\": [";
	var subArray = "";
	var subString = ""
	let questions_list = document.getElementById("questions").childNodes;	 //gets back DIVs
	var collection;
	
	//var  array = Array.from(questions_list.childNodes);
	//collection.forEach(function(item){
	//    console.log(item);
	//});
	for (let i = 0; i <= questions_list.length-1; i++) {
		//just brings back the divs
		//console.log(questions_list[i].tagName);
		if ((questions_list[i].children[0].tagName == "INPUT") && (questions_list[i].children[0].value != "")){
			subArray += "{\"question\":"
			subArray +=  JSON.stringify(questions_list[i].children[0].value);
		} 
		if (questions_list[i].children[1].tagName == "TEXTAREA"){
			subArray += ", \"contents\":"
			subArray += JSON.stringify(tinyMCE.get(questions_list[i].children[1].id).getContent()); //returns the node...	
			subArray += "},"
		}
	}	
	subString  +=  subArray.slice(0,-1);
	return subString; 
}


function toggleMenu(p_pageid){
	console.log (p_pageid);
}
//populate();
//OLD VERSION OF FETCH AND RESPONSE - NOW JUST NEED response.json and .then which is async already
async function populate() {
  const requestURL = './assets/testdata.json';
  const request = new Request(requestURL);
  const response = await fetch(request);
  const menuData = await response.json();
  //populateMenu(menuData);

  const requestPageURL = './assets/testpagedata.json';
  const requestPage = new Request(requestPageURL);
  const responsePage = await fetch(requestPage);
  const pageData = await responsePage.json();
  populatePage(pageData);
}

//I do not need to do this with the menu as I can populate it from the indexedDB
//so I just need to call cidb.fill?
function populateMenu(obj) {
	
  	const submenu = document.getElementById('submenu');
	//console.log(obj['pageName']); // eg Physiology - root 
 	menuString = "";
        Object.entries(obj).forEach(([key, value]) => {
			menuString += key + " " ;			 
            console.log(key);
			menuString += value + "<br/>";
            console.log(value);
        });
        console.log('-------------------');
  submenu.textContent = menuString;
  //console.log(menuString);
}
function populatePage(obj){
	const myPara = document.getElementById("content");
	myPara.textContent = `Hometown: ${obj['homeTown']} // Formed: ${obj['formed']}`;
  	//header.appendChild(myPara);

}

