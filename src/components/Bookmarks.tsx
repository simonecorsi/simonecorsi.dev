"use client";

import colors from "language-colors";
import Link from "next/link";
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
    <div className="min-h-screen py-16 px-4 lg:px-8 max-w-5xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl lg:text-6xl font-black tracking-tight">
          📚 {useLang ? `${useLang} ` : ""}Bookmarks
        </h1>
        <div className="prose lg:prose-xl opacity-70">
          <p>
            Welcome to my collection of starred repositories! After a decade of
            exploring, this list has grown massive. Here you&apos;ll find
            projects active in the last 2 years.
          </p>
          <p>
            Build your own with my&nbsp;
            <a
              href="https://github.com/marketplace/actions/my-awesome-list"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Action
            </a>
            .
          </p>
        </div>
      </header>

      <section className="space-y-6">
        <div className="divider divider-start font-bold opacity-30 uppercase tracking-widest text-xs">
          Filter by language
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setLang(null)}
            className={`btn btn-sm ${useLang === null ? "btn-primary" : "btn-ghost"}`}
          >
            All
          </button>
          {languages.map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setLang(l)}
              className={`btn btn-sm ${useLang === l ? "btn-primary" : "btn-ghost"}`}
              style={
                useLang === l
                  ? {
                      backgroundColor: colors[l.toLowerCase()]?.color,
                      borderColor: colors[l.toLowerCase()]?.color,
                    }
                  : {}
              }
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="divider divider-start font-bold opacity-30 uppercase tracking-widest text-xs">
          Repositories ({useRepos.length})
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useRepos.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="card card-compact bg-base-200 hover:bg-base-300 transition-colors border border-base-content/5"
            >
              <div className="card-body p-6">
                <h3 className="card-title text-base font-bold">
                  {r.nameWithOwner}
                </h3>
                <p className="text-sm opacity-60 line-clamp-2">
                  {r.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
