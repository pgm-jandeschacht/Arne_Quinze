const PRESS_ITEMS = 'data/press.json';

(() => {

  const app = {
    initialize() {
      this.cacheElement();
      this.getDataPressItems();
    },

    cacheElement() {
      this.$pressRelease = document.querySelector('.press__component-1');
      this.$inPress = document.querySelector('.press__component-2');
    },

    getDataPressItems() {
      fetch(PRESS_ITEMS)
        .then(response => response.json())
        .then((json) => {
          this.press = json;
          this.addHtmlForPressRelease();
          this.addHtmlForInPress();
        })
        .catch(error => console.log(error))
    },

    addHtmlForPressRelease() {
      const pressRelease = this.press.map((item) => {
        if (item.isPressRelease === true) {
          return `<li class="teaser__item">
                    <a class="teaser__img" href="press/my-secret-garden-valencia/index.html">
                        <img src="static/img/press/${item.image}" alt="Ambience image" loading="lazy">
                    </a>
                    <div class="item__description">
                        <h4>${item.subtitle}</h4>
                        <h3>${item.title}Frieze — London</h3>
                        <p>${item.description}</p>
                        <a href="press/my-secret-garden-valencia/index.html">Open press release</a>
                    </div>
                  </li>`
        }
      }).join('');
      this.$pressRelease.innerHTML = pressRelease;        
    },

    addHtmlForInPress() {
      const inPress = this.press.map((item) => {
        if (item.isPressRelease !== true) {
          return `<li class="teaser__item">
                    <a class="teaser__img" href="press/my-secret-garden-valencia/index.html">
                        <img src="static/img/press/${item.image}" alt="Ambience image" loading="lazy">
                    </a>
                    <div class="item__description">
                        <h4>${item.subtitle}</h4>
                        <h3>${item.title}Frieze — London</h3>
                        <p>${item.description}</p>
                        <a href="press/my-secret-garden-valencia/index.html">${(item.isWebsite === true) ? 'visit website' : 'download article'}</a>
                    </div>
                  </li>`
        }
      }).join('');
      this.$inPress.innerHTML = inPress
    },
  }

  app.initialize()

})();