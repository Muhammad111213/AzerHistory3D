from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, template_folder=".")

@app.route("/")
def home():
    return render_template("FLL.html")

@app.route("/timeline")
def timeline():
    return render_template("timeline.html")

# Static fayllar üçün (şəkillər, CSS, JS, GLB)
@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    app.run(debug=True)
