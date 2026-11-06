'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  slug: string
  date: string
  endDate?: string
  time: string
  location: string
  type: string
  category: string
  description: string
  booth?: string | null
}

interface EventCalendarProps {
  events: Event[]
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'list'>('month')

  // Phones: start in list view; the month grid is too cramped to read there
  React.useEffect(() => {
    if (window.matchMedia('(max-width: 639px)').matches) setView('list')
  }, [])

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Get total days in month
  const daysInMonth = lastDayOfMonth.getDate()

  // Get previous month's last day
  const lastDayOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Check if a date has events
  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => {
      const eventDate = event.date
      const eventEndDate = event.endDate || event.date
      return dateStr >= eventDate && dateStr <= eventEndDate
    })
  }

  // Generate calendar days
  const calendarDays = []

  // Previous month's days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = lastDayOfPrevMonth - i
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: true,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day),
      events: []
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(currentDate.getFullYear(), currentDate.getMonth(), day)
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      events: dayEvents
    })
  }

  // Next month's days to fill the grid
  const remainingDays = 42 - calendarDays.length // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day),
      events: []
    })
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {monthNames[currentDate.getMonth()]} <span className="font-serif italic font-medium">{currentDate.getFullYear()}</span>
          </h3>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-600 hover:border-slate-400 transition-colors"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex bg-slate-200/50 rounded-lg p-1 border border-slate-200">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${view === 'month'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${view === 'list'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              List
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1.5">
            <button
              onClick={goToPreviousMonth}
              className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={goToNextMonth}
              className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {view === 'month' ? (
          <>
            {/* Day Names Header */}
            <div className="grid grid-cols-7 gap-px mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {calendarDays.map((calendarDay, index) => {
                const hasEvents = calendarDay.events.length > 0
                const isTodayDate = isToday(calendarDay.date)

                return (
                  <div
                    key={index}
                    className={`min-h-[90px] p-2 bg-white transition-all group/day relative ${!calendarDay.isCurrentMonth ? 'opacity-30' : ''
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[11px] font-bold ${isTodayDate
                        ? 'w-6 h-6 flex items-center justify-center bg-[#D4AF37] text-[#293995] rounded-full'
                        : 'text-slate-400 group-hover/day:text-slate-900 transition-colors'
                        }`}>
                        {calendarDay.day}
                      </span>
                    </div>

                    {hasEvents && (
                      <div className="space-y-1 relative z-10">
                        {calendarDay.events.slice(0, 3).map((event) => (
                          <Link
                            key={event.id}
                            href={`/events/${event.slug}`}
                            className="block"
                          >
                            <div className={`text-[9px] font-bold border-l-2 px-1.5 py-1 truncate transition-colors ${event.category === 'Legal Conference' ? 'bg-[#293995] text-white border-[#D4AF37] hover:bg-slate-800' :
                                event.category === 'CLE Seminar' ? 'bg-[#D4AF37]/10 text-slate-900 border-[#D4AF37] hover:bg-[#D4AF37]/20' :
                                  event.category === 'Fraud Investigation' ? 'bg-slate-100 text-slate-900 border-slate-400 hover:bg-slate-200' :
                                    'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}>
                              {event.title}
                            </div>
                          </Link>
                        ))}
                        {calendarDay.events.length > 3 && (
                          <div className="text-[8px] font-black uppercase tracking-widest text-[#D4AF37] mt-1 px-1">
                            +{calendarDay.events.length - 3} More
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end gap-5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#D4AF37]"></div>
                <span>Events Scheduled</span>
              </div>
            </div>
          </>
        ) : (
          /* List View */
          <div className="space-y-3 max-w-4xl mx-auto">
            {events
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <div
                  key={event.id}
                  className="group flex flex-col md:flex-row md:items-center gap-6 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all duration-300"
                >
                  <div className="w-20 text-center border-r border-slate-100 pr-6">
                    <span className="text-xl font-serif italic text-[#D4AF37]">{String(new Date(event.date + 'T00:00:00').getDate()).padStart(2, '0')}</span>
                    <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">{event.type}</span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-0.5">{event.title}</h4>
                    <p className="text-xs text-slate-500 font-light">{event.location}</p>
                  </div>

                  <Link href={`/events/${event.slug}`}>
                    <button className="px-5 py-2.5 bg-[#293995] text-white text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors">
                      View Event
                    </button>
                  </Link>
                </div>
              ))}

            {events.length === 0 && (
              <div className="text-center py-10 text-slate-400">
                <p className="text-base font-light italic">No events currently scheduled.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
