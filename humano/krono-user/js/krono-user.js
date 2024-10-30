$(document).ready(function(){
    
    var App = {
        sideCanvas : $("#sideCanvas"),
        canvas : $("#canvas"),
        navCanvas : $("#navCanvas"),
        api     : Config.url + "/api",
        path    : Config.url + "/humano",
        token   : localStorage.getItem("Token"),
        username: localStorage.getItem("Username"),
		userType: localStorage.getItem("userType"),

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
        
        // NAVBAR DROPDOWN
        navbarLinkDropdown : function(){
            $(document).ready(function() {
                $('.dropdown-menu').click(function(e) {
                    e.stopPropagation();
                });
            });
        },

        // FORM VALIDATION
        formValidation: function() {
            $(document).ready(function() {
                $('.needs-validation').on('submit', function(event) {
                  var form = $(this)[0];
                  if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    $(this).addClass('was-validated');
                });
            });
        },

        uploadImage: function() {
            $(document).ready(function() {
                $('#savePhoto').on('click', function() {
                    const input = $('#tab_input_file')[0];
                    const file = input.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = $('<img>', {
                                src: e.target.result,
                                class: 'img-fluid rounded-2',
                                css: {
                                    'width': '100%', // Adjust as necessary
                                    'height': '100%' // Adjust as necessary
                                }
                            });
                            
                            const tabDrop = $('#tab-drop');
                            
                            // Clear existing content
                            tabDrop.empty();
                            
                            // Append the new image
                            tabDrop.append(img);
                            
                            // Hide the modal
                            $('#changeProfile').modal('hide');
                        };
                        reader.readAsDataURL(file);
                    }
                });
            });
        },
        calendar:function(){
            console.log("This is the calendar render function");
            const currentDate = $(".current-date");
            const daysTag = $(".days");
            const prevNextIcon = document.querySelectorAll(".icon-nav");
            
            const months = ["January","February","March","April","May","June","July","August","September","October","November", "December"]
            let date = new Date(),
            currYear = date.getFullYear(),
            currMonth = date.getMonth();
            const calendarRender = () => {
                let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
                lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
                lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
                lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
                let liTag = "";

                for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
                    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
                }

                for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
                    // adding active class to li if the current day, month, and year matched
                    let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                                && currYear === new Date().getFullYear() ? "active" : "";
                    liTag += `<li class="${isToday}">${i}</li>`;
                }

                for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
                    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
                }
                currentDate.text(`${months[currMonth]} ${currYear}`); // passing current mon and yr as currentDate text
                daysTag.html(liTag);
            }
            calendarRender();
            
            $(document).off("click",".icon-nav").on("click",".icon-nav",function(){
                var iconId = $(this).attr("id");
                if(iconId === "prev")
                {
                    currMonth--
                }
                else
                {
                    currMonth++;
                }
                console.log(iconId, currMonth);
                if(currMonth < 0 || currMonth > 11) {
                    date = new Date(currYear, currMonth, new Date().getDate());
                    currYear = date.getFullYear(); 
                    currMonth = date.getMonth(); 
                } else {
                    date = new Date();
                }
                calendarRender();
            });
        },
    }

    function clearPanel() {
        App.canvas.hide().fadeIn(200);
    }
    
    function hasher(location){
        window.location.hash = location
    }

    $.Mustache.load('templates/krono-user.html').done(function(){
        var data = getJSONDoc(App.api + "/get/user/data/" + App.username);
        var templateData = {
            empUid:App.username,
            empName:data.name
        }
        App.toggleSidebar();
        App.sidebarLink();
        App.navbarLinkDropdown();
        App.uploadImage();
        App.formValidation();
        App.sideCanvas.html("").append($.Mustache.render("side-nav",templateData));
        App.navCanvas.html("").append($.Mustache.render("admin-nav",templateData));

        // DASHBOARD
        Path.map('#/dashboard/:var').to(function(){
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
				birthday: birthdayList,
				newemployee: newemployeeList,
			}
            console.log(templateData);			
            App.canvas.html("").append($.Mustache.render("krono-user-dash",templateData));
            App.calendar();
            var tableID = ['#table-birthday-celebration','#table-new-employee',];
            $.each(tableID,function(i,item){
                renderToDataTableDashboard(item);
            })
        });

        // PROFILE
        Path.map('#/profile/:var').to(function(){
            empUid = this.params['var'];
            var taxStatus = getJSONDoc(App.api + "/get/tax/status/" + App.token);
            var taxStatusList = [];
            var taxnum = 0;			
            $.each(taxStatus, function(i,item){
                taxnum ++;					
				var result = {
                    taxnum,
                    uid: item.uid,
					taxStatus: item.type
                }
                taxStatusList.push(result);
            });
			
			var nationality = getJSONDoc(App.api + "/json/nationality.json");
            var nationalList = [];
            var natnum = 0;			
			$.each(nationality, function(i, item){
				natnum ++;
				var nation = {
					natnum,
					name: item.name 
				}
				nationalList.push(nation);
			});
            var templateData = {
                taxStatusList:taxStatusList,
                nationalList:nationalList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-user-profile",templateData));

            function getEmpData(){
                $.getJSON(App.api + "/employee/data/get/" + empUid + "." + App.token, function(data) {
                    if (data.status == 1) {
                        var status = "Active";
                    } else {
                        var status = "Inactive";
                    }
                    $("input[name=firstname]").val(data.firstname);
                    $("input[name=middlename]").val(data.middlename);
                    $("input[name=lastname]").val(data.lastname);
                    if (data.gender != "") {
                        $("select[name=gender]").prepend("<option value='" + data.gender + "' selected>" + data.gender + "</option>");
                    } else {
                        $("select[name=gender]").prepend("<option value='' selected></option>");
                    }

                    if (data.marital != "") {
                        $("select[name=marital]").prepend("<option value='" + data.marital + "' selected>" + data.marital + "</option>");
                    } else {
                        $("select[name=marital]").prepend("<option value='' selected></option>");
                    }

                    $("select[name=status]").prepend("<option value='" + data.status + "' selected>" + status + "</option>");
                    $("input[name=bday]").val(data.bday);
                    $("input[name=email]").val(data.email);
                    $("input[name=nickname]").val(data.nickname);
                    $("input[name=driverLicense]").val(data.driverLicense);
                    $("input[name=expiryLicense]").val(data.expiryLicense);
                    $("input[name=sssNo]").val(data.sssNo);
                    $("input[name=taxNo]").val(data.taxNo);
                    $("input[name=philhealthNo]").val(data.philhealthNo);
                    $("input[name=pagibigNo]").val(data.pagibigNo);
                   
                    $("select[name=nationality]").prepend("<option value='" + data.nationality + "' selected>" + data.nationality + "</option>");
					
					$("select[name=tax-status] option[value='" + data.taxStatusUid + "']").remove();
                    $("select[name=tax-status]").prepend("<option value='" + data.taxStatusUid + "' selected>" + data.taxStatus + "</option>");
                });
                // disable();
            }
            getEmpData();
            
            $('#table-krono-user-profile').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            }); 
        });

        // TIME SHEET
        Path.map('#/timesheet/:var').to(function(){
            empUid = this.params['var'];
            App.canvas.html("").append($.Mustache.render("krono-user-time-sheet"));
            var tableID = '#table-krono-user-time-sheet';
            renderToDataTablePrint(tableID);

            $("#empTimesheetform").submit( function(e){
                e.preventDefault();

                var startDate = $("#tdEmpTimesheetStartDate").val();
                var endDate = $("#tdEmpTimesheetEndDate").val();

                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate){
                    alert("Please Fill All The Fields!");
                }else{
                    $(tableID).DataTable().clear().destroy();
                    $("#loading-humano").show();

                    function getTimesheetPages(){
                        var number = 0;
                        $.getJSON(App.api + "/timesheet/all/view/attendance/" + startDate + "." + endDate + "." + empUid, function(data) {
                        $("#loading-humano").hide();
                        console.log(data);
                        $.each(data, function(i, item) {
                            number++;
                            var style;
                            var action;

                            if(item.timeRequestStatus == 1){
                                action = "<button class='btn btn-outline-sm' title='You ve already requested on this date!' disabled data-index='"+item.inId+"."+item.outId+"'  id='view-btn'><i class='fa-solid fa-check'></i></button>";
                            }else{
                                action = "<button class='btn btn-sm btn-outline-primary' id='edit-btn' data-date='"+item.date+"' title='Request Adjustment' data-bs-target='#adjustmentTimeRequest' ><i class='fa-regular fa-calendar'></i></button>";
                            }
                            switch(item.prompt){
                                case 0:
                                    style = "background-color: #fcf8e3";
                                    break;
                                case 1:
                                    style = "color:black";
                                    break;
                                case 2:
                                    style = "background-color: #dff0d8";
                                    break;
                                case 3:
                                    style = "background-color: #f2dede";
                                    break;
                                case 4:
                                    style = "background-color: #d9edf7";
                                    break;
                                case 5:
                                    style = "background-color: #B2B2B2";
                                    break;
                                case 6:
                                    style = "background-color: #ffe6da";
                                    break;
                                case 7:
                                    style = "background-color: #e4e0ff";
                                    break;
                            }

                            var $html = $(" \
                                <tr> \
                                    <td style='"+style+"'>" + number + "</td> \
                                    <td style='"+style+"'>" + item.date + "</td> \
                                    <td style='"+style+"'>" + item.day + "</td> \
                                    <td style='"+style+"'>" + item.in + "</td> \
                                    <td style='"+style+"'>" + item.out + "</td> \
                                    <td style='"+style+"'>" + item.late + "</td> \
                                    <td style='"+style+"'>" + item.overtime + "</td> \
                                    <td style='"+style+"'>" + item.undertime + "</td> \
                                    <td style='"+style+"'>" + item.work + "</td> \
                                    <td style='"+style+"'>" + action + "</td> \
                                </tr> \
                                ");

                            $("#table-krono-user-time-sheet tbody").append($html);
                        });
                        renderToDataTablePrint(tableID);
                            
                        });
                        $.getJSON(App.api + "/get/user/data/" + empUid, function(data){
                            console.log(data);
                            localStorage.setItem("employeeName", data.name);
                        });
                        // printTimesheetResult(startDate, endDate, uid);
                    }
                    getTimesheetPages();
                }

                $(document).off("click", "#edit-btn").on("click", "#edit-btn", function(e){
                    e.preventDefault();

                    $("#adjustmentTimeRequest").modal("show");
                    var date = $(this).data("date");
                    $("input[name=timeRequestDate]").attr("disabled", "disabled");

                    $.getJSON(App.api + "/change/date/format/" + date, function(data){
                        var convertedDate = data;
                        $("input[name=timeRequestDate]").val(convertedDate);

                        $.getJSON(App.api + "/get/time/log/date/" + empUid + "." + convertedDate, function(data){
                            $("input[name=timeRequestIn]").val(data.timeIn);
                            $("input[name=timeRequestOut]").val(data.timeOut);
                        });
                    });
                    $("input[name=timeRequestDate]").on("dp.change", function(e){
                        e.preventDefault();

                        var timeRequestDate = $("input[name=timeRequestDate]").val();
                        $.getJSON(App.api + "/get/time/log/date/" + empUid + "." + timeRequestDate, function(data){
                            $("input[name=timeRequestIn]").val(data.timeIn);
                            $("input[name=timeRequestOut]").val(data.timeOut);
                        });
                    });
                });
            });
        });

        // LEAVE / ABSENT
        Path.map('#/leave-absent/:var').to(function(){
            var empUid = this.params['var'];
            var leaveCounts = getJSONDoc(App.api + "/employee/leave/count/" + empUid);

            var leaveTypes = getJSONDoc(App.api + "/get/leave/types/" + App.token);
            var leaveTypeList = [];
            $.each(leaveTypes, function(i,item){
                var leaveType = {
                    leaveUid:item.uid,
                    leaveName:item.name
                };
                leaveTypeList.push(leaveType);
            });

            var templateData = {
                leaveCounts:leaveCounts,
                leaveTypeList:leaveTypeList
            }

            App.canvas.html("").append($.Mustache.render("krono-user-leave-absent",templateData));
            var tableID = '#table-krono-user-leave-absent';
            renderToDataTablePrint(tableID);

            function readLeaveNotification(empUid){
                $.getJSON(App.api + "/employee/read/leave/notification/" + empUid, function(data){
                    $("#leaveNotification").remove();
                });
            }
            readLeaveNotification(empUid);

            function getPendingRequests(empUid){
                $.getJSON(App.api + "/employee/pending/leave/notification/" + empUid, function(data){
                    $("#pendingLeaveNotification").text(data.count);
                });
            }
            getPendingRequests(empUid);

            function getEmpLeaveRequest(){
                var number = 0;
                $("#table-krono-user-leave-absent").DataTable().clear().destroy();

                $.getJSON(App.api + "/get/employee/leave/requests/details/" + empUid, function(data){
                    console.log(data);
                    $("#table-krono-user-leave-absent").DataTable().clear().destroy();
                    $.each(data, function(i, item){
                        number++;
                        var style;
                        var action;

                        switch(item.request_status){
                            case "Pending":
                                style = "background-color: #fcf8e3";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Delete'><i class='fa-solid fa-xmark'></i></button>"+
                                "</div>";
                                break;
                            case "Denied":
                                style = "background-color: #f2dede";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Delete'><i class='fa-solid fa-xmark'></i></button>"+
                                "</div>";
                                break;
                            case "Certified":
                                style = "background-color: #d9edf7";
                                action = "<button name='aEdit' class='btn btn-outline-success btn-sm' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>";
                                break;
                            default:
                                style = "background-color: #dff0d8";
                                action = "<button name='aEdit' class='btn btn-outline-success btn-sm' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>";
                                break;
                        }
                        var $html = $(" \
                            <tr> \
                                <td style='"+style+"'>" + number + "</td> \
                                <td style='"+style+"'>" + item.from + " TO " + item.to + "</td> \
                                <td style='"+style+"'>" + item.code + "</td> \
                                <td style='"+style+"'>" + item.reason + "</td> \
                                <td style='"+style+"'>" + item.request_status + "</td> \
                                <td style='"+style+"'>" + item.date_created + "</td> \
                                <td style='"+style+"'>" + item.date_modified + "</td> \
                                <td style='"+style+"'>" + action + "</td> \
                            </tr> \
                            ");
                        $("#table-krono-user-leave-absent tbody").append($html);
                    });
                    renderToDataTablePrint(tableID);
                });
            }
            getEmpLeaveRequest();

            $("#formDate").submit(function(e){
                e.preventDefault();
                $("#loading-humano").show();
                var startDate = $("input[name=startDate]").val();
                var endDate   = $("input[name=endDate]").val();

                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate){
                    alert("Please Fill All The Fields!");
                }else{
                    $("#loading-humano").hide();
                    var number = 0;
                    $("#table-krono-user-leave-absent").DataTable().clear().destroy();
                    $.getJSON(App.api + "/get/employee/leave/requests/date/" + startDate + "." + endDate + "." + empUid, function(data){
                        $.each(data, function(i, item) {
                            number++;
                            var style;
                            var action;

                            switch(item.request_status){
                                case "Pending":
                                style = "background-color: #fcf8e3";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Delete'><i class='fa-solid fa-xmark'></i></button>"+
                                "</div>";
                                break;
                            case "Denied":
                                style = "background-color: #f2dede";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#leaveDelete' title='Delete'><i class='fa-solid fa-xmark'></i></button>"+
                                "</div>";
                                break;
                            case "Certified":
                                style = "background-color: #d9edf7";
                                action = "<button name='aEdit' class='btn btn-outline-success btn-sm' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>";
                                break;
                            default:
                                style = "background-color: #dff0d8";
                                action = "<button name='aEdit' class='btn btn-outline-success btn-sm' data-index='"+ item.uid + "." + empUid +"'data-bs-toggle='modal' data-bs-target='#leaveEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button>";
                                break;
                            }
                            var $html = $(" \
                                <tr> \
                                    <td style='"+style+"'>" + number + "</td> \
                                    <td style='"+style+"'>" + item.from + " TO " + item.to + "</td> \
                                    <td style='"+style+"'>" + item.code + "</td> \
                                    <td style='"+style+"'>" + item.reason + "</td> \
                                    <td style='"+style+"'>" + item.request_status + "</td> \
                                    <td style='"+style+"'>" + item.date_created + "</td> \
                                    <td style='"+style+"'>" + item.date_modified + "</td> \
                                    <td style='"+style+"'>" + action + "</td> \
                                </tr> \
                                ");
                            $("#table-krono-user-leave-absent tbody").append($html);
                        });
                    });
                    renderToDataTablePrint(tableID);
                }
            });

            $(document).off("submit", "#applyLeaveForm").on("submit", "#applyLeaveForm", function(e){
                e.preventDefault();
                var leaveType     = $("select[name=employeeLeaveType]").val();
                var leaveBalance  = $("input[name=employeeApplyLeaveBalance]").val();
                var startDate     = $("input[name=employeeApplyLeaveFrom]").val();
                var endDate       = $("input[name=employeeApplyLeaveTo]").val();
                var reason        = $("textarea[name=employeeApplyLeaveReason]").val();
                var requestStatus = "Pending";
                var userType 	  = App.userType;
                
                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate || !reason || !leaveType){
                    alert("Please Fill All The Fields!");
                }else{
                    $.ajax({
                        type    : "POST",
                        url     : App.api + "/new/leave/request/" + App.token,
                        dataType: "json",
                        data    : {
                            employee     : uid,
                            leaveType    : leaveType,
                            leaveBalance : leaveBalance,
                            startDate    : startDate,
                            endDate      : endDate,
                            reason       : reason,
                            requestStatus: requestStatus,
                            userType	 : userType
                        },
                        beforeSend: function(){
                            $("#loading-humano").show();
                        },
                        success:function(data){
                            $("#loading-humano").hide();

                            if(data.dataError == 1){
                                alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
                            }else if(data.dataError == 0){
                                alert(data.prompt);
                                $("#leaveRequest").modal("hide");
                                $("select[name=employeeLeaveType]").val("");
                                $("input[name=employeeApplyLeaveBalance]").val("");
                                $("input[name=employeeApplyLeaveFrom]").val("");
                                $("input[name=employeeApplyLeaveTo]").val("");
                                $("textarea[name=employeeApplyLeaveReason]").val("");
                                getPendingRequests(uid);
                                getEmpLeaveRequest();
                            }else if(data.dataError == 3){
                                alert("Sorry, we could not process your request, you put in an invalid date!");
                                $("#leaveRequest").modal("hide");
                            }else if(data.dataError == 4){
                                alert(data.prompt);
                                $("#leaveRequest").modal("hide");
                            }else if(data.dataError == 5){
                                alert(data.prompt);
                                $("#leaveRequest").modal("hide");
                            }
                        }
                    });
                }
            });

            $("#table-krono-user-leave-absent tbody").off("click", "td button[name=aEdit]").on("click", "td button[name=aEdit]", function(e) {
                e.preventDefault();
                var dataind        = $(this).attr("data-index");
                var dataIndex   = dataind.split(".");

                var leaveId     = dataIndex[0];
                var uid         = dataIndex[1];

                $.getJSON(App.api + "/get/leave/details/" + dataIndex[0], function(data){
                    $("select[name=leaveStatus]").val(data.request_status);
                    console.log(data);
                    if(data.request_status == "Approved"){
                        $("input[name=leaveStart]").attr("Disabled", "Disabled");
                        $("input[name=leaveStart]").val(data.from);
                        $("input[name=leaveEnd]").attr("Disabled", "Disabled");
                        $("input[name=leaveEnd]").val(data.to);
                        $("select[name=leaveStatus]").prop("selected", false);
                        $("input[name=btnLeave]").attr("Disabled", "Disabled");
                        $("input[name=btnLeave]").hide();

                        $("#status").hide();
                    }else{
                        $("input[name=leaveStart]").val(data.from);
                        $("input[name=leaveEnd]").val(data.to);
                        $("select[name=leaveStatus]").prop("selected", true);
                    }
                });
                
                $(document).off("submit", "#editLeaveType").on("submit", "#editLeaveType",function(e){
                    e.preventDefault();

                    var leaveStart  = $("input[name=leaveStart]").val();
                    var leaveEnd    = $("input[name=leaveEnd]").val();
                    var leaveStatus = $("select[name=leaveStatus]").val();
                    var status      = 1;
                    var admin       = localStorage.getItem("Username");

                    if(!leaveStart || !leaveEnd){
                        alert("PLEASE FILL ALL THE FIELDS!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url : App.api + "/update/leave/request/" + leaveId,
                            data: {
                                leaveStart  : leaveStart,
                                leaveEnd    : leaveEnd,
                                leaveStatus : leaveStatus,
                                status      : status,
                                admin       : admin
                            },
                            beforeSend: function(){
                                $("#loading-humano").show();
                            },
                            success: function(){
                                $("#loading-humano").hide();
                                alert("Data Updated!");
                                $("#leaveEdit").modal("hide");
                                getEmpLeaveRequest();
                            }
                        });
                    }
                });
            });

        });

        // OVERTIME
        Path.map('#/overtime/:var').to(function(){
            var empUid = this.params["var"];

            function readOvertimeNotification(empUid){
                $.getJSON(App.api + "/employee/read/overtime/notification/" + empUid, function(data){
                    $("#overtimeNotification").remove();
                });
            }
            readOvertimeNotification(empUid);

            function getPendingRequests(empUid){
                $.getJSON(App.api + "/employee/pending/overtime/notification/" + empUid, function(data){
                    $("#forPending").text(data.count);
                });
            }
            getPendingRequests(empUid);

            App.canvas.html("").append($.Mustache.render("krono-user-overtime"));
            var tableID = '#table-krono-user-overtime';
            renderToDataTablePrint(tableID);

            initBootstrapSwitch("#status");

            function getOvertimeRequests(){
                var number = 0;
                $(tableID).DataTable().clear().destroy();

                $.getJSON(App.api + "/get/employee/overtime/requests/" + empUid, function(data){
                    console.log(data);
                    $(tableID).DataTable().clear().destroy();
                    $.each(data, function(i, item){
                        number++;
                        var style;
                        var action;

                        switch(item.request_status){
                            case "Pending":
                                style = "background-color: #fcf8e3";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+"</div>";
                                break;
                            case "Denied":
                                style = "background-color: #f2dede";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa fa-times'></i></button>"+
                                "</div>";
                                break;
                            case "Certified":
                                style = "background-color: #d9edf7";
                                action = "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa fa-pencil-square-o'></i></button>";
                                break;
                            default:
                                style = "background-color: #dff0d8";
                                action = "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-toggle='modal' data-target='#overtimeRequestEdit' title='Edit'><i class='fa fa-pencil-square-o'></i></button>";
                                break;
                        }
                        var $html = $(" \
                            <tr> \
                                <td style='"+style+"'>" + number + "</td> \
                                <td style='"+style+"'>" + item.from + "</td> \
                                <td style='"+style+"'>" + item.hours + "</td> \
                                <td style='"+style+"'>" + item.reason + "</td> \
                                <td style='"+style+"'>" + item.request_status + "</td> \
                                <td style='"+style+"'>" + item.certBy + "</td> \
                                <td style='"+style+"'>" + item.appBy + "</td> \
                                <td style='"+style+"'>" + item.date_created + "</td> \
                                <td style='"+style+"'>" + item.date_modified + "</td> \
                                <td style='"+style+"'>" + action + "</td> \
                            </tr> \
                            ");
                        $("#table-krono-user-overtime tbody").append($html);
                    });
                    renderToDataTablePrint(tableID);
                });
            }
            getOvertimeRequests();

            $("#formDate").submit(function(e){
                e.preventDefault();

                var startDate = $("input[name=startDate]").val();
                var endDate   = $("input[name=endDate]").val();

                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate){
                    alert("Please Fill All The Fields!");
                }else{
                    var number = 0;
                    $(tableID).DataTable().clear().destroy();
                    $.getJSON(App.api + "/get/employee/overtime/requests/date/" + startDate + "." + endDate + "." + empUid, function(data){
                        console.log(data);
                        $.each(data, function(i, item){
                            number++;
                            var style;
                            var action;
                            switch(item.request_status){
                                case "Pending":
                                    style = "background-color: #fcf8e3";
                                    action = "<div class='btn-group btn-group-sm'>"+
                                    "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+"</div>";
                                    break;
                                case "Denied":
                                    style = "background-color: #f2dede";
                                    action = "<div class='btn-group btn-group-sm'>"+
                                    "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa-solid fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa fa-times'></i></button>"+
                                    "</div>";
                                    break;
                                case "Certified":
                                    style = "background-color: #d9edf7";
                                    action = "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeRequestEdit' title='Edit'><i class='fa fa-pencil-square-o'></i></button>";
                                    break;
                                default:
                                    style = "background-color: #dff0d8";
                                    action = "<button name='aEdit' class='btn btn-outline-success' data-index='"+ item.uid +"'data-toggle='modal' data-target='#overtimeRequestEdit' title='Edit'><i class='fa fa-pencil-square-o'></i></button>";
                                    break;
                            }
                            var $html = $(" \
                                <tr> \
                                    <td style='"+style+"'>" + number + "</td> \
                                    <td style='"+style+"'>" + item.from + "</td> \
                                    <td style='"+style+"'>" + item.hours + "</td> \
                                    <td style='"+style+"'>" + item.reason + "</td> \
                                    <td style='"+style+"'>" + item.request_status + "</td> \
                                    <td style='"+style+"'>" + item.certBy + "</td> \
                                    <td style='"+style+"'>" + item.appBy + "</td> \
                                    <td style='"+style+"'>" + item.date_created + "</td> \
                                    <td style='"+style+"'>" + item.date_modified + "</td> \
                                    <td style='"+style+"'>" + action + "</td> \
                                </tr> \
                                ");
                            $("#table-krono-user-overtime tbody").append($html);
                        });
                        renderToDataTablePrint(tableID);
                    });
                }
            });

            function addNew(){
                $("#applyOvertimeForm").submit(function(e){
                    e.preventDefault();
                    var startDate     = $("input[name=employeeApplyOvertimeFrom]").val();
                    var startHour     = $("input[name=employeeApplyOvertimeFromTime]").val();
                    var endDate       = $("input[name=employeeApplyOvertimeTo]").val();
                    var endHour       = $("input[name=employeeApplyOvertimeToTime]").val();
                    var reason        = $("textarea[name=employeeApplyOvertimeReason]").val();
                    var requestStatus = "Pending";

                    if(endDate < startDate){
                        alert("Sorry, we could not process your request, you put in an invalid date!");
                    }else if(!startDate || !reason || !startHour || !endDate || !endHour){
                        alert("Please Fill All the Fields!");
                    }else{
                        $.ajax({
                            type    : "POST",
                            url     : App.api + "/request/overtime/" + App.token,
                            dataType: "json",
                            data    : {
                                employee     : uid,
                                startDate    : startDate,
                                startHour    : startHour,
                                endDate      : endDate,
                                endHour      : endHour,
                                reason       : reason,
                                requestStatus: requestStatus
                            },
                            beforeSend: function(){
                                $("#loading-humano").show();
                            },
                            success: function(data){
                                    $("#loading-humano").hide();
                                if(data.prompt == 1){
                                    alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
                                }else if(data.prompt == 0){
                                    alert("Successfully Requested! Please be noted that the approval might take a few days.");
                                    $("#overtimeRequest").modal("toggle");
                                    $("input[name=employeeApplyOvertimeFrom]").val("");
                                    $("input[name=employeeApplyOvertimeFromTime]").val("");
                                    $("input[name=employeeApplyOvertimeTo]").val("");
                                    $("input[name=employeeApplyOvertimeToTime]").val("");
                                    $("textarea[name=employeeApplyOvertimeReason]").val("");
                                    getOvertimeRequests();
                                }else if(data.prompt == 3){
                                    alert("Sorry, we could not process your request, you put in an invalid date.");
                                    $("#overtimeRequest").modal("toggle");
                                }else if(data.prompt == 4){
                                    alert("One(1) Request per day only.");
                                    $("#overtimeRequest").modal("toggle");
                                }
                            }
                        });
                    }
                });
            }
            addNew();

            function edit(){
                $(tableID).off("click", "td button[name=aEdit]").on("click", "td button[name=aEdit]", function(e) {
                    e.preventDefault();
                    var overtimeUid = $(this).attr("data-index");

                    $.getJSON(App.api + "/get/employee/overtime/request/details/" + overtimeUid, function(data){
                        if(data.requestStatus == "Approved"){
                            $("input[name=employeeApplyOvertimeFromEdit]").attr("Disabled", "Disabled");
                            $("input[name=employeeApplyOvertimeFromEdit]").val(data.startDate);
                            $("input[name=employeeApplyOvertimeFromTimeEdit]").attr("Disabled", "Disabled");
                            $("input[name=employeeApplyOvertimeFromTimeEdit]").val(timeParser(data.startHour));
                            $("input[name=employeeApplyOvertimeToEdit]").attr("Disabled", "Disabled");
                            $("input[name=employeeApplyOvertimeToEdit]").val(data.endDate);
                            $("input[name=employeeApplyOvertimeToTimeEdit]").attr("Disabled", "Disabled");
                            $("input[name=employeeApplyOvertimeToTimeEdit]").val(timeParser(data.endHour));
                            $("textarea[name=employeeApplyOvertimeReasons]").attr("Disabled", "Disabled");
                            $("textarea[name=employeeApplyOvertimeReasons]").val(data.reason);
                            $("select[name=employeeRequestStatus]").attr("Disabled", "Disabled");
                            $("select[name=employeeRequestStatus]").val(data.requestStatus);
                            $("input[name=status]").hide();
                            $("input[name=oTbtn]").attr("Disabled", "Disabled");
                            $(".status-update").hide();
                        }else{
                            $("input[name=employeeApplyOvertimeFrom]").val(data.startDate);
                            $("input[name=employeeApplyOvertimeFromEdit]").val(data.startDate);
                            $("input[name=employeeApplyOvertimeFromTimeEdit]").val(timeParser(data.startHour))

                            $("input[name=employeeApplyOvertimeToEdit]").val(data.endDate);
                            $("input[name=employeeApplyOvertimeToTimeEdit]").val(timeParser(data.endHour));

                            $("textarea[name=employeeApplyOvertimeReasons]").val(data.reason);
                            $("select[name=employeeRequestStatus]").val(data.requestStatus);
                            if(data.status==1){
                                $("input[name=status]").bootstrapSwitch("state", true);
                            }else{
                                $("input[name=status]").bootstrapSwitch("state", false);
                            }

                            $("input[name=status]").val(data.status);
                        }
                        localStorage.setItem("type", data.type);
                    });

                    $(document).off("submit", "#editOvertimeForm").on("submit", "#editOvertimeForm", function(e){
                        e.preventDefault();

                        var startDate       = $("input[name=employeeApplyOvertimeFromEdit]").val();
                        var startHour       = $("input[name=employeeApplyOvertimeFromTimeEdit]").val();
                        var endDate         = $("input[name=employeeApplyOvertimeToEdit]").val();
                        var endHour         = $("input[name=employeeApplyOvertimeToTimeEdit]").val();

                        var reason          = $("textarea[name=employeeApplyOvertimeReasons]").val();
                        var requestStatus   = $("select[name=employeeRequestStatus]").val();
                        var status          = 0;
                        if ($("input[name='status']").is(":checked")) {
                            status  = 1;
                        }
                        var admin   = "";
                        var type    = localStorage.getItem("type");

                        if(endDate < startDate){
                            alert("Sorry, we could not process your request, you put in an invalid date!");
                        }else if(!startDate || !requestStatus || !reason || !startHour || !endDate || !endHour){
                            alert("Please Fill All The Fields!");
                        }else{
                            $.ajax({
                                type    : "POST",
                                url     : App.api + "/update/overtime/request/" + overtimeUid,
                                dataType: "json",
                                data    : {
                                    startDate    : startDate,
                                    startHour    : startHour,
                                    endDate      : endDate,
                                    endHour      : endHour,
                                    reason       : reason,
                                    admin        : admin,
                                    requestStatus: requestStatus,
                                    status       : status,
                                    type         : type
                                },
                                beforeSend: function(){
                                    $("#loading-humano").show();
                                },
                                success: function(){
                                    $("#loading-humano").hide();
                                    alert("Successfully Updated! Please be noted that the approval might take a few days.");
                                    $("#overtimeRequestEdit").modal("toggle");
                                    getOvertimeRequests();
                                }
                            });
                        }
                    });
                });
            }   
            edit();

            deleteOvertime();
            function deleteOvertime(){
                $("#overtime-table tbody").off("click", "td button[name=aDelete]").on("click", "td button[name=aDelete]", function(e) {
                    e.preventDefault();
                    var overtimeUid = $(this).attr("data-index");

                    $(document).off("submit", "#deleteovertime").on("submit", "#deleteovertime", function(e){
                        e.preventDefault();
                        
                        $.getJSON(App.api + "/remove/overtime/request/" + overtimeUid, function(data){
                            alert("Successfully Removed!");
                            $("#overtimeDelete").modal("toggle");
                            getOvertimeRequests();
                        });
                    });
                });
            }

        });

        // HOLIDAY & RESTDAY
        Path.map('#/holiday-restday/:var').to(function(){
            var empUid = this.params["var"];

            var holidayTypes = getJSONDoc(App.api + "/holiday/type/get/");
            var holidayTypesList = [];
            $.each(holidayTypes,function(i,item){
                holidayType = {
                    holidayTypeUid:item.holidayTypeUid,
                    nameType:item.nameType
                }
                holidayTypesList.push(holidayType);
            });

            var holidays = getJSONDoc(App.api + "/get/holiday/data/" + App.token);
            var holidaysList = [];
            $.each(holidays,function(i,item){
                var holiday = {
                    holidayname:item.holiday_name,
                    holidayTypeName:item.type_name
                }
                holidaysList.push(holiday);
            });

            var templateData = {
                holidayTypesList:holidayTypesList,
                holidaysList:holidaysList
            }

            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("krono-user-holiday-restday",templateData));
            var tableID = '#table-krono-user-holiday-restday';
            renderToDataTablePrint(tableID);

            $("#applyHolidayForm").submit(function(e) {
                e.preventDefault();				
				var startDate = $("#dateHolidayFrom").val();
				var startHour = $("#holidayFromTime").val();
				var endDate = $("#dateHolidayTo").val();
				var endHour = $("#holidayToTime").val();
				var reason = $("#holidayReason").val();
				var requestStatus = "Pending";
				var type = $("#holiday-type").val();
				var typeText = $("#holiday-type :selected").text();
				
				var admin = "";
				if(endDate < startDate) {
					alert("Sorry, we could not process your request, you put in an invalid date!");
				}else if(!startDate || !reason || !startHour || !endDate || !endHour) {
					alert("Please Fill All the Fields!");
				}else {
					$.ajax({
						type    : "POST",
						url     : App.api + "/request/holiday/" + App.token,
						dataType: "json",
						data    : {
							employee     : uid,
							startDate    : startDate,
							startHour    : startHour,
							endDate      : endDate,
							endHour      : endHour,
							reason       : reason,
							requestStatus: requestStatus,
							type		 : type,
							typeText	 : typeText,
							admin		 : admin
						},
						beforeSend: function(){
							$("#loading-humano").show();
						},
						success: function(data){
							$("#loading-humano").show();
							if(data.prompt == 1) {
								alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
							}else if(data.prompt == 0) {
								alert("Successfully Requested! Please be noted that the approval might take a few days.");
								$("#holidayRequest").modal("toggle");
								$("input[name=dateHolidayFrom]").val("");
								$("input[name=holidayFromTime]").val("");
								$("input[name=dateHolidayTo]").val("");
								$("input[name=holidayToTime]").val("");
								$("textarea[name=holidayReason]").val("");
								window.location.hash = "/employee/holiday/requests/" + empUid;
								window.location.reload();
							}else if(data.prompt == 3) {
								alert("Sorry, we could not process your request, you put in an invalid date.");
							}else if(data.prompt == 4) {
								alert("One(1) Request per day only.");
							}
							else if(data.prompt == 5) {
								alert("The date you're requesting, is not a Holiday.");
							}
						}
					});
				}
			});

            $("#holidayForm").on("submit", function(e) {
				e.preventDefault();
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();				
				loadHolidayRequest(startDate, endDate, empUid);
			});

            function loadHolidayRequest(startDate, endDate, empUid) {
				if(endDate < startDate) {
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !endDate) {
                    alert("Please Fill All The Fields!");
                }else {
                    var number = 0;
                    $.getJSON(App.api + "/get/employee/holiday/requests/date/" + startDate + "." + endDate + "." + empUid, function(data) {
						$(tableID).DataTable().clear().destroy();
						//console.log(data);
						$.each(data, function(i, item){
                            number++;
                            var style;
                            var action;
                            switch(item.request_status){
                                case "Pending":
                                style = "background-color: #fcf8e3";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger aDelete' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+"</div>";
                                break;
                            case "Denied":
                                style = "background-color: #f2dede";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger aDelete' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+"</div>";
                                break;
                            case "Certified":
                                style = "background-color: #d9edf7";
                                action = "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                break;
                            default:
                                style = "background-color: #dff0d8";
                                action = "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                break;
                            }
                            var $html = $(" \
                                <tr> \
                                    <td style='"+style+"'>" + number + "</td> \
                                    <td style='"+style+"'>" + item.from + "</td> \
                                    <td style='"+style+"'>" + item.hours + "</td> \
                                    <td style='"+style+"'>" + item.reason + "</td> \
                                    <td style='"+style+"'>" + item.request_status + "</td> \
                                    <td style='"+style+"'>" + item.certBy + "</td> \
                                    <td style='"+style+"'>" + item.apprBy + "</td> \
                                    <td style='"+style+"'>" + item.date_created + "</td> \
                                    <td style='"+style+"'>" + item.date_modified + "</td> \
                                    <td style='"+style+"'>" + action + "</td> \
                                </tr> \
                                ");
                            $("#table-krono-user-holiday-restday tbody").append($html);
                        });
                    });
                }
			}

            $(document).off("click", ".aEdit").on("click", ".aEdit", function(e){
                e.preventDefault();			
				var xuid = $(this).attr("data-index");
				$("#edit-uid").val(xuid);
				
				$.getJSON(App.api + "/get/employee/holiday/request/details/" + xuid, function(data){
					if(data.requestStatus == "Approved"){
						$("select[name=edit-holiday-type]").attr("Disabled", "Disabled");
						$("input[name=edit-dateHolidayFrom]").attr("Disabled", "Disabled");
						$("input[name=edit-dateHolidayFrom]").val(data.startDate);						
						$("input[name=edit-holidayFromTime]").attr("Disabled", "Disabled");
						$("input[name=edit-holidayFromTime]").val(data.startHour);						
						$("input[name=edit-dateHolidayTo]").attr("Disabled", "Disabled");
						$("input[name=edit-dateHolidayTo]").val(data.endDate);						
						$("input[name=edit-holidayToTime]").attr("Disabled", "Disabled");
						$("input[name=edit-holidayToTime]").val(data.endHour);						
						$("textarea[name=edit-holidayReason]").attr("Disabled", "Disabled");
						$("textarea[name=edit-holidayReason]").val(data.reason);
						$("select[name=employeeRequestStatus]").attr("Disabled", "Disabled");
						$("select[name=employeeRequestStatus]").val(data.requestStatus);
						$("input[name=status]").hide();
						$("input[name=oTbtn]").attr("Disabled", "Disabled");
						$(".status-update").hide();
						$("select[name=edit-holiday-type]").attr("Disabled", "Disabled");
					}else{
						$("input[name=edit-dateHolidayFrom]").val(data.startDate);
						$("input[name=edit-holidayFromTime]").val(data.startHour);
						$("input[name=edit-dateHolidayTo]").val(data.endDate);
						$("input[name=edit-holidayToTime]").val(data.endHour);
						$("textarea[name=edit-holidayReason]").val(data.reason);						
						$("select[name=employeeRequestStatus]").val(data.requestStatus);
						$("select[name=employeeRequestStatus]").hide();
						if(data.status==1){
							$("input[name=status]").bootstrapSwitch("state", true);
						}else{
							$("input[name=status]").bootstrapSwitch("state", false);
						}
						$("input[name=status]").val(data.status);
					}
				});
			});

            $("#applyEditHolidayForm").on("submit", function(e) {
                e.preventDefault();
                var xuid = $("#edit-uid").val();
                var typeHoliday = $("select[name=edit-holiday-type]").val();
                var startDate = $("input[name=edit-dateHolidayFrom]").val();
                var startHour = $("input[name=edit-holidayFromTime]").val();
                var endDate = $("input[name=edit-dateHolidayTo]").val();
                var endHour = $("input[name=edit-holidayToTime]").val();
                var reason = $("textarea[name=edit-holidayReason]").val();
                var requestStatus   = $("select[name=employeeRequestStatus]").val();
                var status          = 0;
                if ($("input[name='status']").is(":checked")) {
                    status  = 1;
                }
                var admin   = "";
                if(endDate < startDate){
                    alert("Sorry, we could not process your request, you put in an invalid date!");
                }else if(!startDate || !requestStatus || !reason || !startHour || !endDate || !endHour){
                    alert("Please Fill All The Fields!");
                }else{
                    $.ajax({
                        type    : "POST",
                        url     : App.api + "/update/holiday/request/" + xuid,
                        dataType: "json",
                        data    : {
                            startDate    : startDate,
                            startHour    : startHour,
                            endDate      : endDate,
                            endHour      : endHour,
                            reason       : reason,
                            admin        : admin,
                            requestStatus: requestStatus,
                            status       : status,
                            type         : typeHoliday
                        },
                        beforeSend: function(){
                            $("#loading-humano").show();
                        },
                        success: function(data){
                            $("#loading-humano").hide();
                            if(parseInt(data.prompt) === 1){
                                alert("The request is not allowed, you can only be allowed to apply during nor must not exceed (7) days within this cut-off period.");
                            }else if(parseInt(data.prompt) === 0) {
                                alert("Successfully Updated! Please be noted that the approval might take a few days.");
                                window.location.hash = "/employee/holiday/requests/" + uid;
                                window.location.reload();
                            }
                        }
                    });
                }
            });

            $(document).off("click", ".aDelete").on("click", ".aDelete", function(e) {
                e.preventDefault();			
				var xuid = $(this).attr("data-index");
				$("#delete-uid").val(xuid);
			});

            function loadHolidayRequestAll() {
				var number = 0;
				$(tableID).DataTable().clear().destroy();
				$.getJSON(App.api + "/get/employee/holiday/requests/" + empUid, function(data) {
					$.each(data, function(i, item) {
						number++;
						var style;
						var action;
						switch(item.request_status){
							case "Pending":
                                style = "background-color: #fcf8e3";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger aDelete' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+"</div>";
                                break;
                            case "Denied":
                                style = "background-color: #f2dede";
                                action = "<div class='btn-group btn-group-sm'>"+
                                "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button><button name='aDelete' class='btn btn-outline-danger aDelete' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#overtimeDelete' title='Remove'><i class='fa-solid fa-xmark'></i></button>"+"</div>";
                                break;
                            case "Certified":
                                style = "background-color: #d9edf7";
                                action = "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                break;
                            default:
                                style = "background-color: #dff0d8";
                                action = "<button name='aEdit' class='btn btn-outline-success aEdit' data-index='"+ item.uid +"'data-bs-toggle='modal' data-bs-target='#editholidayRequest' title='Edit'><i class='fa-regular fa-pen-to-square'></i></button>";
                                break;
						}
						var $html = $(" \
							<tr> \
								<td style='"+style+"'>" + number + "</td> \
								<td style='"+style+"'>" + item.from + "</td> \
								<td style='"+style+"'>" + item.hours + "</td> \
								<td style='"+style+"'>" + item.reason + "</td> \
								<td style='"+style+"'>" + item.request_status + "</td> \
								<td style='"+style+"'>" + item.certBy + "</td> \
								<td style='"+style+"'>" + item.appBy + "</td> \
								<td style='"+style+"'>" + item.date_created + "</td> \
								<td style='"+style+"'>" + item.date_modified + "</td> \
								<td style='"+style+"'>" + action + "</td> \
							</tr> \
							");
						$("#table-krono-user-holiday-restday tbody").append($html);
					});
				});
			}
			loadHolidayRequestAll();
        });

        Path.map("#/users/logout/").to(function(){
            $.ajax({
                type: "POST",
                url: App.api + "/users/logout/" + App.token,
                data: {
                    user: localStorage.getItem("Username")
                },
                success: function() {
                    localStorage.clear();
                    window.location.href = "../auth/#/login/";
                }
            });
        }).enter(clearPanel);

        // PAYSLIP
        Path.map('#/payslip/:var').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-user-payslip"));
            var tableID = '#table-krono-user-payslip';
            renderToDataTablePrint(tableID);
        });

        // BILLING
        Path.map('#/user-billing/:var').to(function(){
            App.canvas.html("").append($.Mustache.render("krono-billing"));
            var tableID = '#table-krono-billing';
            renderToDataTablePrint(tableID);
        });

        Path.root('#/dashboard/:var');
        Path.listen();
    });
});


