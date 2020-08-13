const $currentDay = $('#currentDay');
const $currentTime = $('#currentTime');
const $schedule = $('#schedule');

const workday = [moment().hours(9).minutes(0).seconds(0), 
    moment().hours(10).minutes(0).seconds(0), 
    moment().hours(11).minutes(0).seconds(0), 
    moment().hours(12).minutes(0).seconds(0), 
    moment().hours(13).minutes(0).seconds(0), 
    moment().hours(14).minutes(0).seconds(0), 
    moment().hours(15).minutes(0).seconds(0), 
    moment().hours(16).minutes(0).seconds(0), 
    moment().hours(17).minutes(0).seconds(0)];

let persist = [];
// saved timeSlots
if (JSON.parse(localStorage.getItem('savedTimeSlots'))) {
    persist = JSON.parse(localStorage.getItem('savedTimeSlots'));
} else {
    persist = [];
}
// empty schedule on load


// timeSlot Object

class timeSlot {
    constructor(time, event) {
        this.time = time;
        this.event = event;
    }
};



// Timer for the top
var Time = moment().format("dddd, MMMM Do");

setInterval(function () {
    Time = moment();
    currentTime = moment().format("h:mm:ss a");

    currentDay = moment().format("dddd, MMMM Do");
    $currentDay.text(currentDay);
    $currentTime.text(currentTime);

}, 1000);

// Early Table Generator (displays schedule based on timeSlot object data)
function genTable(persist) {
    $schedule.empty();
    for (let index = 0; index < workday.length; index++) {
        var hrly = {};
        var $timeTD = $('<td>');
        var $eventForm = $('<form>');
        var $input = $('<input>');
        if (persist.length === 0) {

            console.log(workday[index].format('hA'));
            $timeTD.text(workday[index].format('hA'));

            $eventForm.attr('class', 'event-form').attr("id", workday[index].format('hA'));

            $input.attr('type', 'text');

            // else: no placeholder
        } else {
            for (let order = 0; order < persist.length; order++) {
                // if: found a timeSlot object in local storage, then change the placeholder text
                if (persist[order].time === workday[index].format('hA')) {
                    hrly = new timeSlot(workday[index].format('hA'), persist[order].event);
                    $timeTD.text(hrly.time).attr('class', 'hour');

                    $eventForm.attr('class', 'event-form').attr("id", hrly.time);

                    $input.attr('type', 'text').attr('placeholder', hrly.event);

                } else {

                    $timeTD.text(workday[index].format('hA')).attr('class', 'hour');

                    $eventForm.attr('class', 'event-form').attr("id", workday[index].format('hA'));

                    $input.attr('type', 'text');
                }

            }
        }
        var $button = $('<button>').attr('type', 'submit').text('save').attr('class', 'saveBtn');

        $eventForm.append($input).append($button);

        var $eventTD = $('<td>');
        $eventTD.append($eventForm);
        var $newRow = $('<tr>');
        console.log(workday[index].isAfter(moment()));
        //  past present future
        if (workday[index] === moment().minutes(0).seconds(0)) {
            $newRow.attr('class', 'row present');
        } else if (workday[index].isAfter(moment())) {
            $newRow.attr('class', 'row future');
        } else {
            $newRow.attr('class', 'row past');
        } 

        $newRow.append($timeTD, $eventTD);

        $schedule.append($newRow);
    }
};

genTable(persist);

$('.event-form').on('submit', function (e) {


    var newTS = new timeSlot(e.currentTarget.id, e.currentTarget.childNodes[0].value);
    console.log(newTS);
    persist.push(newTS);

    console.log(persist);

    localStorage.setItem('savedTimeSlots', JSON.stringify(persist));

    genTable(persist);
    // prevent default
    e.preventDefault();


});