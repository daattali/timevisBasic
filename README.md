# timevisBasic - Helper package to learn advanced 'htmlwidgets' tips

The [`timevis`](https://github.com/daattali/timevis) package is an htmlwidget that lets you create timeline visualizations. This package includes a very basic implementation of the `timevis` package and is used as an educational tool for teaching advanced htmlwidgets tips.

## Tutorial

See the full tutorial [here](http://deanattali.com/blog/advanced-htmlwidgets-tips).

The code in this package is used as the starting point for the tutorial above. Every tip in the tutorial will walk you through adding a useful feature to the package, and you can see the final result of each step as a [separate branch](https://github.com/daattali/timevisBasic/branches/all) in this repo.

## Example code

The `master` branch of this repo has the most basic htmlwidget possible, and there are [12 other branches](https://github.com/daattali/timevisBasic/branches/all), corresponding to the 12 steps in the tutorial. Each branch has the complete code from its corresponding step, so that you can see it in a real working app to be convinced that what I wrote in the tutorial really does work.

Since each tip in the tutorial results in a more and more feature-heavy widget, I will give you an example code usage for every step. Don't forget to include `library(shiny)` to make all the sample codes work.

### Example code for the initial project (what you can run right now)

Using the code in the master branch:

```
data <- list(list(content = "today", start = Sys.Date()),
             list(content = "tomorrow", start = Sys.Date() + 1))
shinyApp(
  ui = timevisOutput("timeline"),
  server = function(input, output) {
    output$timeline <- renderTimevis(
      timevis(data)
    )
  }
)
```

### Example code for tip 1:

Tip 1 was a very small change so the previous code will still work the same way.

### Example code for tip 2:

The previous code will still work, but now you should be able to see zoom in and zoom out buttons (though we didn't make those buttons functional).

### Example code for tip 3:

We added `dataframeToD3()` function, so now our data frame can be simplified, but the app code remains the same.

```
data <- data.frame(content = c("today", "tomorrow"),
                   start = c(Sys.Date(), Sys.Date() + 1))
shinyApp(
  ui = timevisOutput("timeline"),
  server = function(input, output) {
    output$timeline <- renderTimevis(
      timevis(data)
    )
  }
)
```

### Example code for tip 4:

In this tip, we made sure the widget only renders the latest data, rather than all the previous data as well. Run the following shiny app now, and try running it prior to tip 4 to see the difference.

```
shinyApp(
  ui = fluidPage(
    textInput("text", "Text", "Hello"),
    timevisOutput("timeline")
  ),
  server = function(input, output) {
    output$timeline <- renderTimevis({
      data <- data.frame(content = input$text, start = Sys.Date())
      timevis(data)
    })
  }
)
```

### Example code for tip 5:

Run the same code as before, and you'll see that the initialization message runs only once.

### Example code for tip 6:

If you run the same Shiny app code as before, you'll get a message telling you that you're inside a Shiny app. If you simply run `timevis()` in the console, the widget will render, but you will not be told you're in Shiny.

### Example code for tip 7a:

### Example code for tip 7b:

### Example code for tip 8a:

### Example code for tip 8b:

### Example code for tip 8c:

### Example code for tip 8d:
