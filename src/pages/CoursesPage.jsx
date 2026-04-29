import { BadgeCheck, Clock3 } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { courses } from "../data/siteData";

export default function CoursesPage() {
  return (
    <section className="py-14">
      <SectionTitle
        badge="Programs"
        subtitle="Outcome-focused courses that combine concept depth, guided projects, and interview drills."
        title="Career programs built for hiring"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              key={course.title}
            >
              <div className="mb-4 inline-flex rounded-xl bg-violet-100 p-3 text-violet-700">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{course.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  <Clock3 size={12} /> {course.duration}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                  <BadgeCheck size={12} /> {course.level}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
