document.addEventListener("DOMContentLoaded", function () {

    // Smooth navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Privacy Score Calculation
    const form = document.getElementById("privacyForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let score = 0;

            for (let i = 1; i <= 5; i++) {
                const answer = document.getElementById("q" + i);

                if (!answer || answer.value === "") {
                    alert("Please answer all 5 questions first!");
                    return;
                }

                score += Number(answer.value);
            }

            let level;
            let recommendation;

            if (score >= 80) {
                level = "Excellent Privacy Habits!";
                recommendation = "Great work! Keep reviewing your privacy settings and using strong, unique passwords.";
            }
            else if (score >= 50) {
                level = "Moderate Privacy Awareness";
                recommendation = "Good start! Improve your account security and regularly check app permissions.";
            }
            else {
                level = "Privacy Awareness Needs Improvement";
                recommendation = "Start by reviewing privacy settings, using strong passwords and enabling two-factor authentication.";
            }


            // PERSONALISED PRIVACY RECOMMENDATIONS

            const advice = [];

            const questions = [
                { id: "q1", tip: "Review your privacy settings regularly." },
                { id: "q2", tip: "Use different, strong passwords for your accounts." },
                { id: "q3", tip: "Enable two-factor authentication wherever available." },
                { id: "q4", tip: "Review app permissions and remove unnecessary access." },
                { id: "q5", tip: "Always check links carefully before clicking them." }
            ];

            questions.forEach(function (question) {
                const answer = Number(document.getElementById(question.id).value);

                if (answer === 0) {
                    advice.push(question.tip);
                }
            });

            if (advice.length > 0) {
                recommendation += " Your personalised action plan: " + advice.join(" ");
            } else {
                recommendation += " Excellent! Keep maintaining your good privacy habits.";
            }
            document.getElementById("score").textContent = score + "/100";
            document.getElementById("livePrivacyScore").textContent = score + "/100";
            document.getElementById("scoreCircle").style.background =
                `conic-gradient(#7041a6 ${score}%, white ${score}%)`;
            document.getElementById("level").textContent = level;
            document.getElementById("recommendation").textContent = recommendation;
            fetch("/api/save-assessment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    score: score,
                    privacy_level: level
                })
            })
                .then(response => response.json())
                .then(data => console.log("Assessment saved:", data))
                .catch(error => console.error("Save failed:", error));
            document.getElementById("result").style.display = "block";
            document.getElementById("result").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    console.log("Welcome to PROJECT MIRROR!");
});
// DIGITAL FOOTPRINT SIMULATOR

function analyzeFootprint() {

    const checkboxes = document.querySelectorAll(".footprint:checked");

    let score = 0;

    checkboxes.forEach(function (box) {
        score += Number(box.value);
    });

    let message = "";

    if (score === 0) {
        message = "No public information selected. This fictional profile has a low visible digital footprint.";
    }
    else if (score <= 40) {
        message = "Low exposure. A few public details are visible.";
    }
    else if (score <= 60) {
        message = "Moderate exposure. Several public details could reveal information.";
    }
    else {
        message = "High exposure! Multiple public details could be combined to learn more about this fictional person.";
    }

    document.getElementById("footprintScore").textContent =
        "Digital Footprint Score: " + score + "/100";

    document.getElementById("footprintMessage").textContent = message;

    document.getElementById("footprintResult").style.display = "block";
}
// PRIVACY DASHBOARD PROGRESS TRACKER

document.addEventListener("DOMContentLoaded", function () {

    const tasks = document.querySelectorAll(".task");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    function updateProgress() {

        let completed = document.querySelectorAll(".task:checked").length;

        progressBar.value = completed;
        progressText.textContent = "Your Progress: " + completed + "/5";

    }

    tasks.forEach(function (task) {
        task.addEventListener("change", updateProgress);
    });

});

// PRIVACY TIPS ROTATOR

const privacyTips = [
    {
        title: "🔐 Strong Passwords",
        message: "Always use strong and unique passwords for your accounts."
    },
    {
        title: "🛡️ Protect Your Privacy",
        message: "Review your social media privacy settings regularly."
    },
    {
        title: "📱 App Permissions",
        message: "Check which apps can access your camera, microphone and location."
    },
    {
        title: "🔗 Think Before Clicking",
        message: "Avoid clicking suspicious links or unknown attachments."
    },
    {
        title: "🔑 Two-Factor Authentication",
        message: "Enable two-factor authentication wherever available."
    },
    {
        title: "🌐 Safe Sharing",
        message: "Avoid sharing sensitive personal information publicly."
    },
    {
        title: "📸 Think Before Posting",
        message: "Remember that public posts and photos can leave a lasting digital footprint."
    }
];

