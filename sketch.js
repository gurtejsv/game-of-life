let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
    createCanvas(800, 600);
    cols = width / resolution;
    rows = height / resolution;

    grid = createRandomGrid(cols, rows);
}

function draw() {
    background(255);

    // Update the grid
    let next = createEmptyGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }

            // Display the cell
            fill(next[i][j] * 255);
            stroke(0);
            rect(i * resolution, j * resolution, resolution, resolution);
        }
    }

    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function createRandomGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    return grid;
}

function createEmptyGrid(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}
