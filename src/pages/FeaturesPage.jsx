import FeatureCard from "../components/FeatureCard";
import SectionTitle from "../components/SectionTitle";
import { features } from "../data/siteData";

export default function FeaturesPage() {
  return (
    <section className="py-14">
      <SectionTitle
        badge="Capabilities"
        subtitle="Designed as modular tools so learners can mix preparation, practice, and placement workflows."
        title="Feature-rich learning workspace"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard feature={feature} key={feature.title} />
        ))}
      </div>
    </section>
  );
}
