const accordeons = document.querySelectorAll('[data-accordeon]');

function createAccordeon(accordeon) {
  const options = accordeon.querySelectorAll('option');
  const container = document.createElement('div');
  container.classList.add('accordeon');

  const label = document.createElement('span');
  container.appendChild(label);
  label.classList.add('accordeon__label');
  if (!options[0]) {
    container.classList.add('accordeon--disabled');
  } else {
    label.innerText = accordeon.getAttribute('data-accordeon-label');
  }
  const icon = document.createElement('i');
  label.appendChild(icon);
  icon.classList.add('fas', 'fa-chevron-up', 'accordeon__icon');

  const content = document.createElement('div');
  container.appendChild(content);
  content.classList.add('accordeon__content');

  for (let i = 0; i < options.length; i++) {
    const child = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('id', `check${i}`);
    checkbox.classList.add('checkbox');
    const label = document.createElement('label');
    label.setAttribute('for', `check${i}`);
    label.innerText = options[i].textContent;
    label.classList.add('label');
    child.classList.add('accordeon__item');
    child.append(checkbox, label);
    content.appendChild(child);
  }

  container.addEventListener('click', (ev) => {
    if (
      ev.target.classList.contains('accordeon__item') ||
      ev.target.classList.contains('checkbox') ||
      ev.target.classList.contains('label')
    ) {
      content.querySelectorAll('.accordeon__item').forEach((el) => {
        el.firstChild.checked = false;
      });
    } else {
      container.classList.toggle('accordeon--invisible');
    }
    ev.target.checked = true;
  });

  accordeon.parentElement.replaceChild(container, accordeon);
}
for (let i = 0; i < accordeons.length; i++) {
  const accordeon = accordeons[i];
  createAccordeon(accordeon);
}
