import { Hero } from '@/components/Hero';
import { SiteHeader } from '@/components/SiteHeader';

const pillars = [
  { title: 'Korean Medicine', desc: 'Shanghan Lun, 방제, 본초, 경락의 구조화' },
  { title: 'Neuro + ANS', desc: '자율신경계 및 통증·조절 메커니즘 매핑' },
  { title: 'MPS / IMS / Fascia', desc: '근막선, 트리거포인트, 시술 판단의 임상 프레임' }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <Hero />
      <section className="pillars">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="pillar-card">
            <h2>{pillar.title}</h2>
            <p>{pillar.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
