/** React imports */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** API import */
import api from "../../api/api"

/** Component imports */
import Carousel from "../Carousel/Carousel";
import TabContainer from "../Container/TabContainer";
import { Table, TableRow, TableData } from "../Table/Table";
import Modal from "../Modal/Modal";
import { ModalButton } from "../Modal/Modal";

/**
 * Displays the entire calendar of recipes week-by-week. Values for
 * each day can be modified by clicking on the name of the current 
 * recipe or the plus icon if no recipe has been chosen.
 */
export default function Calendar () {
    // State variables
    const [calendar, setCalendar] = useState(null); // Full calendar
    const [recipes, setRecipes] = useState([]); // All recipes
    const [today, setToday] = useState(null); // Today's date
    const [currentWeek, setCurrentWeek] = useState(0); // Today's week index in calendar
    const [selectedWeek, setSelectedWeek] = useState(0); // Displayed week index in calendar
    const dateHeader = useMemo(setDateHeader, [calendar, selectedWeek]); // Date range header

    // Make API calls and initialize the calendar
    useEffect(() => { 
        // Calendar
        api.getCalendar().then(formatCalendar);

        // Recipes
        api.getRecipes().then(response => {
            setRecipes(response);
        });

        // Today's date
        const now = new Date(new Date().setHours(0, 0, 0, 0));
        setToday(now);
    }, []);

    // Whenever the calendar updates, set the initial week and check whether to add more days to
    // the calendar
    useEffect(() => {
        if (calendar) {
            checkAddDays();
            setCurrentWeek(calendar.length - 2);
        }
    }, [calendar]);

    // Once the current week is set, initialize the selected week to match
    useEffect(() => {
        if (currentWeek !== 0) {
            setSelectedWeek(currentWeek);
        }
    }, [currentWeek]);

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

    // Add more days to the calendar if it isn't up to date
    function checkAddDays () {
        // Get the last day in the calendar and set a target one week from today
        const lastDay = new Date(calendar.slice(-1)[0].slice(-1)[0].date.replace(/-/g, "\/").replace(/T.+/, ""));
        const target = new Date(new Date().setDate(today.getDate() + 7));

        // If the target isn't in the calendar or is the last day, add more days
        if (target.getTime() >= lastDay.getTime()) {
            const days = []; // Keep an array of the days to add

            // Loop until the target is included
            while (lastDay <= target) {
                // Add a week at a time
                for (let d = 0; d < 7; d++) {
                    lastDay.setDate(lastDay.getDate() + 1); // Increment by a day
                    days.push(lastDay.toISOString().split("T")[0]); // Put the string in the array
                }
            }

            // Add the days using the API, then update the calendar
            if (days.length > 0) {
                api.addCalendarDays(days).then(formatCalendar);
            }
        }
    }

    // Create a new header for the date range of the week
    function setDateHeader () {
        if (calendar) {
            // Get the bounding date strings
            const from = calendar[selectedWeek][0].date;
            const to = calendar[selectedWeek].slice(-1)[0].date;

            // Format in MM/DD - MM/DD
            return `${parseInt(from.slice(5,7))}/${parseInt(from.slice(8,10))} \u{02013} ${parseInt(to.slice(5,7))}/${parseInt(to.slice(8,10))}`;
        }
    }

    return (
        <div className="m-2 mt-4">
            <TabContainer className="bg-neutral-300 after:bg-neutral-300" title={ dateHeader }>
                <Carousel currentSlide={ selectedWeek } setCurrentSlide={ setSelectedWeek } home={ currentWeek }>
                    {calendar && calendar.map((week, i) => (
                        <Table key={ i }>
                            {week.map((day, j) => (
                                <CalendarRow day={ day } today={ today } recipes={ recipes } formatCalendar={ formatCalendar } key={ j } />
                            ))}
                        </Table>
                    ))}
                </Carousel>
            </TabContainer>
        </div>
    );
}

/**
 * Row in the calendar table. Each row is a day.
 * @param {Object} day Day this row represents
 * @param {Date} today Today's date to compare against
 * @param {Array} recipes Array of all recipes
 * @param {Function} formatCalendar Function to setting an updated calendar
 */
