import { useRecoilState } from "recoil";
import { contentAtomFamily } from "../../atoms";
import { ContentInterface } from "./Content";
import { useEffect } from "react";

const Card = (props: ContentInterface) => {
  const [content, setContent] = useRecoilState(contentAtomFamily(props.id));

  useEffect(() => {
    const newArr = setContent(content);
    console.log(newArr);
    console.log(newArr);
  }, [content]);

  return <h1>Hello world</h1>;
};

export default Card;
