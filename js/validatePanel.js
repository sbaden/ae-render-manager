// alert('validate panel js connected');

function verifyPanelReady(profileUI){
	// alert(profileUI.jsonRepo);
	var readyStatus;

	$('.modal-title').text('MESSAGE:');

	
	// SHOW SELECTED
	switch(profileUI.show){
        case 'Show':
        case '':
        case null:
        case undefined:
            var messageStr_show = 'A show must be selected from the show dropdown';

            $('#modal-text').text(messageStr_show);
            $('#myModal').modal('show');

            readyStatus = false;
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

		            $('#modal-text').text(messageStr_script);
		            $('#myModal').modal('show');

		            readyStatus = false;
		            break;

		        default:
		            // alert('script selected');
		            readyStatus = true;

				    // IF RENDER CUSTOM => RENDER PATH
				    if(profileUI.render.custom){
						switch(profileUI.render.pathCustom){
							case '':
				        	case null:
				        	case undefined:
				        		var messageStr_render = 'Custom render path has been chosen but no path has been selected';

				                $('#modal-text').text(messageStr_render);
				                $('#myModal').modal('show');

				                readyStatus = false;
				                break;
				            default:
				            	// alert('custom render selected');
				            	readyStatus = true;
				        	break;
				    	}
					}	// END RENDER SWITCH

					// IF BATCH CUSTOM => BATCH PATH
					if(profileUI.batch.custom){
						switch(profileUI.batch.pathCustom){
							case '':
				        	case null:
				        	case undefined:
				        		var messageStr_batch = 'Custom batch path has been chosen but no path has been selected';

				                $('#modal-text').text(messageStr_batch);
				                $('#myModal').modal('show');

				                readyStatus = false;
				                break;
				            default:
				            	// alert('custom batch selected');
				            	readyStatus = true;
				        	break;
				        }
				    }	// END BATCH SWITCH

					// IF CSV => CSV PATH
				    if(profileUI.data.csv){
				        switch(profileUI.data.file){
				        	case '':
				        	case null:
				        	case undefined:
				        		var messageStr_csv = 'You have opted to use a CSV but no CSV has been selected';

				                $('#modal-text').text(messageStr_csv);
				                $('#myModal').modal('show');

				                readyStatus = false;
				                break;
				            default:
				            	// alert('csv selected');
				            	readyStatus = true;
				        	break;
				    	}
					}	// END CSV SWITCH

	            // break;
		    }	// END SCRIPT SWITCH
        break;
    }	// END SHOW SWITCH




	return readyStatus;
}















