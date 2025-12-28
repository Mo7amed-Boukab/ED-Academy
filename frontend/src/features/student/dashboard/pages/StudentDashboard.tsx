import { Header } from "../../../../components/Header";
import { StatCard } from "../../../../components/StatCard";
import { CheckCircle, Calendar } from "lucide-react";

export const StudentOverview = () => {
  const stats = [
    {
      title: "Taux de Présence",
      value: "95%",
      trendLabel: "Ce mois",
      icon: CheckCircle,
    },
    {
      title: "Prochain Cours",
      value: "Maths",
      trendLabel: "Demain 9h00",
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      <Header title="My Dashboard" description="Suivez votre progression" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};
