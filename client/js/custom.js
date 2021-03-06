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
    $('.flip-container').hover(function(){
    },function(){
       $('.media-body').show()
       $('.read-more').hide();
       $(this).removeClass('hover');
    });
    $('.btnflip').click(function(){
        $(this).closest('.flip-container').addClass('hover');
    })

    $('.btn-read-more').click(function(){
       var back= $(this).closest(".back");
       $(back).find('.media-body').hide()
       $(back).find('.read-more').show()
    })

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
            message: $("#message").val(),
            mobNo: $("#mobNo").val()
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
        minTime: '6',
        maxTime: '10:00pm',
        defaultTime: '11',
        startTime: '06:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    $('#subject').tagsinput();
    $('.thank-register').click(function(){
        window.location.reload();
    })
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
        data: data,
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


function closeClick() {
    document.location.reload();
}

















$(function () {
    /*
     * For the sake keeping the code clean and the examples simple this file
     * contains only the plugin configuration & callbacks.
     * 
     * UI functions ui_* can be located in: demo-ui.js
     */
    $('#IdentityUpload,#ResumeUpload').dmUploader({ //
        url: './file',
        maxFileSize: 3000000, // 3 Megs 
        onDragEnter: function () {
            // Happens when dragging something over the DnD area
            this.addClass('active');
        },
        onDragLeave: function () {
            // Happens when dragging something OUT of the DnD area
            this.removeClass('active');
        },
        onBeforeUpload: function (id) {
        },
        onUploadSuccess: function (id, data) {
            // A file was successfully uploaded
            $(this).parent().find('.dm-uploader').slideUp();
            var $fileList = $(this).parent().find('.fileList').show().attr('data-filePath', data.uploadPath);
            $fileList.html('<label>' + data.filename + ' <i class="fa fa-trash removeFile"></i></label>');
        },

    });
});

$(document).on('click', '.removeFile', function () {
    $(this).closest('.fileList').removeAttr('data-filePath').slideUp();
    $(this).closest('.upload-container').find('.dm-uploader').slideDown();
})
$(function () {
    $("#btnRegister").click(function () {
        if (validate()) {
            const form = document.getElementById('application');

            // Get the form data with our (yet to be defined) function.
            const data = formToJSON(form);
            data.identityProof = $('.identityFileList').data('filepath');
            data.resume = $('.resumeFileList').data('filepath');
            $.ajax({
                url: './api/tutor',
                type: 'POST',
                data: data,
                success: function () {
                    $('#application').trigger("reset");
                    $("#thanks").modal('show');
                    setTimeout(() => {
                        $("#thanks").modal('hide');
                        window.location.reload();
                    }, 7000);
                }
            })
        }
    })
    function validate() {
        var isValid = true;
        if (!$("#name").val()) {
            $("#name").addClass('error');
            isValid = false;
        } else {
            $("#name").removeClass('error');

        }


        if (!$("#DOB").val()) {
            $("#DOB").addClass('error');
            isValid = false;
        } else {
            $("#DOB").removeClass('error');

        }


        if (!$("#MobileNo").val() || !$('#MobileNo').val().match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
            $("#MobileNo").addClass('error');
            isValid = false;
        } else {
            $("#MobileNo").removeClass('error');

        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(email).toLowerCase());
        if (!$("#email").val() || !re.test($("#email").val().toLowerCase())) {
            $("#email").addClass('error');
            isValid = false;
        } else {
            $("#email").removeClass('error');

        }



        if (!$("#address").val()) {
            $("#address").addClass('error');
            isValid = false;
        } else {
            $("#address").removeClass('error');

        }


        if (!$("#qualifications").val()) {
            $("#qualifications").addClass('error');
            isValid = false;
        } else {
            $("#qualifications").removeClass('error');

        }



        if (!$("#subject").val()) {
            $(".bootstrap-tagsinput").addClass('error');
            isValid = false;
        } else {
            $(".bootstrap-tagsinput").removeClass('error');

        }

        if (!$('input[name=days]:checked').length) {
            $('.uldays').addClass('error');
            isValid = false;
        } else {
            $('.uldays').removeClass('error');
        }

        if (!$('.identityFileList').data('filepath')) {
            $('#IdentityUpload').addClass('error');
            isValid = false;
        } else {
            $('#IdentityUpload').removeClass('error');
        }


        if (!$('.resumeFileList').data('filepath')) {
            isValid = false;
            $('#ResumeUpload').addClass('error');
        } else {
            $('#ResumeUpload').removeClass('error');
        }
        return isValid;
    }
});

$('.btn-read-more').click(function(){
    alert('hi')
})