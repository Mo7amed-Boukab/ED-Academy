import { Users, GraduationCap, Clock } from "lucide-react";
import { StatCard } from "../../../../components/StatCard";
import { Header } from "../../../../components/Header";

export const AdminOverview = () => {
  const stats = [
    {
      title: "Tout Students",
      value: "50",
      trendLabel: "Dans l'école",
      icon: Users,
    },
    {
      title: "Tout Teachers",
      value: "10",
      trendLabel: "Actifs",
      icon: Users,
    },
    {
      title: "Classes",
      value: "5",
      trendLabel: "En cours",
      icon: GraduationCap,
    },
    {
      title: "Sessions Aujourd'hui",
      value: "12",
      trendLabel: "Planifiées",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8">
      <Header
        title="Overview"
        description="Vue d'ensemble de l'administration"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};
