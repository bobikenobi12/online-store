const dropdowns = document.querySelectorAll("[data-dropdown]");

function createDropdown(dropdown) {
  const options = dropdown.querySelectorAll("option");

  const container = document.createElement("div");
  container.classList.add("dropdown");

  const label = document.createElement("span");
  container.appendChild(label);
  label.classList.add("dropdown__label");
  if (!options[0]) {
    label.innerText = "No items";
    container.classList.add("dropdown--disabled");
  } else {
    label.innerText = options[0].textContent;
  }

  const icon = document.createElement("i");
  container.appendChild(icon);
  icon.classList.add("fas", "fa-chevron-down", "dropdown__icon");

  const content = document.createElement("div");
  container.appendChild(content);
  content.classList.add("dropdown__content");

  for (let i = 0; i < options.length; i++) {
    const child = document.createElement("div");
    child.classList.add("dropdown__item");
    child.innerText = options[i].textContent;
    content.appendChild(child);
  }

  container.addEventListener("click", (ev) => {
    container.classList.toggle("dropdown--visible");
    if (ev.target.classList.contains("dropdown__item")) {
      content.querySelectorAll(".dropdown__item").forEach((el) => {
        el.classList.remove("dropdown__item--selected");
      });
      ev.target.classList.add("dropdown__item--selected");
      label.innerText = ev.target.textContent;
    }
  });
  document.addEventListener("click", (ev) => {
    if (!ev.target.classList.contains("dropdown")) {
      container.classList.remove("dropdown--visible");
    }
  });
  dropdown.parentElement.replaceChild(container, dropdown);
}

for (let i = 0; i < dropdowns.length; i++) {
  const dropdown = dropdowns[i];
  createDropdown(dropdown);
}
