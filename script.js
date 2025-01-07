const courses = [
    {
        courseName: "HTML Basics",
        youtubeLink: "https://www.youtube.com/watch?v=example1",  // Add a YouTube link for HTML course intro
        lessons: [
            { id: 1, title: "Introduction to HTML", youtubeUrl: "https://www.youtube.com/watch?v=example2" },
            { id: 2, title: "HTML Tags", youtubeUrl: "https://www.youtube.com/watch?v=example3" },
            { id: 3, title: "HTML Forms", youtubeUrl: "https://www.youtube.com/watch?v=example4" },
        ],
        quiz: [
            {
                question: "What does HTML stand for?",
                options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Markup Language"],
                correctAnswer: 0
            },
            {
                question: "Which tag is used to create a hyperlink in HTML?",
                options: ["<a>", "<link>", "<hyperlink>"],
                correctAnswer: 0
            }
        ]
    },
    {
        courseName: "CSS Basics",
        youtubeLink: "https://www.youtube.com/watch?v=example5",  // Add a YouTube link for CSS course intro
        lessons: [
            { id: 1, title: "Introduction to CSS", youtubeUrl: "https://www.youtube.com/watch?v=example6" },
            { id: 2, title: "CSS Selectors", youtubeUrl: "https://www.youtube.com/watch?v=example7" },
            { id: 3, title: "CSS Flexbox", youtubeUrl: "https://www.youtube.com/watch?v=example8" },
        ],
        quiz: [
            {
                question: "What does CSS stand for?",
                options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Systems"],
                correctAnswer: 0
            },
            {
                question: "Which CSS property is used to change the text color?",
                options: ["color", "font-color", "text-color"],
                correctAnswer: 0
            }
        ]
    },
    {
        courseName: "JavaScript Basics",
        youtubeLink: "https://www.youtube.com/watch?v=example9",  // Add a YouTube link for JavaScript course intro
        lessons: [
            { id: 1, title: "Introduction to JavaScript", youtubeUrl: "https://www.youtube.com/watch?v=example10" },
            { id: 2, title: "JavaScript Variables", youtubeUrl: "https://www.youtube.com/watch?v=example11" },
            { id: 3, title: "JavaScript Functions", youtubeUrl: "https://www.youtube.com/watch?v=example12" },
        ],
        quiz: [
            {
                question: "What is the correct syntax for creating a variable in JavaScript?",
                options: ["let variable", "var variable", "Both"],
                correctAnswer: 2
            },
            {
                question: "Which of the following is NOT a valid JavaScript data type?",
                options: ["String", "Number", "Character"],
                correctAnswer: 2
            }
        ]
    },
    {
        courseName: "Python Basics",
        youtubeLink: "https://www.youtube.com/watch?v=example13",  // Add a YouTube link for Python course intro
        lessons: [
            { id: 1, title: "Introduction to Python", youtubeUrl: "https://www.youtube.com/watch?v=example14" },
            { id: 2, title: "Python Variables", youtubeUrl: "https://www.youtube.com/watch?v=example15" },
            { id: 3, title: "Python Loops", youtubeUrl: "https://www.youtube.com/watch?v=example16" },
        ],
        quiz: [
            {
                question: "Which symbol is used for comments in Python?",
                options: ["//", "#", "/*"],
                correctAnswer: 1
            },
            {
                question: "What is the output of `print(2 + 3 * 4)` in Python?",
                options: ["20", "14", "12"],
                correctAnswer: 1
            }
        ]
    },
    {
        courseName: "React Basics",
        youtubeLink: "https://www.youtube.com/watch?v=example17",  // Add a YouTube link for React course intro
        lessons: [
            { id: 1, title: "Introduction to React", youtubeUrl: "https://www.youtube.com/watch?v=example18" },
            { id: 2, title: "JSX Syntax", youtubeUrl: "https://www.youtube.com/watch?v=example19" },
            { id: 3, title: "React Components", youtubeUrl: "https://www.youtube.com/watch?v=example20" },
        ],
        quiz: [
            {
                question: "What is JSX in React?",
                options: ["JavaScript Syntax Extension", "JavaScript Style Expression", "JavaScript Standard Extension"],
                correctAnswer: 0
            },
            {
                question: "Which method is used to render a React component to the DOM?",
                options: ["ReactDOM.render()", "React.render()", "renderReact()"],
                correctAnswer: 0
            }
        ]
    }
];

