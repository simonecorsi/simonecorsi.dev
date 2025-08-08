"use client";

import colors from "language-colors";
import { useEffect, useState } from "react";

export default function Bookmarks({ languages, data }) {
  const [useLang, setLang] = useState(null);
  const [useRepos, setRepos] = useState(data);

  useEffect(() => {
    setRepos(
      !useLang
        ? data
        : data.filter((r) =>
            r?.primaryLanguage?.name.match(new RegExp(useLang, "i")),
          ),
    );
  }, [data, useLang]);

  return (
    <div className="content">
      <h1>📚 {useLang || ""} Bookmarks</h1>
      <p>
        Welcome to my collection of starred repositories! 🚀
        <br />
        After a decade of exploring, this list has grown massive, so here you'll
        only find projects that have been active in the last 2 years.
        <br />
        <br />
        Want to build your own personalized list? Check out my&nbsp;
        <a
          href="https://github.com/marketplace/actions/my-awesome-list"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Action
        </a>
        &nbsp;and start building your collection!
      </p>
      <h4 style={{ marginBottom: 0 }}>Filter by language:</h4>
      <div>
        <span
          style={{
            marginRight: 5,
            fontWeight: useLang === null ? "bold" : "lighter",
          }}
        >
          {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
          <a href={"#all"} onClick={() => setLang(null)}>
            All
          </a>
        </span>
        {languages.map((l) => (
          <span
            key={l}
            style={{
              marginRight: 5,
              fontWeight: useLang === l ? "bold" : "lighter",
            }}
          >
            <a
              href={`#${l}`}
              onClick={() => setLang(l)}
              style={{
                color: useLang === l ? colors[l.toLowerCase()] : "inherit",
              }}
            >
              {l}
            </a>
          </span>
        ))}
      </div>
      <h4 style={{ marginBottom: 0 }}>
        Repositories <i>({useRepos.length})</i> :
      </h4>
      <div>
        {
          <ul>
            {useRepos.map((r) => (
              <li key={r.id}>
                <a href={r.url}>{r.nameWithOwner}</a> - {r.description}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}
