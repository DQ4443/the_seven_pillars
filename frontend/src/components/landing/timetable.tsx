"use client";

import { useLanguage } from "@/lib/i18n/context";
import { timetableData, days, timeSlots, getClassByDayAndTime } from "@/data/timetable";
import { Clock, Users, DollarSign, Monitor, Calendar } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  Stagger,
  StaggerItem,
} from "./animations";

export function Timetable() {
  const { language, t } = useLanguage();

  return (
    <section id="timetable" className="section-botanical bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <SectionHeader className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-border" />
            <Calendar className="h-5 w-5 text-primary/60" strokeWidth={1.5} />
            <div className="h-px w-16 bg-border" />
          </div>
          <SectionTitle className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance">
            {t.timetable.title}
          </SectionTitle>
          <SectionSubtitle className="text-xl text-muted-foreground mb-2">
            {t.timetable.subtitle}
          </SectionSubtitle>
          <p className="text-lg font-medium text-foreground mt-2">
            {t.timetable.termDates}
          </p>
        </SectionHeader>

        {/* Info badges - Botanical pill style */}
        <Stagger fast className="flex flex-wrap justify-center gap-4 mb-12">
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border shadow-botanical">
              <Users className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground">{t.timetable.classSize}</span>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border shadow-botanical">
              <DollarSign className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground">{t.timetable.pricing}</span>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border shadow-botanical">
              <Monitor className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground">{t.timetable.note}</span>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Desktop Table View */}
        <FadeInUp className="hidden lg:block">
          <div className="card-botanical overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-foreground text-background">
                  <th className="px-6 py-4 text-left font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" strokeWidth={1.5} />
                      {language === "zh" ? "时间" : "Time"}
                    </div>
                  </th>
                  {days.map((day) => (
                    <th key={day} className="px-4 py-4 text-center font-medium">
                      <div>{t.timetable.days[day]}</div>
                      <div className="text-xs font-normal opacity-70">({day})</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, rowIndex) => (
                  <tr
                    key={time}
                    className={`border-t border-border ${rowIndex % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}
                  >
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                      {time}
                    </td>
                    {days.map((day) => {
                      const classSession = getClassByDayAndTime(day, time);
                      if (!classSession) {
                        return (
                          <td key={`${day}-${time}`} className="px-4 py-4 text-center text-muted-foreground">
                            —
                          </td>
                        );
                      }
                      return (
                        <td
                          key={`${day}-${time}`}
                          className={`px-4 py-4 text-center ${classSession.isTBD ? "text-muted-foreground" : "text-foreground"}`}
                        >
                          <span className="font-medium">
                            {language === "zh" ? classSession.subject.zh : classSession.subject.en}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        {/* Mobile Card View */}
        <Stagger className="lg:hidden space-y-6">
          {days.map((day, dayIndex) => {
            const dayClasses = timetableData.filter((c) => c.day === day);
            if (dayClasses.length === 0) return null;

            return (
              <StaggerItem key={day}>
                <div className={`card-botanical overflow-hidden ${dayIndex % 2 === 1 ? "md:translate-y-4" : ""}`}>
                  <div className="bg-foreground text-background px-6 py-4">
                    <h3 className="font-serif text-lg font-semibold">
                      {t.timetable.days[day]}
                      <span className="text-sm font-normal opacity-70 ml-2">({day})</span>
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {dayClasses.map((classSession) => (
                      <div
                        key={classSession.id}
                        className={`p-5 ${classSession.isTBD ? "bg-muted/30" : "bg-card"}`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <p className="font-medium text-foreground">
                              {language === "zh" ? classSession.subject.zh : classSession.subject.en}
                            </p>
                            {!classSession.isTBD && (
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {language === "zh" ? classSession.subject.en : classSession.subject.zh}
                              </p>
                            )}
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground shrink-0">
                            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                            {classSession.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
