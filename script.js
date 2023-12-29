document.addEventListener("DOMContentLoaded", function() {

    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.querySelector('.song-control__buttons .fa-play');
    const pauseButton = document.querySelector('.song-control__buttons .fa-pause');
    const timelineFill = document.querySelector('.timeline-fill');
    const timelineStart = document.querySelector('.song-control__timeline span:first-child');
    const timelineEnd = document.querySelector('.song-control__timeline span:last-child');
    const timeline = document.querySelector('.timeline');

    pauseButton.classList.add('hidden');
    playButton.addEventListener('click', function() {
        audioPlayer.play();
        toggleButtons();
    });

    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
        toggleButtons();
    });

    function toggleButtons() {
        playButton.classList.toggle('hidden');
        pauseButton.classList.toggle('hidden');
    }

    timeline.addEventListener('click', function(event) {
        const timelineRect = timeline.getBoundingClientRect();
        const clickX = event.clientX - timelineRect.left;
        const percentage = clickX / timelineRect.width;

        audioPlayer.currentTime = audioPlayer.duration * percentage;
        updateTimeline();
    });

    const mobileLogo = document.getElementById('mobileLogo');

    // Function to fetch songs for the given query
    function fetchSongsForQuery(query) {
        // Your existing fetchSongs function logic here, modified to use the provided query
        fetchSongs(query);
    }

    // Click event listener for the logo
    mobileLogo.addEventListener('click', function() {
        fetchSongsForQuery('tamil+2023');
    });

    audioPlayer.addEventListener('timeupdate', updateTimeline);

    function updateTimeline() {
        const fillWidth = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        timelineFill.style.width = `${fillWidth}%`;
        timelineStart.textContent = formatTime(audioPlayer.currentTime);
    }

    const searchInput = document.getElementById('searchome');

    function updatePlaceholder() {
        if (window.innerWidth <= 500) {
            searchInput.placeholder = "Search songs ..";
        } else {
            searchInput.placeholder = "Search songs, artist, movies, ...";
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        const mobileLogo = document.getElementById('mobileLogo');
        const desktopBars = document.getElementById('desktopBars');
        const headBtns = document.getElementById('headBtns');

        function toggleIcons() {
            if (window.innerWidth <= 768) { // Adjust the breakpoint as needed
                mobileLogo.style.display = 'block';
                desktopBars.style.display = 'none';
            } else {
                mobileLogo.style.display = 'none';
                desktopBars.style.display = 'block';
            }
        }

        // Call the function on page load
        toggleIcons();

        // Call the function when the window is resized
        window.addEventListener('resize', toggleIcons);
    });

    // Call the function on page load
    updatePlaceholder();

    // Call the function when the window is resized
    window.addEventListener('resize', updatePlaceholder);


    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchText = document.getElementById('searchInput').value.trim();
            if (searchText) {
                fetchSongs(searchText);
                toggleSearchBars();
            }
        }
    });
    document.getElementById('searchome').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTexts = document.getElementById('searchome').value.trim();
            if (searchTexts) {
                fetchSongs(searchTexts);
            }
        }
    });


    const randomButton = document.querySelector('.song-control__buttons .fa-random');
    const forwardButton = document.querySelector('.song-control__buttons .fa-forward');
    const stepBackwardButton = document.querySelector('.song-control__buttons .fa-step-backward');
    const redoButton = document.querySelector('.song-control__buttons .fa-redo-alt');

    // Random button
    randomButton.addEventListener('click', function() {
        const songs = Array.from(document.querySelectorAll('.box-item'));
        const randomIndex = Math.floor(Math.random() * songs.length);
        const randomSong = songs[randomIndex];
        simulateClick(randomSong);
    });
    audioPlayer.addEventListener('ended', function() {
        // Trigger the random button click
        randomButton.click();
    });

    let currentSongIndex = -1; // Index of the currently playing song. Initialized to -1 since no song is playing initially.

    // Update Song Details on Playback
    function updateCurrentSongDetails(songElement) {
        if (!songElement) return;

        const songSrc = songElement.querySelector('p[style="display: none;"]').textContent;
        audioPlayer.src = songSrc;
        audioPlayer.load();

        // Fetch song details
        fetch(songSrc)
            .then(response => response.blob())
            .then(blob => {
                const audioObject = new Audio();
                audioObject.src = URL.createObjectURL(blob);
                return new Promise(resolve => {
                    audioObject.onloadedmetadata = () => {
                        resolve(audioObject.duration);
                    };
                });
            })
            .then(songDuration => {
                duration = Math.floor(songDuration); // Set the duration
                timelineEnd.textContent = formatTime(duration); // Update the timelineEnd display
            })
            .catch(error => {
                console.error("Error fetching song duration:", error);
            });

        // Fetch song name and image details
        const songName = songElement.querySelector('h4').textContent;
        const songImgSrc = songElement.querySelector('img').src;

        // Update control panel with fetched details
        document.getElementById('currentSongImg').src = songImgSrc;
        document.getElementById('currentSongName').textContent = songName;

        const songNameElement = document.getElementById('currentSongName');
        songNameElement.textContent = songName;

        // Check if song name exceeds the container width
        if (songNameElement.scrollWidth > songNameElement.clientWidth) {
            // Apply scrolling animation
            songNameElement.innerHTML = `<span>${songName}</span>`;
        } else {
            // If it doesn't exceed, remove animation
            songNameElement.innerHTML = songName;
        }
        // Play the song
        audioPlayer.play().then(() => {
            playButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
        }).catch((error) => {
            console.error("Playback failed:", error);
        });
    }
    
    // Forward button
    forwardButton.addEventListener('click', function() {
        const songs = Array.from(document.querySelectorAll('.box-item'));

        // If no song is playing or if the last song is playing, start from the beginning
        if (currentSongIndex === -1 || currentSongIndex === songs.length - 1) {
            currentSongIndex = 0;
        } else {
            currentSongIndex++;
        }

        updateCurrentSongDetails(songs[currentSongIndex]);
    });

    // Step-backward button
    stepBackwardButton.addEventListener('click', function() {
        const songs = Array.from(document.querySelectorAll('.box-item'));

        // If the first song is playing, play the last song
        if (currentSongIndex === 0) {
            currentSongIndex = songs.length - 1;
        } else {
            currentSongIndex--;
        }

        updateCurrentSongDetails(songs[currentSongIndex]);
    });

    // Redo button
    redoButton.addEventListener('click', function() {
        audioPlayer.currentTime = 0; // Restart the song
        audioPlayer.play();
    });

    function simulateClick(element) {
        element.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        }));
    }


    // Add this code inside your "DOMContentLoaded" event listener
    document.getElementById('Leo').addEventListener('click', function() {
        fetchSongs('Leo');
    });

    document.getElementById('Jailer').addEventListener('click', function() {
        fetchSongs('Jailer');
    });

    document.getElementById('Vikram').addEventListener('click', function() {
        fetchSongs('Vikram');
    });
    document.getElementById('Jawan').addEventListener('click', function() {
        fetchSongs('Jawan');
    });
    document.getElementById('Sethupathi').addEventListener('click', function() {
        fetchSongs('Vijay Sethupathi');
    });
    document.getElementById('LoveToday').addEventListener('click', function() {
        fetchSongs('Love+Today');
    });
    document.getElementById('VelaiIllaPadathari').addEventListener('click', function() {
        fetchSongs('Velai+Illa+Padathari');
    });

    document.getElementById('Home').addEventListener('click', function() {
        fetchSongs('tamil 2023');
    });
    document.getElementById('Library').addEventListener('click', function() {
        fetchSongs('Tamil+2022');
    });

    // ... Do this for each playlist option

    // Function to remove active class from all options
    function removeActiveClassFromOptions() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('active');
        });
    }

    // Add event listeners to each general option to toggle active state
    document.getElementById('Home').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });
    document.getElementById('Library').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    // Add event listeners to each playlist option to toggle active state
    document.getElementById('Leo').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    document.getElementById('Jailer').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    document.getElementById('Vikram').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    document.getElementById('Jawan').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    document.getElementById('Sethupathi').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    document.getElementById('LoveToday').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });

    document.getElementById('VelaiIllaPadathari').addEventListener('click', function() {
        removeActiveClassFromOptions();
        this.classList.add('active');
    });
    pauseButton.classList.add('hidden');


    function fetchSongs(playlistName) {
        const baseUrl = "https://saavn.me/search/songs?query=";
        const query = playlistName.toLowerCase().replace(/\s+/g, ''); // Convert to lowercase and remove spaces
        const url = `${baseUrl}${query}+tamil&page=1&limit=60`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const innerStrip = document.querySelector('.inner-strip');
                innerStrip.innerHTML = '';
                populateBoxItems(data.data.results);
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    // jailer playlist
    fetch("https://saavn.me/search/songs?query=tamil+2023&page=1&limit=80")
        .then(response => response.json())
        .then(data => {
            populateBoxItems(data.data.results);
        })
        .catch(error => console.error("Error fetching data:", error));


    function populateBoxItems(songs) {
        const innerStrip = document.querySelector('.inner-strip');

        songs.forEach(song => {
            const boxItem = document.createElement('div');
            boxItem.className = 'box-item';

            const imageDiv = document.createElement('div');
            imageDiv.className = 'box-item__image';
            const img = document.createElement('img');
            img.src = song.image.find(img => img.quality === "500x500").link;
            imageDiv.appendChild(img);

            const boxItems = document.querySelectorAll('.box-item');

boxItems.forEach(item => {
    const playButton = document.createElement('img');
    playButton.src = 'play.png'; // Replace with your actual path
    playButton.className = 'play-button';
    playButton.alt = 'Play';
    
    // Initially, set the play button to be hidden
    playButton.style.display = 'none';
    
    // Append the play button to the box-item
    item.appendChild(playButton);
    
    // Add event listener for hover effect
    item.addEventListener('mouseover', function() {
        playButton.style.display = 'block';
    });
    
    item.addEventListener('mouseout', function() {
        playButton.style.display = 'none';
    });
});


            const title = document.createElement('h4');
            title.textContent = song.name.replace(/&quot;/g, '');

            const albumInfo = document.createElement('p');
            albumInfo.textContent = song.album.name.replace(/&quot;/g, '');

            const songSrc = document.createElement('p');
            songSrc.textContent = song.downloadUrl.find(url => url.quality === "320kbps").link;
            songSrc.style.display = 'none';

            boxItem.appendChild(imageDiv);
            boxItem.appendChild(title);
            boxItem.appendChild(albumInfo);
            boxItem.appendChild(songSrc);

            innerStrip.appendChild(boxItem);

            boxItem.addEventListener('click', function() {
                const songSrc = this.querySelector('p[style="display: none;"]').textContent;
                audioPlayer.src = songSrc;
                audioPlayer.load();

                // Fetch song details
                fetch(songSrc)
                    .then(response => response.blob())
                    .then(blob => {
                        const audioObject = new Audio();
                        audioObject.src = URL.createObjectURL(blob);
                        return new Promise(resolve => {
                            audioObject.onloadedmetadata = () => {
                                resolve(audioObject.duration);
                            };
                        });
                    })
                    .then(songDuration => {
                        duration = Math.floor(songDuration); // Set the duration
                        timelineEnd.textContent = formatTime(duration); // Update the timelineEnd display
                    })
                    .catch(error => {
                        console.error("Error fetching song duration:", error);
                    });

                // Fetch song name and image details
                const songName = this.querySelector('h4').textContent;
                const songImgSrc = this.querySelector('img').src;

                // Update control panel with fetched details
                document.getElementById('currentSongImg').src = songImgSrc;
                document.getElementById('currentSongName').textContent = songName;

                // Show the song details in the control panel
                document.querySelector('.song-control__details').style.display = 'block';

                const songNameElement = document.getElementById('currentSongName');
                songNameElement.textContent = songName;

                // Check if song name exceeds the container width
                if (songNameElement.scrollWidth > songNameElement.clientWidth) {
                    // Apply scrolling animation
                    songNameElement.innerHTML = `<span>${songName}</span>`;
                } else {
                    // If it doesn't exceed, remove animation
                    songNameElement.innerHTML = songName;
                }
                // Play the song
                audioPlayer.play().then(() => {
                    playButton.classList.add('hidden');
                    pauseButton.classList.remove('hidden');
                }).catch((error) => {
                    console.error("Playback failed:", error);
                });
            });
        });

    }
});
