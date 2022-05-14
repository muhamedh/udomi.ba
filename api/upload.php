<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "../vendor/autoload.php"; // loads the libraries
use Cloudinary\Cloudinary; //using the Cloudinary library for PHP


if (!isset($_FILES["myFile"])) { //if the global var is not set -> return error message
    die(501);
}

$filepath = $_FILES['myFile']['tmp_name'];
$fileSize = filesize($filepath);
$fileinfo = finfo_open(FILEINFO_MIME_TYPE);
$filetype = finfo_file($fileinfo, $filepath);

if ($fileSize === 0) {
    die(501);
}

if ($fileSize > 3145728) { // 3 MB (1 byte * 1024 * 1024 * 3 (for 3 MB))
    die(501);
}

$allowedTypes = [
   'image/png' => 'png',
   'image/jpeg' => 'jpg',
];

if (!in_array($filetype, array_keys($allowedTypes))) {
    die("File not allowed.");
}

$filename = basename($filepath); // I'm using the original name here, but you can also change the name of the file here
$extension = $allowedTypes[$filetype];
$targetDirectory = __DIR__ . "/"; // __DIR__ is the directory of the current PHP file

$newFilepath = $targetDirectory . "../assets/img/" . $filename . "." . $extension;

if (!copy($filepath, $newFilepath)) { // Copy the file, returns false if failed
    die("Can't move file.");
}
unlink($filepath); // Delete the temp file

$cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => getenv('CLOUD_NAME'),
        'api_key'    => getenv('API_KEY'),
        'api_secret' => getenv('API_SECRET'),
    ],
]);
//$path = "assets/tempimg/";
//print_r($path.$filename);

$resolved_path = "../assets/img/".$filename.".".$extension;
//print_r($resolved_path);

$catch = $cloudinary->uploadApi()->upload($resolved_path);



print_r(json_encode(array("secure_url" => $catch['secure_url']),JSON_UNESCAPED_SLASHES));

unlink($newFilepath);


?>