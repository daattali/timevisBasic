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

    return {

      renderValue: function(opts) {
        timeline.itemsData.clear();
        timeline.itemsData.add(opts.items);
      },

      resize : function(width, height) {
        // we won't be implementing a resize function
      }
   
    };
  }
});