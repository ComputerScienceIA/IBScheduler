
const calendarElement = document.querySelector('.calendar');


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const isYearLeap = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}


const daysInFebruary = (year) => {
    return isYearLeap(year) ? 29 : 28;
}


const createCalendar = (month, year) => {

    const daysContainer = calendarElement.querySelector('.calendar-days');
    const yearHeader = calendarElement.querySelector('#year');

    const daysInMonth = [31, daysInFebruary(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    daysContainer.innerHTML = '';


    let currentDate = new Date();

    month = month >= 0 && month < 12 ? month : currentDate.getMonth();
    year = year || currentDate.getFullYear();


    const selectedMonth = months[month];
    const monthSelector = calendarElement.querySelector('#month-picker');
    monthSelector.innerHTML = selectedMonth;
    yearHeader.innerHTML = year;


    const firstDayOfMonth = new Date(year, month, 1);


    for (let i = 0; i < daysInMonth[month] + firstDayOfMonth.getDay(); i++) {
        let dayElement = document.createElement('div');
        if (i >= firstDayOfMonth.getDay()) {

            dayElement.classList.add('calendar-day-item');
            dayElement.innerHTML = i - firstDayOfMonth.getDay() + 1;

            if (i - firstDayOfMonth.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                dayElement.classList.add('current-day');
            }
        }

        daysContainer.appendChild(dayElement);
    }
}


const monthList = calendarElement.querySelector('.month-list');

months.forEach((name, idx) => {
    let monthItem = document.createElement('div');
    monthItem.innerHTML = `<div data-month="${idx}">${name}</div>`;
    monthItem.querySelector('div').addEventListener('click', () => {

        monthList.classList.remove('show');
        currentMonth.value = idx;
        createCalendar(idx, currentYear.value);
    });
    monthList.appendChild(monthItem);
});

const monthPicker = calendarElement.querySelector('#month-picker');
monthPicker.addEventListener('click', () => {
    monthList.classList.add('show');
});


let currentMonth = { value: new Date().getMonth() };
let currentYear = { value: new Date().getFullYear() };


createCalendar(currentMonth.value, currentYear.value);


document.querySelector('#prev-year').addEventListener('click', () => {
    currentYear.value--;
    createCalendar(currentMonth.value, currentYear.value);
});

document.querySelector('#next-year').addEventListener('click', () => {
    currentYear.value++;
    createCalendar(currentMonth.value, currentYear.value);
});



