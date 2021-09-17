const ART_AND_EXHIBITIONS = 'https://www.pgm.gent/data/arnequinze/art.json';
const ATELIER = 'data/atelier.json';

(() => {

  const app = {
    initialize() {
      this.cacheElement();
      this.getDataAtelierItems();
    },

    cacheElement() {
      this.$randomAtelierItems = document.querySelector('.atelier__random');
      this.$randomArtAndExhibitionsItems = document.querySelector('.art__random');
    },

    getDataAtelierItems() {
      fetch(ATELIER)
        .then(response => response.json())
        .then((json) => {
          this.atelier = json;
          this.getDataArtAndExhibitions();
        })
        .catch(error => console.log(error))
    },

    getDataArtAndExhibitions() {
      fetch(ART_AND_EXHIBITIONS)
      .then(response => response.json())
      .then((json) => {
        this.artAndExhibitions = json;
        this.randomAtelier();
        this.randomArt();
      })
      .catch(error => console.log(error))
    },

    randomAtelier() {
      n = 3;
      var atelierTease = [];
      for (var i = 0; i < n; i++) {
        atelierTease.push(this.atelier[Math.floor(Math.random()*this.atelier.length)]);
      };

      const teasers = atelierTease.map(tease => {
        return `<li class="teaser__item">
                  <a class="teaser__img" href="atelier-studio/visiting-mons-again/index.html">
                      <img src="static/img/atelier/${tease.image}" alt="Ambience image" loading="lazy">
                  </a>
                  <div class="item__description">
                      <h4>${tease.subtitle}</h4>
                      <h3>${tease.title}</h3>
                      <p>${tease.description}</p>
                      <a href="atelier-studio/visiting-mons-again/index.html">Learn more</a>
                  </div>
                </li>`
      }).join('');

      this.$randomAtelierItems.innerHTML = teasers;
    },

    randomArt() {
      const artTease = this.artAndExhibitions.map((tease) => {
        if (tease.highlight === true) {
          return `<li class="teaser__item">
                    <a class="teaser__img" href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">
                        <img src="static/img/art-exhibitions/${tease.cover}" alt="Ambience image" loading="lazy">
                    </a>
                    <div class="item__description">
                        <h4>${tease.tags[0]} - ${tease.location}</h4>
                        <h3>${tease.title}</h3>
                        <p>${tease.description}</p>
                        <a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">Learn more</a>
                    </div>
                  </li>`
        }
      }).join('');
      this.$randomArtAndExhibitionsItems.innerHTML = artTease;
    },

  }

  app.initialize()

})();