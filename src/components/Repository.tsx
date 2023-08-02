import type { IRepository } from 'lib/github/queries';

const COLORS_URL =
  'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
let COLORS;

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
    <div className="repository-card" key={name}>
      <a href={url} target="_blank" rel="noreferrer">
        <h3 className="name">
          {name}
          {isArchived ? <span className="pill archived">archived</span> : ''}
        </h3>
        <div className="desc">{description}</div>
      </a>

      <div className="info-list">
        {!!stargazerCount && (
          <span className="starcount">☆ {stargazerCount}</span>
        )}

        {!!language && (
          <span className="lang-wrp" key={language}>
            <span
              className="dot"
              style={{
                background: COLORS?.[language]?.color || '#333',
              }}
            ></span>
            <span className="lang">{language}</span>
          </span>
        )}

        {license && <span className="license">{license}</span>}

        {updatedAt && <span className="updatedAt"> Updated {updatedAt}</span>}
      </div>
    </div>
  );
}
