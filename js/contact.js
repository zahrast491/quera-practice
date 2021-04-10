document
  .getElementById("contact-us-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const { elements } = event.target;

    let data = {
      name: "",
      email: "",
      title: "",
      text: "",
    };

    for (let i = 0; i < elements.length - 1; i++) {
      const e = elements[i];
      data[e.name] = e.value;
    }

    console.log(data);

    fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const successMessage = document.getElementById("successMessage");
        const errorMessage = document.getElementById("errorMessage");

        if (data.success) {
          errorMessage.style.display = "none";
          successMessage.style.display = "block";
        } else {
          successMessage.style.display = "none";
          errorMessage.innerHTML = data.error;
          errorMessage.style.display = "block";
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
