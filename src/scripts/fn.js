'use strict'

/**
 * PointerEvent interface represents the state of a DOM event
 */
export const pointerEvent = window.PointerEvent ? {
  end: 'pointerup',
  enter: 'pointerenter',
  leave: 'pointerleave'
} : {
  end: 'touchend',
  enter: 'mouseenter',
  leave: 'mouseleave'
}
