## GAM (Google Apps Manager) on Chromebox
Setting up GAM on a Chromebox using GCP involves leveraging the ChromeOS Linux environment to run the tool and connecting it to a dedicated GCP project for API access.

### 1. Enable Linux on Chromebox
- Go to Settings > Advanced > Developers.
- Select Turn On for the Linux development environment.
- Open the Terminal app from your app drawer once setup completes.

### 2. Install GAM
In the Linux Terminal, run the following commands:
1. Prepare tools: sudo apt update && sudo apt install xz-utils curl -y.
2. Run the installer:
bash <(curl -s -S -L https://gam-shortn.appspot.com/gam-install).
3. Finalize Environment: When prompted, allow the script to add an alias to your .bashrc file. Run source ~/.bashrc to activate it immediately. 

### 3. Create the GCP Project via GAM
- Type gam create project in the terminal.
- Enter your Google Workspace Super Admin email when prompted.
- Authorization: GAM will provide a URL. Copy it into your Chrome browser, sign in, and grant the requested permissions.
- Enable APIs: GAM will automatically enable the necessary APIs (like Admin SDK and Chrome Management) in the newly created GCP project.

### 4. Configure OAuth Credentials
- The setup will provide a link to the Google Cloud Console Credentials page.
- Click Create Credentials > OAuth client ID.
- Select Desktop app, name it (e.g., "GAM Chromebox"), and click Create.
- Select Desktop app, name it (e.g., "GAM Chromebox"), and click Create.

### 5. Finalize Domain-Wide Delegation 
- Run gam oauth create if not automatically prompted.
- GAM will display a Client ID and a list of Scopes.
- Go to the [Google Admin Console](https://admin.google.com/) > Security > Access and data control > API controls > Manage Domain-wide Delegation.
- Click Add new, paste the Client ID, and copy/paste the entire comma-separated list of scopes from your terminal.

**Verification**: Run gam info domain to ensure the connection is active.

## Management with GAM
To manage ChromeOS devices, you must add these specific Directory API and Chrome Management API scopes to your Domain-wide Delegation settings in the Google Admin Console: 
- https://www.googleapis.com/auth/admin.directory.device.chromeos (Full access to manage ChromeOS devices)
- https://www.googleapis.com/auth/admin.directory.device.chromeos.readonly (Read-only access for reporting)
- https://www.googleapis.com/auth/chrome.management.policy (Access to manage Chrome policies and update settings)
- https://www.googleapis.com (To move devices between OUs)

### Batch update command for ChromeOS Fleet
The most efficient way to update a fleet is by using a CSV file containing your device serial numbers or [Device IDs](https://github.com/taers232c/GAMADV-XTD3/wiki/ChromeOS-Devices).

**Standard command to move devices to a new OU (common for forcing updates via OU policy)**:
gam csv devices.csv gam update cros query "id:~~deviceID~~" ou "/Path/To/Target/OU"
*(Note: Replace ~~deviceID~~ with the column header name in your CSV.)*

**Command to set a specific Target Version for an OU**:
Instead of updating individual devices, you typically update the Chrome Policy for their [Organizational Unit (OU)](https://github.com/GAM-team/GAM/wiki/Chrome-Policies):
gam update chromepolicy chrome.users.chromeBrowserUpdates targetVersionPrefixSetting stable-120 orgunit "/Your/OU/Path"
*(Note: stable-0 always points to the latest stable version.)*

### Quick Tips for Bulk Actions
- Generate a CSV of all devices: gam print cros allfields todrive.
- Deprovision devices in bulk: gam csv depro.csv gam update cros ~deviceId action deprovision_retiring_device acknowledge_device_touch_requirement.
- Speed Up Transfers: Use quickcrosmove at the end of your OU update command to skip individual processing for faster moves.