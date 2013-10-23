	$jParam	=jQuery.noConflict();
	jQuery(document).ready(function($) {
	  // Try to embed video from url
	  $jParam('a[href*="?aia-embed"]').each(function(){
		  var jURL = $(this).attr('href');
		  // alert ('Found embed URL:'+jURL+'\nShould replace with iFrame!');
		  var jHref = jURL.split('?aia-embed')[0];
		  var jWidth = jURL.split('+')[1];
		  var jHeight = jURL.split('+')[2];
		  var jFloat = jURL.split('+@')[1];
		  if (!jFloat) jFloat = 'none';
		  if (!jWidth) jWidth = '500';
		  if (!jHeight) jHeight = '350';
		  
		  $(this).replaceWith('<iframe style="float: '+jFloat+'; padding: 5px;" width="'+jWidth+'" height="'+jHeight+'" src="'+jHref+'" frameborder="0" allowfullscreen></iframe>');
		  
	  }),
	  
	  $jParam('img[alt*="?wrap-"]').each(function(){
		  var mAlt = $(this).attr('alt');	
		  var mFloat = mAlt.split('?wrap-')[1];
		  if (!mFloat) mFloat = 'none';
		  
		  $(this).css('float', mFloat);
		  
	  });
	  
	// ******* Scrolling Text **********
		var Trigger = 'AIA-Scrolling-Text'; var fRow = '';
	 	$jParam("table:contains("+Trigger+")").each(function(){
		   // Get first td in the table. If it is not the trigger then don't bother!
	 		fRow = $(this).find("td").eq(0).text().replace(/\n/g, '');
		 	// alert(fRow+':'); // look for trigger!
				
			if (fRow == Trigger) {				
				var scrollContents = "";
				scrollContents = $(this).find("td").eq(1).html();
				$(this).replaceWith('<div class="scrolling-text">'+scrollContents+'</div>');
			}
		});	
	// ****** End Scrolling text ****** //  
		
		
	// ******* Imsge Caption **********
		var imgFile = ""; var imgTitle = ""; 
		var imgCaption = ""; var imgWidth = ""; var align;
		var Trigger = 'AIA-Img-Caption'; var fRow = '';
		
	   $jParam("table:contains("+Trigger+")").each(function(){
		   // Get first td in the table. If it is not the trigger then don't bother!
	 		fRow = $(this).find("td").eq(0).text().replace(/\n/g, '');
		 	// alert(fRow+':'); // look for trigger!
				
			if (fRow == Trigger) {
				align = $(this).find("td").eq(1).text(); 
				imgFile = $(this).find("td").eq(2).find("img").attr('src');
				imgWidth = $(this).find("td").eq(2).find("img").width();
				imgTitle = $(this).find("td").eq(2).find("img").attr('alt');
				imgCaption = $(this).find("td").eq(3).html();
	
				if (!align) {align = 'none';}
				// Rendering caption
				$(this).replaceWith('<div class="img-caption" style="float: '
				+align+'; width:'+imgWidth+'px;"><img src="'+imgFile+'" alt="'
				+imgTitle+'" /><br />'+imgCaption+'</div>');
			}
		});
	// ****** End Image Caption ****** // 
		

		
	/*	var allowedTags = ["b", "strong", "i", "em", "u", "br", "pre", "blockquote", "ul", "ol", "li",
							 "a", "table", "th", "tr", "td", "img", "p", "span", "div", "hr", "img", 
							 "h1", "h2", "h3", "h4", "h5", "h6"]; 
	*/
		// jQuery(":not(" + allowedTags.join(", ") + ")").removeTags();

		  
	// *********** Slideshow **********
	  
	
	 // alert('Looking for Table');
	  // Get image titles, URL
	  mainSplit = "AIA-Slideshow";
	  $jParam("table:contains('"+mainSplit+"')").each(function(){
		  
		  // Get first td in the table. If it is not the trigger then don't bother!
	 	var	fRow = $(this).find("td").eq(0).text().replace(/\n/g, '');
	//	   alert('Table found');
		if (fRow == mainSplit) {
			sTitles = [];	  sCaptions = [];
			sThumbs = [];	  sImages = [];
			var slideMid = ""; var slideThumbs = "";	
			var param = $(this).find("td").eq(1).text().replace(/\n/g, '');	
			// Creating Slideshow
			var sTb = $(this).index();
				
			$(this).find("tr").each(function(){
				 if (!this.rowIndex) return; // skip first row
				 // alert($(this).find("td").eq(0).find("img").attr('src'));
				  // Get title and thumb url from first cell
				  var thumb = $(this).find("td").eq(0).find("img").attr('src');
				  var title = $(this).find("td").eq(0).find("img").attr('alt');
				  
				  // Get caption and image url from first cell
				  var image = $(this).find("td").eq(1).find("img").attr('src');
				  var caption = $(this).find("td").eq(1).find("img").attr('alt');
				
				//  caption.find(":not(" + allowedTags.join(", ") + ")").removeTags();
				  
				  // push variables to arrays
				  sThumbs.push(thumb);
				  sTitles.push(title);
				  sImages.push(image);
				  sCaptions.push(caption);
		  	});
		  
		  // End collecting slideshow elements
	
		//	sTb++; // found table counter to add to id
			var slideMid = "";
			var slideThumbs = "";
			var slideBegin = '<div class="sShow"><ul id="sShow'+sTb+'" class="list-show">';
			var slideEnd = '</ul></div><!-- end slideshow -->';
			var zIndex = 20;
			for (var i = 0; i < sThumbs.length; ++i) {
				// Building Images
				var active = '';
				if (i!=0) {
					var active = ' ';
					
					
				} else {
					var active = ' active';
					
				}
				zIndex--;
				slideMid += '<li style="z-index: '+zIndex+';" id="'+sTb+'photo'+i+'" class="panel'+active+'">';
				slideMid += '    <h3>'+sTitles[i]+'</h3>';
				
				// Building Imags and Captions
				if (param=='popup') slideMid += '<a class="overlay" href="'+sImages[i]+'">';
				slideMid += '    <img width="450" height="300" class="slide-image" id="img-'+i+'" alt="'+sTitles[i]+'" src="'+sImages[i]+'" />';
				if (param=='popup') slideMid += '</a>';
				slideMid += sCaptions[i];
				slideMid += '</li>';
				
				// Building Thumbnails
				slideThumbs += '<li id="txt-'+i+'" class="slide-thumb"><a rel="#'+sTb+'photo'+i+'" class="thumb" title="'+sTitles[i]+'" href="javascript:void(0);">';
				slideThumbs += '<img width="45" height="45" alt="'+sTitles[i]+'" src="'+sThumbs[i]+'" /></a></li>';
				// break after max no. of image (18);
				if (i>16) break;
			}
		  
		  
		  
			   // Display Slideshow
			 // $('table:contains('+mainSplit+')').replaceWith(
			  $(this).replaceWith(
	
			  slideBegin
			  +slideMid
			  +slideEnd
			  +'<ul id="tmb'+sTb+'" style="width: 450px; margin: 0 0 0 2px; padding:9px 0 0">'
			  +slideThumbs
			  +'</ul>');
			  
			  // Switching Images on thumb click
			  // hide slides
			  $("#sShow"+sTb+" .panel").css('opacity','0.0');
			  $("#sShow"+sTb+" .active").css('opacity','1.0');
			  
			  //Click action
			  $("#tmb"+sTb+" .thumb").click(function(event) {
						event.preventDefault();
						var showDiv;
						showDiv = $(this).attr('rel');
					//	alert("#sShow"+sTb+" "+showDiv);
						$("#sShow"+sTb+" .active").animate({opacity: 0.0}, 900).removeClass('active');
						$("#sShow"+sTb+" "+showDiv).addClass('active').animate({opacity: 1.0}, 900);
			
				}); // end click action
			} // end if
		}); // end finding table
		
		
		
		
		// *********** Tabs. **********/
	  
	  mainSplit = "AIA-Tabs";
	  $jParam("table:contains('"+mainSplit+"')").each(function(){
		  
		  // Get first td in the table. If it is not the trigger then don't bother!
	 	var	fRow = $(this).find("td").eq(0).text().replace(/\n/g, '');
	//	   alert('Table found');
		if (fRow == mainSplit) {
				sTabs = [];	sTabText = [];
				var tabMid = ""; var tabThumbs = "";	
				var tTb = $(this).index();
					
	
			 // alert('Looking for Table');
			 // jQuery.fn.stripTags = function() { return this.replaceWith( this.html().replace(/<\/?[^>]+>/gi, '') ); };
			 $(this).find("tr").each(function(){
		  
			  
				// alert('Tabs found');
				 if (!this.rowIndex) return; // skip first row
				  
				  // Get Tab titles first cell
				  var Tab = $(this).find("td").eq(0).html();
				  Tab = Tab.replace(/<(?:.|\n)*?>/gm, '');
				//  Get Tab Text
				  var TabText = $(this).find("td").eq(1).html();
				  
				  // push variables to arrays
				  sTabs.push(Tab);
				  sTabText.push(TabText);
				});
		  
			  // End collecting Tab elements
	
			// Creating Tabs
			
			
			tabBegin = '<div id="tShow'+tTb+'"><ul class="tabs-show">';
			tabEnd = '</ul><!-- end tabs -->';
			var zIndex = 20;
			for (var i = 0; i < sTabs.length; ++i) {
				// Building Tabs
				var active = '';
				if (i==0) {
					var active = ' tactive';
					var active2 = ' current';
				} else {
					var active = ' ';
					var active2 = ' ';
					
				}
				zIndex--;
				tabMid += '<li style="z-index: '+zIndex+';" id="'+tTb+'tab'+i+'" class="stabs'+active+'">';
			//	slideMid += '    <h3>'+sTabText[i]+'</h3>';
				
				// Building Tabs Text
				tabMid += '    <div width="450" height="300" class="tab-text" id="'+tTb+'tab-'+i+'">';
				tabMid += sTabText[i];
				tabMid += '</div>';
			//	alert(tabMid);
				// Building Tab Titles
				tabThumbs += '<li id="txt-'+i+'" class="tab-title"><a rel="#'+tTb+'tab'+i+'" class="stab'+active2+'" href="javascript:void(0);">';
				tabThumbs += sTabs[i]+'</a></li>';
				// break after max no. of tabs (8);
				if (i>8) break;
				}
		  
			   // Display Tabs
			  $(this).replaceWith(
			  '<div class="boxContainer">'
			  +'<ul style="margin: 0 0 0 2px;" id="tabs'+tTb+'"  class="tabs">'
			  +tabThumbs
			  +'</ul>'
			  +tabBegin
			  +tabMid
			  +tabEnd
			  +'</div>'
			  );
			  
			  // Switching Text on Tabs click
			  // hide slides
			  $("#tShow"+tTb+" .stabs").css('opacity','0.0');
			  $("#tShow"+tTb+" .tactive").css('opacity','1.0');
			  
			  //Click action
			  $("#tabs"+tTb+" .stab").click(function(event) {
						event.preventDefault();
						var tabDiv;
						tabDiv = $(this).attr('rel');
						$("#tShow"+tTb+" .tactive").animate({opacity: 0.0}, 100).removeClass('tactive'),
						$("#tabs"+tTb+" .stab").removeClass('current');
						$(tabDiv).addClass('tactive').animate({opacity: 1.0}, 100),
						$(this).addClass('current');
						
			
					}); // end click action
			} // end if
		}); // end finding table
			
			
		// *********** Accordion **********
		mainSplit = "AIA-Accordion";
	  	$jParam("table:contains('"+mainSplit+"')").each(function(){
		  
		  // Get first td in the table. If it is not the trigger then don't bother!
	 	var	fRow = $(this).find("td").eq(0).text().replace(/\n/g, '');
	//	   alert('Table found');
		if (fRow == mainSplit) {
				sAccor = []; sAccorText = [];
			//	var tabMid = ""; var tabThumbs = "";	
				var aTb = $(this).index();	  
	  
			$(this).find("tr").each(function(){
			  // alert('Accor found');
				 if (!this.rowIndex) return; // skip first row
				  
				  // Get Tab titles first cell
				  var Accor = $(this).find("td").eq(0).html();
				  Accor = Accor.replace(/<(?:.|\n)*?>/gm, '');
				//  Get Accordion Text
				  var AccorText = $(this).find("td").eq(1).html();
				  
				  // push variables to arrays
				  sAccor.push(Accor);
				  sAccorText.push(AccorText);
			});
	  
			  // End collecting Accordion elements
		
				// Creating Accordion
				
				var AccorMid = "";
				var AccorThumbs = "";
				AccorBegin = '<div id="accordion" class="boxContainer ccc open Accor'+aTb+'">';
				AccorEnd = '</div><!-- end Accordions -->';
				var zIndex = 20;
				for (var i = 0; i < sAccor.length; ++i) {
					// Building Accordions
					var active = '';
					if (i!=0) {
						var active = '';
						var active2= '';
						
					} else {
						var active = ' style="display: block;"';
						var active2= 'current first';
					}
					zIndex--;
					// Building Accordion Titles
					AccorMid += '<h2 class="'+active2+'">'+sAccor[i]+'</h2>';
					AccorMid += '<div class="pane" '+active+'>'+sAccorText[i]+'</div>';
				//	alert(AccorMid);
					
					// break after max no. of tabs (8);
					if (i>12) break;
				}
		
				   // Display Accordion
				  $(this).replaceWith(
				  '<div class="grid_9 alpha">'+AccorBegin+AccorMid+'</div>' 
				  );
				  
				  // Run Script from jQuery-Tools
				  jQuery(function() { 
							jQuery('.Accor'+aTb).tabs('.Accor'+aTb+' div.pane', {tabs: 'h2', effect: 'slide', initialIndex: null});
					}); // end click action
			} // end if
		}); // end finding table
		
				
	// *********** Horizontal Accordion *********************************
	  mainSplit = "AIA-Horizontal-Accordion";
	  	$jParam("table:contains('"+mainSplit+"')").each(function(){
		  
		  // Get first td in the table. If it is not the trigger then don't bother!
	 	var	fRow = $(this).find("td").eq(0).text().replace(/\n/g, '');
		//   alert(fRow+':'+mainSplit);
		if (fRow == mainSplit) {
					sHAccor = []; sHAccorText = [];
					var hTb = $(this).index();	  
		  
			$(this).find("tr").each(function(){
				//   alert('HAccor found');
			 	if (!this.rowIndex) return; // skip first row
			  
				  // Get Tab titles first cell
				  var HAccor = $(this).find("td").eq(0).find("img").attr('src');
				 //  HAccor = HAccor.replace(/<(?:.|\n)*?>/gm, '');
				//  Get HAccordion Text
				  var HAccorText = $(this).find("td").eq(1).html();
				  
				  // push variables to arrays
				  sHAccor.push(HAccor);
				  sHAccorText.push(HAccorText);
		  	});
		 
		  // End collecting HAccordion elements
	
			// Creating Tabs
			
			var HAccorMid = "";
			var HAccorThumbs = "";
			
			
			HAccorBegin = '<div id="haccordion" class="boxContainer ccc open HAccor'+hTb+'">';
			HAccorEnd = '</div><!-- end HAccordions -->';
			var zIndex = 20;
			for (var i = 0; i < sHAccor.length; ++i) {
				// Building HAccordions
				var active = '';
				if (i!=0) {
					var active = ' style="display: none;"';
					var active2= '';
					
				} else {
					var active = ' style="display: block;"';
					var active2= 'current first';
				}
				zIndex--;
				// Building HAccordion Titles
				HAccorMid += '<img style="width:80px; height:330px;" src="'+sHAccor[i]+'" />';
				HAccorMid += '<div style="height:330px; width:200px; display: block;">'+sHAccorText[i]+'</div>';
			//	alert(HAccorMid);
				
				// break after max no. of tabs (8);
				if (i>5) break;
			}
	
			   // Display HAccordion
//			   alert('replace table:'+hTb);
			  $(this).replaceWith(
			  '<div class="grid_9 alpha">'
			  +HAccorBegin
			  +HAccorMid
			  +'</div>' 
			  );
//			alert('table replaced:'+hTb);
			  // Run Script from jQuery-Tools
			  jQuery(function() { 

					jQuery('.HAccor'+hTb).tabs('.HAccor'+hTb+' div', {tabs: 'img', effect: 'horizontal'});
					
				}); // end click action
			} // end if
		}); // end finding table
		
		
		// ************* Modal Window Script *********
			// Simple modal window script
			
			var modalWindow = {
				parent:"body",
				windowId:null,
				content:null,
				width:null,
				height:null,
				close:function()
				{
					$jParam(".modal-window").fadeOut("fast",function(){$jParam('.modal-window').unbind().remove();});
					$jParam(".modal-overlay").remove();
				},
				open:function()
				{
					var modal = "";
					shown = true; // window is laready opened
					modal += "<div class=\"modal-overlay\"></div>";
					modal += "<div id=\"" + this.windowId + "\" class=\"modal-window\" style=\"width:" + this.width + "px; height:" + this.height + "px; margin-top:-" + (this.height / 2) + "px; margin-left:-" + (this.width / 2) + "px;\">";
					modal += this.content;
					modal += "</div>";	
			
					$jParam(this.parent).append(modal);
			
					$jParam(".modal-window").append("<a class=\"close-window\"></a>");
					$jParam(".close-window").click(function(){modalWindow.close();});
					$jParam(".modal-overlay").click(function(){modalWindow.close();});
					$jParam(document).keyup(function(e) // Esc button close
						{
						if(e.keyCode == 27 && shown)
						{
						modalWindow.close();
						}
						});

				}
			};
			

 // modalWindow.open();
					// Open Window

			jQuery("a.overlay").each(function(index){
			//		alert($(this).attr('href'));
				$(this).click(function(e){
					e.preventDefault();
					
					
					source = $(this).attr('href');
					
					if (source){ 
						
						var ni = new Image();
						ni.onload = function(){
						//	iW  = ni.width;
						//	iH  = ni.height;
						//	
						}
						ni.src = source;
						iW  = ni.width;
						iH  = ni.height;
					//	alert(iW+':'+iH);

						modalWindow.windowId = "myModal";
						modalWindow.width = ni.width;
						modalWindow.height = ni.height;

					//	modalWindow.content = "<iframe style='background-color:#fff; border: solid 1px #ccc;' width='"+iWidth+"' height='"+iHeight+"' frameborder='0' scrolling='no' allowtransparency='true' src='" + source + "'></iframe>";
						modalWindow.content = "<div style='background-color:#fff; border: solid 1px #ccc;' \
						width='"+iW+"' height='"+iH+"'> \
						<img width='"+iW+"' height='"+iH+"' src='" + source + "' /></div>";
					//	modalWindow.content = source;
						modalWindow.open();
					}
				});	
			});
			// ********* End Modal Window Script *******//
		
		
	});
 