let currentTip = 0;

function showNextTip() {

    currentTip = (currentTip + 1) % privacyTips.length;

    document.getElementById("tipTitle").textContent =
        privacyTips[currentTip].title;

    document.getElementById("dailyTip").textContent =
        privacyTips[currentTip].message;
}

// CYBER SAFETY QUIZ

document.addEventListener("DOMContentLoaded", function () {

    const quizForm = document.getElementById("cyberQuizForm");

    if (quizForm) {

        quizForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const answers = {
                q1: "b",
                q2: "a",
                q3: "c",
                q4: "b",
                q5: "c",
                q6: "a",
                q7: "d",
                q8: "b",
                q9: "c",
                q10: "a"
            };

            let score = 0;

            for (let question in answers) {

                const selected = document.querySelector(
                    'input[name="' + question + '"]:checked'
                );

                if (!selected) {
                    alert("Please answer all 10 questions!");
                    return;
                }

                if (selected.value === answers[question]) {
                    score++;
                }
            }

            let message;

            if (score >= 9) {
                message = "Excellent! You are a Cyber Safety Champion! 🏆";
            } else if (score >= 7) {
                message = "Great job! You have good cyber safety knowledge! 🌟";
            } else if (score >= 5) {
                message = "Good effort! Keep learning about online safety. 💜";
            } else {
                message = "Keep practising! Learn more about protecting yourself online. 🛡️";
            }

            document.getElementById("quizScore").textContent =
                "Your Score: " + score + "/10";

            document.getElementById("quizMessage").textContent = message;

            document.getElementById("quizResult").style.display = "block";
            
            fetch("http://127.0.0.1:5000/api/save-quiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    score: score,
                    total: 10
                })
            })
                .then(response => response.json())
                .then(data => console.log("Quiz saved:", data))
                .catch(error => console.error("Quiz save error:", error));
            const certificateOption = document.getElementById("certificateOption");

            if (score === 10) {
                certificateOption.style.display = "block";
            } else {
                certificateOption.style.display = "none";
            }

            document.getElementById("quizResult").scrollIntoView({
                behavior: "smooth"
            });

        });

    }

});
function generateCertificate() {
    const name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Please enter your name first!");
        return;
    }

    document.getElementById("certificateName").textContent = name;

    document.getElementById("certificateDate").textContent =
        "Completed on: " + new Date().toLocaleDateString();

    document.getElementById("certificate").style.display = "block";

    document.getElementById("certificate").scrollIntoView({
        behavior: "smooth"
    });
}
// ANIMATED STATISTICS

function animateCounter(elementId, targetNumber) {
    const element = document.getElementById(elementId);

    if (!element) return;

    let currentNumber = 0;
    const duration = 1200;
    const interval = 30;
    const increment = targetNumber / (duration / interval);

    const counter = setInterval(function () {
        currentNumber += increment;

        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(counter);
        }

        element.textContent = Math.floor(currentNumber);
    }, interval);
}

document.addEventListener("DOMContentLoaded", function () {
    animateCounter("privacyToolsCount", 5);
    animateCounter("quizQuestionsCount", 10);
    animateCounter("protectionTasksCount", 5);
});
document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Message sent successfully!");
            this.reset();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Could not send message. Please try again.");
        console.error(error);
    }
});
async function loadDashboardData() {
    try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        const assessmentBox = document.getElementById("assessmentHistory");
        const quizBox = document.getElementById("quizHistory");

        assessmentBox.textContent = "";
        quizBox.textContent = "";

        if (data.assessments.length === 0) {
            assessmentBox.textContent = "No assessment records yet.";
        } else {
            data.assessments.forEach(item => {
                const p = document.createElement("p");
                p.textContent = `Score: ${item.score} | Privacy level: ${item.privacy_level}`;
                assessmentBox.appendChild(p);
            });
        }

        if (data.quizzes.length === 0) {
            quizBox.textContent = "No quiz records yet.";
        } else {
            data.quizzes.forEach(item => {
                const p = document.createElement("p");
                p.textContent = `Quiz score: ${item.score}/${item.total}`;
                quizBox.appendChild(p);
            });
        }

    } catch (error) {
        console.error("Dashboard loading error:", error);
    }
}

loadDashboardData();
