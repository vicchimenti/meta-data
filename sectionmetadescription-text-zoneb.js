/**
 * Programmable layout that recurses through the hierarchy looking for
 * Code Only content.
 *
 * The reason we use this instead
 * of a Related Content navigation object is because the navigation
 * object doesn't account for the "Section Customizations" folder not
 * having a footer contact into -- if the navigation object finds the
 * folder but it doesn't contain the content, then nothing is displayed.
 */

// Import relevant Java classes
//importClass(com.terminalfour.publish.PathBuilder);
importClass(com.terminalfour.sitemanager.cache.CachedContent);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.content.IContentManager);
importClass(com.terminalfour.template.TemplateManager);

/** Global variables **/
var CIDs = [207,226,234,256,593,4903];
//Secondary Content, Code Zone B, Focus Box, Program Summary Box, Facebook Feed, minispotlight

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
            for (var j = 0; j < CIDs.length && !match; j++)
            {
            	if (content.getContentTypeID() == CIDs[j]) match = true;
            }
            if (!match) contentList[i] = null; // Splicing the last element of an array doesn't work, so we avoid the problem entirely by setting the element to null instead
		}
        if (contentList.length > 0)
        {
            for (var i = 0; i < contentList.length; i++)
            {
                if (contentList[i] != null)
                {
                content = oCM.get(contentList[i].ID, language);
                var FORMATTER = "text/zoneb";
                var templateManager = TemplateManager.getManager();
                var CID = content.getContentTypeID();
                var format = templateManager.getFormat(dbStatement, CID, FORMATTER);
                var formatString = format.getFormatting();
        		document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, foundSection, content, language, isPreview, formatString));
                }
            }
        }
    }
	section = section.getParent();
}