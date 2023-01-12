export const KEYBOARD_KEYS = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  escape: 'Escape',
  enter: 'Enter',
  tab: 'Tab',
  space: ' '
};

export const SELECT_KEYS = [KEYBOARD_KEYS.enter, KEYBOARD_KEYS.space];

export const handleArrowKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.arrowDown) {
      e.preventDefault();

      handler(e);
    }
  };
};

export const handleEnterSpaceKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (SELECT_KEYS.includes(e.key)) {
      handler(e);
    }
  };
};

export const handleTabKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.tab) {
      handler(e);
    }
  };
};

export const handleEscapeKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.escape) {
      handler(e);
    }
  };
};
