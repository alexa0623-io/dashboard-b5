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
        authenticate: function() {
            if (App.token === 0 || App.token === null && App.username === 0 || App.username === null) {
                window.location.href = "../auth/#/login/";
            }else{
                $.ajax({
                    type: "POST",
                    url: App.api + "/system/tokens/verify",
                    dataType: "json",
                    data: {
                        token: App.token,
						userid: App.username
                    },
                    success: function(data) {
						App.userType = data.type;
                        if (parseInt(data.verified) === 0) {
                            window.location.href = "../auth/#/login/";
                        }
                    }
                });
            }
        },
        initialize: function() {
            App.authenticate();
            $("input[name=user]").val(localStorage.getItem("UserId"));
            $("#username").text(localStorage.getItem("Username"));
            // setInterval(function() {
            //     App.authenticate();
            // }, 60000);
			
			var empUid = App.username;
        },

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
        //     });s
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
               $('#request-btn').on('click', function(){
                    $("#request-arrow").toggleClass("rotate");
                    $("#report-arrow").removeClass("rotate");
               })

               $('#report-btn').on('click', function(){
                    $("#report-arrow").toggleClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                })

                $(".sidebar-link:not(#request-btn):not(#report-btn)").click(function() {
                    $("#report-arrow").removeClass("rotate");
                    $("#request-arrow").removeClass("rotate");
                });
            });
        },
        

        // Mobile view arrow
        mobileArrow: function() {
            $(document).ready(() => {
               $('.mrequest-btn').on('click', function(){
                    $("#mrequest-arrow").toggleClass("rotate");
                    $("#mreport-arrow").removeClass("rotate");
               })

               $('.mreport-btn').on('click', function(){
                    $("#mreport-arrow").toggleClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
                })

                $(".nav-link:not(.mrequest-btn):not(.mreport-btn)").click(function() {
                    $("#mreport-arrow").removeClass("rotate");
                    $("#mrequest-arrow").removeClass("rotate");
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
            $(document).ready(function () {
                $('#tab_input_file').on('change', function (e) {
                    var file = e.target.files[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $('#preview_image').attr('src', e.target.result);
                            $('#tab_img_view p').hide(); // Hide the "Image not available" text
                        }
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
            
        }
    }

    function clearPanel() {
        App.canvas.hide().fadeIn(200);
    }

    function getEmployeeDetails(){
        var results = getJSONDoc(App.api + "/get/tax/status/" + App.token);
            var resultList = [];
            var number = 0;			
            $.each(results, function(i,item){
                number ++;					
				var result = {
                    number,
                    uid: item.uid,
					taxStatus: item.type
                }
                resultList.push(result);
            });
			
			var nationality = getJSONDoc(App.api + "/json/nationality.json");
            var nationalList = [];			
			$.each(nationality, function(i, item){
				number ++;
				var nation = {
					number,
					name: item.name 
				}
				nationalList.push(nation);
			});

            // var uid = this.params["id"];

            var templateData = {
                response: resultList,
				national: nationalList,
                // uid: uid
            }
            console.log(templateData);
    }
    getEmployeeDetails();
    App.initialize();

    var temp = "";
	
	// if(App.userType == "Administrator") {
	// 	temp = "admin.html";
	// }else if(App.userType == "Employee") {
	// 	temp = "user.html";
	// 	//temp = "app.html";
	// }

    $.Mustache.load('templates/admin.html').done(function(){
        var data = getJSONDoc(App.api + "/get/user/data/" + App.username);
        var templateData = {
            empName:data.name
        }
        App.toggleSidebar();
        App.sidebarLink();
        App.deskArrow();
        App.mobileArrow();
        App.navbarLinkDropdown();
        App.uploadImage();
        // App.activePills();
        // App.dataTable();
        App.formValidation();
        // App.calendarDash();
        // App.calendarDash();
        App.sideCanvas.html("").append($.Mustache.render("side-nav",templateData));
        App.navCanvas.html("").append($.Mustache.render("admin-nav",templateData));

        
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

            var countperdept = getJSONDoc(App.api + "/number/of/employees/per/dept/");
            var countList = [];
            var total=0;
            $.each(countperdept,function(i,item){
                var countemp = {
                    deptname : item.deptname,
                    count: item.count
                }
                countList.push(countemp);
            });
            for(i=0;i<countperdept.length;i++)
                {
                    total += countperdept[i].count
                }
                console.log(total);
			
			var templateData = {
				newsfeed: newsfeedList,
				birthday: birthdayList,
				newemployee: newemployeeList,
                evaluation: evaluationList,
                empcount : countList,
                totalemp : total
			}			
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("dash-container",templateData));
            App.calendar();
            $('#table-birthday-celebration').DataTable({
                "order": [[0, 'desc']],
                "pageLength": 5,
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                },
                "searching": false,
                "lengthChange": false,
            });

            $('#table-new-employee').DataTable({
                "order": [[0, 'desc']],
                "pageLength": 5,
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                },
                "searching": false,
                "lengthChange": false,
            });
        });

        // MASTER FILE
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
            console.log(employeesList);
            var templateData = {
                employeesList:employeesList
            }
            
            App.canvas.html("").append($.Mustache.render("master",templateData));
            var tableID = '#table-master-file';
            renderToDataTable(tableID);
            

            $("#table-master-file tbody").off("click", ".update-empnum-btn").on("click", ".update-empnum-btn",function(){
                var empUid = $(this).attr('data-empuid');
                $.getJSON(App.api + "/employee/data/get/" + empUid + "." + App.token, function(data) {
                    $("input[name=curEmpNo]").val(data.empNumber);
                });

                $(document).off("submit", "#updateEmployeeNumberForm").on("submit", "#updateEmployeeNumberForm", function(e){
                    e.preventDefault();
                    var empNumber = $("input[name=empNo]").val();

                    if(!empNumber){
                        alert("Please Fill all The Fields!");
                    }else{
                        $.ajax({
                            type    : "POST",
                            url     : App.api + "/update/emp/number/" + empUid,
                            dataType: "json",
                            data    : {
                                empNumber: empNumber
                            },
                            success: function(data){
                                if(data.prompt == 0){
                                    $("form")[0].reset();
                                    $("#updateEmployeeNumberModal").modal("hide");
                                    window.location.reload();
                                }else{
                                    alert("Employee Number " + data.num + " is Taken.");
                                }
                            }
                        });
                    }
                });
            });

            $("#employeeTextboxHidden").hide();
            $("#new-emp-btn").hide();

            function enable() {
                $("input[name=firstname]").removeAttr("Disabled");
                $("input[name=middlename]").removeAttr("Disabled");
                $("input[name=lastname]").removeAttr("Disabled");
            }

            function disable() {
                $("input[name=firstname]").attr("Disabled", "Disabled");
                $("input[name=middlename]").attr("Disabled", "Disabled");
                $("input[name=lastname]").attr("Disabled", "Disabled");
            }

            function textboxClear() {
                $("input[name=firstname]").val("");
                $("input[name=middlename]").val("");
                $("input[name=lastname]").val("");
            }
            function validations(){
                $("input[name=firstname]").blur(function(e){
                    var firstname = $(this).val();
                    if(firstname.length == 0){
                        $("#error-message-firstname").text("Please fill this up.");
                    }else{
                        $("#error-message-firstname").empty();
                    }
                });

                $("input[name=middlename]").blur(function(){
                    var middlename = $(this).val();
                    if(middlename.length == 0){
                        $("#error-message-middlename").text("Please fill this up.");
                    }else{
                        $("#error-message-middlename").empty();
                    }
                });

                $("input[name=lastname]").blur(function(){
                    var lastname = $(this).val();
                    if(lastname.length == 0){
                        $("#error-message-lastname").text("Please fill this up.");
                    }else{
                        $("#error-message-lastname").empty();
                    }
                });

                $("select[name=usertype]").blur(function(){
                    var usertype = $(this).val();
                    if(usertype.length == 0){
                        $("#error-message-usertype").text("Please fill this up.");
                    }else{
                        $("#error-message-usertype").empty();
                    }
                });

                $("input[name=username]").blur(function(){
                    var username = $(this).val();
                    if(username.length == 0){
                        $("#error-message-username").text("Please fill this up.");
                    }else{
                        $("#error-message-username").empty();
                    }
                });
            }

            $(document).off("click", "#employeeSearch").on("click", "#employeeSearch", function(e){
                console.log("Button clicked");
                e.preventDefault();
                var firstname  = $("input[name=firstname]").val();
                var middlename = $("input[name=middlename]").val();
                var lastname   = $("input[name=lastname]").val();

                if(firstname == null || firstname == ""){
                    $("#error-message-firstname").text("Please fill this up.");
                    $("#error-message-firstname").fadeOut(3000);
                }else if(middlename == null || middlename == ""){
                    $("#error-message-middlename").text("Please fill this up.");
                    $("#error-message-middlename").fadeOut(3000);
                }else if(lastname == null || lastname == ""){
                    $("#error-message-lastname").text("Please fill this up.");
                    $("#error-message-lastname").fadeOut(3000);
                }else{
                    $.ajax({
                        type    : "POST",
                        url     : App.api + "/employee/name/search/",
                        dataType: "json",
                        data    : {
                            firstname : firstname,
                            middlename: middlename,
                            lastname  : lastname
                        },
                        success: function(data) {
                            $("#new-emp-btn").show();
                            if (data.status == 0) {
                                var status = confirm(firstname + " " + middlename + " " + lastname + " is deactivated. \n Reactivate account?");
                                if (status) {
                                    $.ajax({
                                        type: "POST",
                                        url : App.api + "/employee/status/update/",
                                        data: {
                                            status: 1,
                                            empUid: data.empUid
                                        },
                                        success: function() {
                                            $("form")[0].reset();
                                            alert(firstname + " " + middlename + " " + lastname + " activated");
                                        }
                                    });
                                }
                            } else if (data.status == 1) {
                                alert("Record already existing!");
                            } else {
                                $("#employeeTextboxHidden").show();
                                $("#employeeSearch").remove();
                                disable();
                            }
                        }
                    });
                }
            });

            $("#newEmployeeForm").submit(function(e) {
                e.preventDefault();
                var firstname  = $("input[name=firstname]").val();
                var middlename = $("input[name=middlename]").val();
                var lastname   = $("input[name=lastname]").val();
                var marital    = $("select[name=marital]").val();
                var usertype   = $("select[name=usertype]").val();
                var username   = $("input[name=username]").val();
                var password   = 123;
                // var salary = $("input[name=salary]").val();
                // var currency = $("select[name=currency]").val();
                // var payPeriod = $("select[name=payPeriod]").val();

                $.ajax({
                    type    : "POST",
                    url     : App.api + "/employee/new/",
                    dataType: "json",
                    data    : {
                        firstname : firstname,
                        middlename: middlename,
                        lastname  : lastname,
                        marital   : marital,
                        usertype  : usertype,
                        username  : username,
                        password  : password
                    },
                    success: function(data) {
                        if(data.error == 1){
                            alert(data.errorMessage);
                        }else{
                            alert(firstname + " " + middlename + " " + lastname + " has been added");
                            $("#newEmployee").modal("toggle");
                            $("form")[0].reset();
                            $("#employeeTextboxHidden").hide();
                            getEmployeesPages();
                        }
                    }
                });
            });

        });

        Path.map('#/master/file/modal/name/:empUid').to(function(){
            empUid = this.params["empUid"];
            
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

            var employeeStatus = getJSONDoc(App.api + "/get/emp/employment/status/" + empUid);
			var employeeStatusList = [];
			var empnum = 0;
			$.each(employeeStatus, function(i, item){
				empnum++;
				var employee = {
					no: empnum,
					type: item.type,
					dateHired: item.dateHired,
                    dateStarted: item.dateStarted,
					dateResigned: item.dateResigned,
					empStatusUid: item.empStatusUid
				}
				employeeStatusList.push(employee);
			});

            var departments = getJSONDoc(App.api + "/employee/departments/view/" + empUid + "." + App.token).list;
			var departmentList = [];
			var deptctr = 0;
			var kick = null;
			$.each(departments, function(i, item){
				deptctr++;
				var department = {
					no: deptctr,
					uid: item.uid,
					dept:item.dept,
					name: item.department,
                    post:item.position,
					status: item.status
				}
				kick = item.status;
				departmentList.push(department);
			});

            var salaries = getJSONDoc(App.api + "/employee/salary/get/" + empUid + "." + App.token);
			var salaryList = [];
			var salctr = 0;
			
			$.each(salaries, function(i, item){
				salctr++;
				var salary = {
					no: salctr,
					uid: empUid,
					baseSalary:item.baseSalary,
					payPeriodUid: item.payPeriodUid,
					salaryUid: item.salaryUid
				}
				salaryList.push(salary);
			});

            var empRules = getJSONDoc(App.api + "/emp/rules/data/" + empUid);
            var empRulesList = [];
            var rulectr = 0;
            $.each(empRules,function(i,item){
                rulectr++
                var empRule = {
                    rulectr,
                    ruleName:item.ruleName,
                    ruleUid:empUid+"."+item.ruleUid
                }
                empRulesList.push(empRule);
            });

            var empCostCenters = getJSONDoc(App.api + "/employee/costcenter/data/" + empUid);
            var empCostCenterList = [];
            var costctr = 0;
            $.each(empCostCenters,function(i,item){
                costctr++;
                var empCostCenter = {
                    ccname:item.ccName,
                    ccdesc:item.ccDesc,
                    empCostUid:item.empCostUid
                }
                empCostCenterList.push(empCostCenter)
            });

            var dependents = getJSONDoc(App.api + "/employee/dependent/pages/get/" + empUid + "." + App.token);
            var dependentsList = [];
            var depctr = 0;
            $.each(dependents,function(i,item){
                depctr++;
                var dependent = {
                    depctr,
                    name:item.name,
                    number:item.number,
                    relationship:item.relationship,
                    uid:item.employeeDependentUid
                }
                dependentsList.push(dependent);
            });

            var educbackgrounds = getJSONDoc(App.api + "/educational/background/" + empUid + "." + App.token);
            var educbackgroundList = [];
            var educctr = 0;

            $.each(educbackgrounds, function(i,item){
                educctr ++;   
                var result = {
                    number: educctr,
                    emp_uid: item.emp_uid,
                    level: item.level,
                    school: item.school,
                    major: item.major,
                    year: item.year,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status
                }
                educbackgroundList.push(result);
            });

            var workExperiences = getJSONDoc(App.api + "/get/employee/workexperience/" + empUid + "." + App.token);
            var workExperienceList = [];
            var workctr = 0;

            $.each(workExperiences, function(i,item){
                workctr ++;   
                var result = {
                    number: workctr,
                    emp_uid: item.emp_uid,
                    employer: item.employer,
                    position: item.position,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    status: item.status
                }
                workExperienceList.push(result);
            });

            var statusOptions = getJSONDoc(App.api + "/employment/status/get/" + App.token);
            var statusOptList = [];
            $.each(statusOptions,function(i,item){
                var statusOption = {
                    statusUid:item.employmentStatusUid,
                    statusName:item.name
                }
                statusOptList.push(statusOption);
            });
            
            var deptOptions = getJSONDoc(App.api + "/departments/view/" + App.token);
            var deptOptList = [];
            $.each(deptOptions,function(i,item){
                var deptOption = {
                    deptUid:item.uid,
                    department:item.department
                }
                deptOptList.push(deptOption);
            });

            var frequencyOptions = getJSONDoc(App.api + "/employee/salary/frequency/get/");
                var frequencyList = [];
                $.each(frequencyOptions,function(i,item){
                    var frequency = {
                        frequencyUid:item.frequencyUid,
                        frequencyName:item.frequencyName
                    }
                    frequencyList.push(frequency);
                });
            var rulesOptions = getJSONDoc(App.api + "/get/rules/number/");
            var rulesList = [];
            $.each(rulesOptions,function(i,item){
                var rule = {
                    ruleUid:item.ruleUid,
                    ruleName:item.ruleName
                }
                rulesList.push(rule)
            });

            var costCeneterOptions = getJSONDoc(App.api + "/get/costcenter/");
            var ccOptionList = []
            $.each(costCeneterOptions,function(i,item){
                ccOpts = {
                    costCenterUid:item.uid,
                    costCenterName:item.name,
                    costCenterDesc:item.description
                }
                ccOptionList.push(ccOpts);
            });

            var educationLevels = getJSONDoc(App.api + "/get/education/level/" + App.token);
            var educationLevelList = [];
            $.each(educationLevels,function(i,item){
                var educationLevel = {
                    educLevelUid:item.uid,
                    level:item.level
                }
                educationLevelList.push(educationLevel)
            });

            var templateData = {
                taxStatusList:taxStatusList,
                nationalList:nationalList,
                employeeStatusList:employeeStatusList,
                departmentList:departmentList,
                salaryList:salaryList,
                empRulesList:empRulesList,
                empCostCenterList:empCostCenterList,
                dependentsList:dependentsList,
                educbackgroundList:educbackgroundList,
                workExperienceList:workExperienceList,
                statusOptList:statusOptList,
                deptOptList:deptOptList,
                frequencyList:frequencyList,
                rulesList:rulesList,
                ccOptionList:ccOptionList,
                educationLevelList:educationLevelList
            }

            console.log(templateData);

            App.canvas.html("").append($.Mustache.render("master-file-modal-name",templateData));
            var employeeDetails = getJSONDoc(App.api + "/hris/employee/data/get/" + empUid + "." + App.token)
            console.log(employeeDetails);

            var selectors = ["input[name=firstname]","input[name=middlename]","input[name=lastname]","select[name=gender]","select[name=marital]","select[name=status]","input[name=bday]","input[name=email]","input[name=nickname]","input[name=driverLicense]","input[name=expiryLicense]","input[name=sssNo]","input[name=taxNo]","input[name=philhealthNo]","input[name=pagibigNo]","select[name=nationality]","select[name=tax-status]","input[name='housenumber']","input[name='barangay']","input[name='city']","input[name='region']","input[name='height']","input[name='weight']","input[name='bloodtype']"];

            function disableFields(){
                $.each(selectors,function(i,selector){
                    $(selector).attr("disabled", "disabled");
                })
            }
            disableFields();
            function enableFields(){
                $.each(selectors,function(i,selector){
                    $(selector).removeAttr('disabled');
                })
            }
            function employeePersonalDetails(){
                disableFields();
                $.getJSON(App.api + "/hris/employee/data/get/" + empUid + "." + App.token, function(data) {
                    if (data.status == 1) {
                        var status = "Active";
                    } else {
                        var status = "Inactive";
                    }
                    $("input[name=firstname]").val(data.firstname);
                    $("input[name=middlename]").val(data.middlename);
                    $("input[name=lastname]").val(data.lastname);
                    if (data.gender != "") {
                        $("select[name=gender] option[value='" + data.gender + "']").remove();
                        $("select[name=gender]").prepend("<option value='" + data.gender + "' selected>" + data.gender + "</option>");
                    } else {
                        $("select[name=gender]").prepend("<option value='' selected></option>");
                    }

                    if (data.marital != "") {
                        $("select[name=marital] option[value='" + data.marital + "']").remove();
                        $("select[name=marital]").prepend("<option value='" + data.marital + "' selected>" + data.marital + "</option>");
                    } else {
                        $("select[name=marital]").prepend("<option value='' selected></option>");
                    }

                    $("select[name=status] option[value='" + data.status + "']").remove();
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
                    //$("input[name=nationality]").val(data.nationality);
                    //localStorage.setItem("nationality", data.nationality);
                    
                    $("select[name=nationality] option[value='" + data.nationality + "']").remove();
                    $("select[name=nationality]").prepend("<option value='" + data.nationality + "' selected>" + data.nationality + "</option>");
                    
                    $("select[name=tax-status] option[value='" + data.taxStatusUid + "']").remove();
                    $("select[name=tax-status]").prepend("<option value='" + data.taxStatusUid + "' selected>" + data.taxStatus + "</option>");
            
                    $("input[name='housenumber']").val(data.housenumber);
                    $("input[name='barangay']").val(data.barangay);
                    $("input[name='city']").val(data.city);
                    $("input[name='region']").val(data.region);
                    $("input[name='height']").val(data.height);
                    $("input[name='weight']").val(data.weight);
                    $("input[name='bloodtype']").val(data.bloodtype);
                });
            }
            employeePersonalDetails();

            $("#update-btn").on("click",function(e){
                e.preventDefault();
                enableFields();
                $("#update-cont").prop("hidden",true);
                $("#submit-cont").prop("hidden",false);
            });
            $("#cancel-btn").on("click",function(){
                disableFields();
                $("#update-cont").prop("hidden",false);
                $("#submit-cont").prop("hidden",true);
            });
            $(document).off("submit", "#updateEmployee").on("submit", "#updateEmployee", function(e) {
                    e.preventDefault();
                    var firstname     = $("input[name=firstname]").val();
                    var middlename    = $("input[name=middlename]").val();
                    var lastname      = $("input[name=lastname]").val();
                    var gender        = $("select[name=gender]").val();
                    var marital       = $("select[name=marital]").val();
                    var nationality   = $("select[name=nationality]").val();
                    var bday          = $("input[name=bday]").val();
                    var email         = $("input[name=email]").val();
                    var nickname      = $("input[name=nickname]").val();
                    var driverLicense = $("input[name=driverLicense]").val();
                    var expiryLicense = $("input[name=expiryLicense]").val();
                    var sssNo         = $("input[name=sssNo]").val();
                    var taxNo         = $("input[name=taxNo]").val();
                    var philhealthNo  = $("input[name=philhealthNo]").val();
                    var pagibigNo     = $("input[name=pagibigNo]").val();
                    var status        = $("select[name=status]").val();
                    var taxStatus     = $("select[name=tax-status]").val();
                    var housenumber = $("input[name='housenumber']").val();
                    var barangay = $("input[name='barangay']").val();
                    var city = $("input[name='city']").val();
                    var region = $("input[name='region']").val();
                    var height = $("input[name='height']").val();
                    var weight = $("input[name='weight']").val();
                    var bloodtype = $("input[name='bloodtype']").val();
    
                    if(!firstname || !lastname){
                        alert("Should Not be Empty!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url : App.api + "/hris/employee/update/" + empUid + "." + App.token,
                            data: {
                                firstname    : firstname,
                                middlename   : middlename,
                                lastname     : lastname,
                                gender       : gender,
                                marital      : marital,
                                nationality  : nationality,
                                bday         : bday,
                                email        : email,
                                nickname     : nickname,
                                driverLicense: driverLicense,
                                expiryLicense: expiryLicense,
                                sssNo        : sssNo,
                                taxNo        : taxNo,
                                philhealthNo : philhealthNo,
                                pagibigNo    : pagibigNo,
                                status       : status,
                                taxStatus	 : taxStatus,
                                housenumber  : housenumber,
                                barangay     : barangay,
                                city: city,
                                region: region,
                                height: height,
                                weight: weight,
                                bloodtype: bloodtype
                            },
                            success: function() {
                                $("#update-cont").prop("hidden",false);
                                $("#submit-cont").prop("hidden",true);
                                alert("Data Updated");
                                employeePersonalDetails();
                                disableFields();
                            }
                        });
                    }
                });

            var tableID = ['#table-employee-status','#table-department','#table-salary','#table-rules','#table-cost-center','#table-dependents','#table-education','#table-work-experience',];
            $.each(tableID,function(i,item){
                renderToDataTable(item);
            });

            //Employment status start
            $("#table-employee-status tbody").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var uid = $(this).attr("data-uid");

                $.getJSON(App.api + "/get/single/emp/employment/status/" + uid, function(data){
                    console.log(data);
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("input[name=employeeStatusDateHiredEdit]").val(data.dateHired);
                    $("input[name=employeeStatusDateStartedEdit]").val(data.dateStarted);
                    $("input[name=employeeStatusDateResignedEdit]").val(data.dateResigned);
                    $("select[name=employeeStatusEdit]").val(data.statusUid);
                });

                function getEmploymentStatusPages(uid){
                    $.getJSON(App.api + "/get/emp/employment/status/" + uid, function(data){
                        $.each(data, function(i, item){
                            $("#td-type").text(item.type);
                            $("#td-datehired").text(item.dateHired);
                            $("#td-datestarted").text(item.dateStarted);
                            $("#td-dateresigned").text(item.dateResigned);
                        });
                        console.log(data);
                    });
                }

                $(document).off("submit", "#editEmpStatusForm").on("submit", "#editEmpStatusForm", function(e){
                    e.preventDefault();
                    var employeeStatus = $("select[name=employeeStatusEdit]").val();
                    var dateHired = $("input[name=employeeStatusDateHiredEdit]").val();
                    var dateStarted = $("input[name=employeeStatusDateStartedEdit]").val();
                    var dateResigned = $("input[name=employeeStatusDateResignedEdit]").val();
                    var status = 0;
                    if ($("input[name='status']").val()==="Enable"){
                        status = 1;
                    }

                    if(!employeeStatus || !dateHired){
                        alert("Please Fill the required Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/update/emp/employment/status/" + uid,
                            data: {
                                employeeStatus : employeeStatus,
                                dateHired : dateHired,
                                dateStarted: dateStarted,
                                dateResigned : dateResigned,
                                status : status
                            },
                            success: function(){
                                alert("Success!");
                                $("#edit-modal").modal("toggle");
                                $("#editEmpStatusForm")[0].reset();
                                getEmploymentStatusPages(empUid);
                            }
                        });
                    }
                });
            });
            //Employment status end

            //Department start
            $(document).off("click", ".edit-department").on("click", ".edit-department", function(e){
                e.preventDefault();
				var uid = $(this).attr("data-uid");
				var dept = $(this).attr("data-dept");
                var post = $(this).attr("data-post");
				
                $("select[name=edit-department]").val(dept);
                $("input[name=edit-position]").val(post);

                $("#form-editDepartment").on('submit',function(e){
                    e.preventDefault();
                    var department = $("select[name=edit-department]").val();
                    var position = $("input[name=edit-position]").val();
                   
                    $.ajax({
                        type: "POST",
                        url: App.api + "/employee/department/edit/" + uid + "." + App.token,
                        dataType: "json",
                        data: {
                            uid: uid,
                            department: department,
                            position: position
                        },
                        success: function(data){
                            if(parseInt(data.success) === 1){
                                $("#edit-department").modal("toggle");
                                $("#form-editDepartment")[0].reset();
                                getDepartmentDetails(empUid);
                            }
                        }
                    });
                });
			});

            function getDepartmentDetails(empUid){
                $.getJSON(App.api + "/employee/departments/view/" + empUid + "." + App.token,function(data){
                    console.log(data.list);
                    $.each(data.list, function(i, item) {
                        $("#td-deptname").text(item.department);
                        $("#editBtn").attr("data-uid",item.uid);
                        $("#editBtn").attr("data-dept",item.dept);
                        $("#editBtn").attr("data-post",item.position);
                    });
                });
            }
            //Department End

            $("#table-salary tbody").off("click",".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();

                // validationForEdit();

                var data = $(this).attr("data-salary-uid");
                var dataIndex = data.split(".");

                var uid = dataIndex[0];
                var salaryUid = dataIndex[1];

                $.getJSON(App.api + "/salary/details/get/" + salaryUid + "." + App.token, function(data) {
                    console.log(data);
                    if (data.status == 1) {
                        $("input[name='status']").prop("checked", true);
                    } else {
                        $("input[name='status']").prop("checked", false);
                    }

                    $("input[name=employee-salary-base-salary-edit]").val(data.baseSalary);
                    $("select[name=pay-period-edit]").val(data.frequencyUid);
                });

                $(document).off("submit", "#editSalaryForm").on("submit", "#editSalaryForm", function(e) {
                    e.preventDefault();
                    var baseSalary = $("input[name=employee-salary-base-salary-edit]").val();
                    var payPeriodUid = $("select[name=pay-period-edit]").val();
                    var status = 0;
                    if ($("[name='status']").is(":checked")) {
                        status = 1;
                    }
                    console.log(baseSalary+" "+payPeriodUid+" "+status);
                    if(!baseSalary || !payPeriodUid){
                        alert("Please Fill All The Fields!");
                    }
                    else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employee/salary/update/" + salaryUid + "." + App.token,
                            data: {
                                uid: uid,
                                baseSalary: baseSalary,
                                payPeriodUid: payPeriodUid,
                                status: status
                            },
                            success: function(data) {  
                                alert("Successfully Updated!");
                                $("#edit-salary").modal("toggle");
                                employeeSalary(empUid)
                            }
                        });
                    }
                });
            });
            function employeeSalary(empUid){
                $.getJSON(App.api + "/employee/salary/get/" + empUid + "." + App.token, function(data){
                    $.each(data,function(i,item){
                        $("#td-baseSalary").text(item.baseSalary);
                        $("#td-payPeriodUid").text(item.payPeriodUid);
                        $("#editSalbtn").attr('data-salary-uid',empUid+"."+item.salaryUid);
                    });
                });
            }
            //Salary End

            //Rule Assignment Start
            function getEmpRulesDetails(empuid){
                $.getJSON(App.api + "/emp/rules/data/" + empuid, function(data){
                    console.log(data)
                    $.each(data,function(i,item){
                        $("#td-ruleName").text(item.ruleName);
                        $(".edit-btn").attr("data-uid",empUid+"."+item.ruleUid);
                    });
                });
            }

            $("#table-rules tbody").on("click","td .edit-btn",function(e){
                e.preventDefault();
                var datauid = $(this).attr("data-uid");
                var dataUids = datauid.split(".");
                var empuid = dataUids[0];
                var ruleUid = dataUids[1];

                $.getJSON(App.api + "/employee/rules/data/" + ruleUid, function(data){
                    console.log(data.status);
                    if (data.status = 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("select[name=employeeRulesEdit]").val(data.ruleUid);
                });

                $(document).off("submit", "#edit-rule-form").on("submit", "#edit-rule-form", function(e){
                    e.preventDefault();

                    var rule = $("select[name=employeeRulesEdit]").val();
                    var status = 0;
                    if($("input[name=status]")==="Enable"){
                        status = 1;
                    }

                    $.ajax({
                        type: "POST",
                        url: App.api + "/employee/rules/update/" + ruleUid,
                        data: {
                            rule: rule,
                            status: status
                        },
                        beforeSend: function(){
                            $(".pLoading").show();                      
                        },
                        success: function(){
                            $(".pLoading").hide();
                            getEmpRulesDetails(empuid);                   
                            alert("Successfully Updated!");
                            $("#edit-rules").modal("toggle");
                        }
                    });
                });
            });
            //Rule Assignment End
            //Cost Center Start
            $("#table-cost-center tbody").on("click",".edit-btn", function(){
                var datauid = $(this).attr("data-uid");
                console.log(datauid);
                $.getJSON(App.api + "/employee/costcenter/single/data/" + datauid, function(data){
                    if (data.status = 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("select[name=edit-cost-center]").val(data.costUid);
                });

                $(document).off("submit", "#edit-costcenter-form").on("submit", "#edit-costcenter-form", function(e){
                    e.preventDefault();
                    var costcenter = $("select[name=edit-cost-center]").val();
                    var status = 0;
                    if($("input[name=status]").val()==="Enable"){
                        status = 1;
                    }

                    if(!costcenter){
                        alert("Please Fill all the fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employee/update/costcenter/" + datauid,
                            data: {
                                costcenter : costcenter,
                                status     : status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(){
                                alert("Successfully Updated!");
                                $("#edit-cost-center").modal("toggle");
                                getEmpCostCenter(empUid);
                            }
                        });
                    }
                });
            });
            function getEmpCostCenter(empUid){
                $.getJSON(App.api + "/employee/costcenter/data/" + empUid, function(data){
                    console.log(data);
                    $.each(data,function(i,item){
                        $("#td-ccname").text(item.ccName);
                        $("#td-ccdesc").text(item.ccDesc);
                        $(".edit-btn").attr("data-uid",item.empCostUid);
                    });
                });
            }
            //Cost Center End
            //Dependents Start
            $(document).off("submit", "#new-dependent-form").on("submit", "#new-dependent-form", function(e) {
                e.preventDefault();

                var dependentName = $("input[name=dependentName]").val();
                var dependentRelationship = $("select[name=dependentRelationship]").val();
                var dependentBday = $("input[name=dependentBday]").val();
                var dependentNumber = $("input[name=dependentNumber]").val();

                console.log(dependentName +" "+ dependentRelationship+" "+dependentBday+" "+dependentNumber)

                if(!dependentName || !dependentRelationship || !dependentBday || !dependentNumber){
                    alert("Please Fill All The Fields");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/employee/dependent/new/" + empUid + "." + App.token,
                        data: {
                            dependentName: dependentName,
                            dependentRelationship: dependentRelationship,
                            dependentBday: dependentBday,
                            dependentNumber: dependentNumber
                        },
                        success: function() {
                            alert("Successfully Added!");
                            $("#new-Dependents").modal("toggle");
                            $("input[name=dependentName]").val("");
                            $("select[name=dependentRelationship]").val("");
                            $("input[name=dependentBday]").val("");
                            $("input[name=dependentNumber]").val("");
                            getEmployeeDependentPages(empUid);
                        }
                    });
                }
            });

            function getEmployeeDependentPages(empUid){
                var num = 0
                var dependents = getJSONDoc(App.api + "/employee/dependent/pages/get/" + empUid + "." + App.token)
                $.each(dependents,function(i,item){
                    num++;
                    $("#td-depctr").text(num);
                    $("#td-name").text(item.name);
                    $("#td-number").text(item.number);
                    $("#td-relationship").text(item.relationship)
                });
            };

            $("#table-dependents tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var depUid = $(this).attr("data-uid");
                console.log(depUid);
                $.getJSON(App.api + "/employee/dependent/view/" + empUid + "." + depUid + "." + App.token, function(data) {
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("input[name=dependentNameUpdate]").val(data.name);
                    $("select[name=dependentRelationshipUpdate]").val(data.relationship)
                    $("input[name=dependentBdayUpdate]").val(data.bday);
                    $("input[name=dependentNumberUpdate]").val(data.number);
                });
                
                $(document).on("submit", "#edit-dependent-form", function(e){
                    e.preventDefault();
                    var dependentName = $("input[name=dependentNameUpdate]").val();
                    var dependentRelationship = $("select[name=dependentRelationshipUpdate]").val();
                    var dependentBday = $("input[name=dependentBdayUpdate]").val();
                    var dependentNumber = $("input[name=dependentNumberUpdate]").val();
                    var status = 0;
                    console.log(dependentName+" "+dependentRelationship+" "+dependentBday+" "+dependentNumber);
                    if ($("input[name='status']").val()=="Enable") {
                        status = 1;
                    }
                    if(!dependentName || !dependentRelationship || !dependentBday || !dependentNumber){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employee/dependent/update/" + empUid + "." + depUid + "." + App.token,
                            data: {
                                dependentName: dependentName,
                                dependentRelationship: dependentRelationship,
                                dependentBday: dependentBday,
                                dependentNumber: dependentNumber,
                                status: status
                            },
                            success: function() {
                                alert("Successfully Added!");
                                $("#editEmpDependent").modal("toggle");
                                $("input[name=dependentNameUpdate]").val("");
                                $("select[name=dependentRelationshipUpdate]").val("");
                                $("input[name=dependentBdayUpdate]").val("");
                                $("input[name=dependentNumberUpdate]").val("");
                                getEmployeeDependentPages(empUid);
                            }
                        });
                    }
                });
            });
            //Dependents End

            //Education Start
            $("#newEducationForm").on("submit", function(e) {
                e.preventDefault();

                $(".empLoading").show();

                var level = $("select[name='employeeLevel']").val();
                var school = $("input[name='employeeSchool']").val();
                var major = $("input[name='employeeMajor']").val();
                var year = $("input[name='employeeYear']").val();
                var dstart = $("input[name='employeeDatestart']").val();
                var dend = $("input[name='employeeDateend']").val();

                $.ajax({
                    type: "POST",
                    url: App.api + "/educational/addnew/" + empUid + "." + App.token,
                    dataType: "json",
                    data: {
                        empid: uid,
                        level: level,
                        school: school,
                        major: major,
                        year: year,
                        dstart: dstart,
                        dend: dend
                    },
                    success: function(data){                        
                        if(parseInt(data.success) === 1) {
                            $(".empLoading").hide();
                            alert("Successfully added record!");
                            window.location.reload();   
                        }                    
                    }
                });
            });
            //Education End
            //Work Experience Start
            $("#newWorkExForm").on("submit", function(e) {
                e.preventDefault();

                $(".empLoading").show();

                var employer = $("input[name='employerName']").val();
                var position = $("input[name='employmentPosition']").val();
                var dstart = $("input[name='employeeDatestart']").val();
                var dend = $("input[name='employeeDateend']").val();
                var status = $("input[name='employmentStatus']").val();

                $.ajax({
                    type: "POST",
                    url: App.api + "/workexperience/addnew/" + uid + "." + App.token,
                    dataType: "json",
                    data: {
                        employer: employer,
                        position: position,
                        dstart: dstart,
                        dend: dend,
                        status: status
                    },
                    success: function(data){                        
                        if(parseInt(data.success) === 1) {
                            $(".empLoading").hide();
                            alert("Successfully added record!");
                            window.location.reload();   
                        }                    
                    }
                });
            });
            //Work Experience End

        });

        // RESUME
        Path.map('#/resume-application/').to(function(){
            App.canvas.html("").append($.Mustache.render("resume"));
            $('#table-resume-aplication').DataTable({
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

        // RESUME NEW BTN
        Path.map('#/resume-button/').to(function(){
            App.canvas.html("").append($.Mustache.render("resume-btn"));
        });


        // SETTINGS

         // Company setup
         Path.map('#/settings-setup/').to(function(){
            var company = getJSONDoc(App.api + "/company/setup/" + App.token);
            var setupList = [];
            var number = 0;
			var status = "Disabled";
			
            $.each(company, function(i,item){
                number ++;				
				if(parseInt(item.status) === 1) {
					status = "Enabled";
				}
				
				var companySetup = {
                    number,
                    uid: item.uid,
					items: item.items,
					code: item.code,
					content: item.content,
					status: status
                }
                setupList.push(companySetup);
            });

            var templateData = {
                companySetup: setupList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("company-setup",templateData));
            var tableID = '#table-company-setup';
            renderToDataTable(tableID);
            

            $("#new-settings-form").submit(function(e) {
				e.preventDefault();
				
				var items = $("input[name=items]").val();
				var content = $("input[name=content]").val();
				
				$.ajax({
                    type: "POST",
                    url: App.api + "/company/setup/add/" + App. token,
                    dataType: "json",
                    data: {
                        items: items,
                        content: content
                    },
                    success: function(data){
                        alert("Successfully Add New Items!");                        
                        if(parseInt(data.success) === 1) {
							//window.location.hash = "/company-setup/";
							// window.location.reload();
                        }
                    }
                });
			});

            $(document).off("click", ".edit-settings").on("click", ".edit-settings", function(e){
                e.preventDefault();
				var uid = $(this).attr("data-id");
				$("input[name=edit-uid]").val(uid);
				function loadSettings() {
					console.log(uid);
					$.getJSON(App.api + "/company/setup/view/" + uid + "." + App.token, function(data) {
						$.each(data, function(i, item) { 
							$("input[name=edit-items]").val(data.items);
							$("input[name=edit-content]").val(data.content);							
							if (parseInt(data.status) === 1) {
                                $("input[value=Enable]").prop('checked',true);
							} else {
								$('input[value=Disable]').prop('checked',true);
							}	
						});
						
						// $("input[name='edit-status']").bootstrapSwitch({
						// 	onText: "Enable",
						// 	offText: "Disable"
						// });
					});

				}
				loadSettings();
			});
			
			$("#editSettings").submit(function(e) {
				e.preventDefault();
				var uid = $("input[name=edit-uid]").val();
				var items = $("input[name=edit-items]").val();
				var content = $("input[name=edit-content]").val();
				var status = 0;
				if ($("input[name=edit-status]:checked").val() == "Enable") {
					status = 1;
				}
                else
                {
                    status = 0;
                }
				
				$.ajax({
                    type: "POST",
                    url: App.api + "/company/setup/edit/" + uid + "." + App.token,
                    dataType: "json",
                    data: {
                        items: items,
                        content: content,
						status: status
                    },
                    success: function(data){
                        alert("Successfully Updated!");                        
                        if(parseInt(data.success) === 1) {
							window.location.reload();
                        }
                    }
                });
			});
        });

        // Announcement
        Path.map('#/settings-announcements/').to(function(){
            var number = 0
            var announcementList = []; 
            var announcements = getJSONDoc(App.api + "/get/annoucement/" + App.token);
            $.each(announcements, function(i,item){
                number++;
                var announcement ={
                    number:number,
                    announceuid:item.uid,
                    content:item.content,
                    date:dateToISOFormat(item.date)
                }
                announcementList.push(announcement)
            });
            console.log(announcementList);
            var templateData = {
                announcements: announcementList
            }

            App.canvas.html("").append($.Mustache.render("announcements",templateData));
            var tableID = '#table-announcement';
            renderToDataTable(tableID); 
            
            $("#addAnnouncement").submit(function(e){
                e.preventDefault();
                var empUid = App.username;
                var useruid = empUid;
                var content = $("textarea[name=content]").val();

                $.ajax({
                    type: "POST",
                    url: App.api + "/new/newsfeed/" + App.token,
                    dataType: "json",
                    data: { 
                        useruid: useruid,
                        content: content 
                    }, 
                    success: function(data){
                        alert("Successfully Added!");
                        window.location.reload();
                    }
                });
            });

            $("#table-announcement tbody").off("click", ".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();
                var annoucementUid = $(this).attr("data-index");
                $.getJSON(App.api + "/announcement/data/get/" +  annoucementUid + "." + App.token, function(data) {
                    $.each(data, function(i, item){
                        //console.log(item)
                         $("textarea[name=edit-content]").val(item.content);
                         $("input[name=edit-uid]").val(annoucementUid);
                    })                   
                });
            });

            $("#edit-announcement").submit(function(e){
                e.preventDefault();
                var content = $("textarea[name=edit-content]").val();
                var uid = $("input[name=edit-uid]").val();
                $.ajax({
                    type: "POST",
                    url: App.api + "/announcement/update/" + uid + "." + App.token,
                    dataType: "json",
                    data: {
                        content: content
                    },
                    success: function(data){
                        alert("Successfully Updated");
                        window.location.reload();
                    }
                });
            });

            $("#table-announcement tbody").off("click", ".delete-btn").on("click", ".delete-btn", function(e) {
                e.preventDefault();
                var annoucementUid = $(this).attr("data-index");
                $(document).off("submit", "#delete-announcement").on("submit", "#delete-announcement", function(e){
                    e.preventDefault();
                    $.getJSON(App.api + "/delete/announcement/request/" + annoucementUid, function(data){
                        alert("Successfully Removed!");
                        window.location.reload();
                    });
                });
            });

        });

        // Cost Center
        Path.map('#/settings-center/').to(function(){
            var num = 0;
            var frequencyList = [];
            var frequencies = getJSONDoc(App.api + "/employee/salary/frequency/get/")
            console.log(frequencies);
            $.each(frequencies,function(i,item){
                var frequency = {
                    number:num,
                    frequencyuid:item.frequencyUid,
                    frequencyname:item.frequencyName,
                }
                frequencyList.push(frequency)
            });

            var number = 0;
            var costCeneterList = []
            var costCenters = getJSONDoc(App.api + "/get/costcenter/");
            $.each(costCenters,function(i,item){
                number++;
                var costCenter = {
                    number:number,
                    costcenteruid:item.uid,
                    costcentername:item.name,
                    costceneterdesc:item.description,
                    payperiod:item.payperiod,
                    status:item.status
                }
                costCeneterList.push(costCenter)
            });
            var templateData = {
                costCenterList:costCeneterList,
                frequencyList:frequencyList
            }
            console.log(templateData);

            App.canvas.html("").append($.Mustache.render("cost-center",templateData));
            var tableID = '#table-cost-center';
            renderToDataTable(tableID);

            $(document).off("submit", "#addCostCenter").on("submit", "#addCostCenter", function(e){
                e.preventDefault();

                var name = $("input[name=costcenter]").val();
                var desc = $("input[name=ccDescription]").val();
                var payperiod = $("select[name=selPayPeriod]").val();

                if(!name || !desc || !payperiod){
                    alert("Please Fill all the Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/add/costcenter/",
                        dataType: "json",
                        data: {
                            name: name,
                            desc: desc,
                            payperiod: payperiod
                        },
                        beforeSend: function(){
                            $(".empLoading").show();
                        },
                        success: function(data){
                            $(".empLoading").hide();
                            if(data.prompt == 1){
                                alert("Data Exists!");
                                $("input[name=costcenter]").val("");
                                $("input[name=ccDescription]").val("");
                                window.location.reload();
                            }else if(data.prompt == 0){
                                alert("Successfully Added!");
                                window.location.reload()
                            }
                        }
                    });
                }
            });

            $("#table-cost-center tbody").off("click", ".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();
                var costcenteruid = $(this).attr("data-index");
                $.getJSON(App.api + "/get/costcenter/data/" + costcenteruid, function(data){
                    if(data.status==1){
                        $("input[value=Enable]").prop('checked',true);
                    }else{
                        $('input[value=Disable]').prop('checked',true);
                    }

                    $("input[name=cost-center-edit]").val(data.ccName);
                    $("input[name=cost-center-desc-edit]").val(data.ccDesc);
                    $("#sel-pay-period-edit option[value="+ data.payperiodUid+"]").prop('selected',true);
                });

                $(document).off("submit", "#form-cost-center-edit").on("submit", "#form-cost-center-edit", function(e){
                    e.preventDefault();
                    var name = $("input[name=cost-center-edit]").val();
                    var desc = $("input[name=cost-center-desc-edit]").val();
                    var payperiod = $("select[name=sel-pay-period-edit]").val();
                    var status = 0;
                    if ($("input[name='status']:checked").val()==='Enable') {
                        status = 1;
                    }
                    console.log(name +" "+ desc +" "+ payperiod +" "+ status)
    
                    if(!name || !desc){
                        alert("Please Fill all the Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/update/costcenter/" + costcenteruid,
                            dataType: "json",
                            data: {
                                name: name,
                                desc: desc,
                                payperiod: payperiod,
                                status: status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(data){
                                $(".empLoading").hide();
                                if(data.prompt == 0){
                                    alert("Successfully Updated!");
                                    window.location.reload();
                                    // return false;
                                }
                            }
                        });
                    }
                });
            });
            
        });

        // Department
        Path.map('#/settings-department/').to(function(){
            var departments = getJSONDoc(App.api + "/departments/view/" + App.token);
			var departmentList = [];
			var ctr = 0;
			
			$.each(departments, function(i, item){
				ctr++;
				var department = {
					number: ctr,
					deptuid: item.uid,
					deptname:item.department,
					status: item.status
				}
				departmentList.push(department);
			});

			var templateData = {
				departments: departmentList
			}

            App.canvas.html("").append($.Mustache.render("department",templateData));
            var tableID = '#table-department';
            renderToDataTable(tableID);

            $("#new-department").submit(function(e){
                e.preventDefault();
                var department = $("input[name=add-department]").val();
                $.ajax({
                    type: "POST",
                    url: App.api + "/department/new/" + App.token,
                    dataType: "json",
                    data: {
                        department: department
                    },
                    success: function(data){
                        if(parseInt(data.success) === 1){
                            window.location.reload();
                        }
                        else if(parseInt(data.success) === 0) {
                            alert("Department Already Exist")
                        }
                    }
                });
            });

            $(document).off("click", ".edit-btn-department").on("click", ".edit-btn-department", function(e){
                e.preventDefault();
				var deptuid = $(this).attr("data-index");
                console.log(deptuid);
				$.getJSON(App.api + "/departments/view/edit/" + deptuid + "." + App.token, function(data){
					$.each(data, function(i, item){
                        console.log(data);
						if(item.status == 1) {
							$("input[name='edit-status']").prop("checked", true);
						}else {
							$("input[name='edit-status']").prop("checked", false);
						}
						$("input[name=edit-department]").val(item.department);
					});
				});

                $("#edit-department").submit(function(e){
                    e.preventDefault();
                    var department = $("input[name=edit-department]").val();
                    var status = 0;
                    if ($("input[name='edit-status']").is(":checked")) {
                        status = 1;
                    }
                    
                    $.ajax({
                        type: "POST",
                        url: App.api + "/department/edit/" + deptuid + "." + App.token,
                        dataType: "json",
                        data: {
                            department: department,
                            status: status
                        },
                        success: function(data){
                            if(parseInt(data.success) === 1){
                                alert("Department Updated Successfully");
                                window.location.reload();
                            }
                            else if(parseInt(data.success) === 0) {
                                alert("Something went wrong");
                            }
                        }
                    });
                });
			});
        });

        // Education Level
        Path.map('#/settings-education/').to(function(){
            var educlevels = getJSONDoc(App.api + "/get/education/level/" + App.token);
            var educlevelsList = [];
            var number = 0;

            $.each(educlevels, function(i,item){
                var status = "Disabled";
                if(item.status!=0) {
                    status = "Enabled";
                }

                number ++;   
                var level = {
                    number: number,
                    leveluid: item.uid,
                    level: item.level,
                    status: status
                }
                educlevelsList.push(level);
            });

            var templateData = {
                levelTable : educlevelsList
            }

            App.canvas.html("").append($.Mustache.render("education-level",templateData));
            var tableID ='#table-education-level';
            renderToDataTable(tableID);

            $("#new-educ-level-form").submit(function(e) {
                e.preventDefault();

                var level = $("input[name='add-edu-level']").val();

                $.ajax({
                    type: "POST",
                    url: App.api + "/educational/level/" + App.token,
                    dataType: "json",
                    data: {
                        level: level
                    },
                    success: function(data){                        
                        if(parseInt(data.success) === 1) {
                            alert("Successfully added record!");
                            window.location.reload();   
                        }                    
                    }
                });
            });

            $(document).off("click", ".edit-btn-level").on("click", ".edit-btn-level", function(e){
                e.preventDefault();
                var leveluid = $(this).attr("data-uid");
                $.getJSON(App.api + "/get/education/level/" + App.token, function(data) {
                    $.each(data, function(i, item) {
                        if(leveluid === item.uid) {
                            $("input[name=edit-level").val(item.level);
                        }
                    });
                });



            });

        });

        // Employment Status
        Path.map('#/settings-status/').to(function(){
            var number = 0;
            var empstatusList = [];
            var empstatuses = getJSONDoc(App.api + "/employment/status/pages/get/" + App.token);
            console.log(empstatuses);
            $.each(empstatuses,function(i,item){
                number++
                var empstatus = {
                    number:number,
                    statusuid:item.employmentStatusUid,
                    statusname:item.name,
                }
                empstatusList.push(empstatus);
            });

            var templateData = {
                empstatusList:empstatusList
            }

            App.canvas.html("").append($.Mustache.render("employment-status",templateData));
            var tableID = '#table-employment-status';
            renderToDataTable(tableID);

            $("#new-empstatus-form").on("submit", function(e){
                e.preventDefault();
                var empStatus = $("input[name=empstatus]").val();
                if(!empStatus){
                    alert("Please Fill All the Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/employment/status/new/" + App.token,
                        dataType: "json",
                        data: {
                            name:empStatus
                        },
                        success: function(data){
                            alert("Successfully Added!");
                            window.location.reload();
                        }
                    });
                }
            });
            
            $("#table-employment-status tbody").off("click", ".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();
                var empstatusuid = $(this).attr("data-uid");
                $.getJSON(App.api + "/employment/status/details/get/" + empstatusuid + "." + App.token, function(data){
                    console.log(data);
                    if (data.status == 1) {
                        $("input[value='Enable']").prop("checked", true);
                    } else {
                        $("input[value='Disable']").prop("checked", true);
                    }
                    $("input[name='edit-empstatus']").val(data.name);
                });

                $(document).off("submit", "#edit-empStatus-form").on("submit", "#edit-empStatus-form", function(e){
                    e.preventDefault();

                    var empStatus = $("input[name=edit-empstatus]").val();
                    var status = 0 

                    if ($("input[name='status']:checked").val() === 'Enable'){
                        status = 1;
                    }
                    console.log(empStatus + " " + status);

                    if(!empStatus){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/employment/status/update/" + empstatusuid + "." + App.token,
                            dataType: "json",
                            data: {
                                name: empStatus,
                                status: status
                            },
                            success: function(data){
                                alert("Employment Status updated successfully!");
                                window.location.reload();
                            }
                        });
                    }
                });
            });
            
        });

        // Holiday
        Path.map('#/settings-holiday/').to(function(){
            var number = 0;
            var holidaysList = [];
            var holidays = getJSONDoc(App.api + "/holiday/pages/get/");
            $.each(holidays, function(i, item){
                number++;
                var holiday = {
                    number:number,
                    holidayUid:item.holidayUid,
                    holidayName:item.name,
                    holidayDate:item.date
                }
                holidaysList.push(holiday);
            });
            var holidayTypes = getJSONDoc(App.api + "/holiday/type/get/");
            var templateData = {
                holidayLists:holidaysList,
                holidaytypeList:holidayTypes
            }
            App.canvas.html("").append($.Mustache.render("holiday",templateData));
            var tableID = '#table-holiday';
            renderToDataTable(tableID);

            $(document).off("submit", "#new-holiday-form").on("submit", "#new-holiday-form",function(e){
                e.preventDefault();
                var type = $("select[name=holidayType]").val();
                var name = $("input[name=holidayName]").val();
                var date = $("input[name=holidayDate]").val();
                console.log(type + " " + name + " " + date);

                if(name == "" || date == ""){
                    alert("Please Fill All The Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/holiday/new/",
                        data: {
                            type: type,
                            name: name,
                            date: date
                        },
                        beforeSend: function(){
                            $(".empLoading").show();
                        },
                        success: function(){
                            alert("Successfully Added!");
                            window.location.reload();
                        }
                    });
                }
            });

            $("#table-holiday tbody").off("click", ".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();   
                var holidayuid = $(this).attr("data-uid");
                
                $.getJSON(App.api + "/holiday/details/get/" + holidayuid, function(data){
                    console.log(data);
                    if(data.status == 1){
                        $("input[value='Enable']").prop("checked", true);
                    }else{
                        $("input[name='Disable']").prop("checked", true);   
                    }

                    $("input[name=holidayNames]").val(data.name);
                    $("input[name=holidayDates]").val(data.date);
                    $("select[value="+data.type+"]").prop("selected",true);
                });

                $(document).off("submit", "#edit-holiday-form").on("submit", "#edit-holiday-form", function(e){
                    e.preventDefault();

                    var type = $("select[name=holidayTypes]").val();
                    var name = $("input[name=holidayNames]").val();
                    var date = $("input[name=holidayDates]").val();
                    console.log(type+" "+name+" "+date+" ");
                    var status = 0;
                    if ($("input[name='status']:checked").val()==="Enable") {
                        status = 1;
                    }
                     
                    if(!name || !date){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/holiday/edit/details/" + holidayuid,
                            data: {
                                type: type,
                                name: name,
                                date: date,
                                status: status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(){
                                alert("Successfully Updated!");
                                window.location.reload();
                            }
                        });
                    }
                });
            });
        });

        // Leave Counts
        Path.map('#/settings-leave/').to(function(){
            employees = getJSONDoc(App.api + "/get/employee/name/" + App.token);
            var number = 0;
            var leaveCountList = [];
            var leavecounts = getJSONDoc(App.api + "/get/emp/leave/counts/pages/");
            $.each(leavecounts,function(i,item){
                number++;
                var leavecount = {
                    number:number,
                    empNo:item.empNo,
                    empuid:item.id,
                    empName:item.empName,
                    SL:item.SL,
                    BL:item.BL,
                    BV:item.BV,
                    VL:item.VL,
                    W:item.w,
                    ML:item.ML,
                    PL:item.PL,
                    leavecountUid:item.leaveCountUid
                }
                leaveCountList.push(leavecount)
            });
            var templateData = {
                leaveCountsList : leaveCountList,
                employeeList : employees,
                year : new Date().getFullYear()
            }
            App.canvas.html("").append($.Mustache.render("leave-counts",templateData));
            tableID = '#table-leave-counts';
            renderToDataTable(tableID);

            $(document).off("submit", "#new-leaveCount-form").on("submit", "#new-leaveCount-form", function(e){
                e.preventDefault();
                var emp = $("select[name=employeeName]").val();
                var sL = $("input[name=sickLeave]").val();
                var bL = $("input[name=bdayLeave]").val();
                var brL = $("input[name=breavLeave]").val();
                var vL = $("input[name=vacLeave]").val();
                var mL = $("input[name=matLeave]").val();
                var pL = $("input[name=patLeave]").val();

                console.log(emp+" "+sL+" "+bL+" "+brL+" "+vL+" "+mL+" "+pL);

                if(!emp || !sL || !bL || !brL || !vL || !mL || !pL){
                    alert("Please Fill All The Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/set/emp/leave/count/",
                        dataType: "json",
                        data: {
                            emp : emp, 
                            sL : sL, 
                            bL : bL, 
                            brL : brL, 
                            vL : vL, 
                            mL : mL, 
                            pL : pL 
                        },
                        beforeSend: function(){
                            $(".empLoading").show();
                        },
                        success: function(data){
                            $(".empLoading").hide();
                            if(data.prompt == 1){
                                alert("Already in database!");
                                $("select[name=employeeName]").val("");
                                $("input[name=sickLeave]").val("");
                                $("input[name=bdayLeave]").val("");
                                $("input[name=breavLeave]").val("");
                                $("input[name=vacLeave]").val("");
                                $("input[name=matLeave]").val("");
                                $("input[name=patLeave]").val("");
                            }else{
                                alert("Successfully Added!");
                                window.location.reload();
                            }
                        }
                    });
                }
            });

            $("#table-leave-counts tbody").off("click", ".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();
                var leaveCountUid = $(this).attr("data-uid");
                var empuid = $(this).attr("data-empuid");
                $.getJSON(App.api + "/get/emp/leave/counts/employee/" + leaveCountUid, function(data){
                    $("input[name=sickLeaveUpdate]").val(data.SL);
                    $("input[name=bdayLeaveUpdate]").val(data.BL);
                    $("input[name=breavLeaveUpdate]").val(data.BV);
                    $("input[name=vacLeaveUpdate]").val(data.VL);
                    $("input[name=matLeaveUpdate]").val(data.ML);
                    $("input[name=patLeaveUpdate]").val(data.PL);
                    $("select[name=employeeName]").val(empuid);
                    if (data.status == 1) {
                        $("input[value='Enable']").prop("checked", true);
                    } else {
                        $("input[value='Disable']").prop("checked", true);
                    }
                });

                $(document).off("submit", "#edit-leaveCount-form").on("submit", "#edit-leaveCount-form", function(e){
                    e.preventDefault();

                    var sL= $("input[name=sickLeaveUpdate]").val();
                    var bL= $("input[name=bdayLeaveUpdate]").val();
                    var bV= $("input[name=breavLeaveUpdate]").val();
                    var vL= $("input[name=vacLeaveUpdate]").val();
                    var mL= $("input[name=matLeaveUpdate]").val();
                    var pL= $("input[name=patLeaveUpdate]").val();
                    var status = 0;
                    if ($("input[name='status']:checked").val()==='Enable') {
                        status = 1;
                    }

                    if(!sL || !bL || !bV || !vL || !mL || !pL){
                        alert("Please Fill All The Fields!");
                    }else{
                        console.log(sL+"  "+bL+"  "+bV+"  "+vL+"  "+mL+"  "+pL+"  "+status)
                        $.ajax({
                            type: "POST",
                            url: App.api + "/update/emp/leave/counts/" + leaveCountUid,
                            data: {
                                sL : sL,
                                bL : bL,
                                bV : bV,
                                vL : vL,
                                mL : mL,
                                pL : pL,
                                status : status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(){
                                $(".empLoading").show();
                                alert("Successfully Updated!");
                                $("#editLeaveCount").modal("toggle");
                                window.location.reload();
                            }
                        });
                    }
                });
            });
            
        });

        // Location
        Path.map('#/settings-location/').to(function(){
            var ctr = 0;
            var locationList = [];
            var locations = getJSONDoc(App.api + "/get/location/data/");
            $.each(locations,function(i,item){
                ctr++;
                var location = {
                    number:ctr,
                    name:item.name,
                    fingerprint:item.fingerprint,
                    locationuid:item.locUid
                }
                locationList.push(location);
            });
            var templateData = {
                locationsList:locationList
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("location",templateData));
            tableID = '#table-location';
            renderToDataTable(tableID);

            $(document).off("submit", "#location-form").on("submit", "#location-form",function(e){
                e.preventDefault();
                var name = $("input[name=loc-names]").val();
                var fingerprint = $("input[name=loc-fingerprint]").val();

                if(!name || !fingerprint){
                    alert("Please Fill All the Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/locations/new/",
                        dataType: "json",
                        data: {
                            name: name,
                            fingerprint: fingerprint
                        },
                        beforeSend: function(){
                            $(".empLoading").show();
                        },
                        success: function(data){
                            $(".empLoading").hide();
                            if(data.error == 1){
                                alert(data.errorMessage);
                                $("#newLocation").modal("toggle");
                                $("input[name=loc-names]").val("");
                                $("input[name=loc-fingerprint]").val("");
                                getLocationData();
                            }else{
                                alert(data.errorMessage);
                                $("#newLocation").modal("toggle");
                                $("input[name=loc-names]").val("");
                                $("input[name=loc-fingerprint]").val("");
                            }
                        }
                    });
                }
            });

            $("#table-location tbody").off("click", ".edit-btn").on("click", ".edit-btn", function(e) {
                e.preventDefault();
                var locationuid = $(this).attr("data-uid");
                $.getJSON(App.api + "/location/single/data/" + locationuid, function(data){
                    $("input[name=loc-names]").val(data.name);
                    $("input[name=loc-fingerprints]").val(data.fingerprint);
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                });

                $(document).off("submit", "#locationFormEdit").on("submit", "#locationFormEdit", function(e){
                    e.preventDefault();
                    var locname = $("#loc-names").val(); //Bug:Could not capture the value by name works with id
                    var fingerprint = $("input[name=loc-fingerprints]").val();
                    var status = 0;
                    if ($("input[name='status']:checked").val()==="Enable") {
                        status = 1;
                    }
    
                    if(!locname || !fingerprint){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/locations/edit/data/" + locationuid,
                            dataType: "json",
                            data: {
                                name: locname,
                                fingerprint: fingerprint,
                                status: status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(data){
                                alert("Location Updated Sucessfully!");
                                window.location.reload();
                            }
                        });
                    }
                });
            });
        });

        // Overtime Type
        Path.map('#/settings-overtime/').to(function(){
            var number = 0;
            var overtimeTypeList = [];
            var overtimeTypes = getJSONDoc(App.api + "/get/overtime/type/");
            $.each(overtimeTypes,function(i,item){
                number++;
                var overtimetype = {
                    number:number,
                    name:item.name,
                    kind:item.kind,
                    code:item.code,
                    rate:item.rate,
                    additionalrate:item.additionalRate,
                    overtimeTypeUid:item.uid
                }
                overtimeTypeList.push(overtimetype);
            })
            var templateData =  {
                overtimeTypeLists:overtimeTypeList
            }
            App.canvas.html("").append($.Mustache.render("overtime-type",templateData));
            tableID = "#table-overtime-type";
            renderToDataTable(tableID);

            $(document).off("submit", "#overtimeTypeForm").on("submit", "#overtimeTypeForm", function(e){
                e.preventDefault();

                var kind = $("select[name=overtimeType]").val();
                var name = $("input[name=overtimeName]").val();
                var code = $("input[name=overtimeCode]").val();
                var rate = $("input[name=overtimeRate]").val();
                var rateAd = $("input[name=overtimeRateAd]").val();

                if(!kind || !name || !code || !rate || !rateAd){
                    alert("Please Fill All the Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/add/overtime/type/",
                        data: {
                            kind : kind,
                            name : name,
                            code : code,
                            rate : rate,
                            rateAd : rateAd
                        },
                        beforeSend: function(){
                            $(".empLoading").show();
                        },
                        success: function(){
                            $(".empLoading").hide();
                            alert("Successfully Added!");
                            $("select[name=overtimeType]").val("");
                            $("input[name=overtimeName]").val("");
                            $("input[name=overtimeCode]").val("");
                            $("input[name=overtimeRate]").val("");
                            $("input[name=overtimeRateAd]").val("");
                            window.location.reload();
                        }
                    });
                }

            });

            $("#table-overtime-type tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();

                var uid = $(this).attr("data-uid");

                $.getJSON(App.api + "/get/overtime/type/data/" + uid, function(data){
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                    $("select[name=overtimeTypeEdit]").val(data.kind);
                    $("input[name=overtimeNameEdit]").val(data.name);
                    $("input[name=overtimeCodeEdit]").val(data.code);
                    $("input[name=overtimeRateEdit]").val(data.rate);
                    $("input[name=overtimeRateAdEdit]").val(data.rateAd);
                });

                $(document).off("submit", "#overtimeTypeFormEdit").on("submit", "#overtimeTypeFormEdit", function(e){
                    e.preventDefault();

                    var kind = $("select[name=overtimeTypeEdit]").val();
                    var name = $("input[name=overtimeNameEdit]").val();
                    var code = $("input[name=overtimeCodeEdit]").val();
                    var rate = $("input[name=overtimeRateEdit]").val();
                    var rateAd = $("input[name=overtimeRateAdEdit]").val();
                    var status = 0
                    if ($("input[name='status']:checked").val()==="Enable") {
                        status = 1;
                    }

                    if(!kind || !name || !code || !rate || !rateAd){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url: App.api + "/edit/overtime/type/" + uid,
                            data: {
                                kind : kind,
                                name : name,
                                code : code,
                                rate : rate,
                                rateAd : rateAd,
                                status : status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(){
                                $(".empLoading").hide();
                                alert("Successfully Updated!");
                                $("#overtimeTypeEdit").modal("hide");
                                window.location.reload();
                            }
                        });
                    }
                });
            });
        });

        // Rest Day
        Path.map('#/settings-rest-day/').to(function(){
            var restDayList = [];
            var restDays = getJSONDoc(App.api + "/restday/get/data/");
            console.log(restDays);
            $.each(restDays, function(i,item){
                var restday = {
                    restdayUid:item.restUid,
                    restDayName:item.name
                }
                restDayList.push(restday);
            });
            var templateData = {
                restDayList:restDayList
            }

            App.canvas.html("").append($.Mustache.render("rest-day",templateData));
            var tableID = "#table-rest-day";
            renderToDataTable(tableID);

            $(document).off("submit", "#new-rest-form").on("submit", "#new-rest-form", function(e) {
                e.preventDefault();
                var restDay = $("select[name=restDay]").val();
                
                if(!restDay){
                    alert("Please Fill All The Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url : App.api + "/rest/new/",
                        data: {
                            restDay: restDay
                        },
                        beforeSend: function(){
                            $(".empLoading").show();
                        },
                        success: function() {
                            $(".empLoading").hide();
                            alert("Successfully added!");
                            $("#newRestDay").modal("toggle");
                            $("select[name=restDay]").val("");
                            window.location.reload();
                        }
                    });
                }
            });

            $("#table-rest-day tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var uid = $(this).attr("data-uid");
                $.getJSON(App.api + "/get/restday/data/" + uid, function(data) {
                    console.log(data);
                    $("select[name=restdays]").val(data.restName);
                    if (data.status == 1) {
                        $("input[value='Enable']").prop("checked", true);
                    } else {
                        $("input[value='Disable']").prop("checked", true);
                    }
                });
                
                $(document).off("submit", "#restdayFormEdit").on("submit", "#restdayFormEdit", function(e){
                    e.preventDefault();

                    var restday = $("select[name=restdays]").val();
                    var status = 0
                    if ($("input[name='status']:checked").val()==="Enable") {
                        status = 1;
                    }

                    if(!restday){
                        alert("Please Fill All The Fields!");
                    }else{
                        $.ajax({
                            type: "POST",
                            url : App.api + "/edit/resday/" + uid,
                            data: {
                                restday: restday,
                                status: status
                            },
                            beforeSend: function(){
                                $(".empLoading").show();
                            },
                            success: function(){
                                $(".empLoading").hide();
                                alert("Successfully Updated!");
                                $("#restdayEdit").modal("toggle");
                                window.location.reload();
                            }
                        });
                    }//end of checking
                });
            });


        });

        // Rules
        Path.map('#/settings-rules/').to(function(){
            var rulesList =  [];
            var RulesById = [];
            var rules = getJSONDoc(App.api + "/get/rules/number/");
            $.each(rules,function(i,item){
                var rule = {
                    ruleUid:item.ruleUid,
                    ruleName:item.ruleName
                }
                rulesList.push(rule)
            });

            var rulebyId = getJSONDoc(App.api + "/get/rules/id/" + rules[0].ruleUid);
            $.each(rulebyId,function(i,item){
                var ruleid = {
                    day:item.day,
                    shift:item.shift,
                    ruleUid:item.ruleUid +"."+item.day
                }
                RulesById.push(ruleid);
            });

            var templateData = {
                rulesList:rulesList,
                rulesById:RulesById
            }
            console.log(templateData);
            App.canvas.html("").append($.Mustache.render("rules",templateData));
            tableID = '#table-rules';
            renderToDataTable(tableID);
            
            $(document).off("change",".selRule").on("change",".selRule",function(e){
                e.preventDefault();
                RulesById.splice(0,RulesById.length);
                var rule = $("select[name=selRule]").val();
                var ruleUids = getJSONDoc(App.api + "/get/rules/id/" + rule);
                $.each(ruleUids,function(i,item){
                    var ruleid = {
                        day:item.day,
                        shift:item.shift,
                        ruleUid:item.ruleUid +"."+item.day
                    }
                    RulesById.push(ruleid);
                });
                console.log(templateData);
                App.canvas.html("").append($.Mustache.render("rules",templateData));
                renderToDataTable(tableID);
                $("select[name=selRule]").val(rule);
            });

            $(document).off("click",".edit-btn").on("click",".edit-btn",function(e){
                e.preventDefault();
                var data = $(this).attr("data-uid");
                var dataIndex = data.split(".");
                var rule = dataIndex[0];
                var day = dataIndex[1];
                console.log(rule+" "+day);
                $.getJSON(App.api + "/get/rule/data/" + rule + "." + day, function(ruledata){
                    console.log(ruledata);
                    if (ruledata.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }

                    $("input[name=ruleDay]").val(ruledata.day);
                    $("#ruleShift").find("option").remove().end();

                    $.getJSON(App.api + "/shift/get/data/" + App.token, function(shiftdata) {
                        $.each(shiftdata, function(i, item){
                            if(ruledata.shiftUid != item.shiftUid){
                                $("#ruleShift").append("<option value=" + item.shiftUid + " >" + item.name + ": (" + item.start + " - " + item.end +")</option>");
                            }else{
                                $("#ruleShift").append("<option value=" + item.shiftUid + " selected>" + item.name + ": (" + item.start + " - " + item.end +")</option>");
                            }
                        });
                        console.log(shiftdata);
                    });
                });
                $(document).off("submit","#editRulesform").on("submit","#editRulesform",function(e){
                    e.preventDefault();
                    var shift = $("select[name=ruleShift]").val();
                    var status = 0;
                    if ($("input[name='status']:checked").val()==="Enable") {
                        status = 1;
                    }
    
                    $.ajax({
                        type: "POST",
                        url: App.api + "/rule/update/",
                        data: {
                            rule: rule,
                            day: day,
                            shift: shift,
                            status: status
                        },
                        success: function(){
                            alert("Successfully Updated!");
                            window.location.reload();
                        }
                    });
                    
                })
            });
        });

        // Shift
        Path.map('#/settings-shift/').to(function(){
            var ctr = 0;
            var shiftsList = [];
            var shifts = getJSONDoc(App.api + "/shift/get/data/" + App.token);
            console.log(shifts);
            $.each(shifts,function(i,item){
                ctr++;
                var shift = {
                    number:ctr,
                    shiftUid:item.shiftUid,
                    shiftName:item.name,
                    shiftFrom:item.start,
                    shiftTo:item.end,
                    shiftGrace:item.grace,
                    shiftBatch:item.batch
                }
                shiftsList.push(shift);
            });

            var templateData = {
                shiftsList:shiftsList
            }
            App.canvas.html("").append($.Mustache.render("shift",templateData));
            tableID = "#table-shift";
            renderToDataTable(tableID);

            $(document).off("submit", "#new-shift-form").on("submit", "#new-shift-form", function(e) {
                e.preventDefault();
                var name = $("input[name=timeName]").val();
                var start = $("input[name=startTime]").val();
                var end = $("input[name=endTime]").val();
                var gracePeriod = $("input[name=gracePeriod]").val();
                var batch = $("input[name=batch]").val();

                if(!name || !start || !end || !batch || !gracePeriod){
                    alert("Please Fill All The Fields!");
                }else{
                    $.ajax({
                        type: "POST",
                        url: App.api + "/shift/new/" + App.token,
                        data: {
                            name: name,
                            start: start,
                            end: end,
                            grace: gracePeriod,
                            batch: batch
                        },
                        success: function() {
                            alert("Successfully Added!");
                            window.location.reload();
                        }
                    });
                }
            });

            $("#table-shift tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var uid = $(this).attr("data-uid");
                $.getJSON(App.api + "/shift/details/get/" + uid + "." + App.token, function(data) {
                    if (data.status == 1) {
                        $("input[value=Enable]").prop("checked", true);
                    } else {
                        $("input[value=Disable]").prop("checked", true);
                    }
                   
                    $("input[name=shiftNames]").val(data.name);
                    $("input[name=shiftStarts]").val(data.start);
                    $("input[name=shiftEnds]").val(data.end);
                    $("input[name=batches]").val(data.batch);
                    $("input[name=gracePeriods]").val(data.grace);
                    $("input[name=status]").val(status);
                });

                $(document).off("submit", "#edit-shift-form").on("submit", "#edit-shift-form", function(e) {
                    e.preventDefault();
                    var name = $("input[name=shiftNames]").val();
                    var start = $("input[name=shiftStarts]").val();
                    var end = $("input[name=shiftEnds]").val();
                    var gracePeriod = $("input[name=gracePeriods]").val();
                    var batch = $("input[name=batches]").val();
                    var status = 0;
                    if ($("input[name='status']").is(":checked")) {
                        status = 1;
                    }

                    $.ajax({
                        type: "POST",
                        url: App.api + "/shift/update/" + uid + "." + App.token,
                        data: {
                            name: name,
                            start: start,
                            end: end,
                            grace: gracePeriod,
                            batch: batch,
                            status: status
                        },
                        success: function() {
                            alert("Successfully Updated");
                            window.location.reload();
                        }
                    });
                });
            });
            
        });

        // Memo
        Path.map('#/settings-memo/').to(function(){
            var number = 0;
            var memosList = [];
            var memos = getJSONDoc(App.api + "/get/memo/type/" + App.token);
            console.log(memos);
            $.each(memos,function(i,item){
                number++;
                var memo = {
                    number:number,
                    memoUid:item.uid,
                    memoName:item.name
                }               
                memosList.push(memo)
            });
            var templateData = {
                memosList:memosList
            }
            App.canvas.html("").append($.Mustache.render("memo",templateData));
            tableID = '#table-memo';
            renderToDataTable(tableID);

            $("#newMemo").submit(function(){
                var name = $("input[name=memoName]").val();
                $.ajax({
                    type: "POST",
                    url: App.api + "/memo/type/" + App.token,
                    dataType: "json",
                    data: { 
                        name: name
                    }, 
                    success: function( ){
                        alert("Successfully Added!");
                        window.location.reload();
                    }
                });
            });

            $("#table-memo tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var memoUid = $(this).attr("data-uid");
                console.log(memoUid);
                // $("input[name=edit-uid").val(memoUid)
                $.getJSON(App.api + "/memo/data/get/" +  memoUid + "." + App.token, function(data) {
                    console.log(data);
                    $.each(data, function(i, item){
                        $("input[name=editMemo]").val(item.name);
                    })                   
                });

                $("#memoEdit").submit(function(e){
                    var name = $("input[name=editMemo]").val();
                    $.ajax({
                        type: "POST",
                        url: App.api + "/memo/type/update/" + memoUid + "." + App.token,
                        dataType: "json",
                        data: {
                            name: name
                        },
                        success: function(data){
                            alert("Successfully Updated");
                            window.location.reload();
                        }
                    });
                });
            });
            $("#table-memo tbody").off("click", "td .delete-btn").on("click", "td .delete-btn", function(e) {
                e.preventDefault();
                var memoUid = $(this).attr("data-uid");
                console.log(memoUid);
                $(document).off("submit", "#deleteMemo").on("submit", "#deleteMemo", function(e){
                    e.preventDefault();
                    
                    $.getJSON(App.api + "/delete/memo/type/" + memoUid, function(data){
                        alert("Successfully Removed!");
                        // $("#memoDelete").modal("toggle");
                        window.location.reload();
                    });
                });
            });

        });

        // Certificate
        Path.map('#/settings-certificate/').to(function(){
            var number = 0;
            var certificateList = [];
            var certificates = getJSONDoc(App.api + "/get/certificate/type/" + App.token);
            $.each(certificates,function(i,item){
                number++;
                var certificate = {
                    number:number,
                    certName:item.name,
                    certUid:item.uid,
                }
                certificateList.push(certificate);
            });
            var templateData = {
                certificateList:certificateList
            }
            App.canvas.html("").append($.Mustache.render("certificate",templateData));
            tableID = '#table-certificate';
            renderToDataTable(tableID);

            $("#newCertificate").submit(function(){
                var name = $("input[name=certName]").val();
                $.ajax({
                    type: "POST",
                    url: App.api + "/certificate/type/" + App.token,
                    dataType: "json",
                    data: {
                        name: name
                    }, 
                    success: function(data){
                        alert("Successfully Added!");
                        window.location.reload();
                    }
                });
            });

            $("#table-certificate tbody").off("click", "td .edit-btn").on("click", "td .edit-btn", function(e) {
                e.preventDefault();
                var certificateUid = $(this).attr("data-uid");
                console.log(certificateUid);
                $.getJSON(App.api + "/certificate/data/get/" +  certificateUid + "." + App.token, function(data) {
                    $.each(data, function(i, item){
                        $("input[name=editCert]").val(item.name);
                    });                   
                });

                $("#certificateEdit").submit(function(){
                    var name = $("input[name=editCert]").val();
                    $.ajax({
                        type: "POST",
                        url: App.api + "/certificate/type/update/" + certificateUid + "." + App. token,
                        dataType: "json",
                        data: {
                            name: name
                        },
                        success: function(data){
                            alert("Successfully Updated!");
                            if(parseInt(data.success) === 1){
                                window.location.reload();
                            }
                        }
                    })
                });
            });

            $("#table-certificate tbody").off("click", "td .delete-btn").on("click", "td .delete-btn", function(e) {
                e.preventDefault();
                var certificateUid = $(this).attr("data-uid");

                $(document).off("submit", "#deletecertificate").on("submit", "#deletecertificate", function(e){
                    e.preventDefault();
                    
                    $.getJSON(App.api + "/delete/certificate/type/" + certificateUid, function(data){
                        alert("Successfully Removed!");
                        window.location.reload();
                    });
                });
            });
        });

        // Request
        Path.map('#/settings-request/').to(function(){
            var number = 0;
            var requestsList = [];
            var requests = getJSONDoc(App.api + "/request/get/data/" + App.token);
            $.each(requests,function(i,item){
                number++;
                var request = {
                    number:number,
                    requestname:item.name,
                    requestUid:item.uid
                }
                requestsList.push(request);
            });
            var templateData = {
                requestsList:requestsList
            }
            App.canvas.html("").append($.Mustache.render("request",templateData));
            tableID = '#table-request';
            renderToDataTable(tableID);
        });

        Path.map('#/billing/').to(function(){
            App.canvas.html("").append($.Mustache.render("billing"));
            // App.canvas.html("").append($.Mustache.render("billings-list"));
            
            $('#table-unpaid-billing').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-paid-billing').DataTable({
                "language": {
                    "paginate": {
                        "first": "Start",
                        "previous": "Previous",
                        "next": "Next",
                        "last": "Last"
                    }
                }
            });

            $('#table-billing-list').DataTable({
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

        //---------------------------- EMPLOYEE USER ------------------------//
        
        // Path.map("#/profile/:uid").to(function(){

        // });

        Path.root('#/dashboard/');
        Path.rescue(function() { 
            App.canvas.html("").append($.Mustache.render("404"));
        });
        Path.listen();
    });
});



