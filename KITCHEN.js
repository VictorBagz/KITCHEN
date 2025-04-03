document.addEventListener('DOMContentLoaded', () => {
    // Rotating Tagline with a 2-Second Delay and Smoother Animation
    const tagline = document.getElementById('tagline');
    const taglines = [
        "Building Your Future",
        "Strength in Every Structure",
        "Crafting Excellence",
        "Your Vision, Our Craft"
    ];
    let index = 0;

    function rotateTagline() {
        tagline.style.opacity = 0;
        setTimeout(() => {
            tagline.textContent = taglines[index];
            tagline.style.opacity = 1;
            index = (index + 1) % taglines.length;
        }, 300); // Smooth fade out/in with shorter delay
    }

    setInterval(rotateTagline, 2000); // Rotate every 2 seconds
    rotateTagline();

    // Counter Animation Function
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end + "+";
                element.classList.add('plus');
                element.classList.add('animate');
            }
        };
        requestAnimationFrame(step);
    }

    // Initialize Counters After Full Page Load
    window.addEventListener('load', () => {
        const projectsCounterElement = document.getElementById('projectsCounter');
        const clientsCounterElement = document.getElementById('clientsCounter');

        if (projectsCounterElement && clientsCounterElement) {
            // Reset counters to 0
            projectsCounterElement.textContent = "0";
            clientsCounterElement.textContent = "0";

            // Start counters with a smoother animation over 4 seconds
            setTimeout(() => {
                animateCounter(projectsCounterElement, 0, 99, 4000); // Projects: 0 to 99 over 4s
                animateCounter(clientsCounterElement, 0, 75, 4000); // Clients: 0 to 75 over 4s
            }, 200); // Delay slightly after page load
        }
    });

    // Accordion and Fullscreen Handling
    document.querySelectorAll('.accordn-header').forEach((header) => {
        header.addEventListener('click', () => {
            const fullscreen = document.querySelector('.fullscreen');
            const fullscreenContent = document.querySelector('.fullscreen-content');
            const content = header.nextElementSibling?.innerHTML;
            if (fullscreen && fullscreenContent) {
                fullscreenContent.innerHTML = content || '';
                fullscreen.classList.add('active');
            }
        });
    });

    const cancelBtn = document.querySelector('.cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.querySelector('.fullscreen')?.classList.remove('active');
        });
    }

    //ADDITIONS

    const navIcon = document.querySelector('.bi-list');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    navIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active');
        //toggle aria expanded attribute.
        if (dropdownMenu.classList.contains('active')) {
            navIcon.setAttribute("aria-expanded", "true");
        } else {
            navIcon.setAttribute("aria-expanded", "false");
        }
    });
    // Select the Back to Top button
    const backToTopButton = document.getElementById('backToTop');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show after scrolling down 300px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Scroll back to the top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    });
    //new content
    const projects = [
        {
            title: "Residential Renovation",
            image: "https://source.unsplash.com/random/800x600/?house",
            description: "Complete renovation of a family home, including kitchen and bathroom upgrades.",
            location: "City A",
            startDate: "2023-03-15",
            endDate: "2023-06-20",
        },
        {
            title: "Commercial Building",
            image: "https://source.unsplash.com/random/800x600/?building",
            description: "Construction of a modern office building in the downtown area.",
            location: "City B",
            startDate: "2022-09-01",
            endDate: "2023-01-30",
        },
        {
            title: "Bridge Construction",
            image: "https://source.unsplash.com/random/800x600/?bridge",
            description: "Construction of a vital bridge to improve transportation.",
            location: "City C",
            startDate: "2023-01-01",
            endDate: "2023-11-15",
        },
        {
            title: "School Addition",
            image: "https://source.unsplash.com/random/800x600/?school",
            description: "Expansion of a local school with new classrooms and facilities.",
            location: "City D",
            startDate: "2023-05-10",
            endDate: "2023-09-30",
        },
        {
            title: "Apartment complex",
            image: "https://source.unsplash.com/random/800x600/?apartment",
            description: "Construction of a new apartment complex with modern amenities.",
            location: "City E",
            startDate: "2023-04-01",
            endDate: "2024-01-30",
        },
    ];

    const portfolioContainer = document.getElementById("portfolio-container");
    const modal = document.getElementById("projectModal");
    const modalContent = document.getElementById("modalContent");
    const closeBtn = document.querySelector(".close");

    function displayProjects() {
        projects.forEach(project => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-details">
                    <h3>${project.title}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                    <button class="view-details" data-project='${JSON.stringify(project)}'>View Details</button>
                </div>
            `;
            portfolioContainer.appendChild(projectDiv);
        });
    }

    displayProjects();

    portfolioContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("view-details")) {
            const projectData = JSON.parse(event.target.getAttribute("data-project"));
            modalContent.innerHTML = `
                <h3>${projectData.title}</h3>
                <img src="${projectData.image}" style="width:100%; height: auto; margin-bottom: 20px;">
                <p><strong>Description:</strong> ${projectData.description}</p>
                <p><strong>Location:</strong> ${projectData.location}</p>
                <p><strong>Start Date:</strong> ${projectData.startDate}</p>
                <p><strong>End Date:</strong> ${projectData.endDate}</p>
            `;
            modal.style.display = "block";
        }
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // News Section JavaScript
    document.querySelectorAll('.news-item').forEach(item => {
        const readMore = document.createElement('button');
        readMore.textContent = 'Read More';
        readMore.classList.add('read-more');
        item.appendChild(readMore);

        readMore.addEventListener('click', () => {
            item.classList.toggle('expanded');
            readMore.textContent = item.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    });
});
