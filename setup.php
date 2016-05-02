<?php

//ini_set('display_errors',1);  error_reporting(E_ALL);

$configfile = 'settings.ini.php';
$examplefile = 'example.ini.php';

if(!file_exists($filename) && !file_exists($examplefile)){
    die('You are missing the ini configuration file, please download and refresh this page');
}

if(!file_exists($configfile)){
    echo "The file $configfile does not exist, we will make a copy now...<br/><br/>";
    if (!is_writable(dirname($examplefile)))
        die('We don\'t have access to write to the current directory, please change the permissions to this directory.');
    else {
        copy($examplefile, $configfile);
        sleep(2);
        echo "<!DOCTYPE html>";
        echo "<head>";
        echo "<title>Form submitted</title>";
        echo "<script type='text/javascript'>window.parent.location.reload()</script>";
        echo "</head>";
        echo "<body></body></html>";
    }
}

try {
    $config = parse_ini_file('settings.ini.php', true);
} catch(Exception $e) {
    die('<b>Unable to read config.ini.php. Did you rename it from settings.ini.php-example?</b><br><br>Error message: ' .$e->getMessage());
}

foreach ($config as $keyname => $section) {
    
        if(($keyname == "general")) { $hash_pass = $section["password"]; }

}

/*$salt = substr(str_replace('+','.',base64_encode(md5(mt_rand(), true))),0,16);
$rounds = 10000;
$given_hash = crypt($realpass, sprintf('$5$rounds=%d$%s$', $rounds, $salt));
*/

$pass = isset( $_POST["pass"] ) ? $_POST["pass"] : "none" ;

if(isset( $_POST["pass"] ) && $pass !== "none"){ $error = "Wrong Password!";}

$parts = explode('$', $hash_pass);
$test_hash = crypt($pass, sprintf('$%s$%s$%s$', $parts[1], $parts[2], $parts[3]));

if(($hash_pass == $test_hash)){ 
    setcookie("logged", "Dashboard", time() + (86400 * 7), "/");
    //echo "<meta http-equiv='refresh' content='0'>";
        echo "<!DOCTYPE html>";
        echo "<head>";
        echo "<title>Form submitted</title>";
        echo "<script type='text/javascript'>window.parent.location.reload()</script>";
        echo "</head>";
        echo "<body></body></html>";
} 
    
if((!isset($_COOKIE["logged"]))){

    echo "<center><B>Please Login to Contiune<br/><br/>";
    echo $error . "<br/>";
    echo "<style> .css-input { padding:8px; border-radius:47px; border-width:3px; border-style:double; font-size:17px; border-color:#0a090a; box-shadow: 2px 6px 8px 0px rgba(42,42,42,.75); font-weight:bold;  } 
		 .css-input:focus { outline:none; } </style>";
    echo "<form method='POST'>";
    echo "<b>Password: </b><input class='css-input' type='password' name='pass'></input>            ";
    echo "<input class='css-input' type='submit' name='submit' value='Go'></input>";
    echo "</form></center>";
    
}else{
    
        echo "<!DOCTYPE html>";
    echo "<head>";
    echo "<title>Form submitted</title>";
    echo "<script type='text/javascript'>window.location.replace('settings.php');</script>";
    echo "</head>";
    echo "<body></body></html>";
    
}
?>