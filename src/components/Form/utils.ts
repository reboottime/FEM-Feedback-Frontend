import { v4 as uuid } from 'uuid';

const getHtmlFor = (name: string) => `htmlFor${name}${uuid()}`;

export default getHtmlFor;
