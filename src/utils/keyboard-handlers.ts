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

export const handleEscapeKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.escape) {
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

export const handleVerticalNavigation =  (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => {
  const targetElement = e.target as HTMLElement;

  const nextElementSibling = targetElement.nextElementSibling as HTMLElement;
  const prevElementSibling = targetElement.previousElementSibling as HTMLElement;

  const firstElementSibling = targetElement.parentElement?.firstChild as HTMLElement;
  const lastElementSibling = targetElement.parentElement?.lastChild as HTMLElement;

  if (e.key === KEYBOARD_KEYS.arrowDown) {
    e.preventDefault();

    if (targetElement === lastElementSibling) {
      firstElementSibling.focus();
    } else {
      nextElementSibling.focus();
    }
  }


  if (e.key === KEYBOARD_KEYS.arrowUp) {
    e.preventDefault();

    if (targetElement === firstElementSibling) {
      lastElementSibling.focus();
    } else {
      prevElementSibling.focus();
    }
  }
};
