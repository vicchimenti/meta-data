/***
 *      @author Victor Chimenti, MSCS-SE '20
 *      @file full-text-custom-head-code.js
 *      @see https://www.seattleu.edu/business/graduate/graduate-blog/
 *
 *      This document will format the tags necessary to pull metadata from the
 *      content item fields and insert it into the head of a page layout.
 *      Used for fulltext items such as blog posts.
 *
 *      Document will write once when the page loads
 *
 *      @version 1.10
 */




try {




    /***
     *  Assign local variables from the content type's fields
     * 
     * */
    var metaType = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='og:type' content='article' />");
    var metaArticleAuthor = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta property='article:author' content='<t4 type=\'content\' name=\'Posted By\' output=\'normal\' modifiers=\'striptags,htmlentities\' />' />");
    var metaTitleOG = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='title' property='og:title' content='<t4 type=\'content\' name=\'Post Title\' output=\'normal\' modifiers=\'striptags,htmlentities\' />' />");
    var metaDescriptionOG = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='description' property='og:description' content='<t4 type=\'content\' name=\'Body\' output=\'normal\' modifiers=\'striptags,htmlentities\' />' />");

    // var metaImageOG = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='image' property='og:image' content='<t4 type=\'content\' name=\'Thumbnail image\' output=\'normal\' formatter=\'path/*\' />' />");
    // var metaArticleTagsOG = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='article:tag' content='<t4 type=\'content\' name=\'Categories\' output=\'normal\' display_field=\'value\' />' />");
    var metaCard = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='twitter:card' property='summary_large_image' />");
    var metaTwitterSite = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='twitter:site' property='@seattleu' />");

    var metaTitleTwitter = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='twitter:title' content='<t4 type=\'content\' name=\'Post Title\' output=\'normal\' modifiers=\'striptags,htmlentities\' />' />");
    var metaDescriptionTwitter = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<meta name='twitter:description' content='<t4 type=\'content\' name=\'Body\' output=\'normal\' modifiers=\'striptags,htmlentities\' />' />");




    /***
     *  Write the document once
     * 
     * */
    document.write("<!-- Meta Article Informatin -->");
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaType));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaArticleAuthor));
    document.write("<!-- Open Graph Meta -->");
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaTitleOG));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaDescriptionOG));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaImageOG));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaArticleTagsOG));
    document.write("<!-- Twitter Meta -->");
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaCard));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaTwitterSite));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaTitleTwitter));
    document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, metaDescriptionTwitter));




} catch (err) {
    document.write(err.message);
}