import { getPersonalBioReadme } from "lib/github/graphql";
import { getMetadata } from "lib/metadata";
import { marked } from "marked";

export const metadata = getMetadata("/about");

async function getData() {
  const body = await getPersonalBioReadme();
  return { data: marked(body) };
}

export default async function AboutPage() {
  const { data } = await getData();
  return (
    <div className="min-h-screen py-20 px-8 flex justify-center">
      <div
        className="max-w-3xl w-full prose prose-lg lg:prose-xl prose-slate dark:prose-invert"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed to render bio markdown
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
}
