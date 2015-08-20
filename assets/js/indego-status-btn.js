;(function(window, document) {
  "use strict";
  
  var document = window.document;
  
  function loadContent(event) {
    
    // Initialize the popup click event
    $("[data-station-popup='bikes']").on("click", function(event) {
    
    });
    
    //$("[data-station-popup='docks']").hide();
  }
  
  if (document.readyState == "complete" || document.readyState == "loaded")
    window.addEventListener("load", loadContent)
  else
    window.addEventListener("DOMContentLoaded", loadContent)

})(this, document, 0);