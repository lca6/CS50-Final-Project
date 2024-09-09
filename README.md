# Assisted Reading



## Video Demonstration

https://www.youtube.com/watch?v=f9GJKFQHFk0

![text page with a word highlighted and previous words hidden (image)](images/highlighted-text.png)



## Description

A website designed to improve your reading speed and provide a great reading experience to users.

Input the text you would like to read and the program highlights each word at the given reading speed and hides previous words.



## app.py

`app.py` uses Flask to render the `index.html` template when the user opens the application

```python
@app.route("/")
def index():
    return render_template("index.html")
```

and the `text.html` template when the user submits the form.

```python
@app.route("/read", methods=["GET", "POST"])
def read():
    if request.method == "POST":
        text = request.form.get("textarea")
        speed = request.form.get("reading-speed")
        font_size = request.form.get("font-size")
        highlighter_color = request.form.get("highlighter-color")

        return render_template("text.html", text=text, speed=speed, font_size=font_size, highlighter_color=highlighter_color)

    else:
        return redirect("/")
```



## index.html

`index.html` extends the `layout.html` boilerplate.

It contains a form with a textarea element into which the user inputs the text they would like to read.

Underneath the textarea are dropdown menus where the user selects their desired reading speed and font size.

At the very bottom is a series of radio buttons to select a highlighter color.

The "Ready to go" button at the top of the page submits the form.

![homepage (image)](images/index.png)



## text.html

`text.html` displays the user's text in an readable window.



## assisted_reading.js

### determinePage()

When the Document Object Model has loaded, `determinePage()` is called. This function determines which route has been taken and calls `validateFormSubmission()` or `highlightEachWord()` accordingly.

### validateFormSubmission()

Handles the server-side validation of the form submission. It ensures that

A) the user has entered text in the textarea,

B) the user has chosen a valid reading speed from the options provided (and has not changed the browser's HTML) and

C) the user has chosen a valid font size from the options provided (and again has not changed the browser's HTML).

If any of these criteria have not been met, an error message will appear.

Only if all these criteria have been met will the form be submitted successfully.

### highlightEachWord()

The `highlightEachWord()` function firstly identifies each separate word in the text

```javascript
// Extracts text from text.html
const main = document.querySelector("main");

// Converts the text into an array of words
const words = main.innerHTML.trim().replaceAll("\n", " ").split(" ").filter(removeSpaces);
```

It then calculates how long to highlight each word for (using the user's specified reading speed)

```javascript
const interval = calculateInterval(speed);

function calculateInterval(WPM) {
    return 60000 / WPM; // in milliseconds per word
}
```

and iterates through each word at that given interval.

```javascript
let index = 0;
setInterval(function highlightAndHide() {

    if (index < words.length) {

        // Hides the previous word
        if (index > 0) {
            words[index - 1] = words[index - 1].replace(`<span class="highlight-${highlighterColor}">`, `<span class="hide">`);
        }

        // Wraps the current word in a <span> tag to highlight it
        words[index] = `<span class="highlight-${highlighterColor}">${words[index]}</span>`;

        // Converts the array of words with the <span> tag to a string to be displayed
        main.innerHTML = words.join(" ");

        index++;
    }
}, interval);
```



## Another Option

If you would prefer that the words **NOT** be hidden and remain visible, replace this

```javascript
// Hides the previous word
words[index - 1] = words[index - 1].replace(`<span class="highlight-${highlighterColor}">`, `<span class="hide">`);
```

with this in `assisted_reading.js`.

```javascript
// Unwraps the previous word from a <span> tag to unhighlight it
words[index - 1] = words[index - 1].replace(`<span class="highlight-${highlighterColor}">`, ``).replace("</span>", "");
```



## styles.css

The stylesheet for *Assisted Reading*.

The most noteworthy selector is the `main` element selector.

```CSS
main {
    background-color: white;
    width: 100%;
    border: 10px solid black;
    padding: 5%;
    margin: auto;
    line-height: 250%;
    font-size: 26px;
}
```



---

This project is the Minimum Viable Product as of yet so it is still a work-in-progress.

*Assisted Reading* may be developed into a Chrome extension and a feature will be added to give the user the option to hide previous words or keep them visible.

---
