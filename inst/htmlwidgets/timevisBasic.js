/*********************************************************************/
/* Dean Attali 2016                                                  */
/* timevis                                                           */
/* Create timeline visualizations in R using htmlwidgets and vis.js  */
/*********************************************************************/

HTMLWidgets.widget({

  name : 'timevisBasic',
  type : 'output',

  factory : function(el, width, height) {

    var elementId = el.id;
    var container = document.getElementById(elementId);
    var timeline = new vis.Timeline(container, [], {});
    var initialized = false;

    return {

      renderValue: function(opts) {
        if (!initialized) {
          initialized = true;
          container.timeline = timeline;

          if (HTMLWidgets.shinyMode) {
            timeline.on('select', function (properties) {
              Shiny.onInputChange(elementId + "_selected", properties.items);
            });
            Shiny.onInputChange(elementId + "_selected", timeline.getSelection());
            
            timeline.itemsData.on('*', function (event, properties, senderId) {
              Shiny.onInputChange(
                elementId + "_data" + ":timevisDF",
                timeline.itemsData.get()
              );
            });
          }
        }
        timeline.itemsData.clear();
        timeline.itemsData.add(opts.items);
      },

      resize : function(width, height) {
        // we won't be implementing a resize function
      }
   
    };
  }
});

if (HTMLWidgets.shinyMode) {
  Shiny.addCustomMessageHandler("timevis:setWindow", function(message) {
    var el = document.getElementById(message.id);
    if (el) {
      el.timeline.setWindow(message.start, message.end, message.options);
    }
  });
}