(function () {
  function notifyParent() {
    parent.postMessage({ type: 'frame-url', href: location.href, title: document.title }, '*');
  }
  window.addEventListener('load', notifyParent);
  window.addEventListener('popstate', notifyParent);
  window.addEventListener('hashchange', notifyParent);
  ['pushState', 'replaceState'].forEach(function (m) {
    var orig = history[m];
    history[m] = function () { orig.apply(this, arguments); notifyParent(); };
  });
  new MutationObserver(notifyParent).observe(document.querySelector('title'), { childList: true });

  function signalReady() { parent.postMessage({ type: 'frame-ready' }, '*'); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(signalReady);
  } else {
    window.addEventListener('load', signalReady);
  }

  function breakoutExternalLinks(root) {
    root.querySelectorAll('a[href]').forEach(function (a) {
      if (a.dataset.frameBreakoutApplied) return;
      var href = a.getAttribute('href');
      if (/^(#|mailto:|tel:)/.test(href)) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (e) { return; }
      if (url.host !== location.host) {
        a.target = '_top';
        a.dataset.frameBreakoutApplied = '1';
      }
    });
  }
  breakoutExternalLinks(document);
  new MutationObserver(function (muts) {
    muts.forEach(function (m) { breakoutExternalLinks(m.target); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
