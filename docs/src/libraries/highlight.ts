import hljs from 'highlight.js/lib/core';
import javascriptLanguage from 'highlight.js/lib/languages/javascript';
import bashLanguage from 'highlight.js/lib/languages/bash';
import scssLanguage from 'highlight.js/lib/languages/scss';
import vueLanguage from 'highlight.js/lib/languages/handlebars';

hljs.registerLanguage('javascript', javascriptLanguage);
hljs.registerLanguage('bash', bashLanguage);
hljs.registerLanguage('scss', scssLanguage);
hljs.registerLanguage('vue', vueLanguage);

export default hljs;
