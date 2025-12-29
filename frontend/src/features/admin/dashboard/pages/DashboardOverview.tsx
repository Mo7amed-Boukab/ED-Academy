import { useState, useEffect } from 'react';
import { Users, GraduationCap, Clock } from "lucide-react";
import { StatCard } from "../../../../components/StatCard";
import { Header } from "../../../../components/Header";
import { statsApi } from "../../services/stats.api";

export const AdminOverview = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        totalSessions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await statsApi.getGlobal();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Étudiants",
            value: loading ? "..." : stats.totalStudents.toString(),
            trendLabel: "Inscrits",
            icon: Users,
        },
        {
            title: "Total Enseignants",
            value: loading ? "..." : stats.totalTeachers.toString(),
            trendLabel: "Actifs",
            icon: Users,
        },
        {
            title: "Classes",
            value: loading ? "..." : stats.totalClasses.toString(),
            trendLabel: "Ouvertes",
            icon: GraduationCap,
        },
        {
            title: "Sessions",
            value: loading ? "..." : stats.totalSessions.toString(),
            trendLabel: "Total enregistré",
            icon: Clock,
        },
    ];

    const RECENT_ATTENDANCE = [
        { id: 1, class: 'Terminale S1', subject: 'Mathématiques', time: '08:00', status: 'Completed', present: 24, absent: 2, teacher: 'Jean Dupont' },
        { id: 2, class: '1ère S2', subject: 'Physique', time: '10:00', status: 'In Progress', present: 28, absent: 0, teacher: 'Sarah Martin' },
        { id: 3, class: 'Seconde 3', subject: 'Anglais', time: '09:00', status: 'Completed', present: 30, absent: 1, teacher: 'Michel Dubois' },
    ];


    return (
        <div className="animate-in fade-in duration-500">
            <Header
                title="Overview"
                description="Vue d'ensemble de l'administration"
            />

            <div className="px-4 sm:px-6 pb-6 space-y-6 mt-4 sm:mt-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {statCards.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Recent Attendance */}
                    <div className="bg-white border border-gray-200 rounded overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Présence Récente</h3>
                            <button className="text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium">Voir tout</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Classe</th>
                                        <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Matière</th>
                                        <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Heure</th>
                                        <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Présents</th>
                                        <th className="px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {RECENT_ATTENDANCE.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">{item.class}</span>
                                                    <span className="text-xs text-gray-500">{item.teacher}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600">{item.subject}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-500">{item.time}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {item.present}/{item.present + item.absent}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${item.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 'bg-blue-50 text-blue-700'
                                                    }`}>
                                                    {item.status === 'Completed' ? 'Terminé' : 'En cours'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
