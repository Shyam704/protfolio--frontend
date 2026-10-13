// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  document.querySelectorAll("#navMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Contact Form
// Contact Form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      formStatus.textContent = result.message;

      contactForm.reset();
    } catch (error) {
      formStatus.textContent = "Error sending message";
      console.error(error);
    }
  });
}

// Fetch Portfolio Data
async function loadPortfolio() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/portfolio"
    );

    const data = await response.json();
   document.getElementById("developerName").textContent =
  "HELLO, I'M " + data.name;

  document.querySelector(".hero-description").textContent =
      data.about;

    

    console.log("Portfolio Data:", data);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
  }
}

loadPortfolio();