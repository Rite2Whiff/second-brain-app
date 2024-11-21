import { Button } from "./Button";
import Modal from "./Modal";
import { useRecoilState } from "recoil";
import { modalAtom } from "../../atoms";
import Card from "./Card";

export interface ContentInterface {
  id: string;
}

const Content = (props: ContentInterface) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);

  return (
    <div className="col-span-4 p-6 bg-white-500">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold">All notes</h2>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            size="md"
            text="Share Brain"
            onClick={() => {}}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div>
        <Card id={props.id} />
      </div>
    </div>
  );
};

export default Content;
