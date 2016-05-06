<?php
if((!isset($_COOKIE["logged"]))){
    echo "<!DOCTYPE html>";
    echo "<head>";
    echo "<title>Form submitted</title>";
    echo "<script type='text/javascript'>window.location.replace('setup.php');</script>";
    echo "</head>";
    echo "<body></body></html>";
    die;
    
}

if(isset($_GET["action"])){$action = $_GET["action"];}

function write_ini_file($content, $path) { 

    if (!$handle = fopen($path, 'w')) { 
        return false; 
    }

    $success = fwrite($handle, $content);
    fclose($handle); 

    return $success; 
}

//ini_set('display_errors',1);  error_reporting(E_ALL);

$configfile = 'settings.ini.php';

try {
    $config = parse_ini_file('settings.ini.php', true);
} catch(Exception $e) {
    die('<b>Unable to read config.ini.php. Did you rename it from settings.ini.php-example?</b><br><br>Error message: ' .$e->getMessage());
}

//Password crap
if(array_key_exists('category-0', $_POST) == true){
    foreach ($config as $keyname => $section) { if(($keyname == "general")) { $nopass = $section["password"]; } }
    $salt = substr(str_replace('+','.',base64_encode(md5(mt_rand(), true))),0,16);
    $rounds = 10000;
    if(empty($_POST["password-0"])){ $_POST["password-0"] = $nopass;}
    if(strlen($_POST["password-0"]) < 50){ $_POST["password-0"] = crypt($_POST["password-0"], sprintf('$5$rounds=%d$%s$', $rounds, $salt)); }
    //password crap      

    //Gather Config Write Info
    $sampleData .= '; <?php die("Access denied"); ?>' . "\r\n";

    foreach ($_POST as $parameter => $value) {
        $splitParameter = explode('-', $parameter);
        if ($value == "on")
            $value = "true";

    if($splitParameter[0] == "category"){ $sampleData .= "[" . $value . "]\r\n"; }else{ $sampleData .= $splitParameter[0] . " = \"" . $value . "\"\r\n"; }

    }

    if($action == "write"){
        write_ini_file($sampleData, $configfile);
        sleep(.5);
        echo "<!DOCTYPE html>";
        echo "<head>";
        echo "<title>Form submitted</title>";
        echo "<script type='text/javascript'>window.location.replace('settings.php');</script>";
        echo "</head>";
        echo "<body></body></html>";
    }

}
                                                
?>

