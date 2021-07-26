import './normalize.css';
import './prompt-impl';

window.__static = window.preload.init()

if (!window.globalThis) {
  window.globalThis = window;
}

const searchParams = new URLSearchParams(location.search);
const route = searchParams.get('route');

if (route === 'editor') {
  import('./gui/gui.jsx');
} else if (route === 'about') {
  import('./about/about.jsx');
} else if (route === 'settings') {
  import('./settings/settings.jsx');
} else if (route === 'privacy') {
  import('./privacy/privacy.jsx');
} else {
  alert(`Invalid route: ${route}`);
}
