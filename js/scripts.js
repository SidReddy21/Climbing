/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

document.getElementById('videoUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('video', file);

        // Send file to the server using fetch
        fetch('upload.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                console.log('Upload successful:', data);
                alert('Video uploaded successfully!');
            })
            .catch((error) => {
                console.error('Error uploading video:', error);
                alert('There was an error uploading the video.');
            });
    }
});

// Function to handle the video preview
function previewVideo(event) {
    const videoFile = event.target.files[0];
    
    if (videoFile) {
        // Show the video box
        document.getElementById('videoBox').style.display = 'block';
        
        // Get the video player and set the video source to the uploaded file
        const videoPlayer = document.getElementById('videoPlayer');
        const videoSource = document.getElementById('videoSource');
        const videoURL = URL.createObjectURL(videoFile);
        videoSource.src = videoURL;
        
        // Load and play the video
        videoPlayer.load();
        videoPlayer.play();
        
        // Show the "Analyze" button
        document.getElementById('analyzeBtn').style.display = 'inline-block';
    }
}

function analyzeVideo() {
    alert('Need to be Implemented...');
}



  
const updateAnglesDisplay = (angles) => {
    document.getElementById('leftSEW').innerText = angles.leftSEW.toFixed(2);
    document.getElementById('rightSEW').innerText = angles.rightSEW.toFixed(2);
    document.getElementById('rightSHK').innerText = angles.rightSHK.toFixed(2);
    document.getElementById('leftSHK').innerText = angles.leftSHK.toFixed(2);
    document.getElementById('leftAHF').innerText = angles.leftAHF.toFixed(2);
    document.getElementById('rightAHF').innerText = angles.rightAHF.toFixed(2);
    document.getElementById('leftESH').innerText = angles.leftESH.toFixed(2);
    document.getElementById('rightESH').innerText = angles.rightESH.toFixed(2);
    document.getElementById('leftHKA').innerText = angles.leftHKA.toFixed(2);
    document.getElementById('rightHKA').innerText = angles.rightHKA.toFixed(2);
  };  
  
  const processFrame = async () => {
    if (!video.paused && !video.ended) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      const poses = await detector.estimatePoses(video);
      poses.forEach((pose) => {
        drawSkeleton(pose.keypoints, ctx);
        pose.keypoints.forEach(({ x, y, score }) => {
          if (score >= 0.7) {
            ctx.beginPath();
            ctx.arc(x * scaleX, y * scaleY, 3.8, 0, 2 * Math.PI);
            ctx.fillStyle = "green";
            ctx.fill();
          }
        });
  
        // Calculate angles
        const angles = {
            leftSEW: calculateAngle(pose.keypoints[5], pose.keypoints[6], pose.keypoints[7]),
            rightSEW: calculateAngle(pose.keypoints[2], pose.keypoints[3], pose.keypoints[4]),
            leftESH: calculateAngle(pose.keypoints[6], pose.keypoints[5], pose.keypoints[11]),
            rightESH: calculateAngle(pose.keypoints[3], pose.keypoints[2], pose.keypoints[12]),
            leftSHK: calculateAngle(pose.keypoints[5], pose.keypoints[11], pose.keypoints[13]),
            rightSHK: calculateAngle(pose.keypoints[2], pose.keypoints[12], pose.keypoints[14]),
            leftHKA: calculateAngle(pose.keypoints[11], pose.keypoints[13], pose.keypoints[15]),
            rightHKA: calculateAngle(pose.keypoints[12], pose.keypoints[14], pose.keypoints[18]),
            leftAHF: calculateAngle(pose.keypoints[15], pose.keypoints[16], pose.keypoints[17]),
            rightAHF: calculateAngle(pose.keypoints[18], pose.keypoints[19], pose.keypoints[20]),
        };
  
        // Update angles display
        updateAnglesDisplay(angles);
      });
  
      requestAnimationFrame(processFrame);
    }
  };
  


  const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: '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',
});

exports.handler = async function(event, context) {
  const prompt = "generate a little climbing tips advice roughly 100 words about how i should straight my elbows more. say something about how in the video my arms were too bent. use a kind and motivating tone";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ advice: response.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error generating advice' }),
    };
  }
};
