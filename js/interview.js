var interviewed = ["blinkbat", "andrei"]
var questions_number = 12
interview_number = 0
lang_number = 0
english_questions = [
    "What's the name of your company and what is its main activity?",
    "What's your main function and what does it mean?",
    "What's the hardest thing you have coded?",
    "wich langague and frameworks do you use?",
    "which one is your favorite (language or framework)?",
    "What are the differents step of your day?",
    "What's your favorite thing about your job?",
    "at the opposite, what's the thing you like the less?",
    "what's the most valuable skill for a developer (speed-typing, be used at the terminal, etc) and why?",
    "How have you discover the world of coding ?",
    "Have you a coding project that you would like to make one day ?",
    "What's the most helpfull thing that has help you to get better at code"
]
french_questions = [
]
en_blinkbat_answers = [
    "our line of business is pool repair and plumbing",
    "i'm a software engineer for internal apps for use by the company, and also some public-facing apps and materials",
    "whenever i try to work on a game that's usually the most involved. beyond that working on legacy code or code in need of a refactor can be challenging",
    "lately i use c# with blazor and sometimes typescript",
    "i love both c# and typescript",
    "depends, usually starts with coffee and a daily standup. then i either work on tickets or sit in meetings or both",
    "flexibility, interesting problems to solve",
    "meetings!",
    "being able to problem solve without waiting for help",
    "i took a bootcamp to jumpstart my abilities",
    "plenty. probably a game",
    "building up my problem-solving skills"
]
fr_blinkbat_answers = [
]
en_andrei_answers = [
    "we offer a complete erp system to small to mid size business.",
    "mainly web development, working with web apps for bi and apis",
    "a complete town management plugin for a minecraft server, whiwas unplayed because of how much memory and processing it consumed for a single town.",
    "js/ts and delphi mostly, no frameworks.",
    "ts",
    "development and more development, then tests.",
    "be able to see things working",
    "when something i did causes an error",
    "be aware of pitifalls and consequences of their actions",
    "scripting for multiplayer game servers",
    "",
    "learning how to read documentation, and always going to the d",
]
fr_andrei_answers = [
]

var en_answers = [en_blinkbat_answers, en_andrei_answers]
var fr_answers = [fr_blinkbat_answers, fr_andrei_answers]

var answers = [en_answers, fr_answers]
var questions_interview = [english_questions, french_questions]

function set_interview(lang_nb, interview_nb)
{
    const name = document.getElementById("name_interviewed")
    name.innerHTML = interviewed[interview_nb]
    const questions = document.getElementById("questions");
    questions.replaceChildren()
    for (var i=0;i<questions_number;i++)
    {
        var question = document.createElement("h3");
        question.innerHTML = questions_interview [lang_nb][i];

        var answer = document.createElement("p");
        answer.className = "answer";
        answer.innerHTML = answers[lang_nb][interview_nb][i];

        if (answer.innerHTML!="")
        {
            questions.appendChild(question);
            questions.appendChild(answer);
        }
    }
}

function activate_buttons()
{
    document.getElementById("next").addEventListener("click",next_interview)
    document.getElementById("previous").addEventListener("click",previous_interview)
}

function next_interview()
{
    interview_number=(interview_number+1)%interviewed.length;
    set_interview(lang_number, interview_number)
}
function previous_interview()
{
    interview_number=(interview_number-1)%interviewed.length;
    if (interview_number<0)
    {
        interview_number+=interviewed.length
    }
    set_interview(lang_number, interview_number)
}

activate_buttons()
set_interview(0, 0)