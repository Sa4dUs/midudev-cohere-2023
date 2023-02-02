const urlEncode = (name: string) => {
  return `https://${name
    .toLowerCase()
    .replaceAll(/[\.\:\,]/g, "")
    .replaceAll(" ", "-")}`;
};

const isAvailable = (url: string) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(url);
};

export default function genURLs(name: string): Array<string> {
  const tld = [".com", ".ai", ".io", ".dev"];
  return tld
    .map((tld) => `${urlEncode(name)}${tld}`)
    .filter((url) => isAvailable(url));
}
