const ART_AND_EXHIBITIONS = 'https://www.pgm.gent/data/arnequinze/art.json';
const TAGS = 'data/tags.json';
const YEARS = 'data/years.json';

(() => {

  const app = {
    initialize() {
      this.cacheElement();
      this.getDataAtelierItems();
    },

    cacheElement() {
      this.$atelierItems = document.querySelector('.atelier__component');
      this.$tags = document.querySelector('.filter__tags');
      this.$years = document.querySelector('.filter__years');
      this.$artList = document.querySelector('.art__list');
    },

    getDataAtelierItems() {
      fetch(ART_AND_EXHIBITIONS)
        .then(response => response.json())
        .then((json) => {
          this.art = json;
          this.getDataTags()
        })
        .catch(error => console.log(error))
    },

    getDataTags() {
      fetch(TAGS)
        .then(response => response.json())
        .then((json) => {
          this.tags = json;
          this.getDataYears()
        })
        .catch(error => console.log(error))
    },

    getDataYears() {
      fetch(YEARS)
        .then(response => response.json())
        .then((json) => {
          this.years = json;
          this.addHtmlForTags();
          this.addHtmlForArt();
          this.addHtmlForYears();
        })
        .catch(error => console.log(error))
    },

    addHtmlForTags() {
      const tagList = this.tags.map(tag => {

        if (tag === 'Show all') {
          return `<li><a href="art-and-exhibitions/index.html">${tag}</a></li>`
        } else {
          return `<li><a href="art-and-exhibitions/index.html?tag=${((tag === 'Public art') ? 'Installation' : tag )}">${tag}</a></li>`
        }

      }).join('');
      this.$tags.innerHTML = tagList;
    },

    addHtmlForYears() {
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const mark = params.get('tag')
      const yearList = this.years.map(year => {
        return `<li><a href="art-and-exhibitions/index.html${(mark !== null) ? `?tag=${mark}` : ''}#${year}">${year}</a></li>`
      }).join('');
      this.$years.innerHTML = yearList;
    },

    addHtmlForArt() {
      const query = window.location.search;
      const params = new URLSearchParams(query);
      const check = params.has('tag');
      const tag = params.get('tag');
      if (check === true) {

        const items = this.years.map (year => {
          const filterTags = this.art.filter(filter => {
            for (var i = 0; i < filter.tags.length; i++) {
              var filteredTag = filter.tags[i];
            };
            return filteredTag === tag;
          });

          const filterYears = filterTags.filter((tag) => {
            return tag.year.indexOf(year) > -1;
          });

          if (filterYears.length !== 0) {

            const listItems = filterYears.map(item => {
              const images = item.images.map(img => {
                return `<li class="art__images"><a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img src="static/img/art-exhibitions/${img}" alt="Ambience image" loading="lazy"></a></li>`
              }).join('');
              return `<li class="art__flex">
                        <div class="art__flex__left">
                          <h3><a href="art-exhibitions/in-dialogue-with-calatrava/index.html">${item.title}</a></h3>
                          <h4>${item.subtitle}</h4>
                          <h5>${(item.tags).join(' / ')} ${(item.location) ? `- ${item.location}` : ''}</h5>
                        </div>
                        <ul class="art__flex__right">${images}</ul>
                      </li>`
              }).join('');
  
              return `<div class="art__list__card">
                        <div class="art__list__title">
                          <h2 id="${year}">${year}</h2>
                        </div>
                        <ul class="art__cards">${listItems}</ul>
                      </div>`

          } else {}
          
        }).join('');

        this.$artList.innerHTML = items
      } else {

        const items = this.years.map (year => {
          const filterYears = this.art.filter((tag) => {
            return tag.year.indexOf(year) > -1;
          });

          if (filterYears.length !== 0) {

            const listItems = filterYears.map(item => {
              const images = item.images.map(img => {
                return `<li class="art__images"><a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img src="static/img/art-exhibitions/${img}" alt="Ambience image" loading="lazy"></a></li>`
              }).join('');
              return `<li class="art__flex">
                        <div class="art__flex__left">
                          <h3><a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">${item.title}</a></h3>
                          <h4>${item.subtitle}</h4>
                          <h5>${(item.tags).join(' / ')} ${(item.location) ? `- ${item.location}` : ''}</h5>
                        </div>
                        <ul class="art__flex__right">${images}</ul>
                      </li>`
              }).join('');
  
              return `<div class="art__list__card">
                      <div class="art__list__title">
                        <h2 id="${year}">${year}</h2>
                      </div>
                        <ul class="art__cards">${listItems}</ul>
                      </div>`

          } else {}

        }).join('');

        this.$artList.innerHTML = items
      };

     },
  }

  app.initialize();

})();