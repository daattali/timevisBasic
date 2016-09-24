#' Create a basic timeline visualization
#'
#' @seealso \href{http://daattali.com/shiny/timevis-demo/}{Demo Shiny app}
#' @examples
#' # Example 1 - no data
#' timevis()
#' 
#' # Example 2 - with data
#' 
#' # The data to use UNTIL you implement tip 3 (implementing 'dataframeToD3()')
#' data <- list(list(content = "today", start = Sys.Date()),
#'             list(content = "tomorrow", start = Sys.Date() + 1))
#' # The data to use AFTER you implement tip 3 (implementing 'dataframeToD3()')
#' # data <- data.frame(content = c("today", "tomorrow"),
#' #                    start = c(Sys.Date(), Sys.Date() + 1))
#' timevis(data)
#' 
#' # Example 3 - in a Shiny app
#' library(shiny)
#' shinyApp(
#'   ui = timevisOutput("timeline"),
#'   server = function(input, output) {
#'     output$timeline <- renderTimevis(
#'       timevis(data)
#'     )
#'   }
#' )
#' @export
timevis <- function(data, width = NULL, height = NULL, elementId = NULL) {
  items <- dataframeToD3(data)
  
  # forward options using x
  x = list(
    items = items
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'timevisBasic',
    x,
    width = width,
    height = height,
    package = 'timevisBasic',
    elementId = elementId
  )
}

#' Shiny bindings for timevis
#'
#' Output and render functions for using timevis within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended. \code{height} will probably not
#'   have an effect; instead, use the \code{height} parameter in
#'   \code{\link[timevis]{timevis}}.
#' @param expr An expression that generates a timevis
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name timevis-shiny
#' @export
timevisOutput <- function(outputId, width = '100%', height = 'auto') {
  htmlwidgets::shinyWidgetOutput(outputId, 'timevisBasic', width, height, package = 'timevisBasic')
}

#' @rdname timevis-shiny
#' @export
renderTimevis <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, timevisOutput, env, quoted = TRUE)
}

timevisBasic_html <- function(id, style, class, ...) {
  htmltools::tags$div(
    id = id, style = style, class = class,
    htmltools::div(
      style = "position: absolute;",
      htmltools::tags$button("+"),
      htmltools::tags$button("-")
    )
  )
}

dataframeToD3 <- function(df) {
  if (missing(df) || is.null(df)) {
    return(list())
  }
  if (!is.data.frame(df)) {
    stop("timevis: the input must be a dataframe", call. = FALSE)
  }
  
  row.names(df) <- NULL
  apply(df, 1, function(row) as.list(row[!is.na(row)]))
}

.onLoad <- function(libname, pkgname) {
  shiny::registerInputHandler("timevisDF", function(data, ...) {
    jsonlite::fromJSON(jsonlite::toJSON(data, auto_unbox = TRUE))
  })
}

callJS <- function() {
  message <- Filter(function(x) !is.symbol(x), as.list(parent.frame(1)))
  session <- shiny::getDefaultReactiveDomain()
  method <- paste0("timevis:", message$method)
  session$sendCustomMessage(method, message)
}

#' @export
setWindow <- function(id, start, end, options) {
  method <- "setWindow"
  callJS()
}

#' @export
addCustomTime <- function(id, time, itemId) {
  method <- "addCustomTime"
  callJS()
}