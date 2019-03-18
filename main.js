const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.

  if(process.platform == "darwin"){
    win = new BrowserWindow({
      width:900,
      height: 800,
      minHeight:650,
      minWidth:600,
      frame:true
     })
  }else{
    win = new BrowserWindow({
      width:900,
      height: 800,
      minHeight:650,
      minWidth:600,
      frame:false
     })
  }

  // and load the index.html of the app.
  win.loadFile('codeeditor.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}


const { Menu } = require('electron')

const template = [

  {

    label: "File",
    submenu: [
      { 
        label: "New File",
        click () { console.log("new file clicked") }
    
      },
      { label: "New Folder" },
      { type: "separator" },
      { label: "Save" },
      { label: "Save As" }
    ]

  },

  {
    label: 'View',
    submenu: [
      { label: 'Documents' },
      { label: 'Products' },
      { type: 'separator' },
      { label: 'First Level',
      
        submenu:[
          {
            label:"Second Level",
            submenu:[
              {
                label:"Third Level"
              }
            ]
          }
        ]
    
      },
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },

  {
    label: 'Tools',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
      { role: 'zoomin' },
      { role: 'zoomout' },
    ]
  },

  {
    label: 'Settings',
    submenu: [
      { label: 'Themes' },
      { type: 'separator' },
      { role: 'close' }
    ]
  },

  {
    label: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}
/*
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)    
*/

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})