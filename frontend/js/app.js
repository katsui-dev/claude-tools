/**
 * アプリ初期化：サイドバー / ハンバーガーメニュー / ボトムナビの構築と配線。
 */
window.App = window.App || {};

App.NAV_ITEMS = [
  { route: 'home', label: 'HOME', icon: '🏠' },
  { route: 'advertising', label: '広告販促', icon: '📢' },
  { route: 'leads', label: '集客', icon: '🧲' },
  { route: 'hp', label: 'HP', icon: '🌐' },
  { route: 'recruiting', label: '人材紹介', icon: '🧑‍💼' },
  { route: 'activityPlan', label: '活動計画', icon: '🗓️' },
  { route: 'tasks', label: 'タスク', icon: '✅' },
  { route: 'consultations', label: '相談', icon: '💬' },
  { route: 'activityLog', label: '活動履歴', icon: '🕒' }
];

App.BOTTOM_NAV_ITEMS = ['home', 'tasks', 'consultations', 'activityLog'];

App.UI = (function () {
  var U = App.Utils;

  function buildSidebarNav() {
    var nav = document.getElementById('sidebarNav');
    nav.innerHTML = App.NAV_ITEMS.map(function (item) {
      return (
        '<div class="sidebar-nav-item" data-route="' + item.route + '">' +
          '<span class="sidebar-nav-icon">' + item.icon + '</span>' +
          '<span>' + item.label + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function buildBottomNav() {
    var nav = document.getElementById('bottomNav');
    nav.innerHTML = App.BOTTOM_NAV_ITEMS.map(function (route) {
      var item = App.NAV_ITEMS.filter(function (n) { return n.route === route; })[0];
      return (
        '<div class="bottom-nav-item" data-route="' + item.route + '">' +
          '<span class="bottom-nav-icon">' + item.icon + '</span>' +
          '<span>' + item.label + '</span>' +
        '</div>'
      );
    }).join('') + (
      '<div class="bottom-nav-item" id="bottomNavMenu">' +
        '<span class="bottom-nav-icon">☰</span><span>メニュー</span>' +
      '</div>'
    );
  }

  function setActiveNav(route) {
    U.qsa('.sidebar-nav-item').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-route') === route);
    });
    U.qsa('.bottom-nav-item[data-route]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-route') === route);
    });
  }

  function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('show');
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');
  }

  function wireNavigation() {
    // サイドバー・ボトムナビ・KPIカードなど、data-route属性を持つ要素をクリックしたら遷移
    document.addEventListener('click', function (e) {
      var target = e.target.closest('[data-route]');
      if (target) {
        App.Router.navigate(target.getAttribute('data-route'));
        closeSidebar();
      }
    });

    document.getElementById('hamburgerBtn').addEventListener('click', openSidebar);
    document.getElementById('bottomNavMenu').addEventListener('click', openSidebar);
    document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  }

  function init() {
    buildSidebarNav();
    buildBottomNav();
    wireNavigation();
  }

  return { init: init, setActiveNav: setActiveNav };
})();

document.addEventListener('DOMContentLoaded', function () {
  if (window.Chart) {
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  }
  App.UI.init();
  App.Router.init(document.getElementById('mainContent'));
});
