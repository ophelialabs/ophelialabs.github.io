# [RHEL9 Docs](https://docs.oracle.com/en/operating-systems/oracle-linux/9/)
**OWL/WISE/CENTRALSHARE**

## Important Directories
- DS: `/`, `/home`, `/tmp`, `/var`, `/var/tmp`, `/var/log`, `/var/log/audit`, `/boot`
- Import Policies
- [docs](https://techdocs.broadcom.com/us/en/vmware-cis/vcf/stig/9-0/vcf-stig-documentation/docs-tutorials-cloud-foundation-9x-product-vcf-application-audit9-app-audit9-app.html)
-[SAF CLI](https://github.com/mitre/saf/releases)
- /usr/share/stigs
- [API METRICS](https://www.brockpeterson.com/post/pulling-vsphere-world-metrics-from-vcf-operations)
- [DX Netops](https://techdocs.broadcom.com/us/en/ca-enterprise-software/it-operations-management/dx-netops/24-3.html)
- [DX Spectrum](https://techdocs.broadcom.com/us/en/ca-enterprise-software/it-operations-management/spectrum/22-2.html)
- [OneClick](https://techdocs.broadcom.com/us/en/ca-enterprise-software/it-operations-management/spectrum/25-4/getting-started/client-applications-overview/oneclick-console.html)
- [Hypori](https://www.hypori.com/)
- [Hypori & AVD](Hypori_AVD.MD)
- Smart
  1. Windows
       emulates using the Trusted Platform Module (TPM) on your computer, allowing for secure, two-factor authentication.
### Steps (Using Command Prompt - Admin):
### 1. Run the following command:
```bash
tmpvscmgr.exe create /name testVSC /pin promp /adminkey random /generate
```
- This creates a card named "TestVSC", prompts for a PIN, and generates the file system.
### 2. Enroll a certificate
    1. Open certmgr.msc
    2. Right-click on Personal>All Tasks>Request New Certificate.
    3. Select the TPM VSC as the target

### Alternative Method
- Omnissa Horizon Client: Settings > Derived Credententials > Create new VSC

### Smart Business (NFC)
Share contact info, social media, websites via a tap
  1. Select a Provider: Wave, Popl, similar
  2. Create Profile: Register with a provider to create digital profile
  3. Customize Content: Add social media links, bio, contact, set up a lead capture form
  4. Order or Activate: NFC enabled metal or plastic, or a tag which will be linked to profile
  5. Use Digital Alternative: Use a QR code or add profile to Apple/Google Wallet

### Summary of Requirements
- Virtual: Windowns 10/11 or [Windows Server](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025) with TPM chip enabled and tpmvscmgr.exe tool
- Smart Business Card: A smart business card provider (e.g. Wave), an NFC-enabled smartphone, and a customized digital profile

- [Purebred](https://help.ivanti.com/mi/help/en_us/DCRED/11.0.0.0/gdco/Content/DerivedCredentialsGuide/Setting_up_Purebred_deri.htm)
- [Drivelock](https://www.drivelock.com/en/)
- Always shred or clean drives and motherboards upon disposal to prevent credential harvesting.
- ###### Using Yum repository for backwards compatability ######

---

## Network and Development Tools
- java, javac, node.js, php, lynx
---

---

## [Terraform](https://developer.hashicorp.com/terraform/install)
```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install terraform
```

---

## [Cockpit](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_systems_using_the_rhel_9_web_console/index)
Cockpit supports Ubuntu Focal (20.04), ROS-Noetic, and Gazebo (Gazebo not supported on RHEL9).
```bash
$ systemctl enable --now cockpit.socket
$ sudo dnf install -y cockpit-machines
```

---

## [VPN Config Guide](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_managing_networking/configuring-a-vpn-connection_configuring-and-managing-networking)
- Cockpit supports WireGuard VPN (requires FIPS disabled). For production, use Libreswan (Openswan IPsec fork). 

---

## [Virtualization Setup](https://docs.oracle.com/en/operating-systems/oracle-linux/kvm-user/kvm-InstallingVirtualizationPackages.html)
Install virtualization packages:
```bash
$ sudo dnf group install "Virtualization Host"
$ sudo dnf install qemu-kvm libvirt virt-install virt-viewer
$ for drv in qemu network nodedev nwfilter secret storage interface; do systemctl start virt${drv}d{,-ro,-admin}.socket; done
$ virt-host-validate
$ sudo dnf update -y
$ sudo dnf install -y pip
```

---

## [Install Go](https://go.dev/doc/install) 
```bash
$ sudo dnf install -y go
```
AMD/INTEL
```bash
$ curl -LO https://go.dev/dl/go1.24.2.linux-amd64.tar.gz
$ rm -rf /usr/local/go && tar -C /usr/local -xzf go1.24.2.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
```
ARM
```bash
$ curl https://go.dev/dl/go1.24.2.linux-arm64.tar.gz
$ rm -rf /usr/local/go && tar -C /usr/local -xzf go1.24.2.linux-arm64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
```

---

## [VS Code - Insiders](https://code.visualstudio.com/insiders/)
```bash
$ sudo dnf install -y code-insiders
```
or
```bash
$ cd Downloads && ls
$ sudo dnf install (code-insiders).rpm && sudo rm (code-insiders).rpm
```
## Github-SSH
```bash
$ ssh-keygen -t rsa -C "comment-here"
$ ssh-add ~/.ssh/id_rsa
$ cat ~/.ssh/id_rsa.pub
```
### Copy key>Github>Settings>Add SSH key>Paste key
### Title = Machine Name
---

## [Podman Desktop](https://podman-desktop.io/docs/installation)
```bash
$ flatpak remote-add --if-not-exists --user flathub https://flathub.org/repo/flathub.flatpakrepo
$ flatpak install --user flathub io.podman_desktop.PodmanDesktop
$ flatpak update --user io.podman_desktop.PodmanDesktop
$ flatpak run io.podman_desktop.PodmanDesktop
```

---



---

## [Kubernetes (K8s)](https://kubernetes.io/docs/tasks/tools/)
Install Kubernetes tools:
```bash
$ cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://pkgs.k8s.io/core:/stable:/v1.32/rpm/
enabled=1
gpgcheck=1
gpgkey=https://pkgs.k8s.io/core:/stable:/v1.32/rpm/repodata/repomd.xml.key
exclude=kubelet kubeadm kubectl cri-tools kubernetes-cni
EOF
$ sudo yum install -y kubelet kubeadm kubectl cri-tools kubernetes-cni --disableexcludes=kubernetes
$ systemctl enable --now kubelet
$ go install sigs.k8s.io/kind@v0.27.0
$ sudo mv ~/go/bin/kind /bin
$ sudo rm -r ~/go
$ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-latest.x86_64.rpm
$ sudo rpm -Uvh minikube-latest.x86_64.rpm
```

---

## CLIs
[Azure Cloud (AZ)](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?view=azure-cli-latest&pivots=dnf)
```bash
```
Google Cloud Platform (GCP)
```bash
sudo tee -a /etc/yum.repos.d/google-cloud-sdk.repo << EOM
[google-cloud-cli]
name=Google Cloud CLI
baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el9-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOM
```
- if using Fedora 34 or 35 install
```bash
sudo dnf install libxcrypt-compat.x86_64
```
```bash
sudo dnf install google-cloud-cli
```
- reference a file to install additional components
- gcloud auth login works best with chrome browser
```bash
gcloud init
gcloud auth login
```

Amazon Web Services (AWS)
```bash
```

---

## [Virtual Machine Creation](https://docs.oracle.com/en/operating-systems/oracle-linux/cockpit/cockpit-kvm.html)

---