function CalendarRow ({ day, today, recipes, formatCalendar }) {
    // This day's date
    const date = new Date (new Date(day.date.replace(/-/g, "\/").replace(/T.+/, "")).setHours(0,0,0,0));

    return (
        <TableRow className={(date.getTime() === today.getTime() && "bg-blue-300/50 shadow-neutral-300 shadow-[0.5em_0.5em_1em_0_inset,_-0.5em_-0.5em_1em_0_inset]")}>
            <TableData>
                {date.toLocaleDateString("en-US",{weekday: "short"})}
            </TableData>
            <TableData>
                <CalendarModal day={ day } dateString={ date.toDateString() } recipes={ recipes } formatCalendar={ formatCalendar } />
            </TableData>
        </TableRow>
    );
}

/**
 * Modal button pair which select and save new values for the recipe for the given day.
 * @param {Object} day Day object containing the date and current recipe
 * @param {String} dateString This day's date represented as a string
 * @param {Array} recipes All recipes that can be chosen
 * @param {Function} formatCalendar Function which takes in an API calendar and sets the calendar state
 */
function CalendarModal ({ day, dateString, recipes, formatCalendar }) {
    // State variables
    const modalRef = useRef(null); // Edit modal element
    const [selected, setSelected] = useState({"name": day.recipeName, "id": day.recipeId}); // Selected value in the modal

    // Update the selected state when an input is made
    function handleChange (event) {
        const newSelected = JSON.parse(event.target.value);
        setSelected(newSelected);
    }

    // Update the calendar to reflect the new recipe selection
    function save () {
        api.updateCalendar([{ "date": day.date, "recipeId": selected.id }]).then(formatCalendar);
    }

    return (
        <>
            <ModalButton modalRef={ modalRef }>
                {day.recipeName ?
                    <span className="underline click-toggle">{day.recipeName}</span>
                    :
                    <i className="material-symbols-outlined p-[0.025em] bg-green-600 text-white rounded-full text-[1.25em] click-toggle">add</i>
                }
            </ModalButton>

            <Modal title={ dateString } ref={ modalRef }>
                {day.recipeId && <>
                    <Link to={"/recipes/" + day.recipeId} role="button" className="px-3 py-4 flex items-center justify-center w-full rounded-full shadow-md bg-neutral-600 uppercase text-sm font-bold leading-4">
                        {day.recipeName}
                        <i className="material-symbols-outlined ms-1 icon-thick" style={{fontSize: "1.3em"}}>arrow_outward</i>
                    </Link>

                    <h2 className="mt-1 text-md font-medium text-center text-neutral-200">See the current recipe</h2>

                    <div className="flex items-center my-3 text-neutral-200">
                        <hr className="border-b-px border-current w-full" />
                        <span className="mx-3">or</span>
                        <hr className="border-b-px border-current w-full" />
                    </div>
                </>}

                <h2 className="mb-1 text-md font-medium text-center text-neutral-200">Select a new recipe</h2>

                <select className="px-3 py-4 mb-3 overflow-hidden w-full rounded-full shadow-md bg-neutral-600 uppercase text-sm font-bold leading-4 text-ellipsis whitespace-pre" name="Set recipe" value={JSON.stringify(selected)} onChange={handleChange}>
                    <option value={JSON.stringify({"name": null, "id": null})}></option>

                    {recipes && recipes.map((recipe, i) => (
                        <option value={JSON.stringify({"name": recipe.name, "id": recipe.id})} key={ i }>
                            {"[" + recipe.id + "] " + recipe.name}
                        </option>
                    ))}
                </select>

                <div className="flex items-center justify-end mt-3">
                    <button className="px-3 py-1 bg-neutral-600 shadow-md rounded-3xl select-none text-sm uppercase font-semibold click-toggle">
                        CANCEL
                    </button>
                    <button className="ms-3 px-3 py-1 bg-blue-600 shadow-md rounded-3xl select-none text-sm uppercase font-semibold click-toggle" onClick={ save }>
                        SAVE
                    </button>
                </div>
            </Modal>
        </>
    );
}