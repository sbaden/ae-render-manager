#include "/Users/sbaden/Documents/development_AE/SCRIPTS/04_COMMON/json2.jsx"

$._ext_SB={

	projectList: function(){
		// GET SHOW FOLDERS FROM LOCAL DIRECTORY
	},

	batch : function(profileUI) {
		// alert("batch clicked!");
		var profileUI = JSON.parse(profileUI);
		
		alert('CSV: ' + profileUI.data.csv);

	},

};




