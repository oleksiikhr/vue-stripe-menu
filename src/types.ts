export interface VsmHTMLElement extends HTMLElement {
  _vsmMenu: boolean;
  _vsmMenuHandlers: { [key: string]: EventListenerOrEventListenerObject };
}

export interface VsmItem {
  el: HTMLElement;
  name: string;
  align: string;
  content: VsmHTMLElement;
}
