/**********************************************************************************
 / Script required for Emergency Notice Content Type
 / Reads in content from the Seattle University » Campus Alert section
 /
 / Based on TerminalFour's Site Wide Notice plug-in
 / Added to site on October 10 2017 by Dozie and Jason, Updated January 2018
 / July 2019 by Jason: Optimized a bit
 / January 2020 by Jason: made Read More link only show if there is a Full Message
 / 
 /*********************************************************************************/

// Cookie Functions
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + ";" + "path=/";
}

function getCookie(cname) {
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != - 1){
        	return c.substring(name.length, c.length);
        } 
	}
	return "";
}

//var testCounter = 99;
// Emergency Banner


function checkEmergency(){
  //console.log("checkEmergency");
}

$(document).ready(function () {
	try{
      //console.log("<t4 type='navigation' name='Path to Emergency Section' id='495' />emergency.json");
		var EmCookieSet = getCookie('emergency').split(',');
		var checkBanner = $.getJSON("<t4 type='navigation' name='Path to Emergency Section' id='495' />emergency.json", function(data) {
			// Ignore dummy element
      		if (data.notices.length > 1) {
				// Create an array containing the IDs of all the notices already output on the page
              var noticesOnPage = $('.notice[data-id]').map(function() {
        			return $.map($(this).data(), function(v) {
        				return v;
					});
				}).get();
				// Iterate over each notice in the JSON
        		for (i = 0; i < data.notices.length - 1; i++) {
                  
				  // Checks if the notice is in the cookie
                  var noticeInCookie = ($.inArray(data.notices[i].id, EmCookieSet) < 0)?false:true;
                  // Checks if notice is already on the page
                  var noticeOnPage = ($.inArray(data.notices[i].id, noticesOnPage) < 0)?false:true;
				  // Checks if notice is of type 'emergency;
                  var isEmergency = (data.notices[i].noticetype == 'emergency')?true:false;                  
				  // Checks if there is a Full Message, and if so, adds that to a variable for output. Without this, the Read More link appears no matter what
                  var isThereFulltext = data.notices[i].fullmessage.length;
                  var readMoreLinkCode = '';
                  
                  console.log(isThereFulltext);
                  if(isThereFulltext > 0){
                    readMoreLinkCode = '<p class="moreLink"><a href="' + data.notices[i].url + '">Read More<span class="sr-only"> about this alert</span></a></p>';
                  }

					// Output the notice only if:
					// this notice is not in the cookie and is not on the page OR
					// the notice is in the cookie AND not on the page already but is also an Emergency notice
	            	if ((!noticeInCookie && !noticeOnPage) || (noticeInCookie && !noticeOnPage && isEmergency)) {
    	    			$('.emergencynotice').append('<div class="notice ' + data.notices[i].noticetype + '" data-id="' + data.notices[i].id + '"><div class="container">' + data.notices[i].message + readMoreLinkCode + '<span class="fa fa-times fa-lg" aria-label="Close Alert" title="Close Alert" data-id="' + data.notices[i].id + '"></span></div></div>');
                  		//$('.emergencynotice').append('<div class="notice ' + data.notices[i].noticetype + '" data-id="' + data.notices[i].id + '"><a href="' + data.notices[i].url + '">' + data.notices[i].message + '</a> <span class="fa fa-times fa-lg" data-id="' + data.notices[i].id + '"></span></div>');
                  		// Remove ability to dismiss "Emergency" notices
            	    	if (isEmergency) {
       						$('.fa[data-id="' + data.notices[i].id + '"]').remove();
 	               		}
	    			}
        		}
				// Hide notices on click
    	    	$('.notice .fa').on('click', function(){
        			var thisId = $(this).attr('data-id');
					var parentNotice = $(this).parents('.notice').addClass('closed');
					// Double checks notice type before adding to cookie
					if (!parentNotice.hasClass('emergency')) {
						var currentCookie = getCookie('emergency');
            	    	if (currentCookie == '') {
			    	    	setCookie('emergency', thisId, 1);
	                	}
    	    		}else {
        				var cookieArray = currentCookie.split(',');
            	    	if ($.inArray(thisId, cookieArray) < 0) {
							setCookie('emergency', currentCookie + ',' + thisId, 1);
	                	}
		        	}
        		});
            } 
    	}).fail(function() {
		  //if there's no alert, failure is expected.
          //console.log("Failed to get emergency notice JSON File");
		});
		setTimeout(function(){
			checkEmergency();
		}, 10000); // Modify this number to change how often the json file is polled
   	}catch(err){
   		console.log(err);
   	}
});










