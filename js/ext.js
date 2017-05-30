
function onLoaded() {
    var csInterface = new CSInterface();   
    var appName = csInterface.hostEnvironment.appName;
    
    if(appName != "FLPR"){
    	loadJSX();
    }    
}

$(document).ready(function(){
	//////// DATA
    $('.dropdown-menu li a').on('click', function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });

    $('#showDropdown').on('click', function(){
        $('#collapseScripts:hidden').show('slow');
    });  


    //////// DATA TYPE
    $('#csv').click(function(){
        $('#collapseCSV:hidden').show('slow');
        $('#collapseFeed').hide('slow');
    });

    $('#json').on('click', function(){
    	$('#collapseFeed').show('fast');
        $('#collapseCSV').hide('fast');
    });

    $('#googleSheets').on('click', function(){
        $('#collapseCSV').hide('slow');
        $('#collapseFeed').hide('slow');

        $('.modal-title').text('FEATURE:');
        $('#modal-text').text('Google Sheets has not yet been connected');
        $('#myModal').modal('show');

        $('#csv').prop('checked', true);
        $('#collapseCSV:hidden').show('slow');
        $('#collapseFeed').hide('slow');
    });

    // TEAM CHECKBOXES
    $('#selectall').prop('checked', true);
    $(".case").prop('checked', $('#selectall').prop('checked'));

    $('input[name=teams]').on('click', function() { // Remove all check properties
        $('#selectall').prop('checked', false);
    });

    $('#selectall').on('click', function() {    // JS for Check/Uncheck all CheckBoxes by Checkbox //
        $(".case").prop('checked', $("#selectall").prop('checked'));
    });


    //////// BATCH
    $('#presetBatch').on('click', function(){
        $('#collapseBatch').hide('slow');
    });

    $('#customBatch').on('click', function(){
        $('#collapseBatch').show('slow');
    });


    //////// RENDER
    $('#presetRender').on('click', function(){
        $('#collapseRender').hide('slow');
    });

    $('#customRender').on('click', function(){
        $('#collapseRender').show('slow');
    });


    //////// RENDER MANAGER
    $('#ae').click(function(){
        $('#collapseAE').show('slow');
        $('#collapseDeadline').hide('slow');
    });

    $('#deadline').on('click', function(){
        $('#collapseDeadline').show('slow');
        $('#collapseAE').hide('slow');
    });

    var $priority = $('input[type=number]');
    $priority.on('focusout', function(){
        $value = $priority.val();
        if($.isNumeric($value)){
            if($value < 1 || $value > 100){
                $priority.val(50);
                // alert('Value must be between 1 - 100');
                $('.modal-title').text('ERROR:');
                $('#modal-text').text('Value must be between 1 - 100');
                $('#myModal').modal('show');
            }
        }
        else{
            $priority.val(50);
            $('.modal-title').text('ERROR:');
            $('#modal-text').text('A valid number must be entered');
            $('#myModal').modal('show');
            // alert('Not a valid number');
        }
        
        // alert($priority.val());
    });


    //////// SUBMIT
    // $('#btn_reset').on('click', function(){
    //     evalScript('$._ext_SB.reset()');
    // });

    $('#btn_batch').on('click', function(){

        var profileUI = {
            script: '',
            data: {
                csv:    $('#csv')[0].checked,           // PRODUCER GENERATED
                feed:   $('#json')[0].checked,          // NFL FEEDS
                gs:     $('#googleSheets')[0].checked   // GOOGLE SHEETS
                // dataFile: '',
            },
            batch: {
                preset: $('#presetBatch')[0].checked,   // PRE-DETERMINED/HARDCODED LOCATION
                custom: $('#customBatch')[0].checked    // USER CHOOSES LOCATION
                // batchLoc: '',
            },
            render: {
                preset: $('#presetRender')[0].checked,  // PRE-DETERMINED/HARDCODED LOCATION
                custom: $('#customRender')[0].checked   // USER CHOOSES LOCATION
                // renderLoc: '',
            },
            manager: {
                ae: {
                    control:    $('#ae')[0].checked,
                    start:      $('#startRender')[0].checked
                },
                deadline: {
                    control:    $('#deadline')[0].checked,
                    priority:   $('#priority').val(),           // *FIX: UNDEFINED
                    pool:       $('#poolList').val(),           // *FIX: UNDEFINED
                    group:      $('#groupList').val()           // *FIX: UNDEFINED
                }
            }
        }

        ////////////////// VERIFY PROFILE VALUES /////////////////////
        /*var messageStr = 'Profile has been submitted\n\n';

        messageStr +=   'CSV: ' + profileUI.data.csv +', Feed: '+ profileUI.data.feed +', GS: '+ profileUI.data.gs + '\n' +
                        'Batch Preset: ' + profileUI.batch.preset +', Batch Custom: '+ profileUI.batch.custom + '\n' +
                        'Render Preset: ' + profileUI.render.preset +', Render Custom: '+ profileUI.render.custom + '\n' +
                        'AE: ' + profileUI.manager.ae.control +', Deadline: '+ profileUI.manager.deadline.control + '\n' +
                        'AE Start Render: ' + profileUI.manager.ae.start + '\n' +
                        'Deadline: Priority: ' + profileUI.manager.deadline.priority + ', Pool: ' + profileUI.manager.deadline.pool + ', Group: ' + profileUI.manager.deadline.group;


        $('.modal-title').text('MESSAGE:');
        $('#modal-text').text(messageStr);
        $('#myModal').modal('show');*/
        /////////////////////////////////////////////////////////////

        var csInterface = new CSInterface();
        csInterface.evalScript('$._ext_SB.batch("' + JSON.stringify(profileUI).replace(/"/g,'\\"') + '")' );    // .replace(/"/g,'\\"') ignores all internal quotes from stringify so it can be passed as a valid string

    });

    // TEMP BUTTON FOR DEV: RELOADS EXTENTION PANEL
    $("#btn_reload").click(reloadPanel);

    function reloadPanel() {
        location.reload();
    }

});

    
/**
 * Load JSX file into the scripting context of the product. All the jsx files in 
 * folder [ExtensionRoot]/jsx will be loaded. 
 */
function loadJSX() {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
}

// function evalScript(script, callback) {

	// alert(profileUI.data.csv +', '+ profileUI.data.feed +', '+ profileUI.data.gs);
	// alert(profileUI.batch.preset +', '+ profileUI.batch.custom);
	//alert('AE: ' + profileUI.manager.ae.control +', Deadline: '+ profileUI.manager.deadline.control);
	// alert(profileUI.manager.deadline.priority);
	// alert(profileUI.manager.deadline.group +', '+ profileUI.manager.deadline.pool);

//     new CSInterface().evalScript(script, callback);
// }
