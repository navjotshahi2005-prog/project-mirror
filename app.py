from flask import Flask, jsonify, send_from_directory, request
import sqlite3
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
def init_db():
    conn = sqlite3.connect("project_mirror.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            score INTEGER NOT NULL,
            privacy_level TEXT NOT NULL
        )
    """)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS quiz_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        score INTEGER NOT NULL,
        total INTEGER NOT NULL
    )
""")
    conn.commit()
    conn.close()

init_db()

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def files(filename):
    return send_from_directory(".", filename)
@app.route("/api/save-assessment", methods=["POST"])
def save_assessment():
    data = request.get_json()

    score = data.get("score")
    privacy_level = data.get("privacy_level")

    conn = sqlite3.connect("project_mirror.db")
    conn.execute(
        "INSERT INTO assessments (score, privacy_level) VALUES (?, ?)",
        (score, privacy_level)
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Assessment saved!"})
@app.route("/api/save-quiz", methods=["POST"])
def save_quiz():
    data = request.get_json()

    score = data.get("score")
    total = data.get("total")

    if not isinstance(score, int) or not isinstance(total, int) or total <= 0 or score < 0 or score > total:
        return jsonify({"status": "error", "message": "Invalid quiz score"}), 400

    conn = sqlite3.connect("project_mirror.db")
    conn.execute(
        "INSERT INTO quiz_results (score, total) VALUES (?, ?)",
        (score, total)
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Quiz result saved!"})
@app.route("/api/dashboard")
def dashboard():
    conn = sqlite3.connect("project_mirror.db")
    conn.row_factory = sqlite3.Row

    assessments = conn.execute(
        "SELECT * FROM assessments ORDER BY id DESC"
    ).fetchall()

    quizzes = conn.execute(
        "SELECT * FROM quiz_results ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return jsonify({
        "assessments": [dict(row) for row in assessments],
        "quizzes": [dict(row) for row in quizzes]
    })
@app.route("/api/status")
def status():
    return jsonify({
        "message": "PROJECT MIRROR backend is running!",
        "status": "success"
    })
@app.route("/api/contact", methods=["POST"])
def save_contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    conn = sqlite3.connect("project_mirror.db")
    conn.execute(
        "CREATE TABLE IF NOT EXISTS contact_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL)"
    )
    conn.execute(
        "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
        (name, email, message)
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Message saved!"})
if __name__ == "__main__":
    app.run(debug=True)