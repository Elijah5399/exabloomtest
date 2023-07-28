import { useSearchParams } from "react-router-dom";
import { QType } from "./types/types";
import { useState, useEffect } from "react";

export default function Worksheet(): JSX.Element {
  // Obtain the parameters from the query string and initialise them
  const [searchParams] = useSearchParams();
  var desc: string | null = searchParams.get("desc");
  if (desc !== null) desc = decodeURIComponent(desc);
  var title: string | null = searchParams.get("title");
  if (title !== null) title = decodeURIComponent(title);
  var price: number | null = Number(searchParams.get("price"));
  var index: number = Number(searchParams.get("index"));
  var cost: number | null = Number(searchParams.get("cost"));
  const [questions, setQuestions] = useState([]);
  const fetchQuestionsForWorksheet = (worksheetId: number) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/worksheets/${worksheetId}/questions`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        referrerPolicy: "no-referrer",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Fetching questions failed.");
        }
      })
      .then((data) => {
        // 'data.questions' contains the questions for the worksheet
        console.log(data.questions);
        setQuestions(data.questions);
        // Set the questions state in your component or use it as needed
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(
    () => fetchQuestionsForWorksheet(index),
    [fetchQuestionsForWorksheet]
  );

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
          {questions.map((qn: QType, qnIndex: number) => (
            <tr key={qnIndex}>
              <td>{qnIndex + 1}</td>
              <td>{qn.description}</td>
              <td>{qn.answer}</td>
              <td>
                $
                {typeof qn.cost === "number"
                  ? qn.cost.toFixed(2)
                  : typeof qn.cost === "string"
                  ? parseFloat(qn.cost).toFixed(2)
                  : "Invalid cost"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
