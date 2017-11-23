export const object2string = (o: object | null | undefined): string => {
  if (o == null) {
    return 'null';
  }
  const seen: Array<any> = [];
  const replacer = (key, value) => {
    if (value != null && typeof value === 'object') {
      if (seen.indexOf(value) >= 0) {
        return 'has cycles';
      }
      seen.push(value);
    }
    return value;
  };
  return JSON.stringify(o, replacer);
};

export const log = {
  d: (s: string, o?: object) => {
    if (undefined === o) {
      console.log(`[carsharing] ${s}`);
    } else {
      console.log(`[carsharing] ${s} "${object2string(o)}"`);
    }
  },
  w: (s: string, o?: object) => {
    if (undefined === o) {
      console.warn(`[carsharing] ${s}`);
    } else {
      console.warn(`[carsharing] ${s} ${object2string(o)}`);
    }
  },
  e: (s: string) => {
    console.error(`[carsharing] ${s}`);
  },
};
