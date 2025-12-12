"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timetableData, days, timeSlots, getClassByDayAndTime, DayOfWeek } from "@/data/timetable";
import { Clock, Users, DollarSign, Monitor } from "lucide-react";
import {
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FadeInUp,
  Stagger,
  StaggerItem,
  ScaleIn,
} from "./animations";

export function Timetable() {
  const { language, t } = useLanguage();

  return (
    <section id="timetable" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader className="text-center mb-8">
          <SectionTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t.timetable.title}
          </SectionTitle>
          <SectionSubtitle className="text-xl text-muted-foreground mb-2">
            {t.timetable.subtitle}
          </SectionSubtitle>
          <SectionSubtitle className="text-lg font-medium text-foreground">
            {t.timetable.termDates}
          </SectionSubtitle>
        </SectionHeader>

        {/* Info badges */}
        <Stagger fast className="flex flex-wrap justify-center gap-3 mb-8">
          <StaggerItem>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              <Users className="h-4 w-4 mr-1.5" />
              {t.timetable.classSize}
            </Badge>
          </StaggerItem>
          <StaggerItem>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              <DollarSign className="h-4 w-4 mr-1.5" />
              {t.timetable.pricing}
            </Badge>
          </StaggerItem>
          <StaggerItem>
            <Badge variant="secondary" className="px-3 py-1.5 text-sm">
              <Monitor className="h-4 w-4 mr-1.5" />
              {t.timetable.note}
            </Badge>
          </StaggerItem>
        </Stagger>

        {/* Desktop Table View */}
        <FadeInUp className="hidden lg:block overflow-x-auto">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary">
                    <TableHead className="text-primary-foreground font-semibold w-32">
                      <Clock className="h-4 w-4 inline mr-2" />
                      {language === "zh" ? "时间" : "Time"}
                    </TableHead>
                    {days.map((day) => (
                      <TableHead
                        key={day}
                        className="text-primary-foreground font-semibold text-center"
                      >
                        {t.timetable.days[day]}
                        <br />
                        <span className="font-normal text-xs opacity-80">({day})</span>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeSlots.map((time) => (
                    <TableRow key={time}>
                      <TableCell className="font-medium bg-muted/50 whitespace-nowrap">
                        {time}
                      </TableCell>
                      {days.map((day) => {
                        const classSession = getClassByDayAndTime(day, time);
                        if (!classSession) {
                          return (
                            <TableCell key={`${day}-${time}`} className="text-center text-muted-foreground">
                              —
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={`${day}-${time}`}
                            className={`text-center ${
                              classSession.isTBD ? "text-muted-foreground" : ""
                            }`}
                          >
                            <div className="font-medium">
                              {language === "zh"
                                ? classSession.subject.zh
                                : classSession.subject.en}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </FadeInUp>

        {/* Mobile Card View */}
        <Stagger className="lg:hidden space-y-6">
          {days.map((day) => {
            const dayClasses = timetableData.filter((c) => c.day === day);
            if (dayClasses.length === 0) return null;

            return (
              <StaggerItem key={day}>
                <Card>
                  <CardHeader className="bg-primary text-primary-foreground py-3">
                    <CardTitle className="text-lg">
                      {t.timetable.days[day]}
                      <span className="text-sm font-normal opacity-80 ml-2">({day})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {dayClasses.map((classSession) => (
                        <div
                          key={classSession.id}
                          className={`p-4 ${classSession.isTBD ? "bg-muted/30" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-foreground">
                                {language === "zh"
                                  ? classSession.subject.zh
                                  : classSession.subject.en}
                              </p>
                              {!classSession.isTBD && (
                                <p className="text-sm text-muted-foreground">
                                  {language === "zh"
                                    ? classSession.subject.en
                                    : classSession.subject.zh}
                                </p>
                              )}
                            </div>
                            <Badge variant="outline" className="shrink-0">
                              <Clock className="h-3 w-3 mr-1" />
                              {classSession.time}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
