import colors from 'language-colors';
import { IRepository } from 'lib/github/queries';

export const Repository = ({
  name,
  url,
  description,
  licenseInfo,
  primaryLanguage,
  stargazerCount,
  updatedAt,
  isArchived,
}: IRepository) => {
  const language = primaryLanguage?.name;
  const license = licenseInfo?.nickname || licenseInfo?.name;
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
              style={{ background: colors[language.toLowerCase()] || '#333' }}
            ></span>
            <span className="lang">{language}</span>
          </span>
        )}

        {license && <span className="license">{license}</span>}

        {updatedAt && <span className="updatedAt"> Updated {updatedAt}</span>}
      </div>
    </div>
  );
};
