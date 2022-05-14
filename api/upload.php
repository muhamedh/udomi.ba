<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../vendor/autoload.php"; // loads the libraries
use Cloudinary\Cloudinary; //using the Cloudinary library for PHP


if (!isset($_FILES["myFile"]) || $_FILES["myFile"]["size"] === 0) { //if the global var is not set -> return error message
    die("1");
}

$filepath = $_FILES['myFile']['tmp_name']; 
$fileSize = filesize($filepath);

$fileinfo = finfo_open(FILEINFO_MIME_TYPE);
$filetype = finfo_file($fileinfo, $filepath);



if ($fileSize > 3145728) { // 3 MB (1 byte * 1024 * 1024 * 3 (for 3 MB))
    die("2");
}

$allowedTypes = [
   'image/png' => 'png',
   'image/jpeg' => 'jpg',
];

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


$resolved_path = "../assets/img/".$filename.".".$extension;


$catch = $cloudinary->uploadApi()->upload($resolved_path); // perform the upload of the picture
// returns an json object


// return the secure url to the ajax call

print_r(json_encode(array("secure_url" => $catch['secure_url']),JSON_UNESCAPED_SLASHES));
// delete the temporary file on the server side
unlink($newFilepath);


?>