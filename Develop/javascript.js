const $currentDay = $('#currentDay');
const $currentTime = $('#currentTime');

setInterval(function () {
    Time = moment();
    currentTime = moment().format("h:mm:ss a");

    currentDay = moment().format("dddd, MMMM Do");
    $currentDay.text(currentDay);
    $currentTime.text(currentTime);

}, 1000);

for (let index = 9; index < 18; index++) {

    $(`#hour${index}`).val(localStorage.getItem(`hour${index}`));
    // console.log(`#hour${index}`);
    var currentHour = moment().hour();
    var timeSlotHour = index;

    if (currentHour === timeSlotHour) {

        $(`#hour${index}`).addClass('present');

    } else if (currentHour > timeSlotHour) {
        $(`#hour${index}`).addClass('past');
    } else {
        $(`#hour${index}`).addClass('future');
    }

};

$('.saveBtn').on('click', function () {
    // console.log($(this).siblings("input").attr('id'));
    var userInput = $(this).siblings("input").val();
    var currentHour = $(this).siblings("input").attr('id');

    localStorage.setItem(currentHour, userInput);
});

$('.col-10').on('keydown', function (e) {

    if (e.key === "Enter") {
        console.log($(this));
        var userInput = $(this).val();
        var currentHour = $(this).attr('id');

        localStorage.setItem(currentHour, userInput);
    }

});