let progress = JSON.parse(localStorage.getItem("progress")) || 0;
let quizScores = JSON.parse(localStorage.getItem("quizScores")) || {};

// Load Courses Dynamically
function loadCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";

    courses.forEach((course, index) => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");

        const courseTitle = document.createElement("div");
        courseTitle.textContent = course.courseName;
        courseTitle.onclick = () => toggleLessons(index);

        // Button to watch course intro video
        const courseIntroButton = document.createElement("button");
        courseIntroButton.textContent = "Watch Course Intro";
        courseIntroButton.onclick = () => window.open(course.youtubeLink, "_blank");

        const lessonList = document.createElement("div");
        lessonList.classList.add("lesson-list");
        lessonList.id = `lessons-${index}`;

        course.lessons.forEach((lesson) => {
            const lessonButton = document.createElement("button");
            lessonButton.textContent = lesson.title;
            lessonButton.onclick = () => openLesson(lesson.youtubeUrl);
            lessonList.appendChild(lessonButton);
        });

        const quizButton = document.createElement("button");
        quizButton.textContent = "Take Quiz";
        quizButton.onclick = () => openQuiz(index);
        lessonList.appendChild(quizButton);

        courseDiv.appendChild(courseTitle);
        courseDiv.appendChild(courseIntroButton);  // Add intro button for each course
        courseDiv.appendChild(lessonList);
        courseList.appendChild(courseDiv);
    });
}

// Toggle Lesson Visibility
function toggleLessons(courseIndex) {
    const lessonList = document.getElementById(`lessons-${courseIndex}`);
    lessonList.classList.toggle("show");
}

// Open Lesson in New Tab and Track Progress
function openLesson(url) {
    window.open(url, "_blank");
    updateProgress(100 / courses.length);
}

// Open Quiz
function openQuiz(courseIndex) {
    const course = courses[courseIndex];
    const quiz = course.quiz;

    const quizSection = document.createElement("section");
    quizSection.classList.add("quiz-section");

    const quizTitle = document.createElement("h3");
    quizTitle.textContent = `${course.courseName} Quiz`;
    quizSection.appendChild(quizTitle);

    quiz.forEach((q, index) => {
        const questionContainer = document.createElement("div");

        const questionText = document.createElement("p");
        questionText.textContent = q.question;
        questionContainer.appendChild(questionText);

        q.options.forEach((option, i) => {
            const optionLabel = document.createElement("label");
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = `question-${index}`;
            radioButton.value = i;
            optionLabel.appendChild(radioButton);
            optionLabel.appendChild(document.createTextNode(option));
            questionContainer.appendChild(optionLabel);
            questionContainer.appendChild(document.createElement("br"));
        });

        quizSection.appendChild(questionContainer);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.onclick = () => submitQuiz(courseIndex);
    quizSection.appendChild(submitButton);

    document.body.appendChild(quizSection);
}

// Submit Quiz and Track Score
function submitQuiz(courseIndex) {
    const course = courses[courseIndex];
    const quiz = course.quiz;
    let score = 0;

    quiz.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.correctAnswer) {
            score++;
        }
    });

    quizScores[courseIndex] = score;
    localStorage.setItem("quizScores", JSON.stringify(quizScores));

    const scorePercentage = (score / quiz.length) * 100;
    alert(`You scored ${scorePercentage}% in the quiz!`);

    updateProgress(100 / courses.length); // Optionally update progress here as well
    document.body.removeChild(document.querySelector(".quiz-section"));
}

// Update Progress
function updateProgress(amount) {
    progress += amount;
    if (progress > 100) progress = 100;
    localStorage.setItem("progress", JSON.stringify(progress));
    document.getElementById("progress-indicator").style.width = `${progress.toFixed(0)}%`;
    document.getElementById("progress-text").textContent = `Course Completion: ${progress.toFixed(0)}%`;
}

// Initialize App
function init() {
    loadCourses();
    document.getElementById("progress-indicator").style.width = `${progress.toFixed(0)}%`;
    document.getElementById("progress-text").textContent = `Course Completion: ${progress.toFixed(0)}%`;
}

init();
