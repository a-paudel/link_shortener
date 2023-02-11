import type { ILink } from "./models";
import { dev } from "$app/environment";

const baseurl = dev ? "http://localhost:8000/api/links" : "/api/links";
console.log("baseurl", baseurl);

async function createId(url: string) {
  let resp = await fetch(baseurl, {
    method: "POST",
    body: url,
  });

  let data: ILink = await resp.json();
  return data;
}

async function getLink(id: string) {
  let resp = await fetch(`${baseurl}/${id}`);

  let data: ILink = await resp.json();
  return data;
}

export const API = {
  createId,
  getLink,
};
