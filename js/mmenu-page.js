			var menu = new MmenuLight(
				document.querySelector( '#menu' ),
				'all'
			);
			var navigator = menu.navigation({
				 title: 'Menu',
				 slidingSubmenus: false
				 //selectedClass: 'Selected',
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
					evnt.preventDefault();
				//alert(evnt.srcElement);
					drawer.close();
				});
			}