<!doctype html>
<html>

    <head>

        <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'>
        <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
        <!-- Bootstrap -->
        <link rel="stylesheet" href="css/bootstrap.min.css"/>
        <!-- Font Awesome -->
        <link rel="stylesheet" href="css/font-awesome.min.css"/>
        <!-- Bootstrap-Iconpicker -->
        <link rel="stylesheet" href="css/bootstrap-iconpicker.min.css"/>
        
        <style>
            body {
                margin: 50px;
            }

            .fa {
                min-width: 14px;
            }

            .form-inline .form-control,
            .form-inline .btn {
                margin-bottom: 8px;
            }

            .form-group {
                width: 100%;
            }

            input[type=checkbox].css-checkbox {
                position:absolute; z-index:-1000; left:-1000px; overflow: hidden; clip: rect(0 0 0 0); height:1px; width:1px; margin:-1px; padding:0; border:0;
            }

            input[type=checkbox].css-checkbox + label.css-label {
                padding-left:55px;
                height:30px; 
                display:inline-block;
                line-height:30px;
                background-repeat:no-repeat;
                background-position: 0 0;
                font-size:30px;
                vertical-align:middle;
                cursor:pointer;
            }

            input[type=checkbox].css-checkbox:checked + label.css-label {
                background-position: 0 -30px;
            }
            label.css-label {
                background-image:url(img/check.png);
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            hr {
                display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #ccc;
                margin: 1em 0 auto;
                padding: 0;
            }
        </style>
        
    </head>
        
    <body> 

        <form action="?action=write" method="post" name="adminForm" class="form-inline">
            <?php
            foreach ($config as $keyname => $section) {
                if(($keyname == "general")) {
                    echo "<div class=\"form-group clearfix\">";
                    echo "<input type=\"hidden\" name=\"category-0\" class=\"form-control\" value=\"general\">";
                    echo "<span class=\"btn btn-inactive \" type=\"button\"><span class=\"fa fa-cog\"></span></span> ";
                    echo "<input type=\"text\" name=\"title-0\" class=\"form-control\" value=\"" . $section["title"] ."\"> ";
                    echo "<input type=\"text\" name=\"password-0\" class=\"form-control\" placeholder=\"Leave Blank if no change\" value=\"\"> ";
                    if($section['useicons'] == "true"){echo "<input type=\"checkbox\" name=\"useicons-0\" id=\"useicons-0\" class=\"css-checkbox\" checked> ";}else {echo "<input type=\"checkbox\" name=\"useicons-0\" id=\"useicons-0\" class=\"css-checkbox\"> ";}
                    echo "<label for=\"useicons-0\" class=\"css-label\">Icons</label></div><br/><hr/><br/> ";
                }
            }
            ?>

            <div id="tagsForm" class="sortable">

            <?php
            $i = 0;
            foreach ($config as $keyname => $section) {

                if(($keyname !== "general")) {
                    ?>  

                    <div class="form-group clearfix">
                        <span class="btn btn-default move" type="button"><span class="fa fa-arrows"></span></span>
                        <input type="text" name="category-<?=$i;?>" class="form-control" value="<?=$keyname;?>">
                        <input type="text" name="url-<?=$i;?>" class="form-control" placeholder="url" value="<?=$section['url']?>">
                        <button data-placement="left" data-cols="5" data-rows="5" class="btn btn-default" name="icon-<?=$i;?>" role="iconpicker" data-iconset="fontawesome" data-icon="<?=$section['icon']?>"></button>
                        <?php
                        if($section['enabled'] == "true"){echo '<input type="checkbox" name="enabled-' . $i .'" id="enabled-' . $keyname . '" class="css-checkbox" checked>';}else {echo '<input type="checkbox" name="enabled-' . $i .'" id="enabled-' . $keyname . '" class="css-checkbox">';}?>      
                        <label for="enabled-<?=$keyname;?>" class="css-label">Enabled</label> 
                        <?php
                        if($section['guest'] == "true"){echo '<input type="checkbox" name="guest-' . $i .'" id="guest-' . $keyname . '" class="css-checkbox" checked>';}else {echo '<input type="checkbox" name="guest-' . $i .'" id="guest-' . $keyname . '" class="css-checkbox">';}?>
                        <label for="guest-<?=$keyname;?>" class="css-label">Guest</label> <button class="btn btn-danger deleteGroup" id="remScnt" type="button"><span class="fa fa-trash"></span></button>
                    </div>

                <?php
                }
                $i++;
            }
            ?>

            </div>

            <div class="form-group clearfix">  
                <button class="btn btn-primary" id="addScnt" type="button"><span class="fa fa-plus"></span></button> 
                <button class="btn btn-success" type="submit"> Save Settings </button>
            </div>

        </form>

        <script type="text/javascript" src="https://code.jquery.com/jquery-1.4.3.min.js"></script>

        <script type='text/javascript'>

        $(function() {
            var scntDiv = $('#tagsForm');
            var i = <?=$i?>;

            $('#addScnt').on('click', function() {
                $('<div class="form-group clearfix ui-sortable-handle"> <span class="btn btn-default move" type="button"><span class="fa fa-arrows"></span></span> <input type="text" name="category-' + i +'" class="form-control" placeholder="Tag" value="New Tab"> <input type="text" name="url-' + i +'" class="form-control" placeholder="url" value="Add URL"> <button class="btn btn-default" name="icon-' + i +'" role="iconpicker" data-iconset="fontawesome" data-icon="fa-question"></button> <input type="checkbox" name="enabled-' + i +'" id="enabled-' + i +'" class="css-checkbox"> <label for="enabled-' + i +'" class="css-label">Enabled</label> <input type="checkbox" name="guest-' + i +'" id="guest-' + i +'" class="css-checkbox"> <label for="guest-' + i +'" class="css-label">Guest</label> <button class="btn btn-danger deleteGroup" id="remScnt" type="button"><span class="fa fa-trash"></span></button></div>').appendTo(scntDiv);
                i++;    
                return false;

            });

            $(document).on('click','#remScnt', function() {

                $(this).closest('div').remove();
                i--;

                return false;
            });

        });

        </script>

        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>          

        <script src='https://code.jquery.com/ui/1.11.2/jquery-ui.min.js'></script>

        <script>$( "#tagsForm" ).sortable({connectWith: ".sortable"});</script>

        <!-- jQuery -->
        <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>

        <!-- Bootstrap -->
        <script type="text/javascript" src="js/bootstrap.min.js"></script>

        <!-- Bootstrap-Iconpicker Iconset for Font Awesome -->
        <script type="text/javascript" src="js/iconset-fontawesome-4.2.0.min.js"></script>

        <!-- Bootstrap-Iconpicker -->
        <script type="text/javascript" src="js/bootstrap-iconpicker.min.js"></script>

    </body>
    
</html>