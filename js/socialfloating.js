$(document).ready(function () {
      const myButtons = [
        [
          { icon: 'facebook', enabled: true, link: 'https://facebook.com', color: '#3b' },
          { icon: 'twitter', enabled: true, link: 'https://twitter.com', color: '#00aced' },
          { icon: 'github', enabled: true, link: 'https://github.com', color: '#333333' }
        ],
        [
          { icon: 'phone', enabled: true, link: 'tel:+123456789' },
          { icon: 'envelope', enabled: true, link: 'mailto:test@example.com' }
        ]
      ];



      $.socialfloating({
        buttons: myButtons,
        position: 'left',
        // effect: 'slide-on-scroll',
        showHideButton: true
      });
    });