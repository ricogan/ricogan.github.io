/* =========================================================
   XII TITL II
   KAMI PAMIT
   SCRIPT / JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navbar = document.querySelector(".navbar");

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.querySelector(".nav-links");

const membersGrid =
    document.getElementById("membersGrid");

const followMain =
    document.getElementById("followMain");

const instagramList =
    document.getElementById("instagramList");

const structureGrid =
    document.getElementById("structureGrid");

const memoryGrid =
    document.getElementById("memoryGrid");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

    });


    /* Tutup menu setelah memilih halaman */

    const navItems =
        navLinks.querySelectorAll("a");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("open");

        });

    });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   FOLLOW US
========================================================= */

if (followMain && instagramList) {

    followMain.addEventListener(
        "click",
        () => {

            instagramList.classList.toggle("open");

        }
    );

}


/* =========================================================
   MODAL ELEMENTS
========================================================= */

const modal =
    document.getElementById("modal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalNumber =
    document.getElementById("modalNumber");

const modalName =
    document.getElementById("modalName");

const modalRole =
    document.getElementById("modalRole");

const modalInstagram =
    document.getElementById("modalInstagram");


/* =========================================================
   OPEN MEMBER MODAL
========================================================= */

function openMemberModal(member) {

    if (!modal) return;

    modal.classList.add("open");


    if (modalImage) {

        modalImage.src =
            member.image;

        modalImage.alt =
            member.name;

    }


    if (modalNumber) {

        modalNumber.textContent =
            `MEMBER #${String(
                member.number
            ).padStart(2, "0")}`;

    }


    if (modalName) {

        modalName.textContent =
            member.name;

    }


    if (modalRole) {

        modalRole.textContent =
            member.role;

    }


    if (modalInstagram) {

        const username =
            member.instagram
                .replace("@", "");

        modalInstagram.href =
            `https://instagram.com/${username}`;

        modalInstagram.textContent =
            `${member.instagram} →`;

        modalInstagram.style.display =
            "inline-block";

    }

}


/* =========================================================
   OPEN MEMORY MODAL
========================================================= */

function openMemoryModal(memory) {

    if (!modal) return;

    modal.classList.add("open");


    if (modalImage) {

        modalImage.src =
            memory.image;

        modalImage.alt =
            memory.title;

    }


    if (modalNumber) {

        modalNumber.textContent =
            "MEMORY";

    }


    if (modalName) {

        modalName.textContent =
            memory.title;

    }


    if (modalRole) {

        modalRole.textContent =
            "XII TITL II";

    }


    if (modalInstagram) {

        modalInstagram.style.display =
            "none";

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");


    if (modalImage) {

        modalImage.src = "";

    }


    if (modalInstagram) {

        modalInstagram.style.display =
            "inline-block";

    }

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function setupImageFallback(
    image,
    fallback
) {

    if (!image) return;

    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";

            if (fallback) {

                fallback.style.display =
                    "flex";

            }

        }
    );

}


/* =========================================================
   RENDER MEMBERS
========================================================= */

function renderMembers() {

    if (!membersGrid) return;

    /*
       Data members akan berasal
       dari data.js pada STEP 4.
    */

    if (
        typeof members === "undefined"
    ) {

        return;

    }


    membersGrid.innerHTML = "";


    members.forEach(member => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "member-card";


        card.innerHTML = `

            <div class="member-image">

                <img
                    src="${member.image}"
                    alt="${member.name}"
                    loading="lazy"
                >

                <div class="no-photo">

                    <strong>✦</strong>

                    PHOTO

                </div>

            </div>


            <div class="member-info">

                <h3>
                    ${member.name}
                </h3>

                <p>
                    ${member.role}
                </p>

                <div class="member-number">

                    #
                    ${String(
                        member.number
                    ).padStart(2, "0")}

                </div>

            </div>

        `;


        const image =
            card.querySelector("img");

        const fallback =
            card.querySelector(
                ".no-photo"
            );


        if (fallback) {

            fallback.style.display =
                "none";

        }


        setupImageFallback(
            image,
            fallback
        );


        card.addEventListener(
            "click",
            () => {

                openMemberModal(
                    member
                );

            }
        );


        membersGrid.appendChild(card);

    });

}


/* =========================================================
   RENDER INSTAGRAM
========================================================= */

function renderInstagram() {

    if (!instagramList) return;

    if (
        typeof members === "undefined"
    ) {

        return;

    }


    instagramList.innerHTML = "";


    members.forEach(member => {

        const item =
            document.createElement("a");


        item.className =
            "instagram-item";


        const username =
            member.instagram
                .replace("@", "");


        item.href =
            `https://instagram.com/${username}`;


        item.target = "_blank";

        item.rel = "noopener";


        item.textContent =
            `${String(
                member.number
            ).padStart(2, "0")}   ${
                member.instagram
            }`;


        instagramList.appendChild(item);

    });

}


/* =========================================================
   RENDER STRUCTURE
========================================================= */

function renderStructure() {

    if (!structureGrid) return;

    if (
        typeof structure === "undefined"
    ) {

        return;

    }


    structureGrid.innerHTML = "";


    structure.forEach(person => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "structure-card";


        card.innerHTML = `

            <img
                src="${person.image}"
                alt="${person.name}"
                loading="lazy"
            >


            <div class="structure-overlay">

                <span>
                    ${person.title}
                </span>

                <h3>
                    ${person.name}
                </h3>

                <p>
                    XII TITL II
                </p>

            </div>

        `;


        structureGrid.appendChild(card);

    });

}


/* =========================================================
   RENDER MEMORIES
========================================================= */

function renderMemories() {

    if (!memoryGrid) return;

    if (
        typeof memories === "undefined"
    ) {

        return;

    }


    memoryGrid.innerHTML = "";


    memories.forEach(memory => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "memory-card";


        card.innerHTML = `

            <img
                src="${memory.image}"
                alt="${memory.title}"
                loading="lazy"
            >

            <div class="memory-caption">

                ${memory.title}

            </div>

        `;


        const image =
            card.querySelector("img");


        image.addEventListener(
            "error",
            () => {

                card.remove();

            }
        );


        card.addEventListener(
            "click",
            () => {

                openMemoryModal(
                    memory
                );

            }
        );


        memoryGrid.appendChild(card);

    });

}


/* =========================================================
   YEAR
========================================================= */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeWebsite() {

    renderMembers();

    renderInstagram();

    renderStructure();

    renderMemories();

}


/*
   Jalankan setelah seluruh
   HTML selesai dimuat.
*/

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

} else {

    initializeWebsite();

}