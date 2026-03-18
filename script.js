const translations = {
    is: {}, // Verður fyllt sjálfkrafa út frá HTMLinu
    en: {
        subtitle: "Database and Software Developer",
        intro: "I am a hardworking and diligent person with a strong interest in computers. I am very curious, responsible, solution-oriented, and work well independently.<br>Here you can find an overview of my projects and ways to get in touch.",
        about_title: "About me",
        about: 'I have worked on various web projects, ranging from games written in JavaScript to full-stack web applications. I enjoy creating things that work well.',
        about_2: "I am always learning new things and looking for interesting projects. Please contact me if you are interested in working together.",
        projects_title: "Web Projects",
        hola: "Association of Spanish speakers in Iceland — Created a new website for Hola with Wordpress.",
        gastroswipe: "Easily find restaurants with friends! Full Stack web-app built with Supabase and Next.js. <br>Web Programming II — Final Project.",
        veff1_title: "Festivals in Iceland",
        veff1: "Find festivals in Iceland near you. Built with Javascript and a JSON database. <br>Web Programming I — Final Project",
        pacman: "Web Programming I — A Pac-Man like game written in JavaScript.",
        vefh3: "Final Project — API-driven movie site built with Flask.",
        vefh2: "Final Project — The Innovation Conference.",
        contact_title: "Contact",
        contact_text: "Want to work together or just say hi? Send me an email!",
        contact_btn: "Send Email"
    }
};

//Stilli upphafstungumálið
let currentLang = "is";

function switchLanguage() {
    //easy switch
    currentLang = currentLang === "is" ? "en" : "is";

    // Geymi valda tungumálið í LocalStorage
    localStorage.setItem("lang", currentLang);

    //skiptir um texta á takkanum
    document.getElementById("lang-switch").innerHTML = currentLang === "is" ? '<img src="assets/Flag_of_the_United_Kingdom.svg" alt="UK Flag">English' : '<img src="assets/Flag_of_Iceland.svg" alt="Icelandic Flag">Íslenska';
    
    //skiptir um texta í öllum elementum með data-translate attributinu
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        //ef að þýðingin er til þá skiptir það um tungumál
        if (translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
}

//Býr til observer object sem fylgist með ef að element byrtist í viewportið
const scrolled = new IntersectionObserver(
    //Bætir við visible klasa ef að elementið byrtist
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                scrolled.unobserve(entry.target); // hættir að fylgjast með
            }
        });
    },
    { threshold: 0.25 } //þarf að vera 25% í viewpotinu
);


document.addEventListener("DOMContentLoaded", () => {
    
    // Geymi allan textan sem íslenskt translation til þess að að þurfa ekki að skrifa textann tvisvar á íslensku
    //fer í gegnum öll elements með data-translate attribute og geymir þau í is ef það er ekki til
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        if (!translations.is[key]) {
            translations.is[key] = element.innerHTML.trim();
        }
    });

    // Ef að að enska er geymt í localStorage þá skipti ég yfir í það.
    if (localStorage.getItem("lang") === "en") {
        switchLanguage();
    }

    //hlustar eftir takkanum, ef svo þá keyrir switchLanguage fallið
    const langBtn = document.getElementById("lang-switch");
    if (langBtn) {
        langBtn.addEventListener("click", switchLanguage);
    }

    // Set upp Vanilla Tilt fyrir öll cards sem nota það
    if (window.VanillaTilt) {
        // Profile picture
        VanillaTilt.init(document.querySelectorAll(".profile-picture"), {
            scale: 1.02,
            perspective: 400,
            max: 4,
            speed: 2000,
            glare: true,
            "max-glare": 0.15,
        });

        // About card
        VanillaTilt.init(document.querySelectorAll(".about-card"), {
            scale: 1.008,
            perspective: 1200,
            max: 3,
            speed: 4000,
            glare: true,
            "max-glare": 0.1,
        });

        //Project cards
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            scale: 1.015,
            perspective: 1000,
            max: 4,
            speed: 3000,
            glare: true,
            "max-glare": 0.18,
        });
    }

    //Stilli upp observer fyrir öll section elements
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => scrolled.observe(section));
});