import { useSearchParams } from "react-router-dom";
import { QType } from "./types/types";
export default function Worksheet(): JSX.Element {
  // Obtain the parameters from the query string and initialise them
  const [searchParams] = useSearchParams();
  var desc: string | null = searchParams.get("desc");
  if (desc !== null) desc = decodeURIComponent(desc);
  var title: string | null = searchParams.get("title");
  if (title !== null) title = decodeURIComponent(title);
  var price: number | null = Number(searchParams.get("price"));
  var index: number | null = Number(searchParams.get("index"));
  var cost: number | null = Number(searchParams.get("cost"));
  var questionsString: string | null = searchParams.get("questions");
  var questionsArr: QType[] = [];
  if (questionsString !== null) {
    questionsString = decodeURIComponent(questionsString);
    questionsArr = JSON.parse(questionsString);
  }

  return (
    <>
      <h1>Worksheet {index + 1}</h1>
      <p>Title: {title}</p>
      <p>Description: {desc}</p>
      <p>Cost: {cost}</p>
      <p>Price: {price}</p>
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Description</td>
            <td>Answer</td>
            <td>Cost</td>
          </tr>
        </thead>
        <tbody>
          {questionsArr.map((qn: QType, qnIndex: number) => (
            <tr>
              <td>{qnIndex + 1}</td>
              <td>{qn.description}</td>
              <td>{qn.answer}</td>
              <td>qn.cost</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
