import { Header } from "../../../../components/Header";
import { StatCard } from "../../../../components/StatCard";
import { GraduationCap, Calendar, Users, BookOpen } from "lucide-react";

export const TeacherOverview = () => {
  const stats = [
    {
      title: "Mes Classes",
      value: "4",
      trendLabel: "Assignées",
      icon: GraduationCap,
    },
    {
      title: "Sessions",
      value: "2",
      trendLabel: "Aujourd'hui",
      icon: Calendar,
    },
    {
      title: "Mes Étudiants",
      value: "120",
      trendLabel: "Total",
      icon: Users,
    },
    {
      title: "Sujets",
      value: "3",
      trendLabel: "Enseignés",
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="Teacher Overview"
        description="Vue d'ensemble de vos activités d'enseignement"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};
