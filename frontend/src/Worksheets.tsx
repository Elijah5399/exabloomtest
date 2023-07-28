import { Fragment } from "react";
import { Link } from "react-router-dom";
import { WSType } from "./types/types";
import "./Worksheets.css";

export default function Worksheets({
  worksheets,
}: {
  worksheets: WSType[];
}): JSX.Element {
  return (
    <div className="worksheetsWrapper">
      <p className="worksheetLine">
        Total Cost: $
        {worksheets
          .reduce(
            (accumulator, { cost }) => accumulator + parseFloat(cost as any),
            0
          )
          .toFixed(2)}
      </p>
      <p className="worksheetLine">
        Total Price: $
        {worksheets
          .reduce(
            (accumulator, { price }) => accumulator + parseFloat(price as any),
            0
          )
          .toFixed(2)}
      </p>
      <p className="worksheetLine">
        Total Profits: $
        {worksheets
          .reduce(
            (accumulator, { cost, price }) =>
              accumulator +
              (parseFloat(price as any) - parseFloat(cost as any)),
            0
          )
          .toFixed(2)}
      </p>
      <table className="worksheetsTable">
        <thead>
          <tr>
            <td>#</td>
            <td>Title</td>
            <td>Description</td>
            <td>Cost ($)</td>
            <td>Price ($)</td>
            <td>Profit ($)</td>
            <td>Link</td>
          </tr>
        </thead>
        <tbody>
          {worksheets.map(({ title, description, cost, price }, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{cost}</td>
              <td>{price}</td>
              <td>{price - cost}</td>
              <td>
                <Link
                  to={encodeURI(
                    `/worksheet?index=${index}&title=${title}&desc=${description}&cost=${cost}&price=${price}`
                  )}
                  target="_blank"
                >
                  Worksheet {index + 1}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
