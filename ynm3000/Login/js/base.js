$(function(){

                   function foot_position(argument) {

                            // body...

                            $("body,html").css('height','100%');

                            var bodyH=$("body").height();

                            var navH=$(".navbar").outerHeight(true);

                            var contentH=$(".all_body").outerHeight(true);

                            var footH=$(".all_btm_f").outerHeight(true);

                            var flagH=bodyH-(navH+contentH+footH);

                            flagH>50?$(".all_btm_f").css('position','fixed'):$(".all_btm_f").css({'position':'static','margin-top':'150px'});

                   }

                   foot_position();
                   
                            $(window).resize(function(event) {

                                     /* Act on the event */

                                     foot_position();

                            });


         })