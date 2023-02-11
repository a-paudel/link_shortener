import { API } from "../../api";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params }) => {
  const { id } = params;
  const link = await API.getLink(id);

  return {
    link,
  };
};
