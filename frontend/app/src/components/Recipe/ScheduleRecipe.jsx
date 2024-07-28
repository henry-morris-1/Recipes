/** React imports */
import { useEffect, useRef, useState } from "react";

/** API import */
import api from "../../api/api";

/** Component imports */
import Carousel from "../Carousel/Carousel";

/**
 * Modal for scheduling a recipe.
 */
export default function ScheduleRecipe ({ recipeId }) {
    const [calendar, setCalendar] = useState(null); // Full calendar
    const [today, setToday] = useState(null); // Today's date
    const [currentWeek, setCurrentWeek] = useState(0); // Today's week index in calendar
    const [selectedWeek, setSelectedWeek] = useState(0); // Displayed week index in calendar
    const [selectedDay, setSelectedDay] = useState(null);

    // Get the calendar and today's date
    useEffect(() => {
        // Calendar
        api.getCalendar().then(formatCalendar);

        // Today's date
        const now = new Date(new Date().setHours(0, 0, 0, 0));
        setToday(now);
    }, []);

    // Set the current week in the carousel
    useEffect(() => {
        if (calendar && today) {
            let w = (today.getDay() < 6) ? calendar.length - 2 : calendar.length - 3;
            setCurrentWeek(w);
            setSelectedWeek(w);
        }
    }, [calendar, today]);

    // State variable for whether to verify submission
    const [verify, setVerify] = useState(false);
    const verifyRef = useRef(null);

    // Format the calendar into a 2D array broken into weeks
    function formatCalendar (response) {
        const input = [...response]; // Copy the response array
        const newCalendar = []; // Create a new array for the new calendar

        // Break the input into week-long chunks to be stored in their own arrays
        while (input.length >= 7) {
            newCalendar.push(input.splice(0, 7));
        }

        setCalendar(newCalendar);
    }

    // If the selected day is empty, submit without verifing. However, if the selected day
    // is already occupied, check with the user before submitting
    function handleClick () {
        if (selectedDay && calendar[selectedDay.weekIndex][selectedDay.dayIndex].recipeId) {
            setVerify(true);
        } else {
            submit();
        }
    }

    // Submit the change to the calendar
    function submit () {
        api.updateCalendar([{ "date": selectedDay.date, "recipeId": recipeId }]);
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full sm:max-w-2xl flex flex-col items-center">
                <div className="w-full mb-10">
                    <Carousel currentSlide={ selectedWeek } setCurrentSlide={ setSelectedWeek } home={ currentWeek }>
                        {calendar && calendar.map((week, i) => (
                            <div className="grid grid-cols-7 mt-4" key={ i }>
                                {week.map((day, j) => (
                                    <DaySelector date={ day.date } weekIndex={ i } dayIndex={ j } today={ today } selected={ selectedDay } setSelected={ setSelectedDay } key={ j } />
                                ))}
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="w-full flex items-center justify-end">
                {!verify ?
                        <>
                            <div className="flex">
                                <button className="px-3 py-1 mx-3 bg-neutral-600 shadow-md rounded-3xl select-none text-sm font-semibold click-toggle">
                                    Cancel
                                </button>
                                <button className={"px-3 py-1 bg-blue-600 shadow-md rounded-3xl select-none text-sm font-semibold" + ((selectedDay && calendar[selectedDay.weekIndex][selectedDay.dayIndex].recipeId) ? "" : " click-toggle" )} onClick={handleClick}>
                                    Submit
                                </button>
                            </div>
                        </>
                        :
                        <div className="w-full" ref={verifyRef}>
                            <h3 className="text-2xl font-semibold leading-6 mb-1">Are you sure you want to overwrite '{calendar[selectedDay.weekIndex][selectedDay.dayIndex].recipeName}'?</h3>
                            <hr className="w-full border-t border-current mb-3" />
                            
                            <div className="flex justify-end w-full">
                                <button className="px-3 py-1 me-3 bg-neutral-600 shadow-md rounded-3xl select-none text-sm font-semibold" onClick={() => { setVerify(false) }}>
                                    No
                                </button>
                                <button className="px-3 py-1 bg-red-600 shadow-md rounded-3xl select-none text-sm font-semibold click-toggle" onClick={submit}>
                                    Yes, overwrite it
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

function DaySelector ({ date, weekIndex, dayIndex, today, selected, setSelected }) {
    // Keep day name references
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Format the date object into strings and booleans for rendering
    const [day, setDay] = useState({day: "-", date: "-"});
    useEffect(() => {
        let d = new Date(new Date(date).setHours(0, 0, 0, 0));
        d.setDate(d.getDate() + 1);

        let newDay = {
            fullDate: d,
            day: days[d.getDay()],
            date: `${d.getDate()}`,
            isToday: d.getTime() === today.getTime(),
            isSelected: selected && d.getTime() === selected.date.getTime()
        }

        setDay(newDay);
    }, [selected]);

    // Set the selected day when clicked
    function handleClick () {
        let newSelection = {
            date: day.fullDate,
            weekIndex: weekIndex,
            dayIndex: dayIndex
        }

        setSelected(newSelection);
    }

    return (
        <div className={"flex flex-col items-center p-1 rounded-xl" + (day.isSelected ? (day.isToday ? " text-white bg-blue-600" : " text-white bg-neutral-600") : (day.isToday ? " text-blue-400" : " text-neutral-400"))} role="button" onClick={handleClick}>
            <span className="text-sm">{day.day}</span>
            <span className="text-base">{day.date}</span>
        </div>
    );
}