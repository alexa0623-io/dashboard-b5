$(document).ready(function(){
    
    var App = {
        sideCanvas : $("#sideCanvas"),
        canvas : $("#canvas"),
        navCanvas : $("#navCanvas"),
        toggleSidebar : function(){
            $(document).ready(function(){
                $('#toggle-sidebar').on('click', function(){
                    $('#sideCanvas').toggleClass("d-md-none"); // Toggle sidebar visibility
            
                    // Adjust margin-left for main content based on sidebar visibility
                    if ($('#sideCanvas').hasClass("d-md-none")) {
                        $('#navCanvas').css('margin-left', '0'); // Move main content back to the left
                        $('#canvas').css('margin-left', '0');
                    } else {
                        $('#navCanvas').css('margin-left', '300px'); // Move main content to the right to make space for sidebar
                        $('#canvas').css('margin-left', '300px');
                    }
                });
            });
                        
        },
        
    
        sidebarLink : function(){
            $(document).ready(function() {
                $(".sidebar-link").click(function(event) {
                    $(".sidebar-link").removeClass("active");
                    $(".collapse.show").removeClass("show");
                    
                    $(this).addClass("active");
                    
                    var dropdown = $(this).next();
                    if (dropdown.hasClass("collapse")) {
                        dropdown.toggleClass("show");
                    }
                });
            });
        },

        // deskArrow: function() {
        //     $(document).ready(() => {
        //         $(".sidebar-link.request").click(function() {
        //             // $(".sidebar-link.has-dropdown .fa-solid").removeClass("rotate");
        //             $(this).find(".fa-solid").toggleClass("rotate");
        //         });
        
        //         $(".sidebar-link:not(.request)").click(function() {
        //             $(".sidebar-link.request .fa-solid").removeClass("rotate");
        //             $("#request-arrow").toggleClass("rotate");
        //         });
        //     });
        // },

        // Desktop view arrow
        // deskArrow: function() {
        //     $(document).ready(() => {
        //        $('#request_btn').on('click', function(){
        //             $("#request-arrow").toggleClass("rotate");
        //             $("#report-request").removeClass("rotate");
        //             console.log('test');
        //        })

        //        $('#report_btn').on('click', function(){
        //             $("#report-arrow").toggleClass("rotate");
        //             $("#request-arrow").removeClass("rotate");
        //             console.log('report');
        //         })

        //         $(".nav-link:not(#request_btn):not(#report_btn)").click(function() {
        //             $("#report-arrow").removeClass("rotate");
        //             $("#request-arrow").removeClass("rotate");
        //             console.log('test');
        //         });
        //     });
        // },

        // Desktop view arrow
        deskArrow: function() {
            $(document).ready(() => {
               $('#request_btn').on('click', function(){
                    $("#request-arrow").toggleClass("rotate");
                    $("#report-arrow").removeClass("rotate");
               })

               $('#report_btn').on('click', function(){
                    $("#report-arrow").toggleClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                })

                $(".sidebar-link:not(#request_btn):not(#report_btn)").click(function() {
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                });
            });
        },
        

        // Mobile view arrow
        mobileArrow: function() {
            $(document).ready(() => {
               $('.mrequest_btn').on('click', function(){
                    $("#mrequest-arrow").toggleClass("rotate");
                    $("#mreport-arrow").removeClass("rotate");
               })

               $('.mreport_btn').on('click', function(){
                    $("#mreport-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                })

                $(".nav-link:not(.mrequest_btn):not(.mreport_btn)").click(function() {
                    $("#mreport-arrow").removeClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                });
            });
        },

        calendarDash: function(){
                $(document).ready(function() {
                var calendarEl = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    // initialView: 'dayGridMonth',
                    headerToolbar: {
                        left: 'title',
                        right: 'customPrev customNext'
                    },
                    customButtons: {
                        customPrev: {
                            text: '<',
                            click: function() {
                                calendar.prev();
                            }
                        },
                        customNext: {
                            text: '>',
                            click: function() {
                                calendar.next();
                            }
                        }
                    },
                    dayHeaderContent: function(info) {
                        var dayIndex = info.date.getDay();
                        var dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                        return dayLabels[dayIndex];
                    },
                    nowIndicator: false
                });
            
                calendar.render();
            
                // Customize title font size and color
                var titleElement = document.querySelector('.fc-toolbar-title');
                if (titleElement) {
                    titleElement.style.fontSize = '20px'; // Adjust font size as needed
                    titleElement.style.color = 'black'; // Adjust color as needed
                }
            });
            
            
        }
    }

    // $.Mustache.option.warnOnMissingTemplates = true;

    $.Mustache.load('templates/admin.html').done(function(){
        App.toggleSidebar();
        App.sidebarLink();
        App.deskArrow();
        App.mobileArrow();
        App.calendarDash();
        App.sideCanvas.html("").append($.Mustache.render("side-nav"));
        App.navCanvas.html("").append($.Mustache.render("admin-nav"));

        
        Path.map('#/dashboard').to(function(){
            App.canvas.html("").append($.Mustache.render("dash-container"));
            // new DataTable('#table-birthday-celebration');
        });

        Path.map('#/master-file').to(function(){
            App.canvas.html("").append($.Mustache.render("master"));
        });

        Path.map('#/resume-aplication').to(function(){
            App.canvas.html("").append($.Mustache.render("resume"));
        });

        Path.root();
        Path.listen();
    });
});


