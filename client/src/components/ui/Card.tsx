import { useRecoilState } from "recoil";
import { contentAtom } from "../../atoms";
import axios from "axios";
import ContentType from "./ContentType";

interface Content {
  title: string;
  tags: string[];
  type: string;
  _id: string;
  link: string;
}

const Card = () => {
  const [content, setContent] = useRecoilState(contentAtom);

  async function deleteContent(id: string) {
    const token = localStorage.getItem("token");
    // @ts-ignore
    const response = await axios.delete(
      "http://localhost:3000/api/v1/content",
      { headers: { token }, data: { contentId: id } }
    );
    setContent((prevState: Content[]) =>
      prevState.filter((item) => item._id != id)
    );
    console.log(id, `deleted ${id}`);
  }

  return (
    <div className="grid grid-cols-3 gap-6 my-10">
      {content.map((item: Content) => {
        return (
          <div
            className="flex rounded-lg p-4 flex-col gap-2 border-2 border-grey-200 min-w-[350px] min-h-[300px]"
            key={item._id}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <ContentType type={item.type} />
                <h2 className="text-2xl font-medium">{item.title}</h2>
              </div>
              <div className="flex gap-3">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 34.492188 8.9902344 C 31.997187 8.9902344 29.980469 11.000375 29.980469 13.484375 C 29.980469 14.115662 30.111478 14.714342 30.345703 15.259766 C 30.332287 15.266136 30.324359 15.266696 30.310547 15.273438 L 16.521484 22.179688 C 15.717325 21.44237 14.657048 20.980469 13.482422 20.980469 C 10.991422 20.980469 8.9648438 23.007047 8.9648438 25.498047 C 8.9648438 27.989047 10.992422 30.015625 13.482422 30.015625 C 14.649115 30.015625 15.703343 29.559082 16.505859 28.830078 C 16.557081 28.861823 16.590352 28.894284 16.652344 28.925781 L 30.384766 36.720703 C 30.149683 37.268995 30.017578 37.871828 30.017578 38.505859 C 30.017578 41.000859 32.034672 43.029297 34.513672 43.029297 C 36.993672 43.029297 39.011719 41.000859 39.011719 38.505859 C 39.011719 36.010859 36.992672 33.980469 34.513672 33.980469 C 33.018434 33.980469 31.700966 34.725743 30.882812 35.859375 L 17.310547 28.154297 C 17.259866 28.123293 17.224012 28.107137 17.177734 28.080078 C 17.691759 27.34692 17.998047 26.459516 17.998047 25.498047 C 17.998047 24.55397 17.706025 23.678642 17.208984 22.953125 L 30.851562 16.128906 C 31.66853 17.248833 32.981283 17.984375 34.480469 17.984375 C 36.975469 17.984375 39.005859 15.963516 39.005859 13.478516 C 39.005859 10.993516 36.987187 8.9902344 34.492188 8.9902344 z M 34.472656 9.9882812 C 36.374656 9.9882813 37.990234 11.545375 37.990234 13.484375 C 37.990234 15.423375 36.382469 16.982422 34.480469 16.982422 C 32.578469 16.982422 30.996094 15.464391 30.996094 13.525391 C 30.996094 11.586391 32.570656 9.9882812 34.472656 9.9882812 z M 13.482422 21.974609 C 15.425422 21.974609 17.005859 23.555047 17.005859 25.498047 C 17.005859 27.441047 15.425422 29.021484 13.482422 29.021484 C 11.539422 29.021484 9.9589844 27.441047 9.9589844 25.498047 C 9.9589844 23.555047 11.539422 21.974609 13.482422 21.974609 z M 34.494141 34.994141 C 36.425141 34.994141 37.996094 36.565094 37.996094 38.496094 C 37.996094 40.427094 36.425141 41.998047 34.494141 41.998047 C 32.563141 41.998047 30.992188 40.427094 30.992188 38.496094 C 30.992187 36.565094 32.563141 34.994141 34.494141 34.994141 z"></path>
                  </svg>
                </button>
                <button onClick={() => deleteContent(item._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 48 48"
                  >
                    <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-xl">{item.title}</h3>
            <a className="text-purple-600" href={item.link}>
              {item.link}
            </a>
            {item.tags.map((tag) => (
              <p className="bg-purple-400 font-light rounded-xl text-center text-purple-600 w-[80px]">
                #{tag}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Card;
