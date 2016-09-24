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
          timeline.setOptions({ editable : true });

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