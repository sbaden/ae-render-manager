#include "/Users/sbaden/Documents/development_AE/SCRIPTS/04_COMMON/json2.jsx"


function projectList(){
	// GET SHOW FOLDERS FROM LOCAL DIRECTORY
}

function getTargetFolders(targetDirectory){
    var folder = new Folder (targetDirectory);
    var files = folder.getFiles();
    var sortedFiles = [];
    files.sort();

    for(i=0; i< files.length; i++){
        var fileToString = files[i].toString();
        var fileName = decodeURI(files[i].name);
      
        if (fileToString.indexOf(".DS_Store") < 0){
            if(files[i] instanceof Folder){
                sortedFiles.push(fileName);
            }
        }
    }
    return sortedFiles; 
}

function getTargetFiles(profileUI){
    var profileUI = JSON.parse(profileUI);

    var folder = new Folder (profileUI.showDirectory + profileUI.show + '/');
    var files = folder.getFiles();
    var sortedFiles = [];
    files.sort();

    for(i=0; i< files.length; i++){
        var fileToString = files[i].toString();
        var fileName = decodeURI(files[i].name);

        if (fileName.match(/\.(js|jsx|jsxbin)$/)){ // Removes all files that are not script files from the array
            sortedFiles.push(fileName.substring(0, fileName.lastIndexOf('.')));
        }
    }

    return sortedFiles;
}

function returnDirectory(){
    var targetDirectory = Folder.selectDialog();  // Select a folder
                
    if (targetDirectory != null){  // Verify folder was selected
        directory = decodeURI(targetDirectory.fsName);  // Convert folder path to readable text
        
        return directory;
    }
}

function returnFile(){
    var targetFile = File.openDialog();  // Select a file
                
    if (targetFile != null){  // Verify folder was selected
        directory = decodeURI(targetFile.fsName);  // Convert file path to readable text
        
        return targetFile;
    }
}

function batch(profileUI){
    var profileUI = JSON.parse(profileUI);
    
    if(profileUI.show == '' || profileUI.show == null){
        alert('A show must be selected from the show dropdown');
        return;
    }

    if(profileUI.script == '' || profileUI.script == null){
        alert('A script must be selected from the script dropdown');
        return;
    }


    var scriptLocation = profileUI.showDirectory + profileUI.show + '/' + profileUI.script + '.jsx';
    scriptFile = new File(scriptLocation);

    
    // WRITE A JSON FILE TO PASS TO SHOW-SCRIPT FILE
    writeJSON(profileUI);


    // OPEN SHOW SCRIPT
    scriptFile.exists ? $.evalFile(scriptLocation) : alert('There was an error retrieving script');

}

function writeJSON(profileUI){
    var newFile = new File(profileUI.jsonProfileUIRepo + "ae_panel_profile" + ".json");  // DEFINE FILE PATH AND NAME

    if (newFile != null) {
        newFile.open("w","TEXT","????");

        newFile.write(JSON.stringify(profileUI));
    
        newFile.close();
        // newFile.execute();  // Open log
    }
}













