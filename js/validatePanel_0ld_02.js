

// alert('validate panel js connected');

function verifyPanelReady(profileUI){
	// alert(profileUI.jsonProfileUIRepo);
	var readyStatus;


	function statusAlert(statusMessage){
		alert('statusAlert: ' + statusMessage);
		$('.modal-title').text('MESSAGE:');
		$('#modal-text').text(statusMessage);
	    $('#myModal').modal('Message');

	    return false;
	}

	
	// SHOW SELECTED
	switch(profileUI.show){
        case 'Show':
        case '':
        case null:
        case undefined:
            var messageStr_show = 'A show must be selected from the show dropdown';
             return readyStatus = statusAlert(messageStr_show);

            break;

        default:
            // alert('show selected');
            readyStatus = true;

		    // SCRIPT SELECTED
		    switch(profileUI.script){
		        case 'Script':
		        case '':
		        case null:
		        case undefined:
		            var messageStr_script = 'A script must be selected from the script dropdown';
		            readyStatus = statusAlert(messageStr_script);

		            break;

		        default:
		            // alert('script selected');
		            readyStatus = true;

				    // IF CSV => CSV PATH
				    if(profileUI.data.csv){
				        switch(profileUI.data.file){
				        	case '':
				        	case null:
				        	case undefined:
				        		var messageStr_csv = 'You have opted to use a CSV but no CSV has been selected';
				        		readyStatus = statusAlert(messageStr_csv);

				                break;
				            default:
				            	// alert('csv selected');
				            	readyStatus = true;
				        	break;
				    	}
					}	// END CSV SWITCH

					// IF BATCH CUSTOM => BATCH PATH
					if(profileUI.batch.custom){
						switch(profileUI.batch.pathCustom){
							case '':
				        	case null:
				        	case undefined:
				        		var messageStr_batch = 'Custom batch path has been chosen but no path has been selected';
				        		readyStatus = statusAlert(messageStr_batch);

				                break;
				            default:
				            	// alert('custom batch selected');
				            	readyStatus = true;
				        	break;
				        }
				    }	// END BATCH SWITCH

				    // IF RENDER CUSTOM => RENDER PATH
				    if(profileUI.render.custom){
						switch(profileUI.render.pathCustom){
							case '':
				        	case null:
				        	case undefined:
				        		var messageStr_render = 'Custom render path has been chosen but no path has been selected';
				        		readyStatus = statusAlert(messageStr_render);

				                break;
				            default:
				            	// alert('custom render selected');
				            	readyStatus = true;
				        	break;
				    	}
					}	// END RENDER SWITCH
	            // break;
		    }	// END SCRIPT SWITCH
        break;
    }	// END SHOW SWITCH




	return readyStatus;
}






















