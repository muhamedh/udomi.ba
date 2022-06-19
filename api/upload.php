<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../vendor/autoload.php"; // loads the libraries
use Cloudinary\Cloudinary; //using the Cloudinary library for PHP


$files = $_FILES['file'];
$catch = array();
//TODO delete global temp
$temp = "";

$allowedTypes = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg',
];
if (count($files['name']) > 5){
    die("5");
}
if (!isset($_FILES["file"]) || $_FILES["file"]["size"] === 0) { //if the global var is not set -> return error message
    die("1");
}
$cloud_name = getenv('CLOUD_NAME');
$api_key = getenv('API_KEY');
$api_secret = getenv('API_SECRET');
    $cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => $cloud_name,
        'api_key'    => $api_key,
        'api_secret' => $api_secret,
    ],
    ]);

for($i = 0;$i < count($files['name']);$i++){
    $filepath = $files['tmp_name'][$i];
    $fileSize = filesize($filepath);

    $fileinfo = finfo_open(FILEINFO_MIME_TYPE);
    $filetype = finfo_file($fileinfo, $filepath);

    if($fileSize > 3146728){
        die("2");
    }

    if (!in_array($filetype, array_keys($allowedTypes))) {
        die("3");
    }

    $filename = basename($filepath); // use the original name of the file
    $extension = $allowedTypes[$filetype];
    $targetDirectory = __DIR__ . "/"; // __DIR__ is the directory of the current PHP file

    $newFilepath = $targetDirectory . "../assets/img/" . $filename . "." . $extension;

    if (!copy($filepath, $newFilepath)) { // Copy the file, returns false if failed
        die("4");
    }

    unlink($filepath); // Delete the temp file



    $resolved_path = "../assets/img/".$filename.".".$extension;


    $temp = $cloudinary->uploadApi()->upload($resolved_path); // perform the upload of the picture
    
    $catch[$i]['url'] = $temp['secure_url'];
    $catch[$i]['public_id'] = $temp['public_id'];
    //json_encode(array("secure_url" => $temp['secure_url']),JSON_UNESCAPED_SLASHES);
    
    // delete the temporary file on the server side
    unlink($newFilepath);
}

print_r(json_encode($catch, JSON_FORCE_OBJECT | JSON_UNESCAPED_SLASHES)."\n");
