import { A as API } from "./api-5cf47720.js";
const load = async ({ params }) => {
  const { id } = params;
  const link = await API.getLink(id);
  return {
    link
  };
};
const _layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load
}, Symbol.toStringTag, { value: "Module" }));
export {
  _layout as _,
  load as l
};
