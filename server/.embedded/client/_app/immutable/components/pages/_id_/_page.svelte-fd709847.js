import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, l as claim_element, m as children, r as claim_text, h as detach, n as attr, b as insert_hydration, H as append_hydration, C as noop, M as add_render_callback, R as create_bidirectional_transition, o as onMount } from "../../../chunks/index-972b4d80.js";
import { f as fade } from "../../../chunks/index-1ece4b06.js";
function create_fragment(ctx) {
  let div;
  let h1;
  let t;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      h1 = element("h1");
      t = text("Loading");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", { class: true });
      var h1_nodes = children(h1);
      t = claim_text(h1_nodes, "Loading");
      h1_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-6xl");
      attr(div, "class", "h-screen flex flex-col items-center justify-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, h1);
      append_hydration(h1, t);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, {}, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, {}, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { data } = $$props;
  onMount(() => {
    console.log("Redirecting to " + data.link.url);
    setTimeout(
      () => {
        if (!data.link.url.startsWith("http")) {
          $$invalidate(0, data.link.url = "http://" + data.link.url, data);
        }
        window.location.replace(data.link.url);
      },
      500
    );
  });
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  return [data];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { data: 0 });
  }
}
export {
  Page as default
};
