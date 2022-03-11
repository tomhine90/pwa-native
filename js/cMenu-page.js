				/*
				window.document.onload = function(e){ 
    				console.log("document.onload", e, Date.now() ,window.tdiff,(window.tdiff[0] = Date.now()) && window.tdiff.reduce(fred) );
					
					var html_div_obj = document.getElementById("html_menu");
					var ul_menuItems = html_div_obj.querySelectorAll(".menu_item"); 
					ul_menuItems.forEach(addEvent_to_Menu);
					let numb = html_div_obj.querySelectorAll(".menu_item").length;
					alert(numb); //0 //BECAUSE MENU IS ASYNCHRONOUS - NOT LOADED YET...
				}*/
				const contentItems = document.querySelectorAll(".content");
				contentItems.forEach(function(cItems) {
					//alert(cItems);
					addEvent(cItems);
				});				
				document.querySelector( 'a[href="#menu"]' )
					.addEventListener( 'click', evnt => {
						changeNavState();
						evnt.preventDefault();
						//drawer.open();
						//document.querySelector( '.mm-ocd--open' ).style.max-width = "20em";
				});
				/*
				<!-- .sidenav #menu #htm_menu ul -->
				//var appsMenuItems = document.querySelectorAll('#appmenu > li');
				event.preventDefault();
					//history.pushState({page: 1}, "title 1", "?page=1")
					//alert(evt.parentElement.id);
					//alert(cMenuItem.parentElement.id);					
				return false;
				*/
				function menuItem_click(evt, _pageid, _sectionid){
					evt.preventDefault();
					var parElem = evt.target.parentElement;
					//parElem.style.backgroundColor = "red";
					if (parElem.getAttribute('aria-expanded') == 'false' || parElem.getAttribute('aria-expanded') ==  null) {
						parElem.setAttribute('aria-expanded', "true");
					} else {
						parElem.setAttribute('aria-expanded', "false");
					}
					//alert(parElem.id);
					history.pushState('data to be passed', 'Page Title', "?id=" + parElem.id);
					//getContent and update page. 
					updatePage(_pageid, _sectionid);					
				}
				/*FUNCTIONS*/
				/*not used as not dynamically binding*/
				function addEvent_to_Menu(cMenuItem) {
					cMenuItem.addEventListener( 'click', evnt => {
					//check to see if menuItem if menuItem check to see if has Children
						cMenuItem.style.backgroundColor = "red";
						//alert(cMenuItem.parentElement.id);
						evnt.preventDefault();
					//closeNav();
					});
				}
				
				function addEvent(cItem){
		  			cItem.addEventListener( 'click', evnt => {
						//check to see if menuItem if menuItem check to see if has Children
						evnt.preventDefault();
						closeNav();
					});
				}
				function changeNavState() {
					var sideNav = document.getElementById("mySidenav");
					if (sideNav.getAttribute("class") == "sidenav"){
						sideNav.style.width = "200px";	
						sideNav.setAttribute("class", "sidenav open");
					} else{
						sideNav.style.width = "0px";
						sideNav.setAttribute('class', "sidenav");
					}
				  	//document.getElementById("main").style.marginLeft = "250px";
				}
				
				function closeNav() {
					var sideNav = document.getElementById("mySidenav");
				  	sideNav.style.width = "0";
					sideNav.setAttribute('class', "sidenav");
				  //document.getElementById("main").style.marginLeft= "0";
				}
/*
			var menu = new MmenuLight(
				document.querySelector( '#menu' ),
				'all'
			);
			var navigator = menu.navigation({
				 title: 'Menu',
				 slidingSubmenus: false,
				 selectedClass: 'selected'
				 //theme: 'dark',
			});
			var drawer = menu.offcanvas({
				// position: 'left'
			});
			//	Open the menu.
			document.querySelector( 'a[href="#menu"]' )
				.addEventListener( 'click', evnt => {
					evnt.preventDefault();
					drawer.open();
					//document.querySelector( '.mm-ocd--open' ).style.max-width = "20em";
				});
			const contentItems = document.querySelectorAll(".content");
			contentItems.forEach(function(cItems) {
				addEvent(cItems);
			});
			function addEvent(cItem){
		  		cItem.addEventListener( 'click', evnt => {
					//evnt.preventDefault();
					//alert(evnt.srcElement);
					drawer.close();
				});
			}
*/