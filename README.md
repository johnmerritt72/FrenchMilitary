# The French Military Game

A modernized JavaScript implementation of Martin Gardner's classic strategic board game, originally revised by Alan Gardner for the Commodore 64.

## About the Game

The French Military Game is a strategic two-player game where you (playing as White) face off against an AI opponent (playing as Black). The game features a unique diamond-shaped board with 11 numbered positions and emphasizes tactical positioning and movement control.

## Game Rules

### Setup
- **White pieces**: Start at positions 1, 2, and 4 (3 pieces total)
- **Black piece**: Starts at position 6 (1 piece only)
- **First move**: White always moves first

### Movement Rules
- **White pieces**: Can only move up, down, or to the right (one space at a time)
- **Black piece**: Can move in any direction (up, down, left, right, or diagonally)
- **Occupied spaces**: No piece can move to a space occupied by another piece

### Winning Conditions
- **White wins**: By trapping the black piece so it has no legal moves (typically at position 11, but can also occur at positions 5 or 7)
- **Black wins**: By either:
  - Reaching position 1, or
  - Surviving for 20 moves without being trapped

## Features

### Modern UI/UX
- **Drag-and-drop controls**: Move white pieces by dragging them to valid positions
- **Visual feedback**: Valid move destinations are highlighted with dotted white rectangles
- **Node numbers**: Displayed on top of all pieces for easy identification
- **Clean interface**: No unnecessary borders, modern styling

### Game Management
- **Move validation**: Only legal moves are allowed
- **Game state tracking**: Automatic detection of win/loss conditions
- **Move counter**: Tracks the 20-move limit
- **Resign option**: Available during active gameplay

### AI Learning
The game features an adaptive AI that learns from its mistakes:
- Stores game outcomes in memory arrays
- Becomes increasingly difficult as more games are played
- Adjusts strategy based on previous wins and losses

## How to Play

1. **Start the game**: Click "Start Game" from the main menu
2. **Make your move**: 
   - Click and drag any white piece to a valid position
   - Valid destinations will be highlighted when you start dragging
   - Only moves up, down, or to the right are allowed
3. **AI response**: The computer will automatically make its move
4. **Continue playing**: Alternate moves until someone wins or 20 moves are reached
5. **Game end**: Use "Play Again" or return to "Main Menu"

## Technical Requirements

- Modern web browser with JavaScript enabled
- Local HTTP server (recommended for optimal performance)

## Running the Game

### Option 1: Local HTTP Server (Recommended)
```bash
# Using Python (Python 3)
cd FrenchMilitary
python -m http.server 8000

# Using Node.js (if you have http-server installed)
cd FrenchMilitary
npx http-server

# Then open: http://localhost:8000
```

### Option 2: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Files Structure

- `index.html` - Main game page
- `game.js` - Core game logic and UI
- `jcanvas.js` - Canvas drawing library
- `README.md` - This documentation

## Strategy Tips

### For White (Player)
- Focus on controlling key positions that limit Black's movement
- Work towards trapping Black at position 11 (the most common winning position)
- Use your three pieces to create a "net" that gradually closes around Black
- Remember: you can only move right, up, or down - plan accordingly

### Understanding Black's AI
- The AI learns from previous games and becomes more challenging
- Early games may be easier as the AI hasn't learned optimal strategies yet
- The AI will try to reach position 1 or survive 20 moves
- It can move in any direction, making it highly mobile

## Game History

This implementation is based on Martin Gardner's mathematical game, which was later adapted by Alan Gardner for the Commodore 64. The original game demonstrated concepts of game theory and strategic planning while providing an engaging challenge that scales in difficulty.

## Development

Built with:
- **JavaScript**: Core game logic
- **jCanvas**: HTML5 Canvas manipulation
- **jQuery**: DOM manipulation and event handling

The game features modern drag-and-drop controls, visual feedback systems, and maintains the original's challenging AI while providing a contemporary user experience.
