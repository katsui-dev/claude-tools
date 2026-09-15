/**
 * ハッシュベースのシンプルなルーター。
 */
window.App = window.App || {};

App.Router = (function () {
  var mainContent;
  var currentRoute = 'home';

  var routes = {
    home: App.Pages && App.Pages.home,
    advertising: null,
    leads: null,
    hp: null,
    recruiting: null,
    activityPlan: null,
    tasks: null,
    consultations: null,
    activityLog: null
  };

  function resolvePage(route) {
    var map = {
      home: 'home', advertising: 'advertising', leads: 'leads', hp: 'hp',
      recruiting: 'recruiting', activityPlan: 'activityPlan', tasks: 'tasks',
      consultations: 'consultations', activityLog: 'activityLog'
    };
    var key = map[route] || 'home';
    return App.Pages[key];
  }

  function render(route) {
    currentRoute = route;
    var page = resolvePage(route);
    if (!page) return;
    mainContent.scrollTop = 0;
    window.scrollTo(0, 0);
    page.mount(mainContent);
    App.UI && App.UI.setActiveNav(route);
  }

  function navigate(route) {
    if (location.hash === '#/' + route) {
      render(route);
    } else {
      location.hash = '#/' + route;
    }
  }

  function rerender() { render(currentRoute); }

  function init(container) {
    mainContent = container;
    window.addEventListener('hashchange', function () {
      var route = (location.hash || '#/home').replace('#/', '');
      render(route);
    });
    var initial = (location.hash || '#/home').replace('#/', '');
    render(initial);
  }

  return { init: init, navigate: navigate, rerender: rerender, getCurrentRoute: function () { return currentRoute; } };
})();
