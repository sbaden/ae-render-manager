// alert('validate panel js connected');

function verifyPanelReady(profileUI){
	// alert(profileUI.jsonRepo);

	function displayAlert(messageStr){
		$('.modal-title').text('MESSAGE:');
		$('#modal-text').text(messageStr);
        $('#myModal').modal('show');
		
	}



	function validateShow(){
		switch(profileUI.show){
        	// case 'Show':
	        case '':
	        // case 'null':
	        // case 'undefined':
	            var messageStr_show = 'A show must be selected from the show dropdown';
	            displayAlert(messageStr_show);
	            break;

	        default:
				return true;
		}
	}

	function validateScript(){
		switch(profileUI.script){
	        // case 'Script':
	        case '':
	        // case 'null':
	        // case 'undefined':
	            var messageStr_script = 'A script must be selected from the script dropdown';
	            displayAlert(messageStr_script);
	            break;

	        default:
				return true;
		}
	}

	function validateCSV(){
		if(profileUI.data.csv){
	        switch(profileUI.data.file){
	        	case '':
	        	case 'null':
	        	case 'undefined':
	        		var messageStr_csv = 'You have opted to use a CSV but no CSV has been selected';
	        		displayAlert(messageStr_csv);
	                break;

	            default:
					return true;
			}
		}
		else{ return true; }
	}

	function validateFeed(){
		if(profileUI.data.feed){
	        switch(profileUI.data.teams.length){
	        	// case '':
	        	// case 'null':
	        	case 0:
	        		var messageStr_feed = 'You have opted to use a FEED but no teams have been selected';
	        		displayAlert(messageStr_feed);
	                break;

	            default:
					return true;
			}
		}
		else{ return true; }
	}

	function validateBatch(){
		if(profileUI.batch.custom){
			switch(profileUI.batch.pathCustom){
				case '':
	        	case 'null':
	        	case 'undefined':
	        		var messageStr_batch = 'Custom batch path has been chosen but no path has been selected';
	        		displayAlert(messageStr_batch);
	                break;

	            default:
					return true;
			}
		}
		else{ return true; }
	}

	function validateRender(){
		if(profileUI.render.custom){
			switch(profileUI.render.pathCustom){
				case '':
	        	case 'null':
	        	case 'undefined':
	        		var messageStr_render = 'Custom render path has been chosen but no path has been selected';
	        		displayAlert(messageStr_render);
	                break;

	            default:
					return true;
			}
		}
		else{ return true; }
	}


	if(validateShow() && validateScript() && validateCSV() && validateFeed() && validateBatch() && validateRender()){
		// alert('ready');
		return true;	
	}


}















