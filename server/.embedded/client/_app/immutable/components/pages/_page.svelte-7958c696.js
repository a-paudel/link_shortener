import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, a as space, l as claim_element, m as children, c as claim_space, h as detach, n as attr, b as insert_hydration, H as append_hydration, J as set_input_value, K as listen, L as prevent_default, f as transition_in, t as transition_out, d as check_outros, M as add_render_callback, N as run_all, q as text, r as claim_text, O as create_in_transition, P as create_out_transition, g as group_outros } from "../../chunks/index-972b4d80.js";
import { l as client } from "../../chunks/singletons-36868f79.js";
import { s as scale, f as fade } from "../../chunks/index-1ece4b06.js";
import { A as API } from "../../chunks/api-5cf47720.js";
client.disable_scroll_handling;
const goto = client.goto;
client.invalidate;
client.invalidateAll;
client.preload_data;
client.preload_code;
client.before_navigate;
client.after_navigate;
function create_if_block(ctx) {
  let div;
  let button;
  let t;
  let button_intro;
  let button_outro;
  let div_intro;
  let div_outro;
  let current;
  return {
    c() {
      div = element("div");
      button = element("button");
      t = text("Shorten");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      button = claim_element(div_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t = claim_text(button_nodes, "Shorten");
      button_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "p4 text-2xl font-bold fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-12 shadow");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, button);
      append_hydration(button, t);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (button_outro)
          button_outro.end(1);
        button_intro = create_in_transition(button, scale, {});
        button_intro.start();
      });
      add_render_callback(() => {
        if (div_outro)
          div_outro.end(1);
        div_intro = create_in_transition(div, fade, {});
        div_intro.start();
      });
      current = true;
    },
    o(local) {
      if (button_intro)
        button_intro.invalidate();
      button_outro = create_out_transition(button, scale, {});
      if (div_intro)
        div_intro.invalidate();
      div_outro = create_out_transition(div, fade, {});
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && button_outro)
        button_outro.end();
      if (detaching && div_outro)
        div_outro.end();
    }
  };
}
function create_fragment(ctx) {
  let form;
  let input;
  let t;
  let form_intro;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*urlValid*/
    ctx[1] && create_if_block()
  );
  return {
    c() {
      form = element("form");
      input = element("input");
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      form = claim_element(nodes, "FORM", {});
      var form_nodes = children(form);
      input = claim_element(form_nodes, "INPUT", {
        type: true,
        placeholder: true,
        class: true
      });
      t = claim_space(form_nodes);
      if (if_block)
        if_block.l(form_nodes);
      form_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input, "type", "text");
      attr(input, "placeholder", "Shorten URL");
      input.autofocus = true;
      attr(input, "class", "p2 w-screen text-center text-6xl font-bold border-0 focus:outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2");
    },
    m(target, anchor) {
      insert_hydration(target, form, anchor);
      append_hydration(form, input);
      set_input_value(
        input,
        /*url*/
        ctx[0]
      );
      append_hydration(form, t);
      if (if_block)
        if_block.m(form, null);
      current = true;
      input.focus();
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[3]
          ),
          listen(form, "submit", prevent_default(
            /*submitHandler*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*url*/
      1 && input.value !== /*url*/
      ctx2[0]) {
        set_input_value(
          input,
          /*url*/
          ctx2[0]
        );
      }
      if (
        /*urlValid*/
        ctx2[1]
      ) {
        if (if_block) {
          if (dirty & /*urlValid*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(form, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      if (!form_intro) {
        add_render_callback(() => {
          form_intro = create_in_transition(form, fade, {});
          form_intro.start();
        });
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(form);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function validateUrl(data) {
  let regex1 = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  let regex2 = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  let result1 = regex1.test(data);
  let result2 = regex2.test(data);
  return result1 || result2;
}
function instance($$self, $$props, $$invalidate) {
  let urlValid;
  let url = "";
  async function submitHandler() {
    if (!urlValid)
      return;
    let link = await API.createId(url);
    goto(`./${link.id}/show`);
  }
  function input_input_handler() {
    url = this.value;
    $$invalidate(0, url);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*url*/
    1) {
      $$invalidate(1, urlValid = validateUrl(url));
    }
  };
  return [url, urlValid, submitHandler, input_input_handler];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
