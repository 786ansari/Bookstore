; (function ($) {
    $.fn.extend({
        feedBackBox: function (options) {

            // default options
            this.defaultOptions = {
                title: 'Feedback',
                titleMessage: '<b>Please feel free to leave us feedback.</b> <br>If you have any suggestion to improve the user experience, please share with us.',
                Email: '',
                isUsernameEnabled: true,
                message: '',
                ajaxUrl: 'include/insert_feedback.php',
                successMessage: 'Thank you for your feedback.',
                errorMessage: 'Something went wrong!'
            };

            var settings = $.extend(true, {}, this.defaultOptions, options);

            return this.each(function () {
                var $this = $(this);
                var thisSettings = $.extend({}, settings);

                var diableEmail;
                if (!thisSettings.isUsernameEnabled) {
                    diableEmail = 'disabled="disabled"';
                }

                // add feedback box
                $this.html('<div id="fpi_feedback" style="font-size:11px;"><div id="fpi_title"><h2><img src="https://www.upkar.in/images/feedback.png"></h2></div><div id="fpi_content"><div id="fpi_header_message">'

          
                    + thisSettings.titleMessage
                    + '</div><form><div id="fpi_submit_username"><label for="Email">Email</label><input type="text" name="email" '
                    + diableEmail
                    + ' value="'
                    + thisSettings.Email
                    + '"></div>'					
					+ '<div id="fpi_submit_username"><label for="Mobile">Mobile</label><input type="text" name="mobile"></div><input type="hidden" name="typefor" value="Feedback">'
					+ '<div id="fpi_submit_message"><label for="inquiry_message">Message</label><textarea name="inquiry_message" ></textarea></div>'
                    + '<div id="fpi_submit_loading"></div><div id="fpi_submit_submit"><input type="submit" value="Submit"></div>'
					+ '</form><div id="fpi_ajax_message"><h2></h2></div></div></div>');
				

                // remove error indication on text change
                $('#fpi_submit_username input').change(function () {
                    if ($(this).val() != '') {
                        $(this).removeClass('error');
                    }
                });
                $('#fpi_submit_message textarea').change(function () {
                    if ($(this).val() != '') {
                        $(this).removeClass('error');
                    }
                });

                // submit action
                $this.find('form').submit(function () {

                    // validate input fields
                    var haveErrors = false;
                    if ($('#fpi_submit_username input').val() == '' && typeof diableUsername == 'undefined') {
                        haveErrors = true;
                        $('#fpi_submit_username input').addClass('error');
                    }
                    if ($('#fpi_submit_message textarea').val() == '') {
                        haveErrors = true;
                        $('#fpi_submit_message textarea').addClass('error');
                    } 

                    // send ajax call
                    if (!haveErrors) {
                        // serialize all input fields
                        var disabled = $(this).find(':input:disabled').removeAttr('disabled');
                        var serialized = $(this).serialize();
                        disabled.attr('disabled', 'disabled');
						//debugger;
                        // disable submit button
                        $('#fpi_submit_submit input').attr('disabled', 'disabled');
						//alert(serialized)
                        $.ajax({
                            type: 'POST',
                            //dataType: 'json',
                            url: thisSettings.ajaxUrl,
                            data: serialized,
                            beforeSend: function () {
                                $('#fpi_submit_loading').show();
                            },
                            error: function (data) { 
                                $('#fpi_content form').hide();
                                $('#fpi_content #fpi_ajax_message h2').html(thisSettings.errorMessage);
                            },
                            success: function () {
                                $('#fpi_content form').hide();
                                $('#fpi_content #fpi_ajax_message h2').html(thisSettings.successMessage);
                            }
                        });
                    }

                    return false;
                });

                // open and close animation
                var isOpen = false;
                $('#fpi_title').click(function () {
                    if (isOpen) {
                        $('#fpi_feedback').animate({ "width": "+=5px" }, "fast")
                        .animate({ "width": "55px" }, "slow")
                        .animate({ "width": "60px" }, "fast");
                        isOpen = !isOpen;
                    } else {
                        $('#fpi_feedback').animate({ "width": "-=5px" }, "fast")
                        .animate({ "width": "365px" }, "slow")
                        .animate({ "width": "360px" }, "fast");

                        // reset properties
                        $('#fpi_submit_loading').hide();
                        $('#fpi_content form').show()
                        $('#fpi_content form .error').removeClass("error");
                        $('#fpi_submit_submit input').removeAttr('disabled');
                        isOpen = !isOpen;
                    }
                });

            });
        }
    });
})(jQuery);
