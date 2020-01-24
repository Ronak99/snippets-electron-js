$(window).bind('keydown', function(event){
    if (event.ctrlKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 'n':
            event.preventDefault();
            createNewFile();
            break;
        
        case 's':
            event.preventDefault();
            saveFile();
            break;
        case 'o':
            event.preventDefault();
            openNewFile();
            break;

        case 'b':
            event.preventDefault();
            hideExplorer();
            break;
        case 'w':
            event.preventDefault();
            closeCurrentTab();      
            break;
        case 'm':
            event.preventDefault();
            hideWidget();
            break;      
        }
        
    }

   if (event.ctrlKey && event.altKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 'o':
            event.preventDefault();
            selectFolder();
            break;
        }
   }

});


