import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import ContentForm from "./ContentForm";
import axios from "axios";
import { contentAtom, formInputAtom } from "../../atoms";

interface Modal {
  isModalOpen: boolean;
  setIsModalOpen: SetterOrUpdater<boolean>;
}

const Modal = (props: Modal) => {
  const [formValue, setFromValue] = useRecoilState(formInputAtom);
  const setContent = useSetRecoilState(contentAtom);

  async function addContent(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/api/v1/content",
      {
        type: formValue.type,
        title: formValue.title,
        link: formValue.link,
        tags: formValue.tags,
      },
      { headers: { token } }
    );
    console.log(response);
    props.setIsModalOpen(false);
    const newContent = response.data.content;
    setContent((prevState: object[]) => [...prevState, newContent]);
    setFromValue({ ...formValue, title: "", link: "", tags: "" });
  }

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.setIsModalOpen}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div> */}
                <div className="mt-3  text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Create Note
                  </DialogTitle>
                </div>
              </div>
            </div>
            <div className="bg-white px-4 pb-5 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    <ContentForm onSubmit={addContent} />
                  </DialogTitle>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={addContent}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 sm:ml-3 sm:w-auto"
              >
                Create
              </button>
              <button
                onClick={() => {
                  props.setIsModalOpen(false);
                }}
                type="button"
                data-autofocus
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
