/***
 *  @file map.js
 *      Media Library ID: 4758916
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
  const categories = ['One', 'Two', 'Three', 'Four'];
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
		case 4: return categories[3]
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



//  *** Edible Gardens Markers start ***  //

    //  ***  CHDN Edible Gardens  ***  //
    let chdnGardensMarker = new google.maps.Marker({
        position: {
        lat: 47.606957,
        lng: -122.318012
        },
        icon: icons['edibleGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let chdnGardensLink = document.getElementById('chdnGardens');
    // create object to store Info Box attributes
    let chdnGardensObj = {linkId: chdnGardensLink, linkName: 'CHDN Edible Gardens', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(chdnGardensLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(chdnGardensMarker.getPosition());
        modifyTextBox(3, chdnGardensObj.linkName, chdnGardensObj.linkDesc);
    });
    // create click listener for marker
    chdnGardensMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(chdnGardensMarker.getPosition());
        modifyTextBox(3, chdnGardensObj.linkName, chdnGardensObj.linkDesc);
        $("#PinLabel").hide();
        openKey(4);
    });
    // create mouseover listener for marker label
    chdnGardensMarker.addListener('mouseover', function() {
        modifyPinLabel(3, "Edible Gardens", chdnGardensObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    chdnGardensMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  Broadway Edible Gardens  ***  //
    let broadwayGardensMarker = new google.maps.Marker({
        position: {
        lat: 47.609120,
        lng: -122.320630
        },
        icon: icons['edibleGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let broadwayGardensLink = document.getElementById('broadwayGardens');
    // create object to store Info Box attributes
    let broadwayGardensObj = {linkId: broadwayGardensLink, linkName: 'Broadway Edible Gardens', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(broadwayGardensLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(broadwayGardensMarker.getPosition());
        modifyTextBox(3, broadwayGardensObj.linkName, broadwayGardensObj.linkDesc);
    });
    // create click listener for marker
    broadwayGardensMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(broadwayGardensMarker.getPosition());
        modifyTextBox(3, broadwayGardensObj.linkName, broadwayGardensObj.linkDesc);
        $("#PinLabel").hide();
        openKey(4);
    });
    // create mouseover listener for marker label
    broadwayGardensMarker.addListener('mouseover', function() {
        modifyPinLabel(3, "Edible Gardens", broadwayGardensObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    broadwayGardensMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  Chapel Blueberries  ***  //
    let chapelBlueberriesMarker = new google.maps.Marker({
        position: {
        lat: 47.611392,
        lng: -122.317919
        },
        icon: icons['edibleGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let chapelBlueberriesLink = document.getElementById('chapelBlueberries');
    // create object to store Info Box attributes
    let chapelBlueberriesObj = {linkId: chapelBlueberriesLink, linkName: 'Chapel Blueberries Edible Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(chapelBlueberriesLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(chapelBlueberriesMarker.getPosition());
        modifyTextBox(3, chapelBlueberriesObj.linkName, chapelBlueberriesObj.linkDesc);
    });
    // create click listener for marker
    chapelBlueberriesMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(chapelBlueberriesMarker.getPosition());
        modifyTextBox(3, chapelBlueberriesObj.linkName, chapelBlueberriesObj.linkDesc);
        $("#PinLabel").hide();
        openKey(4);
    });
    // create mouseover listener for marker label
    chapelBlueberriesMarker.addListener('mouseover', function() {
        modifyPinLabel(3, "Edible Gardens", chapelBlueberriesObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    chapelBlueberriesMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  Admin West Edible Garden  ***  //
    let adminWestMarker = new google.maps.Marker({
        position: {
        lat: 47.611132,
        lng: -122.319990
        },
        icon: icons['edibleGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let adminWestLink = document.getElementById('adminWest');
    // create object to store Info Box attributes
    let adminWestObj = {linkId: adminWestLink, linkName: 'Admin west edibles, apples, blueberries', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(adminWestLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(adminWestMarker.getPosition());
        modifyTextBox(3, adminWestObj.linkName, adminWestObj.linkDesc);
    });
    // create click listener for marker
    adminWestMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(adminWestMarker.getPosition());
        modifyTextBox(3, adminWestObj.linkName, adminWestObj.linkDesc);
        $("#PinLabel").hide();
        openKey(4);
    });
    // create mouseover listener for marker label
    adminWestMarker.addListener('mouseover', function() {
        modifyPinLabel(3, "Edible Gardens", adminWestObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    adminWestMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  Pavillion Potager Edible Garden  ***  //
    let pavillionPotagerMarker = new google.maps.Marker({
        position: {
        lat: 47.608611,
        lng: -122.317901
        },
        icon: icons['edibleGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let pavillionPotagerLink = document.getElementById('pavillionPotager');
    // create object to store Info Box attributes
    let pavillionPotagerObj = {linkId: pavillionPotagerLink, linkName: 'Pavillion Potager "everything in the soup" Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(pavillionPotagerLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(pavillionPotagerMarker.getPosition());
        modifyTextBox(3, pavillionPotagerObj.linkName, pavillionPotagerObj.linkDesc);
    });
    // create click listener for marker
    pavillionPotagerMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(pavillionPotagerMarker.getPosition());
        modifyTextBox(3, pavillionPotagerObj.linkName, pavillionPotagerObj.linkDesc);
        $("#PinLabel").hide();
        openKey(4);
    });
    // create mouseover listener for marker label
    pavillionPotagerMarker.addListener('mouseover', function() {
        modifyPinLabel(3, "Edible Gardens", pavillionPotagerObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    pavillionPotagerMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  Columbia Building Orchard Edible Garden  ***  //
    let columbiaOrchardMarker = new google.maps.Marker({
        position: {
        lat: 47.608789,
        lng: -122.314292
        },
        icon: icons['edibleGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let columbiaOrchardLink = document.getElementById('columbiaOrchard');
    // create object to store Info Box attributes
    let columbiaOrchardObj = {linkId: columbiaOrchardLink, linkName: 'Columbia Building Orchard', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(columbiaOrchardLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(columbiaOrchardMarker.getPosition());
        modifyTextBox(3, columbiaOrchardObj.linkName, columbiaOrchardObj.linkDesc);
    });
    // create click listener for marker
    columbiaOrchardMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(columbiaOrchardMarker.getPosition());
        modifyTextBox(3, columbiaOrchardObj.linkName, columbiaOrchardObj.linkDesc);
        $("#PinLabel").hide();
        openKey(4);
    });
    // create mouseover listener for marker label
    columbiaOrchardMarker.addListener('mouseover', function() {
        modifyPinLabel(3, "Edible Gardens", columbiaOrchardObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    columbiaOrchardMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });

//  *** Edible Gardens Markers end ***  //



//  *** End of Google Map JavaScript ***  //
}




/**
 * 
 *  Load the map
 * 
 */
initMap();
  
  

/***
 *  Media Library ID: 4730738
 *  map.js
 * 
 */

