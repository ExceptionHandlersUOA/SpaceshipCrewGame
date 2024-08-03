export function ElementTube({ sequence }: { sequence: string }) {
    return (
        <p>Sequence: {sequence}</p>
    );
}

//function Square({ value, onSquareClick }: { value: String, onSquareClick: () => void }) {
//     return (
//         <button className="square" onClick={onSquareClick}>
//             {value}
//         </button>
//     );
// }

// function Board({ xIsNext, squares }: { xIsNext: Boolean, squares: }) {
//     function handleClick(i) {
//         const nextSquares = squares.slice();
//         if (xIsNext) {
//             nextSquares[i] = 'X';
//         }
//         else {
//             nextSquares[i] = 'O';
//         }
//         onPlay(nextSquares);
//     }

//     return (
//         <>
//             <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//             <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//             <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//         </>
//     );
// }