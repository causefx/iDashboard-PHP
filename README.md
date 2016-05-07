# iDashboard-PHP
HTPC Dashboard to load website services, written in PHP [Inspired by: [Managethis](https://github.com/Tenzinn3/Managethis) by [Tenzinn3](https://github.com/Tenzinn3)]
>Default Password is "iCauseFX"

![Desktop screenshot](http://i.imgur.com/KKhouUU.png)

## Setup
**Requirements:** A webserver (nginx, Apache, IIS or any other webserver) configured with PHP5 support.
`` parse_ini_file `` must be allowed in php.ini (default is allowed!)
- To set it up, clone this repository:
`` git clone https://github.com/causefx/iDashboard-PHP `` or download the ZIP-file.
- Place all files on a publically accessible webserver, either directly in the root, or inside a directory called ``Dashboard`` or whatever you want it to be called.  Please set the correct user permissions on the directory and it's files.

##INSTRUCTIONS
>Upload all contents of zip or git pull the zip into the folder you want to have this on your webserver.  Set the correct file permission on the files.

>Open up the index.php file once everything is uploaded.  The script will install and copt the default template over.

>Now you can goto settings and change the tabs to whaever you like in whatever order and change your password.
![Desktop screenshot](http://i.imgur.com/6PNff3U.png)

>Once the cookie expires you will need to login again
![Desktop screenshot](http://i.imgur.com/2rlNV5h.png)

If you aren't logged in you or any guest will only see your guest enabled tabs
![Desktop screenshot](http://i.imgur.com/sjwRQpB.png)


##This is just a rough beta...
>Verification is done through cookies and hashed passwords.
>Still working on mobile portion.

