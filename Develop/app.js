const $currentDay = $('#currentDay');
const $currentTime = $('#currentTime');
const $schedule = $('#schedule');

const workday = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

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

$currentDay.text(moment().format("dddd, MMMM Do"));
setInterval(function () {

    $currentTime.text(moment().format("h:mm:ss a"));

}, parseInt(parseFloat(3.6e+6).toFixed(0)));
$currentTime.text(moment().format("h:mm:ss a"));
setInterval(function () {

    $currentTime.text(moment().format("h:mm:ss a"));

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

            console.log(workday[index])
            $timeTD.text(workday[index]);

            $eventForm.attr('class', 'event-form').attr("id", workday[index]);

            $input.attr('type', 'text');

            // else: no placeholder
        } else {
            for (let order = 0; order < persist.length; order++) {
                // if: found a timeSlot object in local storage, then change the placeholder text
                if (persist[order].time === workday[index]) {
                    hrly = new timeSlot(workday[index], persist[order].event);
                    $timeTD.text(hrly.time);

                    $eventForm.attr('class', 'event-form').attr("id", hrly.time);

                    $input.attr('type', 'text').attr('placeholder', hrly.event);

                } else {
                    
                    $timeTD.text(workday[index]);

                    $eventForm.attr('class', 'event-form').attr("id", workday[index]);

                    $input.attr('type', 'text');
                }

            }
        }
        var $button = $('<button>').attr('type', 'submit').text('save');

        $eventForm.append($input).append($button);

        var $eventTD = $('<td>');

        $eventTD.append($eventForm);

        var $newRow = $('<tr>');

        $newRow.append($timeTD, $eventTD);

        $schedule.append($newRow);
    }
};

genTable(persist);

$('.event-form').submit(function (e) {

    // prevent default
    e.preventDefault();

    var newTS = new timeSlot(e.currentTarget.id, e.currentTarget.childNodes[0].value);

    persist.push(newTS);

    console.log(persist);

    localStorage.setItem('savedTimeSlots', JSON.stringify(persist));

    genTable(persist);


});