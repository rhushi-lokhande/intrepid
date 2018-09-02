/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function () {

    /* start typed element */
    //http://stackoverflow.com/questions/24874797/select-div-title-text-and-make-array-with-jquery
    var subElementArray = $.map($('.sub-element'), function (el) { return $(el).text(); });
    $(".element").typed({
        strings: subElementArray,
        typeSpeed: 30,
        contentType: 'html',
        showCursor: false,
        loop: true,
        loopCount: true,
    });
    /* end typed element */

    /* Smooth scroll and Scroll spy (https://github.com/ChrisWojcik/single-page-nav)    
    ---------------------------------------------------------------------------------*/
    $('.templatemo-nav').singlePageNav({
        offset: $(".templatemo-nav").height(),
        filter: ':not(.external)',
        updateHash: false
    });

    /* start navigation top js */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 58) {
            $(".templatemo-nav").addClass("sticky");
        }
        else {
            $(".templatemo-nav").removeClass("sticky");
        }
    });

    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function () {
        $(".navbar-collapse").collapse('hide');
    });
    /* end navigation top js */

    $('body').bind('touchstart', function () { });

    /* wow
    -----------------*/
    new WOW().init();
    var $studentRegistraion = $('#studentRegistraion');


    jQuery.validator.addMethod("matches", function (value, element, params) {
        return !value || (value && value.match(params));
    }, "");




    $studentRegistraion.validate({
        rules: {
            name: 'required',
            DOB: 'required',
            LandlineNo: {
                required: false,
                matches: /^(\W|^)[(]{0,1}\d{3}[)]{0,1}[\s-]{0,1}\d{3}[\s-]{0,1}\d{4}(\W|$)/
            },
            MobileNo: {
                required: true,
                matches: /^(\+\d{1,3}[- ]?)?\d{10}$/
            },
            email: {
                required: true,
                email: true
            },
            parentsOccupation: {
                required: true
            },
            address: {
                required: true
            },
            standard: {
                required: true
            },
            board: {
                required: true
            },
            school: {
                required: true
            },
            score: {
                required: true
            },
            noOfDays: {
                required: true
            }
        }
    });

    $("#studentRegistraion").formToWizard({
        submitButton: 'btnRegister',
        nextBtnClass: 'nbtn next',
        prevBtnClass: 'nbtn',
        buttonTag: 'a',
        errorElement: "em",
        validateBeforeNext: function (form, step) {
            var stepIsValid = true;
            var validator = form.validate();

            $(":input", step).each(function (index) {
                var x = validator.element(this);
                stepIsValid = stepIsValid && (typeof x == 'undefined' || x);
            });
            return stepIsValid;
        },
    })
});

/* start preloader */
$(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets    
});
/* end preloader */

$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        pagination: true,
        navigation: false,
        navigationText: ["", ""],
        autoPlay: true
    });
})

function postQuery(data) {
    $.ajax({
        url: './api/query?' + $('#QueryForm').serialize(),
        type: 'POST',
        data: {
            name: $("#name").val(),
            email: $("#email").val(),
            message: $("#message").val()
        },
        success: function () {
            $('#QueryForm').trigger("reset");
            $("#thanks").modal('show');
            setTimeout(() => {
                $("#thanks").modal('hide');
            }, 9000);
        }
    })
    return false;
}
$(document).ready(function () {
    $('.gender').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-orange'
    });


    $('.noOfDays, .days, .type, .source').each(function () {
        var self = $(this),
            label = self.next(),
            label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-orange',
            radioClass: 'iradio_line-orange',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });

    $("#DOB").datepicker();
    $('#time').timepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '10',
        maxTime: '10:00pm',
        defaultTime: '11',
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    $('#subject').tagsinput();
});
function registerStudent(e) {
    $('.uldays').removeClass('error');
    var sdays = parseInt($('input[name=noOfDays]:checked').val());
    if (sdays !== $('input[name=days]:checked').length) {
        $('.uldays').addClass('error');
        return false
    }
    $('.bootstrap-tagsinput').removeClass('error');

    if (!$('#subject').val()) {
        $('.bootstrap-tagsinput').addClass('error');
        return;
    }
    $('.ulType').removeClass('error');
    if (!$('input[name=type]:checked').length) {
        $('.ulType').addClass('error');
        return false;
    }
    $('.ulSource').removeClass('error');
    if (!$('input[name=source]:checked').length) {
        $('.ulSource').addClass('error');
        return false;
    }


    const form = document.getElementById('studentRegistraion');

    // Get the form data with our (yet to be defined) function.
    const data = formToJSON(form);

    $.ajax({
        url: './api/student',
        type: 'POST',
        data:data,
        success: function () {
            $('#studentRegistraion').trigger("reset");
            $("#thanks").modal('show');
            setTimeout(() => {
                $("#thanks").modal('hide');
                window.location.reload();
            }, 9000);
        }
    })
    
    return false;
}
$(document).on("submit", "form", function (e) {
    e.preventDefault();
    return false;
});

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    // Make sure the element has the required properties and should be added.
    if (isValidElement(element) && isValidValue(element)) {

        /*
         * Some fields allow for more than one value, so we need to check if this
         * is one of those fields and, if so, store the values as an array.
         */
        if (isCheckbox(element)) {
            data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
            data[element.name] = getSelectValues(element);
        } else {
            data[element.name] = element.value;
        }
    }

    return data;
}, {});
const getSelectValues = options => [].reduce.call(options, (values, option) => {
    return option.selected ? values.concat(option.value) : values;
}, []);
const isMultiSelect = element => element.options && element.multiple;
const isValidValue = element => {
    return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};
const isValidElement = element => {
    return element.name && element.value;
};
const isCheckbox = element => element.type === 'checkbox';


function closeClick(){
    document.location.reload();
}