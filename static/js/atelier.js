const ATELIER_ITEMS = 'data/atelier.json';

(() => {

  const app = {
    initialize() {
      this.cacheElement();
      this.getDataAtelierItems();
    },

    cacheElement() {
      this.$atelierItems = document.querySelector('.atelier__component');
    },

    getDataAtelierItems() {
      fetch(ATELIER_ITEMS)
        .then(response => response.json())
        .then((json) => {
          this.atelier = json;
          this.addHtmlForAtelier();
        })
        .catch(error => console.log(error))
    },

    addHtmlForAtelier() {
      const atelier = this.atelier.map((item, index) => {
        return `<li class="teaser__item atelier__item ${(index > 2) ? 'no-margin' : ''}">
                  <a class="teaser__img" href="atelier-studio/visiting-mons-again/index.html">
                      <img src="static/img/atelier/${item.image}" alt="Ambience image" loading="lazy">
                  </a>
                  <div class="item__description">
                      <h4>${item.subtitle}</h4>
                      <h3>${item.title}Frieze — London</h3>
                      <p>${item.description}</p>
                      <a href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
                  </div>
                </li>`
      }).join('');
      this.$atelierItems.innerHTML = atelier;
    }
  }

  app.initialize()

})();