export function isTouchSupport(): boolean {
  return 'ontouchstart' in window || !!navigator.maxTouchPoints;
}

export function touchEvent(): string {
  return isTouchSupport() ? 'touchend' : 'click';
}

export function pointerEvents(): { end: string; enter: string; leave: string } {
  return window.PointerEvent
    ? {
        end: 'pointerup',
        enter: 'pointerenter',
        leave: 'pointerleave',
      }
    : {
        end: 'touchend',
        enter: 'mouseenter',
        leave: 'mouseleave',
      };
}

export function isOutsideClick(element: HTMLElement, event: Event): boolean {
  return element === event.target || !element.contains(event.target as Node);
}
