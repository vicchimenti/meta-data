/***
 *  @file map.js
 *      Media Library ID: 4730736
 * 
 *  @see SU Grounds Map
 *  Google Map JS API
 * 
 */



// *** Floating InfoWindow  ***  //
function modifyTextBox(type, header, text) {
    $("#POITextBox").show();
    $("#POITextBox h5").html(header);
    $("#POITextBox p").html(text);
    $("#POITextBox").css("padding","5px 25px 15px 25px");
  
  	// Gardens/Emerald
     if(type == 0){
     $("#POITextBox").css("border-left", "5px solid #008765");
     $("#POITextBox h5").css("color", "#003282");
    }
	// Trees/ForestGreen
     if(type == 1){
     $("#POITextBox").css("border-left", "5px solid #124a12");
     $("#POITextBox h5").css("color", "#333333");
     }
    // Athletic Fields/Green
    if(type == 2){
     $("#POITextBox").css("border-left", "5px solid #55b31b");
     $("#POITextBox h5").css("color", "#333333");
    }
	// Edible Gardens/Black
    if(type == 3){
     $("#POITextBox").css("border-left", "5px solid #333333");
     $("#POITextBox h5").css("color", "#333333");
    }
    // Text Box Margins
    let margin = ($("#POITextBox").height() * -1) - 30;
    $("#POITextBox").css("margin", (margin + "px auto 10px auto"));
  }
  // *** End of Floating InfoWindow  ***  //
  
  
  // *** Floating InfoPopup  ***  //
  function modifyPinLabel(type, header, text) {
    $("#PinLabel").show();
    $("#PinLabel h5").html(header);
    $("#PinLabel p").html(text);
    $("#PinLabel").css("padding","5px 15px 15px 15px");
     
	 // Gardens/Emerald
     if(type == 0){
     $("#PinLabel").css("border-left", "5px solid #008765");
     $("#PinLabel h5").css("color", "#003282");
    }
	// Trees/ForestGreen
     if(type == 1){
     $("#PinLabel").css("border-left", "5px solid #124a12");
     $("#PinLabel h5").css("color", "#333333");
     }
    // Athletic Fields/Green
    if(type == 2){
      $("#PinLabel").css("border-left", "5px solid #55b31b");
      $("#PinLabel h5").css("color", "#333333");
    }
	// Edible Gardens/Black
    if(type == 3){
      $("#PinLabel").css("border-left", "5px solid #333333");
      $("#PinLabel h5").css("color", "#333333");
    }
    // Pin Label Margins
    let margin = ($("#PinLabel").height() * -1) - 30;
    $("#PinLabel").css("margin", (margin + "px auto 10px auto"));
  }
  
  // Close other key menus when point is clicked
  const categories = ['One', 'Two', 'Three'];
  function closeMenuExcept (key) {
    for (let cat of categories) {
      const category = `category${cat}`;
      if (!(category === key)) {
        if (isOpen(category)) {
          document.querySelector(`#${category} > div > button`).click();
        }
      }
    }
  }
  
  // Helper function to determine whether a menu is open.
  function isOpen (key) {
    return document.querySelector(`[aria-labelledby="${key}"]`).ariaExpanded === 'true'
  }
  
  // Toggles menu key category
  function openKey (key) {
    const val = () => {
      switch (key) {
        case 1: return categories[0]
        case 2: return categories[1]
        case 3: return categories[2]
      }
    }
    const category = `category${val()}`;
    closeMenuExcept(category);
    if (!isOpen(category)) {
      document.querySelector(`#${category} > div > button`).click();
    }
  } 
  
  //  *** Implementation of initialize function ***  //
  function initialize() {

    //  ***  Campus Primary Location  ***  //
    let seattleu = {
        lat: 47.610399,
        lng: -122.318070
    }

    //  ***  Campus Map Control Settings  ***  //
    let map = new google.maps.Map(document.getElementById('SeattlePOIMap'), {
        center: seattleu,
        streetViewControl: false,
        scaleControl: true,
        zoomControl: true,
        mapTypeControl: true,
        fullscreenControl: false,
        mapTypeId: 'roadmap',
        zoom: 15,
        //  *** Map style from Snazzy Maps (Blue Water) start ***  //
        styles: [{
        // Land
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }],
        }, {
        // Points of Interest
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }],
        }, {
        // Businesses
        "featureType": "poi.business",
        "stylers": [{
            "visibility": "off"
        }], 
        }, {
        // Roads
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }],
        }, {
        // Local Roads
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [{
            "visibility": "off"
        }],
        }, {
        // Transit
        "featureType": "transit",
        "stylers": [{
            "visibility": "off"
        }],
        }, {
        // Parks
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }],
        }, {
        // School
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }],
        }, {
        // School
        "featureType": "poi.sports_complex",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }],
        },{
        // Water
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "color": "#04A9C5"
        }, {
            "visibility": "on"
        }],
        }],
    });

    // Click Listener for Text Box
    map.addListener('click', function() {
        $("#POITextBox").hide();
    });
    // Click Listener for Text Box
    map.addListener('click', function() {
        $("#PinLabel").hide();
    });
    //  *** Map style end ***  //


    //  *** Map markers start ***  //

       //  *** Map marker url list start ***  //
    let icons = {
        // SU Icon
        seattleUIcon: {
        icon: 'https://www.seattleu.edu/media/graduate-admissions/images/graduate-viewbook/sulogo.png'
        },
        // Significant Gardens Icon
        significantGardensIcon: {
        icon: 'https://www.seattleu.edu/media/published/maps/marker_emerald.png'
        },
        // Notable Trees Icon
        notableTreesIcon: {
        icon: 'https://www.seattleu.edu/media/published/maps/marker_forest_green.png'
        },
        // Athletic Fields Icon
        athleticFieldsIcon: {
        icon: 'https://www.seattleu.edu/media/student-development/Marker_Green.png'
        },
		// Edible Gardens Icon
        edibleGardensIcon: {
        icon: 'https://www.seattleu.edu/media/published/maps/marker_su_black.png'
        },
    };
    //  *** Map marker url list end ***  //


    //  ***  click listeners for map icons ***  //

    //  *** Seattle University Main Campus Marker ***  //
    let seattleuMarker = new google.maps.Marker({
        position: seattleu,
        icon: icons['seattleUIcon'].icon,
        map: map,
        optimized: false,
        zIndex: 100,
    });
    seattleuMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(seattleuMarker.getPosition());
        modifyTextBox(2, "Seattle University", "Seattle University, founded in 1891, is a Jesuit Catholic university located on 50 acres in Seattle's Capitol Hill neighborhood.");
    });
    // create mouseover listener for marker label
    seattleuMarker.addListener('mouseover', function() {
        modifyTextBox(2, "Seattle University", "Seattle University, founded in 1891, is a Jesuit Catholic university located on 50 acres in Seattle's Capitol Hill neighborhood.");
    });
    // Click Listener for Pin Labels
    seattleuMarker.addListener('mouseout', function() {
        $("#POITextBox").hide();
    });



