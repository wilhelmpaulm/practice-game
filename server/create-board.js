const createBoard = (size) => {
    let board;

    const clear = () => {
        board = Array(size)
            .fill()
            .map(() => Array(size).fill(null));
    };

    const getBoard = () => {
        return board;
    };

    const makeTurn = (x, y, color) => {
        board[y][x] = color;

        console.table(board)
    };

    clear();

    return { clear, getBoard, makeTurn };
};

module.exports = createBoard;
