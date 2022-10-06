/***
 *  @file map.js
 *      Media Library ID: 4730738
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



//  *** Significant Gardens Markers start ***  //

	//  ***  CAMP Japanese Garden  ***  //
    let japaneseGardenMarker = new google.maps.Marker({
        position: {
        lat: 47.607124,
        lng: -122.319198
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let japaneseGardenLink = document.getElementById('japaneseGarden');
    // create object to store Info Box attributes
    let japaneseGardenObj = {linkId: japaneseGardenLink, linkName: 'CAMP Japanese Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(japaneseGardenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(japaneseGardenMarker.getPosition());
        modifyTextBox(0, japaneseGardenObj.linkName, japaneseGardenObj.linkDesc);
    });
    // create click listener for marker
    japaneseGardenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(japaneseGardenMarker.getPosition());
        modifyTextBox(0, japaneseGardenObj.linkName, japaneseGardenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    japaneseGardenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", japaneseGardenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    japaneseGardenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  VHILB Ethnobotanical  ***  //
    let VHILBMarker = new google.maps.Marker({
        position: {
        lat: 47.608208,
        lng: -122.319225
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let VHILBLink = document.getElementById('VHILB');
    // create object to store Info Box attributes
    let VHILBObj = {linkId: VHILBLink, linkName: 'Vi Hilbert Ethnobotanical Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(VHILBLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(VHILBMarker.getPosition());
        modifyTextBox(0, VHILBObj.linkName, VHILBObj.linkDesc);
    });
    // create click listener for marker
    VHILBMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(VHILBMarker.getPosition());
        modifyTextBox(0, VHILBObj.linkName, VHILBObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    VHILBMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", VHILBObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    VHILBMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });

	
	
	//  ***  Ciscoe Morris   ***  //
    let ciscoeMorrisMarker = new google.maps.Marker({
        position: {
        lat: 47.609778,
        lng: -122.319999
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let ciscoeMorrisLink = document.getElementById('ciscoeMorris');
    // create object to store Info Box attributes
    let ciscoeMorrisObj = {linkId: ciscoeMorrisLink, linkName: 'Cisco Morris Biodiversity Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(ciscoeMorrisLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(ciscoeMorrisMarker.getPosition());
        modifyTextBox(0, ciscoeMorrisObj.linkName, ciscoeMorrisObj.linkDesc);
    });
    // create click listener for marker
    ciscoeMorrisMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(ciscoeMorrisMarker.getPosition());
        modifyTextBox(0, ciscoeMorrisObj.linkName, ciscoeMorrisObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    ciscoeMorrisMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", ciscoeMorrisObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    ciscoeMorrisMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
	//  ***  Kubota Legacy Garden  ***  //
    let kubotaLegacyMarker = new google.maps.Marker({
        position: {
        lat: 47.610204,
        lng: -122.317837
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let kubotaLegacyLink = document.getElementById('kubotaLegacy');
    // create object to store Info Box attributes
    let kubotaLegacyObj = {linkId: kubotaLegacyLink, linkName: 'Kubota Legacy Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(kubotaLegacyLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(kubotaLegacyMarker.getPosition());
        modifyTextBox(0, kubotaLegacyObj.linkName, kubotaLegacyObj.linkDesc);
    });
    // create click listener for marker
    kubotaLegacyMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(kubotaLegacyMarker.getPosition());
        modifyTextBox(0, kubotaLegacyObj.linkName, kubotaLegacyObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    kubotaLegacyMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", kubotaLegacyObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    kubotaLegacyMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
//  ***  Union Green  ***  //
    let unionGreenMarker = new google.maps.Marker({
        position: {
        lat: 47.611326,
        lng: -122.318592
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let unionGreenLink = document.getElementById('unionGreen');
    // create object to store Info Box attributes
    let unionGreenObj = {linkId: unionGreenLink, linkName: 'Union Green', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(unionGreenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(unionGreenMarker.getPosition());
        modifyTextBox(0, unionGreenObj.linkName, unionGreenObj.linkDesc);
    });
    // create click listener for marker
    unionGreenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(unionGreenMarker.getPosition());
        modifyTextBox(0, unionGreenObj.linkName, unionGreenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    unionGreenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", unionGreenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    unionGreenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
    


//  ***  Wildlife Garden  ***  //
    let wildlifeGardenMarker = new google.maps.Marker({
        position: {
        lat: 47.611189,
        lng: -122.320330
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let wildlifeGardenLink = document.getElementById('wildlifeGarden');
    // create object to store Info Box attributes
    let wildlifeGardenObj = {linkId: wildlifeGardenLink, linkName: 'Wildlife Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(wildlifeGardenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(wildlifeGardenMarker.getPosition());
        modifyTextBox(0, wildlifeGardenObj.linkName, wildlifeGardenObj.linkDesc);
    });
    // create click listener for marker
    wildlifeGardenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(wildlifeGardenMarker.getPosition());
        modifyTextBox(0, wildlifeGardenObj.linkName, wildlifeGardenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    wildlifeGardenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", wildlifeGardenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    wildlifeGardenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });



//  ***  HUNT Meditation Garden  ***  //
    let meditationGardenMarker = new google.maps.Marker({
        position: {
        lat: 47.611897,
        lng: -122.318570
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let meditationGardenLink = document.getElementById('meditationGarden');
    // create object to store Info Box attributes
    let meditationGardenObj = {linkId: meditationGardenLink, linkName: 'HUNT Meditation Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(meditationGardenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(meditationGardenMarker.getPosition());
        modifyTextBox(0, meditationGardenObj.linkName, meditationGardenObj.linkDesc);
    });
    // create click listener for marker
    meditationGardenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(meditationGardenMarker.getPosition());
        modifyTextBox(0, meditationGardenObj.linkName, meditationGardenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    meditationGardenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", meditationGardenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    meditationGardenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });



//  ***  Japanese Remembrance Gardens  ***  //
    let remembranceGardensMarker = new google.maps.Marker({
        position: {
        lat: 47.611812,
        lng: -122.318031
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let remembranceGardensLink = document.getElementById('remembranceGardens');
    // create object to store Info Box attributes
    let remembranceGardensObj = {linkId: remembranceGardensLink, linkName: 'Japanese Remembrance Gardens', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(remembranceGardensLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(remembranceGardensMarker.getPosition());
        modifyTextBox(0, remembranceGardensObj.linkName, remembranceGardensObj.linkDesc);
    });
    // create click listener for marker
    remembranceGardensMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(remembranceGardensMarker.getPosition());
        modifyTextBox(0, remembranceGardensObj.linkName, remembranceGardensObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    remembranceGardensMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", remembranceGardensObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    remembranceGardensMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });



    //  *** Lee Miley Rain Garden  ***  //
    let rainGardenMarker = new google.maps.Marker({
        position: {
        lat: 47.612013,
        lng: -122.317892
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let rainGardenLink = document.getElementById('rainGarden');
    // create object to store Info Box attributes
    let rainGardenObj = {linkId: rainGardenLink, linkName: 'Lee Miley Rain Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(rainGardenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(rainGardenMarker.getPosition());
        modifyTextBox(0, rainGardenObj.linkName, rainGardenObj.linkDesc);
    });
    // create click listener for marker
    rainGardenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(rainGardenMarker.getPosition());
        modifyTextBox(0, rainGardenObj.linkName, rainGardenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    rainGardenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", rainGardenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    rainGardenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });



//  ***  XAVR Courtyard Kubota Garden  ***  //
    let xavrGardenMarker = new google.maps.Marker({
        position: {
        lat: 47.611753,
        lng: -122.317315
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let xavrGardenLink = document.getElementById('xavrGarden');
    // create object to store Info Box attributes
    let xavrGardenObj = {linkId: xavrGardenLink, linkName: 'XAVR Courtyard Kubota Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(xavrGardenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(xavrGardenMarker.getPosition());
        modifyTextBox(0, xavrGardenObj.linkName, xavrGardenObj.linkDesc);
    });
    // create click listener for marker
    xavrGardenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(xavrGardenMarker.getPosition());
        modifyTextBox(0, xavrGardenObj.linkName, xavrGardenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    xavrGardenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", xavrGardenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    xavrGardenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	

//  ***  Eisiminger Fitness Center  ***  //
    let eisimingerFitnessMarker = new google.maps.Marker({
        position: {
        lat: 47.606754,
        lng: -122.314029
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let eisimingerFitnessLink = document.getElementById('eisimingerFitness');
    // create object to store Info Box attributes
    let eisimingerFitnessObj = {linkId: eisimingerFitnessLink, linkName: 'Eisiminger Fitness Center', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(eisimingerFitnessLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(eisimingerFitnessMarker.getPosition());
        modifyTextBox(0, eisimingerFitnessObj.linkName, eisimingerFitnessObj.linkDesc);
    });
    // create click listener for marker
    eisimingerFitnessMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(eisimingerFitnessMarker.getPosition());
        modifyTextBox(0, eisimingerFitnessObj.linkName, eisimingerFitnessObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    eisimingerFitnessMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", eisimingerFitnessObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    eisimingerFitnessMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
//  ***  Lemieux Library  ***  //
    let lemieuxLibraryMarker = new google.maps.Marker({
        position: {
        lat: 47.608645,
        lng: -122.318487
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let lemieuxLibraryLink = document.getElementById('lemieuxLibrary');
    // create object to store Info Box attributes
    let lemieuxLibraryObj = {linkId: lemieuxLibraryLink, linkName: 'Lemieux Library', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(lemieuxLibraryLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(lemieuxLibraryMarker.getPosition());
        modifyTextBox(0, lemieuxLibraryObj.linkName, lemieuxLibraryObj.linkDesc);
    });
    // create click listener for marker
    lemieuxLibraryMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(lemieuxLibraryMarker.getPosition());
        modifyTextBox(0, lemieuxLibraryObj.linkName, lemieuxLibraryObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    lemieuxLibraryMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", lemieuxLibraryObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    lemieuxLibraryMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });
	
	
	
//  ***  Japanese Tea Garden  ***  //
    let teaGardenMarker = new google.maps.Marker({
        position: {
        lat: 47.607124,
        lng: -122.319198
        },
        icon: icons['significantGardensIcon'].icon,
        map: map,
    });
    // create variable to store b-coloumn link ID
    let teaGardenLink = document.getElementById('teaGarden');
    // create object to store Info Box attributes
    let teaGardenObj = {linkId: teaGardenLink, linkName: 'Japanese Tea Garden', linkDesc: ""};
    // create dom listener for b-coloumn anchor link
    google.maps.event.addDomListener(teaGardenLink, 'click', function() {
        map.setZoom(19);
        map.setCenter(teaGardenMarker.getPosition());
        modifyTextBox(0, teaGardenObj.linkName, teaGardenObj.linkDesc);
    });
    // create click listener for marker
    teaGardenMarker.addListener('click', function() {
        map.setZoom(19);
        map.setCenter(teaGardenMarker.getPosition());
        modifyTextBox(0, teaGardenObj.linkName, teaGardenObj.linkDesc);
        $("#PinLabel").hide();
        openKey(1);
    });
    // create mouseover listener for marker label
    teaGardenMarker.addListener('mouseover', function() {
        modifyPinLabel(0, "Significant Gardens", teaGardenObj.linkName);
        $("#POITextBox").hide();
    });
    // Click Listener for Pin Labels
    teaGardenMarker.addListener('mouseout', function() {
        $("#PinLabel").hide();
    });

//  *** Significant Gardens Markers end ***  //



//  *** End of Google Map JavaScript ***  //
}



/***
 *  Media Library ID: 4730738
 *  map.js
 * 
 */