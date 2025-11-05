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

1.  **Install Apache and PHP:**
    Run this command to install Apache, PHP, and the module that allows Apache to process PHP files.
    ```bash
    sudo apt install apache2 php libapache2-mod-php -y
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

Now, we will copy the React frontend files to the web server's public directory.

1.  **Remove Default Apache Page:**
    Delete the default `index.html` file created by Apache.
    ```bash
    sudo rm /var/www/html/index.html
    ```

2.  **Copy Application Files:**
    *   You need to transfer the SULITPISO application files ( `index.html`, `index.tsx`, and all other components/pages) to the `/var/www/html/` directory on your Orange Pi or Ubuntu machine.
    *   An easy way to do this is using a tool like `scp` (Secure Copy) or an SFTP client like FileZilla or WinSCP.
    *   **Example using `scp` from your development computer:**
        ```bash
        # This command copies all files from your current local directory to the remote server
        scp -r ./* your_user@<your-device-ip>:/var/www/html/
        ```
        *(Note: The above command is a conceptual example. You will likely need to adjust paths and may need to upload to a temporary directory first, then use `sudo mv` on the device.)*

3.  **Set Permissions:**
    The web server needs permission to read the files. Set the correct ownership and permissions for the web directory.
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
    You should now see the SULITPISO login/dashboard page instead of the Apache default page.

2.  **Building the PHP Backend (Roadmap):**
    The frontend is now running, but it doesn't do anything yet because the backend is missing. Your next task is to create the PHP scripts that will make the admin panel functional.

    *   **Create an `api` directory:** Inside `/var/www/html/`, create a directory named `api`.
        ```bash
        sudo mkdir /var/www/html/api
        ```
    *   **Create PHP files:** Inside this `api` directory, you will create your PHP files (e.g., `settings.php`, `gpio.php`, `rates.php`).
    *   **Frontend-Backend Communication:** Modify the React components (e.g., in `pages/SystemSettings.tsx`) to make API calls (using `fetch` or `axios`) to your PHP scripts.
        *   **Example:** When the "Save Changes" button in System Settings is clicked, the React app should send a POST request to `http://<your-device-ip>/api/settings.php` with the new settings data.
    *   **PHP Logic:** The `settings.php` script would then receive this data, validate it, and save it to a file (like a `.json` or `.ini` file) or a database (like SQLite). To control GPIO, your PHP script can use `shell_exec()` to run Python scripts or command-line tools that interact directly with the hardware.

Your SULITPISO system is now ready for backend development!
