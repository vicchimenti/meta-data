/***
 *  @file map.js
 *      Media Library ID: 4730737
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
  function initMap() {

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
	
	
	
//  *** Athletic Fields Markers start ***  //
	
    //  ***  Championship Field Varsity Soccer  ***  //
    let championshipFieldMarker = new google.maps.Marker({
        position: {
        lat: 47.607563,
        lng: -122.315057
        },
        icon: icons['athleticFieldsIcon'].icon,
        map: map,
    });

    // create variable to store b-coloumn link ID
    let championshipFieldLink = document.getElementById('championshipField');
    // create object to store Info Box attributes
    let championshipFieldObj = {linkId: championshipFieldLink, linkName: 'Championship Field Varsity Soccer', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(championshipFieldLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(championshipFieldMarker.getPosition());
        modifyTextBox(2, championshipFieldObj.linkName, championshipFieldObj.linkDesc);
    });
    // create click listener for marker
    championshipFieldMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(championshipFieldMarker.getPosition());
        modifyTextBox(2, championshipFieldObj.linkName, championshipFieldObj.linkDesc);
        $("#PinLabel").hide();
        openKey(3);
    });
    // create mouseover listener for marker label
    championshipFieldMarker.addListener('mouseover', function() {
        modifyPinLabel(2, "Athletic Fields", championshipFieldObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    championshipFieldMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });



    //  ***  Seattle University Park  ***  //
    let universityParkMarker = new google.maps.Marker({
        position: {
        lat: 47.607483,
        lng: -122.317546
        },
        icon: icons['athleticFieldsIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let universityParkLink = document.getElementById('universityPark');
    // create object to store Info Box attributes
    let universityParkObj = {linkId: universityParkLink, linkName: 'University Park', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(universityParkLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(universityParkMarker.getPosition());
        modifyTextBox(2, universityParkObj.linkName, universityParkObj.linkDesc);
    });
    // create click listener for marker
    universityParkMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(universityParkMarker.getPosition());
        modifyTextBox(2, universityParkObj.linkName, universityParkObj.linkDesc);
        $("#PinLabel").hide();
        openKey(3);
    });
    // create mouseover listener for marker label
    universityParkMarker.addListener('mouseover', function() {
        modifyPinLabel(2, "Athletic Fields", universityParkObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    universityParkMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	 //  ***  Logan Field  ***  //
    let loganFieldMarker = new google.maps.Marker({
        position: {
        lat: 47.606415,
        lng: -122.317837
        },
        icon: icons['athleticFieldsIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let loganFieldLink = document.getElementById('loganField');
    // create object to store Info Box attributes
    let loganFieldObj = {linkId: loganFieldLink, linkName: 'Logan Field', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(loganFieldLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(loganFieldMarker.getPosition());
        modifyTextBox(2, loganFieldObj.linkName, loganFieldObj.linkDesc);
    });
    // create click listener for marker
    loganFieldMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(loganFieldMarker.getPosition());
        modifyTextBox(2, loganFieldObj.linkName, loganFieldObj.linkDesc);
        $("#PinLabel").hide();
        openKey(3);
    });
    // create mouseover listener for marker label
    loganFieldMarker.addListener('mouseover', function() {
        modifyPinLabel(2, "Athletic Fields", loganFieldObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    loganFieldMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });

//  *** Athletic Fields Markers end ***  //



//  *** End of Google Map JavaScript ***  //
}




/***
 *  Media Library ID: 4730737
 *  map.js
 * 
 */