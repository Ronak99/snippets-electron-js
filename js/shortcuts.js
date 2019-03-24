$(window).bind("keydown", function (event) { 

    if (event.ctrlKey) { 

        switch (String.fromCharCode(event.which).toLowerCase()) { 

            case 'n':
                event.preventDefault();
                createNewFile();
                break;

        }

    }
    
}) 