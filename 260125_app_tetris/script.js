const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextCanvas');
const nextCtx = nextCanvas.getContext('2d');
const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');
const levelElement = document.getElementById('level');
const overlay = document.getElementById('overlay');
const message = document.getElementById('message');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const PREVIEW_BLOCK_SIZE = 25;

// Tetromino definitions
const SHAPES = [
    [], // Empty placeholder
    [[1, 1, 1, 1]], // I - Cyan
    [[1, 1], [1, 1]], // O - Yellow
    [[0, 1, 0], [1, 1, 1]], // T - Purple
    [[1, 0, 0], [1, 1, 1]], // L - Orange
    [[0, 0, 1], [1, 1, 1]], // J - Blue
    [[0, 1, 1], [1, 1, 0]], // S - Green
    [[1, 1, 0], [0, 1, 1]]  // Z - Red
];

const COLORS = [
    'transparent',
    '#00f0f0', // I
    '#f0f000', // O
    '#a000f0', // T
    '#f0a000', // L
    '#0000f0', // J
    '#00f000', // S
    '#f00000'  // Z
];

let board = [];
let piece = null;
let nextPiece = null;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let score = 0;
let lines = 0;
let level = 1;
let isPaused = false;
let isGameOver = false;
let isGameRunning = false;

// Initialize board
function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// Generate random piece
function randomPiece() {
    const typeId = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
    const shape = SHAPES[typeId];
    return {
        matrix: shape,
        typeId: typeId,
        x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
        y: 0
    };
}

// Draw a single block
function drawBlock(ctx, x, y, typeId, size = BLOCK_SIZE) {
    if (typeId === 0) return;
    ctx.fillStyle = COLORS[typeId];
    ctx.fillRect(x * size, y * size, size, size);
    // Add 3D effect
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.strokeRect(x * size, y * size, size, size);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(x * size + size * 0.1, y * size + size * 0.8, size * 0.8, size * 0.1);
    ctx.fillRect(x * size + size * 0.8, y * size + size * 0.1, size * 0.1, size * 0.8);
}

// Draw the board and current piece
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                drawBlock(ctx, x, y, value);
            }
        });
    });

    // Draw ghost piece (optional visual aid)
    if (piece) {
        let ghostY = piece.y;
        while (!collide(board, { ...piece, y: ghostY + 1 })) {
            ghostY++;
        }
        piece.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.fillRect((piece.x + x) * BLOCK_SIZE, (ghostY + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.strokeRect((piece.x + x) * BLOCK_SIZE, (ghostY + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });

        // Draw active piece
        piece.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    drawBlock(ctx, piece.x + x, piece.y + y, piece.typeId);
                }
            });
        });
    }
}

// Draw next piece preview
function drawNext() {
    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
    if (!nextPiece) return;

    const offsetX = (nextCanvas.width - nextPiece.matrix[0].length * PREVIEW_BLOCK_SIZE) / 2 / PREVIEW_BLOCK_SIZE;
    const offsetY = (nextCanvas.height - nextPiece.matrix.length * PREVIEW_BLOCK_SIZE) / 2 / PREVIEW_BLOCK_SIZE;

    nextPiece.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                drawBlock(nextCtx, x + offsetX, y + offsetY, nextPiece.typeId, PREVIEW_BLOCK_SIZE);
            }
        });
    });
}

// Collision detection
function collide(board, player) {
    const m = player.matrix;
    const o = player;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (board[y + o.y] && board[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

// Merge piece into board
function merge(board, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + player.y][x + player.x] = player.typeId;
            }
        });
    });
}

// Line clear check
function sweep() {
    let rowCount = 0;
    outer: for (let y = board.length - 1; y > 0; --y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }

        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;
        rowCount++;
    }

    if (rowCount > 0) {
        lines += rowCount;
        score += rowCount * 100 * level; // Simple scoring
        level = Math.floor(lines / 10) + 1;
        dropInterval = Math.max(100, 1000 - (level - 1) * 100);

        updateScore();
    }
}

// Update UI
function updateScore() {
    scoreElement.innerText = score;
    linesElement.innerText = lines;
    levelElement.innerText = level;
}

// Rotate matrix
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

// Player movement
function playerRotate(dir) {
    const pos = piece.x;
    let offset = 1;
    rotate(piece.matrix, dir);
    while (collide(board, piece)) {
        piece.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > piece.matrix[0].length) {
            rotate(piece.matrix, -dir);
            piece.x = pos;
            return;
        }
    }
}

function playerReset() {
    piece = nextPiece;
    nextPiece = randomPiece();
    piece.y = 0;
    piece.x = Math.floor(COLS / 2) - Math.floor(piece.matrix[0].length / 2);

    if (collide(board, piece)) {
        isGameOver = true;
        isGameRunning = false;
        message.innerHTML = `GAME OVER<br>SCORE: ${score}<br>PRESS ENTER`;
        overlay.classList.remove('hidden');
    }
    drawNext();
}

function playerDrop() {
    piece.y++;
    if (collide(board, piece)) {
        piece.y--;
        merge(board, piece);
        sweep();
        playerReset();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    piece.x += dir;
    if (collide(board, piece)) {
        piece.x -= dir;
    }
}

// Game loop
function update(time = 0) {
    if (!isGameRunning || isPaused) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

// Input handling
document.addEventListener('keydown', event => {
    if (isGameOver) {
        if (event.key === 'Enter') {
            resetGame();
        }
        return;
    }

    if (!isGameRunning) {
        if (event.key === 'Enter') {
            resetGame();
        }
        return;
    }

    if (event.key === 'p' || event.key === 'P') {
        isPaused = !isPaused;
        if (isPaused) {
            message.innerText = 'PAUSED';
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
            lastTime = performance.now();
            update();
        }
        return;
    }

    if (isPaused) return;

    if (event.key === 'ArrowLeft') {
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        playerDrop();
    } else if (event.key === 'ArrowUp') {
        playerRotate(1);
    } else if (event.key === ' ') { // Space drop
        while (!collide(board, { ...piece, y: piece.y + 1 })) {
            piece.y++;
        }
        playerDrop(); // Lock it
    }
});

function resetGame() {
    board = createBoard();
    score = 0;
    lines = 0;
    level = 1;
    dropInterval = 1000;
    updateScore();

    nextPiece = randomPiece();
    playerReset();

    isGameOver = false;
    isPaused = false;
    isGameRunning = true;
    overlay.classList.add('hidden');

    lastTime = performance.now();
    update();
}

// Initial draw (blank board)
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawNext();
