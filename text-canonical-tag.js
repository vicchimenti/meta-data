try {
    var FullListOutputImports = JavaImporter(
        com.terminalfour.publish.utils.TreeTraversalUtils,
        com.terminalfour.spring.ApplicationContextProvider,
        com.terminalfour.content.IContentManager,
        com.terminalfour.version.Version,
        com.terminalfour.publish.utils.BrokerUtils,
        java.lang.Thread,
        com.terminalfour.publish.PathBuilder
    );
    with(FullListOutputImports) {
        var defaultDomain, getMirrorSource, customCanonicalURL;
        defaultDomain = {};
        defaultDomain[1] = 'https://www.seattleu.edu';
        defaultDomain[8] = 'https://www.seattleu.edu';
        getMirrorSource = true;
        customCanonicalURL = '<t4 type="navigation" id="<!-- INSERT ID -->"/>';

        function getCachedSectionFromId(sectionID) {
            if (typeof sectionID === 'undefined') {
                return section
            } else if (section.getID() == sectionID) {
                return section
            }
            sectionID = Number(sectionID)
            if (sectionID == 0) {
                throw 'Passed Incorrect Section ID to getCachedSectionFromId'
            }
            return TreeTraversalUtils.findSection(
                publishCache.getChannel(),
                section,
                sectionID,
                language
            )
        }

        function getContentManager() {
            return ApplicationContextProvider.getBean(
                IContentManager
            )
        }

        function getCachedContentFromId(contentID, contentVersion) {
            if (typeof contentID === 'undefined' && typeof contentVersion === 'undefined') {
                return content
            } else if (Number(contentID) <= 0 && typeof contentVersion !== 'undefined' && content !== null) {
                contentID = content.getID();
            } else {
                contentID = Number(contentID);
            }
            if (content === null && contentID === 0) {
                throw 'Passed Incorrect Content ID to getContentFromId'
            }
            var contentManager = getContentManager();
            if (typeof contentVersion !== 'undefined') {
                return contentManager.get(contentID, language, Version(contentVersion))
            } else {
                return contentManager.get(contentID, language)
            }
        }

        function processT4Tags(t4tag, contentID, sectionID, forMediaFile) {
            var cachedContent = content || null;
            var cachedSection = section;
            if (typeof sectionID !== 'undefined' && sectionID !== null && Number(sectionID) > 0) {
                cachedSection = getCachedSectionFromId(sectionID);
            }
            if (contentID === null && sectionID !== null) {
                cachedContent = null;
            } else if (typeof contentID !== 'undefined' && Number(contentID) > 0) {
                cachedContent = getCachedContentFromId(contentID);
                if (cachedContent == null) {
                    throw 'Could not get cachedContent';
                }
            }
            if (cachedSection == null) {
                throw 'Could not get cachedSection';
            }
            if (forMediaFile !== true) {
                forMediaFile = false;
            }
            var renderedHtml = String(BrokerUtils.processT4Tags(dbStatement, publishCache, cachedSection, cachedContent, language, isPreview, t4tag));
            if (forMediaFile) {
                renderedHtml = renderedHtml.replace(/&/gi, '&amp;');
            }
            return renderedHtml;
        }

        function getDomainURL(defaultDomain, sectionID) {
            var domain, channel, myMicrosite, publishURL, cachedSection;
            cachedSection = section;
            if (typeof sectionID !== 'undefined' && Number(sectionID) > 0) {
                cachedSection = getCachedSectionFromId(Number(sectionID));
            }
            if (typeof defaultDomain === 'undefined') {
                defaultDomain = {};
            }
            myMicrosite = publishCache.getMicroSiteFromChild(cachedSection);
            channel = myMicrosite ? myMicrosite : publishCache.getChannel();
            try {
                publishURL = 'https://www.seattleu.edu';
                // publishURL = String(channel.getChannelPublishURL());
            } catch (e) {
                publishURL = 'https://www.seattleu.edu';
            }
            if (publishURL != '') {
                domain = String(publishURL);
            } else if (channel.getBaseHref() != '') {
                domain = String(channel.getBaseHref());
                if (domain.substring(0, 1) == '/' && typeof defaultDomain[channel.getID()] !== 'undefined') {
                    domain = String(defaultDomain[channel.getID()]) + domain;
                }
            } else if (typeof defaultDomain[channel.getID()] !== 'undefined' && defaultDomain[channel.getID()] !== '') {
                domain = String(defaultDomain[channel.getID()]);
            } else {
                domain = '';
            }
            if (domain.length >= 2 && domain.substring((domain.length - 2)) == '//') {
                domain = domain.substring(0, (domain.length - 2));
            } else if (domain.substring((domain.length - 1)) == '/') {
                domain = domain.substring(0, (domain.length - 1));
            }
            return domain;
        }

        function isFullText() {
            return BrokerUtils.isFullTextPage(publishCache);
        }

        function getFulltextInfo() {
            if (isFullText()) {
                var currentThread = Thread.currentThread();
                return publishCache.getGenericProp('full-text-' + currentThread.getId())
            }
            return false;
        }

        function getFullURL(defaultDomain, getMirrorSource, previewURL) {
            var domain, sectionID, cachedSection
            fullURL = ''
            if (typeof defaultDomain === 'undefined') {
                defaultDomain = {}
            }
            if (typeof getMirrorSource === 'undefined') {
                getMirrorSource = false
            }
            if (previewURL !== true) {
                previewURL = false
            }
            if (section.isMirroredSection() && getMirrorSource) {
                sectionID = section.getMirrorSource()
            } else {
                sectionID = section.getID()
            }
            cachedSection = getCachedSectionFromId(sectionID)
            if (cachedSection.getStatus() == 2) {
                return '';
            }
            if (!previewURL) {
                domain = getDomainURL(defaultDomain, sectionID);
            } else {
                domain = '';
            }
            if (
                isFullText() &&
                !isPreview
            ) {
                var ThreadID,
                    fullTextPageInfo,
                    fullTextContentId,
                    fullTextTag
                fullTextPageInfo = getFulltextInfo();
                try {
                    fullTextContentId = fullTextPageInfo.getContentID()
                    if (!isNaN(fullTextContentId)) {
                        fullTextTag = String(fullTextPageInfo.getT4Tag()).split('(')
                        if (fullTextTag !== '') {
                            fullURL =
                                domain +
                                processT4Tags(
                                    fullTextTag[0], fullTextContentId, sectionID
                                )
                        } else {
                            fullURL =
                                domain +
                                PathBuilder.getLink(
                                    dbStatement,
                                    section,
                                    cachedSection,
                                    publishCache,
                                    language,
                                    previewURL
                                ).getLink()
                        }
                    } else {
                        throw 'getFullURL: Issue with fullTextContentId'
                    }
                } catch (e) {
                    throw e
                }
            } else {
                fullURL =
                    domain +
                    PathBuilder.getLink(
                        dbStatement,
                        section,
                        cachedSection,
                        publishCache,
                        language,
                        previewURL
                    ).getLink()
            }
            return fullURL
        }
        var html = '';
        var canonicalURL = '';
        var customCanonicalURL = processT4Tags(customCanonicalURL);
        canonicalURL = customCanonicalURL === '' ? getFullURL(defaultDomain, getMirrorSource) : getDomainURL(defaultDomain) + customCanonicalURL;
        if (!isPreview) {
            html = '<link rel="canonical" href="' + canonicalURL + '"/><meta name="twitter:url" content="' + canonicalURL + '"><meta property="og:url" content="' + canonicalURL + '">';
        } else {
            html = '<!-- Sorry Canonical URL is not available in preview -->';
        }
        document.write(html);
        document.write('');
    }
} catch (err) {
    var contentID = typeof content !== 'undefined' ? ' content ID: ' + content.getID() : '';
    var sectionID = typeof section !== 'undefined' ? ' section ID: ' + section.getID() : '';
    var message = 'Programmable Layout Error: ' + err + ' occurred in ' + contentID + sectionID + ')';
    var outputImports = JavaImporter(
        org.apache.commons.lang.StringEscapeUtils,
        java.lang.System
    );
    with(outputImports) {
        if (isPreview) {
            document.write(message);
        } else {
            document.write('<script>console.log("' + StringEscapeUtils.escapeJava(message) + '")</script>');
        }
        System.out.println(message);
    }
}