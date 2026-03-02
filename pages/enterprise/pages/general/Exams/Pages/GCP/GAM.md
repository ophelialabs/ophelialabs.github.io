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