# Installing on Windows

To host hope on Windows, you must have version supported by [node.js](https://nodejs.org). (Windows 10 or newer)

## Installing the pre-requirements

Choose the method:

- [Installing automatically (the easiest way)](#installing-automatically)
- [Installing manually](#installing-manually)

### Installing automatically

To install via PowerShell, search `powershell` in Windows menu, right-click on it and then "Run as administrator"

Then run each for of the following commands
```powershell
PS C:\> Set-ExecutionPolicy Bypass -Scope Process -Force
PS C:\> [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
PS C:\> iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
PS C:\> choco upgrade git --params "/GitOnlyOnPath /WindowsTerminal" -y
PS C:\> choco install nodejs
PS C:\> choco install postgresql
```

### Installing manually

Dependencies:

- [Node.js](https://nodejs.org/dist/v21.6.0/node-v21.6.0-x64.msi)
- [Python](https://www.python.org/downloads/windows/) (required for YouTube-DL)
- [PostgreSQL](https://www.postgresql.org/download/windows/)