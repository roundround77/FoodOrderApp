interface ISlugs {
  [name: string]: string | number;
}

export const getRoute = (route: string, slugs: ISlugs) => {
  let str = route;

  for (let key in slugs) {
    str = str.replace(`:${key}`, slugs[key].toString());
  }

  return str;
};
