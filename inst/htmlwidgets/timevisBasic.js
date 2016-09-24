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
          container.widget = this;

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

        // Now that the timeline is initialized, call any outstanding API
        // functions that the user wantd to run on the timeline before it was
        // ready
        var numApiCalls = opts['api'].length;
        for (var i = 0; i < numApiCalls; i++) {
          var call = opts['api'][i];
          var method = call.method;
          delete call['method'];
          try {
            this[method](call);
          } catch(err) {}
        }
      },

      resize : function(width, height) {
        // we won't be implementing a resize function
      },
      
      setWindow : function(params) {
        timeline.setWindow(params.start, params.end, params.options);
      },
      addCustomTime : function(params) {
        timeline.addCustomTime(params.time, params.itemId);
      }
   
    };
  }
});

if (HTMLWidgets.shinyMode) {
  var fxns = ['setWindow', 'addCustomTime'];
  
  var addShinyHandler = function(fxn) {
    return function() {
      Shiny.addCustomMessageHandler(
        "timevis:" + fxn, function(message) {
          var el = document.getElementById(message.id);
          if (el) {
            el.widget[fxn](message);
          }
        }
      );
    };
  };

  for (var i = 0; i < fxns.length; i++) {
    addShinyHandler(fxns[i])();
  }
}