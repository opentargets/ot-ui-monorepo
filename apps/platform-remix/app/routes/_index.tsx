import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
// import pkg from "@apollo/client";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

// const { gql, useQuery } = pkg;

// const DISEASE_QUERY = gql`
//   query associatedTargets {
//     disease(efoId: "EFO_0000349") {
//       id
//       name
//       associatedTargets {
//         count
//         rows {
//           target {
//             id
//             approvedSymbol
//           }
//           score
//         }
//       }
//     }
//   }
// `;

export default function Index() {
  // const { data } = useQuery(DISEASE_QUERY);

  // console.log(":", data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Link to="/mui">Go to Mui Example</Link>
    </div>
  );
}
