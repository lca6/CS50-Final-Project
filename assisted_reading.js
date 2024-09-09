document.addEventListener("DOMContentLoaded", determinePage);


function determinePage() {
    const page = window.location.pathname;

    if (page === "/") {
        validateFormSubmission();
    } else {
        highlightEachWord();
    }
}


function validateFormSubmission() {
    // When the index.html form is submitted
    const form = document.getElementById("form");

    form.addEventListener("submit", function(event) {
        // Stops the submission
        event.preventDefault();

        // Validates that user has submitted text in the textarea
        const text = document.querySelector("textarea").value;
        const textError = document.getElementById("text_error_message");
        if (text === "" || text === "\n") {
            error(textError);
            return;
        }

        // Validates that user has chosen a valid reading speed
        const readingSpeed = document.getElementById("reading-speed").value;
        const speedError = document.getElementById("speed_error_message");

        if (readingSpeed === "") {
            error(speedError);
            return;
        }

        const readingSpeedOptions = [
            "100",
            "125",
            "150",
            "175",
            "200",
            "225",
            "250",
            "275",
            "300",
            "325",
            "350",
            "375",
            "400",
            "425",
            "450",
            "475",
            "500"
        ];

        if (readingSpeedOptions.includes(readingSpeed) == false) {
            error(speedError);
            return;
        }

        // Validates that user has chosen a valid font size
        const fontSize = document.getElementById("font-size").value;
        const fontSizeError = document.getElementById("font-size_error_message");

        if (fontSize === "") {
            error(fontSizeError);
            return;
        }

        const fontSizeOptions = [
            "8",
            "9",
            "10",
            "11",
            "12",
            "14",
            "16",
            "18",
            "20",
            "22",
            "24",
            "26",
            "28",
            "30",
            "36",
            "42",
            "48"
        ];

        if (fontSizeOptions.includes(fontSize) == false) {
            error(fontSizeError);
            return;
        }

        // If the form submission is valid
        validationSuccessful();
        form.submit();
        return;
    });
}


function highlightEachWord() {
    // Extracts text from text.html
    const main = document.querySelector("main");

    // Converts the text into an array of words
    const words = main.innerHTML.trim().replaceAll("\n", " ").split(" ").filter(removeSpaces);

    // Obtains the user's chosen reading speed
    const speed = Number(document.querySelector("#readingSpeed").innerHTML);

    // Obtains the user's chosen highlighter color
    const highlighterColor = document.querySelector("#highlighterColor").innerHTML;

    // Calculates how long to highlight each word for
    const interval = calculateInterval(speed);

    let index = 0;
    setInterval(function highlightAndHide() {

        if (index < words.length) {

            // Hides the previous word
            if (index > 0) {
                // words[index - 1] = words[index - 1].replace(`<span class="highlight-${highlighterColor}">`, ``).replace("</span>", ""); // Unwraps the previous word from a <span> tag to unhighlight it
                words[index - 1] = words[index - 1].replace(`<span class="highlight-${highlighterColor}">`, `<span class="hide">`);
            }

            // Wraps the current word in a <span> tag to highlight it
            words[index] = `<span class="highlight-${highlighterColor}">${words[index]}</span>`;

            // Converts the array of words with the <span> tag to a string to be displayed
            main.innerHTML = words.join(" ");

            index++;
        }
    }, interval);
}


function error(message) {
    message.style.display = "inline";
    const button = document.getElementById("submitButton");
    button.style.backgroundColor = "red";
    button.style.border = "red";
}


function validationSuccessful() {
    const button = document.getElementById("submitButton");
    button.style.backgroundColor = "green";
    button.style.border = "green";
}


function removeSpaces(word) {
    return word != " " && word != "";
}


function calculateInterval(WPM) {
    return 60000 / WPM; // in milliseconds per word
}
