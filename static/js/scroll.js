(() => {

  const app = {
    initialize() {
      this.scrollToTop();
    },

    scrollToTop() {
      const scrollToTop = document.getElementById('to-top');

      const scroll = () => {
        let scrollPos = window.scrollY;
        
        if (scrollPos > 100) {
          document.querySelector('.to-top__container').classList.add('appear');
        } else {
          document.querySelector('.to-top__container').classList.remove('appear');
        }
      };

      window.addEventListener("scroll", scroll);

      scrollToTop.onclick = function(e) {
        e.preventDefault();
        document.documentElement.scrollTop = 0;
      }
    },

  }

  app.initialize()

})();