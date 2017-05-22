
function onLoaded() {
    var csInterface = new CSInterface();   
    var appName = csInterface.hostEnvironment.appName;
    
    if(appName != "FLPR"){
    	loadJSX();
    }    
}

$(document).ready(function(){
	//////// DATA
    $('#csv').click(function(){
        $('#collapseCSV:hidden').show('slow');
        $('#collapseFeed').hide('slow');
    });

    $('#json').click(function(){
    	$('#collapseFeed').show('fast');
        $('#collapseCSV').hide('fast');
    });

    $('#googleSheets').click(function(){
        $('#collapseCSV').hide('slow');
        $('#collapseFeed').hide('slow');
    });

    //////// BATCH
    $('#presetBatch').click(function(){
        $('#collapseBatch').hide('slow');
    });

    $('#customBatch').click(function(){
        $('#collapseBatch').show('slow');
    });

    //////// RENDER
    $('#presetRender').click(function(){
        $('#collapseRender').hide('slow');
    });

    $('#customRender').click(function(){
        $('#collapseRender').show('slow');
    });

    //////// RENDER MANAGER
    $('#ae').click(function(){
        $('#collapseAE').show('slow');
        $('#collapseDeadline').hide('slow');
    });

    $('#deadline').click(function(){
        $('#collapseDeadline').show('slow');
        $('#collapseAE').hide('slow');
    });

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

function evalScript(script, callback) {
	
	var profileUI = {
		script: '',
		CSV: {
			csv: 	$('#csv')[0].checked,			// PRODUCER GENERATED
			feed: 	$('#json')[0].checked,			// NFL FEEDS
			gs: 	$('#googleSheets')[0].checked,	// GOOGLE SHEETS
			// dataFile: '',
		},
		batch: {
			preset: $('#presetBatch')[0].checked,
			custom: $('#customBatch')[0].checked,
			// batchLoc: '',
		},
		render: {
			preset: $('#presetRender')[0].checked,
			custom: $('#customRender')[0].checked,
			// renderLoc: '',
		},
		manager: {
			ae: {
				control: 	$('#ae')[0].checked,
				start: 		$('#startRender')[0].checked,
			},
			deadline: {
				control: 	$('#deadline')[0].checked,
				priority: 	$('#priority').val(),
				group: 		$('#groupList').val(),
				pool: 		$('#poolList').val(),
			},
		},
	}

	// alert(profileUI.data.csv +', '+ profileUI.data.feed +', '+ profileUI.data.gs);
	// alert(profileUI.batch.preset +', '+ profileUI.batch.custom);
	// alert(profileUI.manager.ae.control +', '+ profileUI.manager.deadline.control);
	// alert(profileUI.manager.deadline.priority);
	// alert(profileUI.manager.deadline.group +', '+ profileUI.manager.deadline.pool);

    new CSInterface().evalScript(script, callback);
}
