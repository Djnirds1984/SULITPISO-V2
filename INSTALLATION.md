# SULITPISO by AJC IT SOLUTIONS - Installation Guide

This guide provides instructions for setting up the SULITPISO admin panel on an Orange Pi One or any computer running Ubuntu x64.

The application consists of two main parts:
1.  **Frontend:** A modern user interface built with React (the code you currently have).
2.  **Backend:** The server-side logic that will be powered by **PHP**. The backend will handle saving settings, controlling the hardware (GPIO, network), and managing the hotspot logic.

This guide will help you set up the web server environment required to run both.

---

## Prerequisites

### Hardware
*   **For Orange Pi One:**
    *   Orange Pi One board
    *   A reliable power supply (5V, 2A recommended)
    *   An SD card (8GB or more, Class 10 recommended)
    *   A USB to LAN (Ethernet) adapter for the WAN connection.
    *   An Ethernet cable for connecting to your router (WAN) and another for the LAN port.
*   **For Ubuntu x64:**
    *   A PC or server running Ubuntu Desktop or Server (20.04 LTS or newer recommended).
    *   Two network interfaces (e.g., two Ethernet ports, or one Ethernet and one Wi-Fi adapter). One for WAN, one for the hotspot LAN.

### Software
*   An operating system image for your device:
    *   **Orange Pi One:** [Armbian](https://www.armbian.com/orange-pi-one/) is highly recommended for its stability and performance.
    *   **Ubuntu x64:** The official Ubuntu Server/Desktop image.
*   A tool to write the OS image to the SD card (e.g., [BalenaEtcher](https://www.balena.io/etcher/)).
*   An SSH client (like PuTTY for Windows, or the built-in Terminal for macOS/Linux) to connect to your device.

---

## Step 1: Prepare the Operating System

1.  **Flash the OS:** Use BalenaEtcher to flash the Armbian or Ubuntu image onto your SD card (for Orange Pi) or install it on your PC.

2.  **First Boot & Basic Setup:**
    *   Insert the SD card into your Orange Pi, connect it to your network via the built-in Ethernet port, and power it on.
    *   Find the device's IP address from your router's dashboard.
    *   Connect to the device via SSH. The default credentials for Armbian are typically `root` / `1234`. You will be prompted to change the root password and create a new user account. **Do this for security.**
    *   For Ubuntu, follow the on-screen installation prompts.

3.  **Update the System:**
    Once connected via SSH, run the following commands to ensure your system is up-to-date:
    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

---

## Step 2: Install Web Server and PHP

We will use the popular Apache web server to host the admin panel and run the PHP backend.

1.  **Install Apache, PHP, and Git:**
    Run this command to install Apache, PHP, the module that allows Apache to process PHP files, and Git for version control.
    ```bash
    sudo apt install apache2 php libapache2-mod-php git -y
    ```

2.  **Verify the Installation:**
    *   Enable and start the Apache service:
        ```bash
        sudo systemctl start apache2
        sudo systemctl enable apache2
        ```
    *   Open a web browser on a computer on the same network and navigate to `http://<your-device-ip>`. You should see the default Apache2 welcome page.

---

## Step 3: Deploy the SULITPISO Admin Panel

Now, we will clone your project repository directly to the web server's public directory.

1.  **Navigate to the Web Root and Clear It:**
    Go to the web server's directory and remove the default file.
    ```bash
    cd /var/www/html
    sudo rm index.html
    ```

2.  **Clone Your Repository:**
    Clone the project files from your GitHub repository into the current directory (`.` indicates the current directory).
    ```bash
    sudo git clone https://github.com/Djnirds1984/SULITPISO-V2.git .
    ```

3.  **Create a Writable Data Directory:**
    The backend needs a place to store configuration files. Create a `data` directory for this purpose.
    ```bash
    sudo mkdir data
    ```
    
4.  **Set Permissions:**
    The web server needs permission to read the application files and write to the `data` directory. Set the correct ownership and permissions.
    ```bash
    sudo chown -R www-data:www-data /var/www/html
    sudo chmod -R 755 /var/www/html
    ```

---

## Step 4: Access and Next Steps

1.  **Access the Admin Panel:**
    Open your web browser and navigate to your device's IP address again.
    ```
    http://<your-device-ip>
    ```
    You should now see the SULITPISO login/dashboard page.

2.  **Building the PHP Backend (Roadmap):**
    The frontend is now running and can communicate with PHP scripts in the `/api` directory. Your next tasks will be to expand the backend functionality.

    *   **API Location:** Your PHP files (e.g., `settings.php`, `gpio.php`, `rates.php`) should be placed in the `/var/www/html/api` directory.
    *   **Frontend-Backend Communication:** Modify the React components (e.g., in `pages/SystemSettings.tsx`) to make API calls (using `fetch`) to your PHP scripts.
        *   **Example:** When the "Save Changes" button in System Settings is clicked, the React app should send a POST request to `http://<your-device-ip>/api/settings.php` with the new settings data.
    *   **PHP Logic:** The `settings.php` script would then receive this data, validate it, and save it to a file inside the `/data` directory. To control GPIO, your PHP script can use `shell_exec()` to run Python scripts or command-line tools that interact directly with the hardware.

Your SULITPISO system is now ready for further backend development!