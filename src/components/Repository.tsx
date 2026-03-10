import type { IRepository } from "lib/github/queries";

const COLORS_URL =
  "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";
let COLORS: Record<string, { color: string; url: string }> | undefined;

export async function Repository({
  name,
  url,
  description,
  licenseInfo,
  primaryLanguage,
  stargazerCount,
  updatedAt,
  isArchived,
}: IRepository) {
  const language = primaryLanguage?.name;
  const license = licenseInfo?.nickname || licenseInfo?.name;

  if (!COLORS) {
    const res = await fetch(COLORS_URL);
    if (!res.ok) {
      throw new Error(`Cannot fetch colors from github at ${COLORS_URL}`);
    }
    COLORS = await res.json();
  }

  return (
    <div className="card bg-base-200 border border-base-content/5 hover:bg-base-300 transition-colors duration-300">
      <div className="card-body p-6 gap-4">
        <div className="flex justify-between items-start">
          <h3 className="card-title text-xl font-bold">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="link link-hover"
            >
              {name}
            </a>
          </h3>
          {isArchived && (
            <div className="badge badge-warning badge-outline">Archived</div>
          )}
        </div>

        <p className="text-sm opacity-60 line-clamp-2">{description}</p>

        <div className="card-actions justify-start items-center gap-4 text-xs font-semibold opacity-70">
          {!!stargazerCount && <span>★ {stargazerCount}</span>}
          {!!language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: COLORS?.[language]?.color }}
              />
              <span>{language}</span>
            </div>
          )}
          {license && <span className="uppercase">{license}</span>}
        </div>
      </div>
    </div>
  );
}
