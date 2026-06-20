const DATA_PATH = 'data/characters.json';

async function getCharacters() {
  const response = await fetch(DATA_PATH);
  if (!response.ok) throw new Error('Could not load character data.');
  return response.json();
}

function tagHTML(tags = []) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function renderHome(characters) {
  const grid = document.querySelector('#characterGrid');
  const search = document.querySelector('#search');
  if (!grid) return;

  function draw(list) {
    grid.innerHTML = list.map(character => `
      <article class="character-card">
        <a href="character.html?id=${character.id}" class="card-image-wrap">
          <img src="${character.avatar}" alt="${character.name}" class="card-image" />
        </a>
        <div class="card-body">
          <p class="status">${character.status}</p>
          <h3>${character.name}</h3>
          <p>${character.subtitle}</p>
          <div class="mini-details">
            <span>${character.species}</span>
            <span>${character.role}</span>
          </div>
          <div class="tags">${tagHTML(character.tags)}</div>
          <a class="text-link" href="character.html?id=${character.id}">Open profile →</a>
        </div>
      </article>
    `).join('');
  }

  draw(characters);

  search?.addEventListener('input', event => {
    const term = event.target.value.toLowerCase();
    const filtered = characters.filter(character => {
      const searchable = [
        character.name,
        character.subtitle,
        character.species,
        character.role,
        character.status,
        ...(character.tags || [])
      ].join(' ').toLowerCase();
      return searchable.includes(term);
    });
    draw(filtered);
  });
}

function listHTML(items = []) {
  return items.map(item => `<li>${item}</li>`).join('');
}

function favoritesHTML(favorites = {}) {
  return Object.entries(favorites).map(([key, value]) => `
    <div class="favorite-row">
      <strong>${key}</strong>
      <span>${value}</span>
    </div>
  `).join('');
}

function renderProfile(characters) {
  const page = document.querySelector('#profilePage');
  if (!page) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const character = characters.find(item => item.id === id) || characters[0];

  document.title = `${character.name} | StarSundae Character Hub`;

  page.innerHTML = `
    <section class="profile-hero">
      <div class="profile-art">
        <img src="${character.heroImage}" alt="${character.name}" />
      </div>
      <div class="profile-intro">
        <p class="eyebrow">${character.status}</p>
        <h1>${character.name}</h1>
        <p class="subtitle">${character.subtitle}</p>
        <blockquote>“${character.quote}”</blockquote>
        <div class="profile-facts">
          <span><strong>Species:</strong> ${character.species}</span>
          <span><strong>Pronouns:</strong> ${character.pronouns}</span>
          <span><strong>Role:</strong> ${character.role}</span>
        </div>
        <div class="tags">${tagHTML(character.tags)}</div>
      </div>
    </section>

    <section class="profile-layout">
      <article class="content-card wide">
        <h2>Introduction</h2>
        <p>${character.profile.introduction}</p>
      </article>

      <article class="content-card">
        <h2>Favorites</h2>
        ${favoritesHTML(character.profile.favorites)}
      </article>

      <article class="content-card">
        <h2>Likes</h2>
        <ul>${listHTML(character.profile.likes)}</ul>
      </article>

      <article class="content-card">
        <h2>Dislikes</h2>
        <ul>${listHTML(character.profile.dislikes)}</ul>
      </article>

      <article class="content-card wide">
        <h2>Notes</h2>
        <p>${character.profile.notes}</p>
      </article>
    </section>

    <section class="section-heading">
      <p class="eyebrow">art archive</p>
      <h2>Gallery</h2>
    </section>

    <section class="gallery-grid">
      ${character.gallery.map(piece => `
        <figure class="gallery-card">
          <img src="${piece.src}" alt="${piece.title}" />
          <figcaption>
            <strong>${piece.title}</strong>
            <span>${piece.credit}</span>
          </figcaption>
        </figure>
      `).join('')}
    </section>
  `;
}

getCharacters()
  .then(characters => {
    renderHome(characters);
    renderProfile(characters);
  })
  .catch(error => {
    document.body.insertAdjacentHTML('beforeend', `<p class="error">${error.message}</p>`);
  });
