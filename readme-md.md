# Mystic Memo Memory Game

A web-based memory card game with a mystical theme. Players match pairs of cards with mystical symbols, and upon completion, a special final image is revealed as a reward.

## Features

- Three difficulty levels: Easy (4x3), Medium (4x4), and Hard (6x4)
- Mystical themed symbols using Font Awesome icons
- Timer and move counter to track performance
- Responsive design that works on desktop and mobile devices
- Beautiful animations and transitions
- Final reward image upon completion

## Project Structure

```
mystic-memo/
├── index.html
├── about.html
├── css/
│   ├── style.css
│   └── about.css
├── js/
│   └── script.js
├── images/
│   ├── mystic-bg.jpg
│   ├── card-back.jpg
│   ├── final-image.jpg
│   └── game-preview.jpg
└── README.md
```

## Setup Instructions

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/mystic-memo.git
   ```

2. Navigate to the project directory:
   ```
   cd mystic-memo
   ```

3. Open `index.html` in your web browser to play the game.

## Hosting on GitHub Pages

1. Push the repository to your GitHub account
2. Go to the repository settings
3. Scroll down to the GitHub Pages section
4. Select the main branch as the source
5. The site will be published at `https://yourusername.github.io/mystic-memo/`

## Required Images

Before uploading to GitHub, you'll need to create/add these images to the `images` folder:

1. `mystic-bg.jpg` - A mystical background for the game
2. `card-back.jpg` - The design for the back of each card
3. `final-image.jpg` - The reward image shown upon completion
4. `game-preview.jpg` - A screenshot of the game for the About page

## Customization

You can customize the game by:

- Changing the colors in the CSS `:root` variables
- Adding more symbols to the `symbols` array in `script.js`
- Creating your own custom card back and final image

## Browser Compatibility

The game works in all modern browsers that support CSS Grid and CSS Flexbox:
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Font Awesome for the mystical symbols
- Google Fonts for Cinzel and Raleway fonts
