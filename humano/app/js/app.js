$(document).ready(function(){
    
    var App = {
        sideCanvas : $("#sideCanvas"),
        canvas : $("#canvas"),
        navCanvas : $("#navCanvas"),
        api     : Config.url + "/api",
        path    : Config.url + "/humano",
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

        // calendarDash: function(){
        //         $(document).ready(function() {
        //         var calendarEl = document.getElementById('calendar');
        //         var calendar = new FullCalendar.Calendar(calendarEl, {
        //             // initialView: 'dayGridMonth',
        //             headerToolbar: {
        //                 left: 'title',
        //                 right: 'customPrev customNext'
        //             },
        //             customButtons: {
        //                 customPrev: {
        //                     text: '<',
        //                     click: function() {
        //                         calendar.prev();
        //                     }
        //                 },
        //                 customNext: {
        //                     text: '>',
        //                     click: function() {
        //                         calendar.next();
        //                     }
        //                 }
        //             },
        //             dayHeaderContent: function(info) {
        //                 var dayIndex = info.date.getDay();
        //                 var dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        //                 return dayLabels[dayIndex];
        //             },
        //             nowIndicator: false
        //         });
            
        //         calendar.render();
            
        //         // Customize title font size and color
        //         var titleElement = document.querySelector('.fc-toolbar-title');
        //         if (titleElement) {
        //             titleElement.style.fontSize = '20px'; // Adjust font size as needed
        //             titleElement.style.color = 'black'; // Adjust color as needed
        //         }
        //     });
        // }
    }

    $.Mustache.load('templates/admin.html').done(function(){
        App.toggleSidebar();
        App.sidebarLink();
        App.deskArrow();
        App.mobileArrow();
        // App.calendarDash();
        App.sideCanvas.html("").append($.Mustache.render("side-nav"));
        App.navCanvas.html("").append($.Mustache.render("admin-nav"));

        
        Path.map('#/dashboard/').to(function(){
            var newsfeed = getJSONDoc(App.api + "/read/newsfeed/" + App.token);
			var newsfeedList = [];			
			$.each(newsfeed, function(i, item){
				var newsfeeds = {
					uid: item.uid,
					author: item.author,
					content: item.content,
					pubdate: item.pubdate
				}
				newsfeedList.push(newsfeeds);
			});

            var evaluations = getJSONDoc(App.api + "/get/employee/evaluations/");
            var evaluationList = [];          
            $.each(evaluations, function(i, item){
                // console.log(item)
                var evaluations = {
                    empNo: item.emp_uid,
                    fname: item.empfirstname,
                       lname: item.emplastname,
                    nextEval: item.next_evaluation,
                }
                evaluationList.push(evaluations);
            });
			
			var birthday = getJSONDoc(App.api + "/get/employee/birthdays/");
			var birthdayList = [];			
			$.each(birthday, function(i, item){
				var birthdays = {
					empNo: item.employeeNo,
					name: item.employeeName,
					birthday: item.birthday,
                    department: item.department,
					age: item.age
				}
				birthdayList.push(birthdays);
			});
			
			var newemployees = getJSONDoc(App.api + "/get/new/hired/employees/");
			var newemployeeList = [];			
			var ctr = 0;
			$.each(newemployees, function(i, item){
				ctr++;
				var newemployee = {
					count: ctr,
					empNo: item.employeeNo,
					name: item.employeeName,
					datehired: item.dateHired
				}
				newemployeeList.push(newemployee);
			});
			
			var templateData = {
				newsfeed: newsfeedList,
				birthday: birthdayList,
				newemployee: newemployeeList,
                evaluation: evaluationList
			}			
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("dash-container",templateData));
            $('#table-birthday-celebration').DataTable({
                "order": [[0, 'desc']]
            });
        });

        Path.map('#/master-file/').to(function(){
            var number = 0;
            var employees = getJSONDoc(App.api + "/employees/pages/get/" + App.token);
			var employeesList = [];			
			$.each(employees, function(i, item){
                number++;
				var employeeData = {
                    number:number,
					empNo:item.empNo,
					empUid:item.empUid,
                    empNickname:item.nickname,
                    gender:item.gender,
                    empName:item.lastname + ", " + item.firstname + " " + item.middlename,
                    costcenter:item.costcenter,
                    access:item.type,
                    rule:item.rule,
				}
				employeesList.push(employeeData);
			});
            // console.log(employeesList);
            var templateData = {
                employeesList:employeesList
            }
            App.canvas.html("").append($.Mustache.render("master",templateData));
            $('#table-master-file').DataTable({
                responsive:true
            });
        });

        Path.map('#/resume-application/').to(function(){
            App.canvas.html("").append($.Mustache.render("resume"));
            console.log("Hello");
        });

        // RESUME NEW BTN
        Path.map('#/resume-button').to(function(){
            App.canvas.html("").append($.Mustache.render("resume-btn"));
        });


        // SETTINGS

        // Company setup
        Path.map('#/settings-setup').to(function(){
            App.canvas.html("").append($.Mustache.render("company-setup"));
            // App.bootsSwitch();
        });

        // Announcement
        Path.map('#/settings-announcements').to(function(){
            App.canvas.html("").append($.Mustache.render("announcements"));
        });

        // Cost Center
        Path.map('#/settings-center').to(function(){
            App.canvas.html("").append($.Mustache.render("cost-center"));
        });

        // Department
        Path.map('#/settings-department').to(function(){
            App.canvas.html("").append($.Mustache.render("department"));
        });

        // Education Level 
        Path.map('#/settings-education').to(function(){
            App.canvas.html("").append($.Mustache.render("education-level"));
        });

        // Employment Status
        Path.map('#/settings-status').to(function(){
            App.canvas.html("").append($.Mustache.render("employment-status"));
        });

        // Holiday
        Path.map('#/settings-holiday').to(function(){
            App.canvas.html("").append($.Mustache.render("holiday"));
        });

        // Leave Counts
        Path.map('#/settings-leave').to(function(){
            App.canvas.html("").append($.Mustache.render("leave-counts"));
        });

        // Location
        Path.map('#/settings-location').to(function(){
            App.canvas.html("").append($.Mustache.render("location"));
        });

        // Overtime Type
        Path.map('#/settings-overtime').to(function(){
            App.canvas.html("").append($.Mustache.render("overtime-type"));
        });

        // Rest Day
        Path.map('#/settings-rest-day').to(function(){
            App.canvas.html("").append($.Mustache.render("rest-day"));
        });

        // Rules
        Path.map('#/settings-rules').to(function(){
            App.canvas.html("").append($.Mustache.render("rules"));
        });

        // Shift
        Path.map('#/settings-shift').to(function(){
            App.canvas.html("").append($.Mustache.render("shift"));
        });

        // Memo
        Path.map('#/settings-memo').to(function(){
            App.canvas.html("").append($.Mustache.render("memo"));
        });

        // Certificate
        Path.map('#/settings-certificate').to(function(){
            App.canvas.html("").append($.Mustache.render("certficate"));
        });

        // Request
        Path.map('#/settings-request').to(function(){
            App.canvas.html("").append($.Mustache.render("request"));
        });

        // Billing Dashboard
        Path.map('#/billing-dashboard').to(function(){
            App.canvas.html("").append($.Mustache.render("billing"));
        });

        Path.root();
        Path.listen();
    });
});


