import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Clock,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { statsService } from "../../services/statsService";
import { CustomSelect } from "../../../../components/CustomSelect";

// Types for absence data
interface AbsentStudent {
  id: number;
  name: string;
  justified: boolean;
}

interface DayAbsences {
  date: number;
  students: AbsentStudent[];
}

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSessions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayAbsences | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsService.getGlobal();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
    setSelectedDay(null);
  };
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
    setSelectedDay(null);
  };

  // Sample attendance data for pie chart
  const attendanceData = {
    present: 42,
    absent: 8,
    lateJustified: 4,
    total: 54,
  };

  // Calculate percentages for pie chart
  const presentPercent = (attendanceData.present / attendanceData.total) * 100;
  const absentPercent = (attendanceData.absent / attendanceData.total) * 100;
  const lateJustifiedPercent =
    (attendanceData.lateJustified / attendanceData.total) * 100;

  // Sample absence data for calendar
  const absenceData: Record<number, AbsentStudent[]> = {
    2: [
      { id: 1, name: "Ahmed Ben Ali", justified: true },
      { id: 2, name: "Sara Mansouri", justified: false },
    ],
    5: [{ id: 3, name: "Mohamed Karim", justified: false }],
    8: [
      { id: 4, name: "Fatima Zahra", justified: true },
      { id: 5, name: "Youssef Amrani", justified: true },
      { id: 6, name: "Leila Bennani", justified: false },
    ],
    12: [
      { id: 7, name: "Omar Hassan", justified: false },
      { id: 8, name: "Nadia Tazi", justified: false },
    ],
    15: [{ id: 9, name: "Karim Idrissi", justified: true }],
    19: [
      { id: 10, name: "Amina Berrada", justified: false },
      { id: 11, name: "Rachid Alaoui", justified: true },
    ],
    23: [{ id: 12, name: "Salma Chraibi", justified: false }],
    27: [
      { id: 13, name: "Hassan Filali", justified: true },
      { id: 14, name: "Zineb Kettani", justified: false },
      { id: 15, name: "Mehdi Benjelloun", justified: true },
    ],
  };

  // Get absence status for a day
  const getAbsenceStatus = (
    day: number
  ): "justified" | "unjustified" | "mixed" | null => {
    const absences = absenceData[day];
    if (!absences || absences.length === 0) return null;

    const hasJustified = absences.some((s) => s.justified);
    const hasUnjustified = absences.some((s) => !s.justified);

    if (hasJustified && hasUnjustified) return "mixed";
    if (hasJustified) return "justified";
    return "unjustified";
  };

  // Handle day click
  const handleDayClick = (day: number) => {
    const absences = absenceData[day];
    if (absences && absences.length > 0) {
      setSelectedDay({ date: day, students: absences });
    } else {
      setSelectedDay(null);
    }
  };

  // Class options for filter
  const classOptions = [
    { value: "all", label: "Toutes les classes" },
    { value: "1", label: "Classe 1ère Année" },
    { value: "2", label: "Classe 2ème Année" },
    { value: "3", label: "Classe 3ème Année" },
  ];

  // SVG arc calculation for pie chart
  const circumference = 2 * Math.PI * 40;
  const presentArc = (presentPercent / 100) * circumference;
  const absentArc = (absentPercent / 100) * circumference;
  const lateJustifiedArc = (lateJustifiedPercent / 100) * circumference;

  return (
    <div className="animate-fadeIn">
      <div className="p-7 max-md:p-4 max-md:pt-5">
        <div className="bg-white border border-gray-200 mb-6">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-gray-50">
            <h2 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wide">
              Statistiques générales
            </h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col items-center text-center py-3">
                <div className="w-10 h-10 flex items-center justify-center text-[#c41e3a]">
                  <Users size={20} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Étudiants
                </p>
                <p className="text-2xl text-gray-900 mt-1">
                  {loading ? "..." : stats.totalStudents.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center text-center py-3 border-l border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center text-[#c41e3a]">
                  <GraduationCap size={20} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Enseignants
                </p>
                <p className="text-2xl text-gray-900 mt-1">
                  {loading ? "..." : stats.totalTeachers.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center text-center py-3 border-l border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center text-[#c41e3a]">
                  <BookOpen size={20} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Classes
                </p>
                <p className="text-2xl text-gray-900 mt-1">
                  {loading ? "..." : stats.totalClasses.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-center text-center py-3 border-l border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center text-[#c41e3a]">
                  <Clock size={20} />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                  Total Sessions
                </p>
                <p className="text-2xl text-gray-900 mt-1">
                  {loading ? "..." : stats.totalSessions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* ATTENDANCE SECTION */}
          <div className="bg-white border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wide">
                Présence du jour
              </h2>
            </div>

            <div className="p-4">
              {/* Filters Row */}
              <div className="flex flex-wrap items-end gap-4 mb-6">
                <div className="flex-1 min-w-[160px]">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Classe
                  </label>
                  <CustomSelect
                    value={selectedClass}
                    onChange={setSelectedClass}
                    options={classOptions}
                    placeholder="Sélectionner"
                  />
                </div>
                <div className="flex-1 min-w-[160px]">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm bg-white text-gray-800 focus:outline-none focus:border-[#c41e3a]"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Chart & Legend */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Donut Chart */}
                <div className="relative w-[180px] h-[180px]">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full -rotate-90"
                  >
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F3F4F6"
                      strokeWidth="10"
                    />
                    {/* Present (green) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="10"
                      strokeDasharray={`${presentArc} ${circumference}`}
                      strokeDashoffset="0"
                    />
                    {/* Absent (red) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="10"
                      strokeDasharray={`${absentArc} ${circumference}`}
                      strokeDashoffset={`${-presentArc}`}
                    />
                    {/* Late/Justified (orange) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="10"
                      strokeDasharray={`${lateJustifiedArc} ${circumference}`}
                      strokeDashoffset={`${-(presentArc + absentArc)}`}
                    />
                  </svg>
                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {attendanceData.total}
                    </span>
                    <span className="text-xs text-gray-500">Étudiants</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#22C55E]"></span>
                    <span className="text-sm text-gray-600">Présent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#EF4444]"></span>
                    <span className="text-sm text-gray-600">Absent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#F59E0B]"></span>
                    <span className="text-sm text-gray-600">
                      Retard / Justifié
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Check size={14} className="text-green-500" />
                    <span className="text-xs text-gray-500 uppercase">
                      Présent
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {attendanceData.present}
                  </span>
                </div>
                <div className="text-center border-l border-r border-gray-100">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <X size={14} className="text-red-500" />
                    <span className="text-xs text-gray-500 uppercase">
                      Absent
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {attendanceData.absent}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock size={14} className="text-orange-500" />
                    <span className="text-xs text-gray-500 uppercase">
                      Retard
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-800">
                    {attendanceData.lateJustified}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CALENDAR SECTION - Absences Only */}
          <div className="bg-white border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-gray-50">
              <h2 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wide">
                Calendrier des absences
              </h2>
            </div>

            <div className="p-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={prevMonth}
                  className="p-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-400" />
                </button>
                <h3 className="text-base font-semibold text-gray-800 min-w-[160px] text-center capitalize">
                  {monthName}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-1 hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-xs font-medium text-gray-400 py-2"
                    >
                      {day}
                    </div>
                  )
                )}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="py-2"></div>
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const absenceStatus = getAbsenceStatus(day);
                  const isToday =
                    day === new Date().getDate() &&
                    currentMonth.getMonth() === new Date().getMonth() &&
                    currentMonth.getFullYear() === new Date().getFullYear();
                  const isSelected = selectedDay?.date === day;
                  const hasAbsences = absenceStatus !== null;

                  return (
                    <div
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`
                                                py-2 text-sm cursor-pointer transition-colors relative
                                                ${
                                                  isSelected
                                                    ? "ring-2 ring-[#c41e3a] ring-offset-1"
                                                    : ""
                                                }
                                                ${
                                                  isToday && !hasAbsences
                                                    ? "bg-gray-200 font-medium"
                                                    : ""
                                                }
                                                ${
                                                  absenceStatus === "justified"
                                                    ? "bg-green-100 text-green-700"
                                                    : ""
                                                }
                                                ${
                                                  absenceStatus ===
                                                  "unjustified"
                                                    ? "bg-red-100 text-[#c41e3a]"
                                                    : ""
                                                }
                                                ${
                                                  absenceStatus === "mixed"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : ""
                                                }
                                                ${
                                                  !hasAbsences && !isToday
                                                    ? "hover:bg-gray-50 text-gray-700"
                                                    : ""
                                                }
                                            `}
                    >
                      {day}
                      {hasAbsences && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"></span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-green-100 border border-green-300"></span>
                  <span className="text-gray-600">Absence justifiée</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-red-100 border border-red-300"></span>
                  <span className="text-gray-600">Absence non justifiée</span>
                </div>
              </div>

              {/* Selected Day Details */}
              {selectedDay && (
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-800">
                      Absences du {selectedDay.date} {monthName.split(" ")[0]}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({selectedDay.students.length} étudiant
                      {selectedDay.students.length > 1 ? "s" : ""})
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
                    {selectedDay.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between py-1.5 px-2 bg-gray-50"
                      >
                        <span className="text-sm text-gray-700">
                          {student.name}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 ${
                            student.justified
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-[#c41e3a]"
                          }`}
                        >
                          {student.justified ? "Justifié" : "Non justifié"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No selection message */}
              {!selectedDay && (
                <div className="border-t border-gray-100 pt-4 text-center">
                  <p className="text-sm text-gray-400">
                    Cliquez sur un jour coloré pour voir les absences
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SUMMARY STATS SECTION */}
      </div>
    </div>
  );
};
