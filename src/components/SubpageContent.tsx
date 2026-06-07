import type { PageSection } from '@/lib/siteData';

interface SubpageContentProps {
  sections: PageSection[];
}

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function SubpageContent({ sections }: SubpageContentProps) {
  return (
    <div className="subpage-content">
      {sections.map((section) => {
        const id = section.id ?? slugify(section.heading);

        return (
          <article key={section.heading} id={id} className="subpage-content__section">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        );
      })}
    </div>
  );
}
