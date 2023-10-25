var interviewed = ["blinkbat", "andrei"]
var questions_number = 12
interview_index= 0
lang_index = 0
english_questions = [
    "What's the main activity of your company?",
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
    "Quelle est l'activité principal de votre entreprise?",
    "Quel est votre boulot et en quoi consiste t'il?",
    "Quelle est la chose la plus complexe que vous ayez codé?",
    "Quel langague et frameworks utiliser vous?",
    "Lequel est votre préféré?",
    "Quelles sont les différentes étapes qui constitue votre journée?",
    "Qu'est ce que vous préférer dans votre métier?",
    "À l'opposé qu'est ce que vous aimer le moins?",
    "Quelle est la compétence qui vous semble la plus importante en tant que developpeur et pourquoi?",
    "Comment avez vous découvert l'univer du code?",
    "Avez vous un projet code dans un coin de votre tête si oui lequel?",
    "Quelle est la chose qui vous a le plus aider à progresser en code?"
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
    "notre secteur d'activité est la réparation de piscine et la plomberie",
    "je suis un ingénieur logiciel, je fais des apps à l'usage de l'entreprise et également certaines apps déstiné au clients",
    "Le plus compliqué c'est souvent quand j'essaie de travailler sur un jeux, après ça travailler sur du code dépassé/obsolète ou qui a besoin d'être refactoriser peut aussi représenter un défi",
    "Ces temps ci, j'utilise C# avec blazor et parfois typescript",
    "j'adore les deux C# et typescript",
    "ça dépend, souvent je commence avec un café et une réunion quotidienne, puis je travail soit sur des tickets, soit je vais en réunions ou les deux",
    "la flexibilité et les problèmes intéressants à résoudre",
    "les réunions!",
    "être capable de résoudre des problèmes sans devoir attendre pour se faire aider",
    "j'ai été à un bootcamp pour y batir mes compétences",
    "j'en ai pas mal. probablement un jeux",
    "construire mes compétence dans la résolution de problèmes"
]
en_andrei_answers = [
    "we offer a complete erp system to small to mid size business.",
    "mainly web development, working with web apps for bi and apis",
    "a complete town management plugin for a minecraft server, which was unplayed because of how much memory and processing it consumed for a single town.",
    "js/ts and delphi mostly, no frameworks.",
    "ts",
    "development and more development, then tests.",
    "be able to see things working",
    "when something i did causes an error",
    "be aware of pitifalls and consequences of their actions",
    "scripting for multiplayer game servers",
    "",
    "learning how to read documentation, and always going to the docs",
]
fr_andrei_answers = [
    "nous offrons des systemes erp complêts pour les petites et moyennes entreprises",
    "principalement du développement web avec des applications webs pour des BI(visualisation de données) et des APIs",
    "un plugin de géstion complète de village pour un serveur minecraft qui n'as jamais été utilisé à cause de la quantité de mémoire et de calcul qu'il nécessitait pour un simple village",
    "principalement javascript/typescript et delphi, pas de frameworks",
    "typescript",
    "du code, encore du code et des tests",
    "pouvoir voir les choses fonctionner",
    "quand quelle que chose que j'ai fait cause une erreur",
    "être au courant des petites erreurs possibles et de leurs répércussions",
    "en faisant des scripts pour des serveur minecraft multijoueurs",
    "",
    "apprendre à lire la documentation, et de toujours aller check la doc"
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
    document.getElementById("left_lang").addEventListener("click",function click(){click_lang(this)})
    document.getElementById("right_lang").addEventListener("click",function click(){click_lang(this)})
}

function next_interview()
{
    interview_index=(interview_index+1)%interviewed.length;
    set_interview(lang_index, interview_index)
}
function previous_interview()
{
    interview_index=(interview_index-1)%interviewed.length;
    if (interview_index<0)
    {
        interview_index+=interviewed.length
    }
    set_interview(lang_index, interview_index)
}

function click_lang(element)
{
    const lang_buttons = document.getElementsByClassName("clicked");
    for (var i=0;i<lang_buttons.length;i++)
    {
        lang_buttons[i].className="";
    }
    element.className = "clicked";
    //get new lang index
    if (element.innerHTML=="en")
    {
        lang_index=0;
    }
    if (element.innerHTML=="fr")
    {
        lang_index=1;
    }
    set_interview(lang_index, interview_index)
}

activate_buttons()
set_interview(0, 0)