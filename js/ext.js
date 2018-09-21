

$(document).ready(function(){
    var csInterface = new CSInterface();


    var profileUI = {
        jsonProfileUIRepo: '/Users/sbaden/Documents/development_AE/JSON_REPO/',
        showDirectory: '/Users/sbaden/Documents/development_AE/SCRIPTS/03_PROJECTS/',
        show: '',
        script: '',
        data: {
            feedURL: 'http://feeds.nfl.com/feeds-rs/roster/',
            feedRepo: '/Users/sbaden/Documents/development_AE/JSON_TEAM_REPO/'
        },
        batch: {
            pathPreset: '/Users/sbaden/Documents/development_AE/AE_BATCH/',
            pathCustom: ''
        },
        render: {
            pathPreset: '/Users/sbaden/Documents/development_AE/AE_RENDER/',
            pathCustom: ''
        },
        manager: {
            ae: {},
            deadline: {
                pool: 'shawn_primary',
                group: 'ae_scripts'
            }
        }
    }



    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    });

    function getShowFolders(){
        csInterface.evalScript('getTargetFolders('+ JSON.stringify(profileUI.showDirectory) +')',
            function(result){
                result = result.split(',');
            
                for(var i = 0; i< result.length; i++){
                    $("#show-list").append('<li><a href="#">' + result[i] + '</a></li>');
                }
            }
        );
    }

    function getShowScripts(){
        csInterface.evalScript('getTargetFiles("' + JSON.stringify(profileUI).replace(/"/g,'\\"') + '")',
            function(result){
                result = result.split(',');
            
                for(var i = 0; i< result.length; i++){
                    $("#script-list").append('<li><a href="#">' + result[i] + '</a></li>');
                }
            }
        );
    }


    getShowFolders();



	//////// DATA
    $('#show-list').on('click', 'li', function() {
        $('#script-list').empty();
        $('#scriptDropdown').html('Script <span class="caret"></span>');

        var $presetIndex = $(this).index();
        var $presetValue = $(this).text();

        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data($presetValue));
        profileUI.show = $presetValue;

        getShowScripts();
    });

    $('#script-list').on('click', 'li', function() {
        var $presetIndex = $(this).index();
        var $presetValue = $(this).text();

        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data($presetValue));
        profileUI.script = $presetValue;
    });

    $('#showDropdown').on('click', function(){
        $('#collapseScripts:hidden').show('slow');
    });

    $('#btn-refresh').on('click', function(){
        $('#show-list').empty();
        $('#script-list').empty();
        getShowFolders();
        $('#showDropdown').html('Show <span class="caret"></span>');
        $('#scriptDropdown').html('Script <span class="caret"></span>');
    })


    //////// DATA TYPE
    $('#csv').click(function(){
        $('#collapseCSV:hidden').show('slow');
        $('#collapseFeed').hide('slow');

        // RESET FEED CHECKBOXES
        // $('#selectall').prop('checked', true);
        // $(".case").prop('checked', $('#selectall').prop('checked'));
    });

    $('#json').on('click', function(){
        $('#csvPath').html('');
        profileUI.data.file = '';
    	$('#collapseFeed').show('fast');
        $('#collapseCSV').hide('fast');
    });

    $('#googleSheets').on('click', function(){
        $('#collapseCSV').hide('slow');
        $('#collapseFeed').hide('slow');

        $('.modal-title').text('FEATURE:');
        $('#modal-text').text('Google Sheets has not yet been connected');
        $('#myModal').modal('show');

        // $('#csv').prop('checked', true);
        // $('#collapseCSV:hidden').show('slow');
        // $('#collapseFeed').hide('slow');
    });

    $('#btn_selectDataFile').on('click', function(){
        csInterface.evalScript('returnFile()',
            function(result){
                profileUI.data.file = result;
                $('#csvPath').html(result);
            }
        );
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
        profileUI.batch.pathCustom = '';
        $('#batchPath').html('');
    });

    $('#customBatch').on('click', function(){
        $('#collapseBatch').show('slow');
    });

    $('#btn_batchLocation').on('click', function(){
        csInterface.evalScript('returnDirectory()',
            function(result){
                profileUI.batch.pathCustom = result;
                $('#batchPath').html(result);
            }
        );
    });


    //////// RENDER
    $('#presetRender').on('click', function(){
        $('#collapseRender').hide('slow');
        profileUI.render.pathCustom = '';
        $('#renderPath').html('');
    });

    $('#customRender').on('click', function(){
        $('#collapseRender').show('slow');
    });

    $('#btn_renderLocation').on('click', function(){
        csInterface.evalScript('returnDirectory()',
            function(result){
                profileUI.render.pathCustom = result;
                $('#renderPath').html(result);
            }
        );
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

    $('#pool-list').on('click', 'li', function() {
        var $presetIndex = $(this).index();
        var $presetValue = $(this).text();

        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data($presetValue));
        profileUI.manager.deadline.pool = $presetValue;
    });

    $('#group-list').on('click', 'li', function() {
        var $presetIndex = $(this).index();
        var $presetValue = $(this).text();

        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data($presetValue));
        profileUI.manager.deadline.group = $presetValue;
    });

    var $priority = $('#fader');
    $priority.on('input', function(){
        // alert($('#fader').val());
        $('#priorityValue').val($priority.val());
    });


    $('#btn_batch').on('click', function(){
        profileUI.data.csv      = $('#csv')[0].checked,                   // PRODUCER GENERATED
        profileUI.data.feed     = $('#json')[0].checked,                  // NFL FEEDS
        profileUI.data.gs       = $('#googleSheets')[0].checked,          // GOOGLE SHEETS
        profileUI.data.teams    = $('input:checkbox[name=teams]:checked').map(function(){return $(this).val()}).get(), 

        profileUI.batch.preset  = $('#presetBatch')[0].checked,           // PRE-DETERMINED/HARDCODED LOCATION
        profileUI.batch.custom  = $('#customBatch')[0].checked            // USER CHOOSES LOCATION

        profileUI.render.preset = $('#presetRender')[0].checked,          // PRE-DETERMINED/HARDCODED LOCATION
        profileUI.render.custom = $('#customRender')[0].checked           // USER CHOOSES LOCATION

        profileUI.manager.ae.control            = $('#ae')[0].checked,
        profileUI.manager.ae.start              = $('#startRender')[0].checked

        profileUI.manager.deadline.control      = $('#deadline')[0].checked,
        profileUI.manager.deadline.priority     = $priority.val()


        ////////////////// VERIFY PROFILE VALUES /////////////////////
        var messageStr = 'Profile has been submitted\n\n';

        messageStr +=   'JSON ProfileUI Repo: ' + profileUI.jsonProfileUIRepo + '\n' +
                        'Show Directory: ' + profileUI.showDirectory + '\n' +
                        'Show: '+ profileUI.show + '\n' +
                        'Script: '+ profileUI.script + '\n' +
                        'CSV: ' + profileUI.data.csv + '\n' +
                        'Feed: '+ profileUI.data.feed + '\n' +
                        'GS: '+ profileUI.data.gs + '\n' +
                        'CSV File: '+ profileUI.data.file + '\n' +
                        'Feed URL: '+ profileUI.data.feedURL + '\n' +
                        'Feed Repo: '+ profileUI.data.feedRepo + '\n' +
                        'Teams: ' + profileUI.data.teams + '\n' +
                        'Batch Preset: ' + profileUI.batch.preset + '\n' +
                        'Batch Preset Path: ' + profileUI.batch.pathPreset + '\n' +
                        'Batch Custom: '+ profileUI.batch.custom + '\n' +
                        'Batch Custom Path: '+ profileUI.batch.pathCustom + '\n' +
                        'Render Preset: ' + profileUI.render.preset + '\n' +
                        'Render Preset Path: ' + profileUI.render.pathPreset + '\n' +
                        'Render Custom: '+ profileUI.render.custom + '\n' +
                        'Render Custom Path: '+ profileUI.render.pathCustom + '\n' +
                        'AE: ' + profileUI.manager.ae.control + '\n' +
                        'Deadline: '+ profileUI.manager.deadline.control + '\n' +
                        'AE Start Render: ' + profileUI.manager.ae.start + '\n' +
                        'Deadline: Priority: ' + profileUI.manager.deadline.priority + '\n' +
                        'Pool: ' + profileUI.manager.deadline.pool + '\n' +
                        'Group: ' + profileUI.manager.deadline.group;


        // alert(messageStr);

        // $('.modal-title').text('MESSAGE:');
        // $('#modal-text').text(messageStr);
        // $('#myModal').modal('show');
        /////////////////////////////////////////////////////////////


        $('.modal-title').text('MESSAGE:');
        

        var panelReady = verifyPanelReady(profileUI);
        // alert(panelReady);

        if(panelReady){
            csInterface.evalScript('batch("' + JSON.stringify(profileUI).replace(/"/g,'\\"') + '")' );  // .replace(/"/g,'\\"') ignores all internal quotes from stringify so it can be passed as a valid string
        }

    });



    // TEMP BUTTON FOR DEV: RELOADS EXTENTION PANEL
    $("#btn_reload").click(reloadPanel);

    function reloadPanel() {
        location.reload();
    }

});




