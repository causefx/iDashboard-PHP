<?php

try {
    $config = parse_ini_file('settings.ini.php', true);
} catch(Exception $e) {
    die('<b>Unable to read config.ini.php. Did you rename it from config.ini.php-example?</b><br><br>Error message: ' .$e->getMessage());
}

foreach ($config as $keyname => $section) {
        
        if(!empty($section["useicons"]) && ($section["useicons"]=="true")){ 
            
            $icons = "active";
            if($icons == "active"){ $px = "80px"; }else{ $px = "50px";}
            
            $guesticons = "<span><i class=\"fa fa-toggle-on\"></i></span>";
            $adminicons = "<span><i class=\"fa fa-toggle-on\"></i></span>";
        }
    
        //Guest
        if(!isset($_COOKIE["logged"]) && !empty($section["enabled"]) && ($section["enabled"]=="true") && !empty($section["guest"]) && ($section["guest"]=="true") ) {
            if($icons == "active"){ $listicons = "<span><i class=\"fa ". $section["icon"] ."\"></i></span>"; }
            $loadedlist .= "<li><a>" . $keyname . " " . $listicons ."</a></li>\n";
            $loadedurls .= "<div class=\"z-nopadding\" data-content-url=\"". $section["url"] ."\" data-content-type=\"iframe\"></div>\n";
                            
        }
        //Full Access
        if(isset($_COOKIE["logged"]) && !empty($section["enabled"]) && ($section["enabled"]=="true")) {
            if($icons == "active"){ $listicons = "<span><i class=\"fa ". $section["icon"] ."\"></i></span>"; }
            $loadedlist .= "<li><a>" . $keyname . " " . $listicons ."</a></li>\n";
            $loadedurls .= "<div class=\"z-nopadding\" data-content-url=\"". $section["url"] ."\" data-content-type=\"iframe\"></div>\n";
            
        }
        //General
        if (empty($title)) $title = 'Manage My HTPC';
        if(($keyname == "general")) { $title = $section["title"]; }

}
if(!isset($_COOKIE["logged"])){
    $lasttablist .= "<li><a>Login" . $guesticons . "</a></li>\n";
    $lasttaburl .= "<div class=\"z-nopadding\" data-content-url=\"setup.php\" data-content-type=\"iframe\"></div>\n";
}

if(isset($_COOKIE["logged"])){
    $lasttablist .= "<li><a>Settings" . $adminicons . "</a></li>\n";
    $lasttaburl .= "<div class=\"z-nopadding\" data-content-url=\"setup.php\" data-content-type=\"iframe\"></div>\n";
}

if(!file_exists('settings.ini.php')){
    $lasttablist = "<li><a>Setup<span><i class=\"fa fa-spinner\"></i></span></a></li>\n";
    $lasttaburl = "<div class=\"z-nopadding\" data-content-url=\"setup.php\" data-content-type=\"iframe\"></div>\n";
}

?>
<!doctype html>
<html class="z-white z-width1200">

    <head>

        <title><?=$title;?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width = device-width, initial-scale = 1.0" />
        <link href="css/min.css" rel="stylesheet" />
        <link href="css/tabs.min.css" rel="stylesheet" />
        <script src="js/jquery.min.js"></script>
        <script src="js/tabs.min.js"></script>
        <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
    
    </head>

    <body style="position: fixed; top: 0; right: 0; bottom: 0; left: 0;background: url(img/bg.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;">

        <span>&nbsp;</span>

        <div id="page">

            <!--Tabs Start-->
            <div id="tabbed-nav">

                <ul>

                    <?=$loadedlist;?>
                    <?=$lasttablist;?>

                </ul>

                <!-- Content container -->
                <style> .z-container { position: fixed; top: 50px; right: 0px; bottom: 0px; left: 0px; margin: 10px; } </style>
                <div style="top: <?=$px;?>">              

                    <?=$loadedurls;?>
                    <?=$lasttaburl;?>

                </div>

            </div>
            <!--Tabs End-->

        </div>

        <script>
            jQuery(document).ready(function ($) {
                /* jQuery activation and setting options for the tabs*/
                $("#tabbed-nav").zozoTabs({
                    defaultTab: "tab1",
                    multiline: true,
                    theme: "white",
                    position: "top-compact",
                    size: "medium",
                    animation: {
                        easing: "easeInOutExpo",
                        duration: 450,
                        effects: "fade"
                    }
                });
            });
        </script>
        <script>
            jQuery('iframe','#container').attr('src',url);
        </script>

    </body>
    
</html>