//  *** Notable Trees Markers start ***  //

    //  ***  Marion Giant Redwood  ***  //
    let marionRedwoodMarker = new google.maps.Marker({
        position: {
        lat: 47.610450,
        lng: -122.319006
        },
        icon: icons['notableTreesIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let marionRedwoodLink = document.getElementById('marionRedwood');
    // create object to store Info Box attributes
    let marionRedwoodObj = {linkId: marionRedwoodLink, linkName: 'Marion Giant Redwood', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(marionRedwoodLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(marionRedwoodMarker.getPosition());
        modifyTextBox(1, marionRedwoodObj.linkName, marionRedwoodObj.linkDesc);
    });
    // create click listener for marker
    marionRedwoodMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(marionRedwoodMarker.getPosition());
        modifyTextBox(1, marionRedwoodObj.linkName, marionRedwoodObj.linkDesc);
        $("#PinLabel").hide();
        openKey(2);
    });
    // create mouseover listener for marker label
    marionRedwoodMarker.addListener('mouseover', function() {
        modifyPinLabel(1, "Notable Trees", marionRedwoodObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    marionRedwoodMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });



    //  ***  GARR Large Mature Laurel   ***  //
    let garrLaurelMarker = new google.maps.Marker({
        position: {
        lat: 47.610595,
        lng: -122.319543
        },
        icon: icons['notableTreesIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let garrLaurelLink = document.getElementById('garrLaurel');
    // create object to store Info Box attributes
    let garrLaurelObj = {linkId: garrLaurelLink, linkName: 'GARR Large Mature Laurel', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(garrLaurelLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(garrLaurelMarker.getPosition());
        modifyTextBox(1, garrLaurelObj.linkName, garrLaurelObj.linkDesc);
    });
    // create click listener for marker
    garrLaurelMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(garrLaurelMarker.getPosition());
        modifyTextBox(1, garrLaurelObj.linkName, garrLaurelObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    garrLaurelMarker.addListener('mouseover', function() {
        modifyPinLabel(1, "Notable Trees", garrLaurelObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    garrLaurelMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	    //  ***  Kubota Mature Japanese Maples  ***  //
    let kubotaMaplesMarker = new google.maps.Marker({
        position: {
        lat: 47.610204,
        lng: -122.317730
        },
        icon: icons['notableTreesIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let kubotaMaplesLink = document.getElementById('kubotaMaples');
    // create object to store Info Box attributes
    let kubotaMaplesObj = {linkId: kubotaMaplesLink, linkName: 'Kubota Mature Japanese Maples', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(kubotaMaplesLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(kubotaMaplesMarker.getPosition());
        modifyTextBox(1, kubotaMaplesObj.linkName, kubotaMaplesObj.linkDesc);
    });
    // create click listener for marker
    kubotaMaplesMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(kubotaMaplesMarker.getPosition());
        modifyTextBox(1, kubotaMaplesObj.linkName, kubotaMaplesObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    kubotaMaplesMarker.addListener('mouseover', function() {
        modifyPinLabel(1, "Notable Trees", kubotaMaplesObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    kubotaMaplesMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });

//  *** Notable Trees Markers end ***  //
	


//  *** End of Google Map JavaScript ***  //
}




/***
 *  Media Library ID: 4730736
 *  map.js
 * 
 */