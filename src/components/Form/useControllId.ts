import { useRef } from 'react';
import { v4 as uuid } from 'uuid';

const useControllId = (name: string) => {
  const id = `htmlFor${name}${uuid()}`;

  return useRef<string>(id).current;
};

export default useControllId;
