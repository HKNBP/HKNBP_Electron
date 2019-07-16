/*
 * HKNBP_Electron is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * HKNBP_Electron is distributed in the hope that it will be useful,
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with HKNBP_Electron.  If not, see <https://www.gnu.org/licenses/>.
 */

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var hknbpElectronAppVersion = "0.9-Electron";

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 720,
      height: 405,
      backgroundColor: "#000",
      icon: "logo.png",
      webPreferences: {webSecurity: false}
  })

  // hide MenuBar
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setAutoHideMenuBar(true)
  mainWindow.setMenu(null)

  // and load the index.html of the app.
  //mainWindow.loadFile("HKNBP_Core/index.html")
  mainWindow.loadURL("https://hknbp.org")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  //當Load好個Web
  mainWindow.webContents.on('did-finish-load', function() {
    //設置程式版編號
    mainWindow.webContents.executeJavaScript("hknbpCore.appVersion = \""+hknbpElectronAppVersion+"\";");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
