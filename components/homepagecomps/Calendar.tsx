"use client";

import React, { useState } from "react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"; // Import Shadcn Calendar component

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // Track selected date

    return (
        <div className="w-full h-full bg-gray-100 dark:bg-zinc-900">
            <div className="flex h-full w-full items-center justify-center">
                <ShadcnCalendar
                    selected={selectedDate}
                    onSelect={(date: Date | undefined) => setSelectedDate(date)} // Type-safe onSelect
                    className="dark:text-white text-black border-none rounded-lg"
                />
            </div>
        </div>
    );
};

export default Calendar;
