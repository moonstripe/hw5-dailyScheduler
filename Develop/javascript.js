// $('#hour9').val(localStorage.getItem('hour9'));
// $('#hour10').val(localStorage.getItem('hour10'));
// $('#hour11').val(localStorage.getItem('hour11'));
// $('#hour12').val(localStorage.getItem('hour12'));
// $('#hour13').val(localStorage.getItem('hour13'));
// $('#hour14').val(localStorage.getItem('hour14'));
// $('#hour15').val(localStorage.getItem('hour15'));
// $('#hour16').val(localStorage.getItem('hour16'));
// $('#hour17').val(localStorage.getItem('hour17'));

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
