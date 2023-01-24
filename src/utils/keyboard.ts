export const KEYBOARD_KEYS = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  escape: 'Escape',
  enter: 'Enter',
  tab: 'Tab',
  space: ' ',
};

export const SELECT_KEYS = [KEYBOARD_KEYS.enter, KEYBOARD_KEYS.space];

export const handleArrowKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.arrowDown) {
      e.preventDefault();

      handler(e as never);
    }
  };
};

export const handleEnterSpaceKeydown = (
  handler: React.KeyboardEventHandler
) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (SELECT_KEYS.includes(e.key)) {
      handler(e as never);
    }
  };
};

export const handleEscapeKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.escape) {
      handler(e as never);
    }
  };
};

export const handleTabKeydown = (handler: React.KeyboardEventHandler) => {
  return function (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
    if (e.key === KEYBOARD_KEYS.tab) {
      handler(e as never);
    }
  };
};

export const handleVerticalNavigation = (
  e: React.KeyboardEvent<HTMLElement> | KeyboardEvent
) => {
  const targetElement = e.target as HTMLElement;
  const currentTarget = e.currentTarget as HTMLElement;

  const nextElementSibling = targetElement.nextElementSibling as HTMLElement;
  const prevElementSibling =
    targetElement.previousElementSibling as HTMLElement;

  const firstElementSibling = targetElement.parentElement
    ?.firstChild as HTMLElement;
  const lastElementSibling = targetElement.parentElement
    ?.lastChild as HTMLElement;

  if (e.key === KEYBOARD_KEYS.arrowDown) {
    e.preventDefault();

    if (currentTarget === targetElement) {
      (targetElement.firstElementChild as HTMLElement).focus();
    } else if (targetElement === lastElementSibling) {
      firstElementSibling.focus();
    } else {
      nextElementSibling.focus();
    }
  }

  if (e.key === KEYBOARD_KEYS.arrowUp) {
    e.preventDefault();

    if (currentTarget === targetElement) {
      (targetElement.lastElementChild as HTMLElement).focus();
    } else if (targetElement === firstElementSibling) {
      lastElementSibling.focus();
    } else {
      prevElementSibling.focus();
    }
  }
};
