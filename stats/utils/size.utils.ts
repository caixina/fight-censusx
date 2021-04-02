export const convertHeight = (height: string) => {
  const regexp = /(\d\s\w\w\s\d+)/gi;
  const regexpAlt = /(\d.\d+)/gi;
  const match = height.match(regexp);
  const matchAlt = height.match(regexpAlt);

  if (match && match.length > 0) {
    let clean = match[0].replace(/[a-zA-Z]/g, "").split(" ");
    clean = clean.filter((digit) => digit);
    const inches = parseInt(clean[0].trim()) * 12 + parseInt(clean[1].trim());
    return inches;
  } else if (matchAlt && matchAlt.length > 0) {
    const cleanAlt = matchAlt[0].split("'");
    const inchesAlt = parseInt(cleanAlt[0].trim()) * 12 + parseInt(cleanAlt[1].trim());
    return inchesAlt;
  }
  
  return height;
};

export const convertReach = (reach: string) => {
  const match = reach.match(/^\d\d\.\d/gi);

  // round up reach if in decimal format
  if (match && match.length > 0) {
    const decimal = match[0].substring(0, 4);
    const rounded = Math.ceil(parseFloat(decimal));
    reach = rounded.toString();
  }

  const shortened = parseInt(reach.substring(0, 2));

  return shortened;
};

export const compareSize = (
  division: string, 
  obj: any, 
  fighter: any
) => {
  if (obj[division] && obj[division].height) {
    // compare size
    const currentTotal = obj[division].height + obj[division].reach;
    const nextTotal = fighter.height + fighter.reach;

    if (nextTotal > currentTotal) {
      obj[division] = fighter;
    }
  } else {
    obj[division] = fighter;
  }
  return obj;
};