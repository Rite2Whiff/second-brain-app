import axios from "axios";
import { atom, selector } from "recoil";
export const modalAtom = atom({
  key: "modalAtom",
  default: false,
});

export const formInputAtom = atom({
  key: "formAtom",
  default: {
    type: "document",
    link: " ",
    title: " ",
    tags: "",
  },
});

export const authFormAtom = atom({
  key: "signupFormAtom",
  default: {
    username: "",
    password: "",
  },
});

export const contentAtom = atom({
  key: "contentAtom",
  default: selector({
    key: "contentSelector",
    get: async function () {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/content", {
        headers: { token },
      });
      return response.data.content;
    },
  }),
});
