const baseurl = "/api/links";
console.log("baseurl", baseurl);
async function createId(url) {
  let resp = await fetch(baseurl, {
    method: "POST",
    body: url
  });
  let data = await resp.json();
  return data;
}
async function getLink(id) {
  let resp = await fetch(`${baseurl}/${id}`);
  let data = await resp.json();
  return data;
}
const API = {
  createId,
  getLink
};
export {
  API as A
};
