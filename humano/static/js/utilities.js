//localforage.setDriver(localforage.LOCALSTORAGE);

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    var guid = _p8() + _p8(true) + _p8(true) + _p8();
    return guid.toUpperCase();
}

function getJSONDoc(url) {
    var response = $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        global: false,
        async: false,
        success: function (data) {
            return data;
        }
    }).responseText;
    return $.parseJSON(response);
}

function validJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    }
    catch (e) { }

    return false;
};

function commafy(num){
  var parts = (''+(num<0?-num:num)).split("."), s=parts[0], L, i=L= s.length, o='';
  while(i--){ o = (i===0?'':((L-i)%3?'':',')) 
                  +s.charAt(i) +o }
  return (num<0?'-':'') + o + (parts[1] ? '.' + parts[1] : ''); 
}

function dateToReadableFormat(convertDate)
{
    const date = new Date(convertDate);
    convertedDate = date.toDateString();
    return convertedDate;
}

function dateToISOFormat(convertDate)
{
    const date = new Date(convertDate);
    convertedDate = date.toLocaleDateString().split('T')[0];
    return convertedDate;
}

function renderToDataTableDashboard(tableID)
{
    $(tableID).DataTable({
        "order": [[0, 'desc']],
        "pageLength": 5,
        responsive: true,
        "searching": false,
        "lengthChange": false,
        "info": false
    });
}

function renderToDataTablePrint(tableID)
{
    $(tableID).DataTable({
        responsive: true,
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf', 'print'
        ],
    });
}

function renderToDataTable(tableID)
{
    $(tableID).DataTable({
        "language": {
            "paginate": {
                "first": "Start",
                "previous": "Previous",
                "next": "Next",
                "last": "Last"
            }
        }
    });
}

function initDateTimePicker(fieldID){
    const datetimepicker = new tempusDominus.TempusDominus(document.getElementById(fieldID),{
        display: {
        components: {
        calendar: true,
        date: true,
        month: true,
        year: true,
        decades: true,
        clock: true,
        hours: true,
        minutes: true,
        seconds: false
        }
    },
    localization: {
        format: 'yyyy-MM-dd hh:mm T'}
    });
}

function initTimePicker(fieldID){
    $(fieldID).timepicker({ 'timeFormat': 'h:i A' });
}

function DateTimePickerSetValue(fieldID,timeValue)
{
    const datetimepicker = new tempusDominus.TempusDominus(document.getElementById(fieldID),{
        display: {
        components: {
        calendar: true,
        date: true,
        month: true,
        year: true,
        decades: true,
        clock: true,
        hours: true,
        minutes: true,
        seconds: false
        }
    },
    localization: {
        format: 'yyyy-MM-dd hh:mm T'}
    });
    const timeInDate = new tempusDominus.DateTime(new Date(timeValue));
    datetimepicker.dates.setValue(timeInDate);
}

function initBootstrapSwitch(fieldID)
{
    $(fieldID).bootstrapSwitch({
        onText: "Enable",
        offText: "Disable",
        size: 'small'
    });
}

function initSelect2(selectID)
{
    $(selectID).select2({
        theme: "bootstrap-5",
        width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
        placeholder: $( this ).data( 'placeholder' ),
        minimumResultsForSearch: 0,
    });
}

function initSelect2Modal(selectID,modalID)
{
    $(selectID).select2({
        theme: "bootstrap-5",
        width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
        placeholder: $( this ).data( 'placeholder' ),
        minimumResultsForSearch: 0,
        dropdownParent:$(modalID)
    });
}

function timeParser(time)
{
  var parsedTime = moment(time,'LT').format("HH:mm");
  return parsedTime
}