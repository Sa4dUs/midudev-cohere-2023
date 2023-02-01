const urlEncode = (name: string) => {
  return `https://${name.toLowerCase().replaceAll(" ", "-")}`;
};

const isAvailable = (url: string) => {
  return true;
};

export default function genURLs(name: string): Array<string> {
  const tld = [".com", ".ai", ".io", ".dev"];
  return tld
    .map((tld) => `${urlEncode(name)}${tld}`)
    .filter((url) => isAvailable(url));
}
