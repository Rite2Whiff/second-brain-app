import axios from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";
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

export const contentAtomFamily = atomFamily({
  key: "contentAtomFamily",
  default: selectorFamily({
    key: "contentSelectorFamily",
    get: (id) =>
      async function ({ get }) {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3000/api/v1/content",
            { headers: { token } }
          );
          const dataArray = response.data.content;
          return dataArray.find((item) => item._id === id);
        }
      },
  }),
});
