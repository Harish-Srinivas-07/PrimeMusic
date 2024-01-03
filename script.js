<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Prime Music</title>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'>
    <link rel="stylesheet" href="./style.css">
    <link rel="icon" href="https://streamprime.netlify.app/netflix-images/icon2.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="script.js"></script>
</head>

<body>
    <!-- partial:index.partial.html -->
    <div class="device">
        <!-- SIDE BAR -->
        <aside>
            <div class="logo">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="Logo" />
            </div>
            <div class="general-options">
                <a id="Home" class="option active">
                    <i class="fas fa-home"></i>
                    Home
                </a>
                <div class="search-bar hidden" id="searchBar">
                    <input type="text" id="searchInput" placeholder="Search...">
                </div>
                <a id="Library" class="option">
                    <i class="fas fa-book-open"></i>
                    Your Library
                </a>
            </div>
            <div class="playlist-options">
                <span>Playlists</span>
                <a class="option">
                    <i class="fas fa-plus"></i>
                    Create Playlist
                </a>
                <a class="option">
                    <i class="fas fa-heart"></i>
                    Liked Songs
                </a>
            </div>
            <div class="playlists">
                <a id="Leo" class="option">
                    Leo
                </a>
                <a id="Jailer" class="option">
                    Jailer
                </a>
                <a id="Vikram" class="option">
                    Vikram
                </a>
                <a id="Jawan" class="option">
                    Jawan
                </a>
                <a id="Sethupathi" class="option">
                    KRK
                </a>
                <a id="LoveToday" class="option">
                    Love Today
                </a>
                <a id="VelaiIllaPadathari" class="option">
                    Vip
                </a>
            </div>
        </aside>
        <div class="container">
            <div style="height: 20px;"></div>
            <!-- HEADER -->
            <header class="fixed-header">
                <div class="head-btns" id="headBtns">
                    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="Logo" class="mobile-logo" id="mobileLogo">
                    <i class="fas fa-bars desktop-bars" id="desktopBars"></i>
                </div>
                <div class="profile">
                    <a href="https://instagram.com/being_exception" class="href">
                        <img src="https://i.ibb.co/YQkVXZJ/img.jpg" alt="Profile" /></a>
                    <span>Oreo Cat</span>
                </div>
            </header>

            <!-- MAIN AREA -->
            <div class="collection-strip">
                <div style="height: 40px;"></div>
                <div class="title-strip">
                    <h3>Popular playlists</h3>
                    <div id="home-search" class="search-bar-home">
                        <input type="text" class="contents" id="searchome" placeholder="Search songs, artist, movies, ...">
                    </div>
                </div>
                <div class="inner-strip">
                    <!-- box-items from request -->
                </div>

                <div style="height: 80px;"></div>
            </div>
        </div>

        <!-- SONG CONTROL STRIP -->
    </div>
    <!-- mobileplayer -->
    <div class="play">
        <div class="div">
            <img id="mobcurrentSongImg" class="song-img" src="https://c.saavncdn.com/005/I-m-Scared-From-Leo-Tamil-2023-20231027154923-500x500.jpg" alt="Current Song">
            <div class="group">
                <div id="mobcurrentSongName" class="currentSongName" style="color: white;">Now Playing ...</div>
            </div>
            <div class="play-button-circled"></div>
            <div class="pause-circled"></div>
            <div class="shuffle"></div>
        </div>
    </div>
    </div>
    <!-- pcplayer -->
    <audio id="audioPlayer" src="https://aac.saavncdn.com/005/38fc89ed330a107bbfd85aec57a44135_320.mp4"></audio>
    <div class="song-control">
        <div class="song-control__details">
            <img id="currentSongImg" src="https://c.saavncdn.com/005/I-m-Scared-From-Leo-Tamil-2023-20231027154923-500x500.jpg" alt="Current Song" width="50" height="50">
            <h4 id="currentSongName"></h4>
        </div>
        <div class="song-control__inner">
            <div class="song-control__buttons">
                <i class="fas fa-random"></i>
                <i class="fas fa-step-backward"></i>
                <i class="fas fa-pause"></i>
                <i class="fas fa-play"></i>
                <i class="fas fa-forward"></i>
                <i class="fas fa-redo-alt"></i>
            </div>
            <div class="song-control__timeline">
                <span>0:00</span>
                <div class="timeline">
                    <div class="timeline-fill"></div>
                </div>
                <span>2:00</span>
            </div>
        </div>
    </div>
    <!-- partial -->
</body>

</html>
