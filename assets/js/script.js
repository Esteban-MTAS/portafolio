// MENÚ RESPONSIVE


const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

const menuButton = document.createElement("button");
menuButton.classList.add("menu-toggle");
menuButton.innerHTML = "☰";
navbar.appendChild(menuButton);

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    menuButton.innerHTML = "×";
  } else {
    menuButton.innerHTML = "☰";
  }
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.innerHTML = "☰";
  });
});



// FILTROS DE PROYECTOS

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.textContent.trim().toLowerCase();

    projectCards.forEach(card => {
      const text = card.textContent.toLowerCase();

      const isAll = filter === "todos";
      const isDotNet = filter.includes(".net") && (text.includes("c#") || text.includes(".net"));
      const isDatabase = filter.includes("base") && (text.includes("sql") || text.includes("stored") || text.includes("base"));
      const isWeb = filter.includes("web") && (text.includes("html") || text.includes("css") || text.includes("javascript") || text.includes("web"));

      if (isAll || isDotNet || isDatabase || isWeb) {
        card.style.display = "block";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";

        setTimeout(() => {
          card.style.display = "none";
        }, 250);
      }
    });
  });
});



// MODAL DE DETALLES DEL PROYECTO


const modal = document.createElement("div");
modal.classList.add("project-modal");

modal.innerHTML = `
  <div class="project-modal-content">
    <button class="close-modal">×</button>

    <img class="modal-img" src="" alt="Imagen del proyecto">

    <span class="modal-category"></span>

    <h3 class="modal-title"></h3>

    <p class="modal-description"></p>

    <div class="modal-tags"></div>

    <div class="modal-actions">
      <a href="#" target="_blank" class="btn btn-primary modal-github">Ver GitHub</a>
    </div>
  </div>
`;

document.body.appendChild(modal);

const closeModal = modal.querySelector(".close-modal");

document.querySelectorAll(".project-actions .btn-primary").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();

    const card = button.closest(".project-card");

    const image = card.querySelector(".project-image img").src;
    const title = card.querySelector("h3").textContent;
    const description = card.querySelector("p").textContent;
    const category = card.querySelector(".project-category").textContent;
    const tags = card.querySelectorAll(".project-tags span");
    const githubButton = card.querySelector(".project-actions .btn-secondary");

    modal.querySelector(".modal-img").src = image;
    modal.querySelector(".modal-title").textContent = title;
    modal.querySelector(".modal-description").textContent = description;
    modal.querySelector(".modal-category").textContent = category;

    const modalTags = modal.querySelector(".modal-tags");
    modalTags.innerHTML = "";

    tags.forEach(tag => {
      const span = document.createElement("span");
      span.textContent = tag.textContent;
      modalTags.appendChild(span);
    });

    const modalGithub = modal.querySelector(".modal-github");

    if (githubButton && githubButton.getAttribute("href") !== "#") {
      modalGithub.href = githubButton.getAttribute("href");
      modalGithub.style.display = "inline-flex";
    } else {
      modalGithub.style.display = "none";
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeModal.addEventListener("click", closeProjectModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeProjectModal();
  }
});

function closeProjectModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}




const animatedElements = document.querySelectorAll(
  ".section-header, .about-content, .skill-card, .project-card, .cv-card, .contact-content"
);

animatedElements.forEach(element => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

animatedElements.forEach(element => {
  observer.observe(element);
});



// MENÚ ACTIVO SEGÚN SECCIÓN


const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
});