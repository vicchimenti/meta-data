/**
 * Programmable layout that recurses through the hierarchy looking for
 * Code Only content.
 *
 * The reason we use this instead
 * of a Related Content navigation object is because the navigation
 * object doesn't account for the "Section Customizations" folder not
 * having a relevant content type.
 */
// Import relevant Java classes
//importClass(com.terminalfour.publish.PathBuilder);
importClass(com.terminalfour.sitemanager.cache.CachedContent);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.content.IContentManager);
importClass(com.terminalfour.template.TemplateManager);
/* IDs of content types available for recursive use 
   All code-only, Curated Events Box, Facebook Feed, Focus Box, Give Button, Program Summary Box,
   Quicklinks, Secondary Content, Social Media Buttons, Supplemental Content, Twitter Timeline Feed,
   Mini Spotlight
   
   Remove when retired:
   732: Facebook Feed - Zone C, 828: Social Media Buttons (1)
*/
var CIDs = [73,195,207,209,216,226,234,236,245,247,256,337,371,593,594,732,828,4943,4944,4899,4903];
var channel = publishCache.getChannel();
while (section)
{
	var sectionChildren = section.getChildren();
	var foundSection = null;
	for (var i = 0; i < sectionChildren.length && !foundSection; i++) {
		if (sectionChildren[i].getName(language) == "Section Customizations") foundSection = sectionChildren[i];
	}
	if (foundSection)
	{
		/** Scope variables **/
		var contentList = foundSection.getContent(language, CachedContent.APPROVED); // CachedContent[] of content in the section
		var oCM = ApplicationContextProvider.getBean(IContentManager); // Replaces ContentManager from V7
		// For each content item in the section
		for (var i = contentList.length-1; i >= 0; i--) {
			content = oCM.get(contentList[i].ID, language); // Variable is given to us by default
			// If content is of type "Footer Contact Information", set found to true
			// Note: getContentTypeID() in V8 was getTemplateID() in V7
            var match = false;
            for (var j = 0; j < CIDs.length && !match; j++){
            	if (content.getContentTypeID() == CIDs[j]) match = true;
            }
            if (!match) contentList[i] = null; 
          	// Splicing the last element of an array doesn't work, so we avoid the problem entirely by setting the element to null instead
		}
        if (contentList.length > 0){
        	var alphabet = []; //to make a list of content types and sort automatically
        	for (var i = 0; i < contentList.length; i++){
            	if (contentList[i] != null){
                	alphabet.push([contentList[i].getName(language,20).substring(0,1),i]);
                  	//get first letter of content type and location within contentList[]
              	}
           	}
           	alphabet.sort();
            /*for (var i = 0; i < alphabet.length; i++){
            	document.write("<span style='display:none;'>"+(alphabet[i])[1]+"</span>");
            }*/
            for (var i = 0; i < alphabet.length; i++){
          	  //if (contentList[i] != null){
              	  //document.write("<span style='display:none;'>"+contentList[i].getName(language,20).substring(0,1)+"</span>");
                content = oCM.get(contentList[(alphabet[i])[1]].ID, language);
                var FORMATTER = "v9/text/html";
                var templateManager = TemplateManager.getManager();
                var CID = content.getContentTypeID();
                var format = templateManager.getFormat(dbStatement, CID, FORMATTER);
                var formatString = format.getFormatting();
        		document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, foundSection, content, language, isPreview, formatString));
                //}
            }
        }
    }
	section = section.getParent();
}