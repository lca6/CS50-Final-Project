from flask import Flask, redirect, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


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
