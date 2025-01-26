<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['video']) && $_FILES['video']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/uploads/';
        $uploadFile = $uploadDir . basename($_FILES['video']['name']);

        // Clear the uploads folder before uploading the new file
        clearUploadsFolder($uploadDir);

        // Check if the upload was successful
        if (move_uploaded_file($_FILES['video']['tmp_name'], $uploadFile)) {
            echo 'File uploaded successfully to: ' . $uploadFile;
        } else {
            echo 'Error moving the uploaded file.';
        }
    } else {
        echo 'No file uploaded or an error occurred. Error code: ' . $_FILES['video']['error'];
    }
} else {
    echo 'Invalid request method.';
}
?>