function capitalize(string) {
  let newString = "";

  for (let i = 0; i < string.length; i++) {
    i === 0 ? (newString += string[i]) : (newString += string[i].toLowerCase());
  }

  return newString;
}

export default capitalize;
