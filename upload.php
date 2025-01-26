<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['video']) && $_FILES['video']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/uploads/';
        $uploadFile = $uploadDir . 'raw.mp4';

        // Function to clear the uploads directory
        function clearUploadsFolder($dir) {
            // Get all files in the uploads directory
            $files = array_diff(scandir($dir), array('.', '..'));
            
            foreach ($files as $file) {
                $filePath = $dir . $file;
                // Delete each file in the directory
                if (is_file($filePath)) {
                    unlink($filePath);
                }
            }
        }

        // Create the uploads directory if it doesn't exist
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Clear the uploads folder before uploading the new file
        clearUploadsFolder($uploadDir);

        // Move the uploaded file to the uploads directory
        if (move_uploaded_file($_FILES['video']['tmp_name'], $uploadFile)) {
            echo 'File uploaded successfully.';
        } else {
            echo 'Error moving the uploaded file.';
        }
    } else {
        echo 'No file uploaded or an error occurred.';
    }
} else {
    echo 'Invalid request method.';
}
?>
