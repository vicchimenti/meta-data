try {
    importClass(com.terminalfour.database.DatabaseUtils);
    importClass(com.terminalfour.channel.IChannelManager);
    importClass(com.terminalfour.spring.ApplicationContextProvider);
    importClass(com.terminalfour.publish.utils.BrokerUtils);
    importClass(java.lang.StringBuilder);
      
    //Get the channels and/or microsite id's needed for the sitemap
    function getContentChannelIds(){
      var ids = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Channel Ids" output="normal" modifiers="striptags,htmlentities" />').split(",");
       
      for (var i = 0; i < ids.length; i++){
         ids[i] = ids[i].trim();
      }
      return ids;
    }
     
    //Get the users extra file extensions permitted in the site map
    function getFileExtensions(){
      var fileExtensions = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Include file extensions" output="normal" modifiers="striptags,htmlentities" />').split(",");
        
      for (var i = 0; i < fileExtensions.length; i++){
          fileExtensions[i] = fileExtensions[i].trim();
      }
      return fileExtensions;
    }
   
    // Build a query to retrieve the path and last modified fields from the database for the content Channel
    function buildPubFileInfoQuery(fileExtensions, channelIds, defaultFileName){
      var query = new StringBuilder("SELECT path, last_modified FROM published_file_info WHERE channel_id");
      var num;
      if (channelIds.length > 1){
        query.append(" IN (");
        for (var id = 0; id < channelIds.length; id++){
          num = id + 1;
          if (id + 1 == channelIds.length){
            query.append(channelIds[id])
            .append(")");
          }else{
            query.append(channelIds[id])
            .append(", ");
          }
        }
      }else{
         query.append(" = ")
         .append(channelIds[0]);
      }
      if (fileExtensions.length == 1 && fileExtensions[0] == ''){
        query.append(" AND path LIKE '%")
        .append(defaultFileName)
        .append("' AND approved_pending = 0");
      }else{
        query.append(" AND (path LIKE '%")
        .append(defaultFileName)
        .append("'");
        for (ext in fileExtensions){
          query.append(" OR path LIKE '%")
          .append(fileExtensions[ext])
          .append("'");
        }
        query.append(") AND approved_pending = 0");
      }                   
      return query;
    }
   
    // Retrieves the paths and dates to be used in the sitemap
    function getPubFileInfo(query){
      var dbConnection,
          pubFileInfo = [],
          paths = [],
          path = 0,
          lastModDates = [],
          lastModDate = 0,
          pathStr,
          lastModStr,
          pubFileInfoStmt,
          pubFileInfoRS;
      try {
        dbConnection  = DatabaseUtils.getConnection();
        pubFileInfoStmt = dbConnection.createStatement();
        pubFileInfoRS = pubFileInfoStmt.executeQuery(query);
        while (pubFileInfoRS.next()){
          paths[path] = pubFileInfoRS.getString("path");   
          lastModDates[lastModDate] = pubFileInfoRS.getString("last_modified");  
          path++;
          lastModDate++;
        }
        pubFileInfo[0] = paths;
        pubFileInfo[1] = lastModDates;
      }catch (err){
        document.write ("An error occurred getting the publish file information for the T4 sitemap");
      }finally{
        DatabaseUtils.closeQuietly(pubFileInfoRS);
        DatabaseUtils.closeQuietly(pubFileInfoStmt);
        DatabaseUtils.closeQuietly(dbConnection);
      }
      return pubFileInfo;
    }
      
    // Format path for use in the Sitemap
    function formatPath(paths, defaultFileName, channel){
      var pubDir = channel.getFileOutputPath().toLowerCase().trim(),
          path = 0;
      
      defaultFileName = "/" + defaultFileName;
      pubDir = pubDir.replace("\\", "/");
      if (pubDir.substring(pubDir.length() - 1) == '/'){
        pubDir = pubDir.substring(0, pubDir.length() - 1);
      }
      while (path < paths.length){
        paths[path] = paths[path].replace("\\", "/").toLowerCase();    
        paths[path] = paths[path].replace(pubDir, "");        
        if (paths[path].indexOf(defaultFileName) >= 0){
          paths[path] = paths[path].replace(defaultFileName, '/');
        }
        path++;
      }   
      return paths;
    }
      
    // Format last modified fields for use in the Sitemap
    function  formatLastModified(lastModDates){
      var lastModDate = 0;
        
      while (lastModDate < lastModDates.length){
        lastModDates[lastModDate] = lastModDates[lastModDate].replaceAll(" ([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9].([0-9]+)", "");
        lastModDate++;
      }   
      return lastModDates;
    }
   
    // Exclusions are what pages we don't want in the sitemap
    function getExclusions(){
      var exclusionArray = [],
          exclusions = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Exclusions" output="normal" modifiers="striptags,htmlentities" />');
      if (exclusions.length() > 0){
        exclusionArray = exclusions.split(",");
        for (var i = 0; i < exclusionArray.length; i++){
          exclusionArray[i] = exclusionArray[i].trim();
        }
      }else{
        exclusionArray = null;
      }
      return exclusionArray;
    }
   
    // Check for a valid baseHref and set it if it is not
    function getBaseHref(){
      var baseHref = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Base HREF" output="normal" modifiers="striptags,htmlentities" />').trim();
      if (baseHref.substring(baseHref.length()-1) == '/'){
        baseHref = baseHref.substring(0, baseHref.length()-1);
      }
      return baseHref;
    }
   
    /* Check if spaces are to be replaced in section names. If so, exclusions need to have their spaces replaced.
    This should cover spaces in output uri's being replaced also because if section name spaces are removed, the
    output uri ones tend to be also. Both options having different enabled status have not been accounted for. */
    function formatExclusions(channel, exclusionArray){
      var query,
          fileNameSep,
          configRS,
          dbConnection,
          configStmt;
       
      if (channel.isConvertSpacesInSectionNameEnabled() == true){
        try{
          dbConnection = DatabaseUtils.getConnection();
          configStmt = dbConnection.createStatement();
          query = "SELECT config_value FROM config_option WHERE config_key = 'previewPublish.replaceSpacesInFilenamesWith'";
          configRS = configStmt.executeQuery(query);
          if (configRS.next()){
            fileNameSep = configRS.getString('config_value');
          }
          if (fileNameSep === null || fileNameSep === '' || fileNameSep === undefined){       
            fileNameSep = ',';  
          }
        }catch (err){
          document.write ("An error occurred getting the file part separator for the T4 sitemap");
        }finally{
          DatabaseUtils.closeQuietly(configRS);
          DatabaseUtils.closeQuietly(configStmt);
          DatabaseUtils.closeQuietly(dbConnection);
        }
      }else{
        fileNameSep = '';
      }
      if (exclusionArray !== null){
        for(var i = 0; i < exclusionArray.length; i++){
          exclusionArray[i] = exclusionArray[i].replaceAll("[\'\,\(\)]", "");
          exclusionArray[i] = exclusionArray[i].replace(" ", fileNameSep);
        }
      }
      return exclusionArray;
    }
     
    // Skip over any excluded URL's and generate the Sitemap XML for the remaining ones
    function generateSitemap(paths, exclusionArray, lastModDates){
      var len = paths.length,
          skip,
          baseHref = getBaseHref();
      document.writeln('<?xml version="1.0" encoding="UTF-8"?>');
      document.writeln('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      for (var path = 0, date = 0;path < len; path++, date++){
        skip = false;
        // Check if there are exclusions to skip in sitemap
        if (exclusionArray !== null){
          if (exclusionArray.length > 0 || exclusionArray.length != undefined){
            for(var i = 0; i < exclusionArray.length; i ++ ){
              if (paths[path].indexOf(exclusionArray[i].toLowerCase()) >= 0){
                skip = true;
              }
            }
          }
        }
        if (skip === false){
          document.writeln('<url>');
          document.writeln('<loc>' + baseHref + paths[path] + '</loc>');
          document.writeln('<changefreq>daily</changefreq>');
          document.writeln('<priority>1</priority>');
          document.writeln('<lastmod>' + lastModDates[date] + '</lastmod>');
          document.writeln('</url>');
        }
      }
      document.writeln('</urlset>');
    }
        
    /*--------------------------------------------------------------------------
    Main program
    --------------------------------------------------------------------------*/
    var channelId,
      contentChannel,
      query,
      pubFileInfo,
      paths = [],
      lastModDates = [],
      exclusionArray = [],
      channel = publishCache.getChannel(),
      defaultFileName;
      channelId = getContentChannelIds();
      defaultFileName = channel.getIndexFileName();
      query = buildPubFileInfoQuery(getFileExtensions(), channelId, defaultFileName);
      pubFileInfo = getPubFileInfo(query);
      paths = formatPath(pubFileInfo[0], defaultFileName, channel);
      lastModDates = formatLastModified(pubFileInfo[1]);
      exclusionArray = getExclusions();
      exclusionArray = formatExclusions(channel, exclusionArray);
      generateSitemap(paths, exclusionArray, lastModDates);
  }catch(err){
    document.write(err);
  }