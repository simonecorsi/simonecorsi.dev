const Configs = {
  base_url: 'https://simonecorsi.dev',
  site_title:
    'Simone Corsi - Lead Software Engineer | Solution Architect | DevEx',
  site_description:
    "I'm a sunny Italian guy, nearly decade old battle-tested and language agnostic Fullstack engineer mainly focussed on Backend & DevOps.",
  site_keywords: [
    { keyword: 'Simone Corsi' },
    { keyword: 'Solution Architect' },
    { keyword: 'Software Engineer' },
    { keyword: 'Software Developer' },
    { keyword: 'DevOps' },
    { keyword: 'Backend developer' },
    { keyword: 'Fullstack developer' },
    { keyword: 'Software' },
    { keyword: 'Engineering' },
    { keyword: 'Developer' },
    { keyword: 'Fullstack' },
    { keyword: 'Backend' },
    { keyword: 'Frontend' },
    { keyword: 'Node.js' },
    { keyword: 'React.js' },
    { keyword: 'Javascript' },
    { keyword: 'Typescript' },
    { keyword: 'Golang' },
    { keyword: 'Consulenza' },
    { keyword: 'Consultant' },
    { keyword: 'Roma' },
    { keyword: 'Italia' },
  ],
  twitter_account: '@im_simonecorsi',
  github_account: 'simonecorsi',
  linkedin_account: '/in/simonecorsi',
  routes: [
    { path: '/', label: 'home', enabled: true },
    { path: '/blog/', label: 'blog', enabled: false },
    { path: '/about/', label: 'about', enabled: true },
    { path: '/projects/', label: 'projects', enabled: true },
    { path: '/bookmarks/', label: 'bookmarks', enabled: true },
    {
      path: 'https://www.linkedin.com/in/simonecorsi/',
      label: 'resume',
      blank: true,
      enabled: true,
    },
  ],
};

export default Configs;
