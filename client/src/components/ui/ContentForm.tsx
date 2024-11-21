import { useRecoilState } from "recoil";
import { formInputAtom } from "../../atoms";

interface ContentForm {
  onSubmit: () => void;
}

const ContentForm = (props: ContentForm) => {
  const [formValue, setFormValue] = useRecoilState(formInputAtom);

  return (
    <form onSubmit={props.onSubmit} className="flex flex-col w-full gap-4">
      <div className="flex flex-col">
        <label htmlFor="content-type">Content Type</label>
        <select
          value={formValue.type}
          onChange={(e) => setFormValue({ ...formValue, type: e.target.value })}
          className="border-2 border-grey-200 rounded-md outline-none px-1 py-1"
          name="content-type"
          id="content-type"
        >
          <option value="document">document</option>
          <option value="tweet">tweet</option>
          <option value="youtube">youtube</option>
          <option value="link">link</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="link">Link</label>
        <input
          value={formValue.link}
          onChange={(e) => setFormValue({ ...formValue, link: e.target.value })}
          className="border-2 border-grey-200 rounded-md px-1 outline-none py-1"
          type="text"
          name="link"
          id="link"
          placeholder="https://google.com"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          value={formValue.title}
          onChange={(e) =>
            setFormValue({ ...formValue, title: e.target.value })
          }
          type="title"
          name="title"
          id="title"
          placeholder="My title"
          className="border-2 border-grey-200 rounded-md px-1 outline-none py-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="title">Tags</label>
        <input
          value={formValue.tags}
          onChange={(e) => setFormValue({ ...formValue, tags: e.target.value })}
          type="tags"
          name="tags"
          id="tags"
          placeholder="Tags"
          className="border-2 border-grey-200 rounded-md px-1 outline-none py-1"
        />
      </div>
    </form>
  );
};

export default ContentForm;
