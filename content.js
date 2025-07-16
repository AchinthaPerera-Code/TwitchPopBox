window.addEventListener("message", async (event) => {
  if (event.source !== window || event.data.type !== "START_DOC_PIP") return;

  const channel = event.data.channel;
  const parent = "www.twitch.tv";

  try {
    const pipWindow = await documentPictureInPicture.requestWindow({ width: 900, height: 600 });
    if (!pipWindow) {
      alert('Failed to create PiP window.');
      return;
    }

    // Reset default styles
    pipWindow.document.head.innerHTML = `
      <style>
        html, body {
          margin: 0;
          padding: 0;
          border: 0;
          overflow: hidden;
          height: 100%;
          width: 100%;
          background-color: black;
        }
        #main-container {
          display: flex;
          flex-direction: row;
          height: 100%;
          width: 100%;
          min-width: 480px;
          overflow-x: auto;
        }
        #video-container {
          flex: 2;
          min-width: 320px;
        }
        #chat-container {
          flex: 1;
          min-width: 200px;
          border-left: 2px solid #9147ff;
        }
        #toggle-chat-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
          background: #9147ff;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.85;
        }
        iframe {
          border: none;
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
    `;

    // Create HTML structure with no padding/margins
    pipWindow.document.body.innerHTML = `
      <div id="main-container" style="position:relative; height:100%; width:100%;">
        <button id="toggle-chat-btn" style="display:none;">Show Chat</button>
        <div id="video-container">
          <iframe
            src="https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&enableExtensions=true&muted=true&parent=${encodeURIComponent(parent)}&player=popout&quality=auto&volume=0"
            allowfullscreen
            allow="autoplay; fullscreen; picture-in-picture"
          ></iframe>
        </div>
        <div id="chat-container">
          <iframe
            src="https://www.twitch.tv/popout/${encodeURIComponent(channel)}/chat?popout="
          ></iframe>
        </div>
      </div>
    `;

    // Add resize handler to ensure containers always fill the window
    pipWindow.addEventListener('resize', () => {
      const mainContainer = pipWindow.document.getElementById('main-container');
      if (mainContainer) {
        mainContainer.style.height = pipWindow.innerHeight + 'px';
        mainContainer.style.width = pipWindow.innerWidth + 'px';
      }

      // Show only one of video or chat if too small
      const chatContainer = pipWindow.document.getElementById('chat-container');
      const videoContainer = pipWindow.document.getElementById('video-container');
      const toggleBtn = pipWindow.document.getElementById('toggle-chat-btn');
      if (pipWindow.innerWidth < 520) {
        if (toggleBtn) toggleBtn.style.display = '';
        // Default to showing video, hide chat
        if (toggleBtn && toggleBtn.dataset.state === 'chat') {
          if (chatContainer) chatContainer.style.display = '';
          if (videoContainer) videoContainer.style.display = 'none';
          toggleBtn.textContent = 'Show Video';
        } else {
          if (chatContainer) chatContainer.style.display = 'none';
          if (videoContainer) videoContainer.style.display = '';
          toggleBtn.textContent = 'Show Chat';
        }
      } else {
        if (chatContainer) chatContainer.style.display = '';
        if (videoContainer) videoContainer.style.display = '';
        if (toggleBtn) toggleBtn.style.display = 'none';
        if (toggleBtn) toggleBtn.dataset.state = '';
      }
    });
    pipWindow.dispatchEvent(new pipWindow.Event('resize'));

    // Toggle chat/video visibility on button click
    const toggleBtn = pipWindow.document.getElementById('toggle-chat-btn');
    const chatContainer = pipWindow.document.getElementById('chat-container');
    const videoContainer = pipWindow.document.getElementById('video-container');
    if (toggleBtn && chatContainer && videoContainer) {
      toggleBtn.addEventListener('click', () => {
        if (pipWindow.innerWidth >= 520) return;
        if (toggleBtn.dataset.state === 'chat') {
          // Switch to video
          chatContainer.style.display = 'none';
          videoContainer.style.display = '';
          toggleBtn.textContent = 'Show Chat';
          toggleBtn.dataset.state = '';
        } else {
          // Switch to chat
          chatContainer.style.display = '';
          videoContainer.style.display = 'none';
          toggleBtn.textContent = 'Show Video';
          toggleBtn.dataset.state = 'chat';
        }
      });
    }
  } catch (err) {
    console.error('DocPiP failed:', err);
    alert('Could not open PiP window: ' + err.message);
  }
});