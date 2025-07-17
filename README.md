# Twitch PopBox

A Chrome extension that allows you to open a Twitch stream and its chat in a floating, always-on-top window using the `documentPictureInPicture` API. This is perfect for multitasking while keeping your favorite stream and chat visible!

---

## Features

- 📺 **Pop out any Twitch stream and chat** into a floating window.
- 🪟 **Resizable and always-on-top**: Move and resize the window as you like.
- 🔄 **Responsive layout**: Video and chat are side-by-side on large windows, and toggleable on small windows.
- 🖱️ **Toggle chat visibility**: In small windows, switch between video and chat with a button.
- 🚫 **No unnecessary files**: Clean, minimal codebase.

---

## Installation

1. **Clone or download** this repository to your computer.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder (`TwitchPopBox`).
5. The extension icon will appear in your Chrome toolbar.

---

## Usage

1. **Go to any Twitch stream** (e.g., `https://www.twitch.tv/shroud`).
2. Click the extension icon in your Chrome toolbar.
3. A floating window will appear with the stream and chat.
4. **Resize** the window as needed:
   - On large windows, video and chat are side-by-side.
   - On small windows, use the "Show Chat"/"Show Video" button to toggle between them.

---

## Permissions

- `scripting`, `tabs`, `notifications`: Required for interacting with Twitch tabs and showing notifications.
- `host_permissions`: `https://www.twitch.tv/*` — Only needed for Twitch pages.

---

## Troubleshooting

- **Other Twitch extensions do not work in the chat?**
  - Extensions only run in top-level pages, not in iframes inside PiP windows. This is a browser security limitation.
- **Chat or video not visible in small windows?**
  - Use the toggle button to switch between them.
- **Extension not working?**
  - Make sure you are on a Twitch stream page and have allowed all required permissions.

---

## Contributing

Pull requests and suggestions are welcome! Please open an issue or PR for bug fixes, improvements, or new features.

---

## License

MIT License. See [LICENSE](LICENSE) for details. 
