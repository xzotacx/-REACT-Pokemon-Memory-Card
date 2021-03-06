import { createContext, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  player1: {
    uuid: "",
    name: "",
    cards: [],
  },
  player2: {
    uuid: "",
    name: "",
    cards: [],
  },
};
const PlayersContext = createContext(initialState);

function PlayersProvider({ children }) {
  const [availableToPlay, setAvailableToPlay] = useState(false);
  const [player1, setPlayer1] = useState(initialState.player1);
  const [player2, setPlayer2] = useState(initialState.player2);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState({
    uuid: "",
    name: "",
    cards: [],
  });

  const resetAll = () => {
    setPlayer1(initialState.player1);
    setPlayer2(initialState.player2);
    setPlayerTurn(0);
    setTurn(0);
    setAvailableToPlay(false);
    setCurrentPlayer({
      uuid: "",
      name: "",
      cards: [],
    });
  };

  const setPlayerInfo = ({ players }) => {
    setPlayer1((prev) => ({ ...prev, name: players.player1, uuid: uuidv4() }));
    setPlayer2((prev) => ({ ...prev, name: players.player2, uuid: uuidv4() }));
    setAvailableToPlay(true);
  };

  const newGame = () => {
    setPlayer1((prev) => ({ ...prev, cards: [] }));
    setPlayer2((prev) => ({ ...prev, cards: [] }));
    setPlayerTurn(0);
    setTurn(0);
  };

  const addPlayerCard = ({ player, cardid }) => {
    if (player === 1) {
      setPlayer1((prev) => ({ ...prev, cards: [...player1.cards, cardid] }));
    } else if (player === 2) {
      setPlayer2((prev) => ({ ...prev, cards: [...player2.cards, cardid] }));
    }
  };

  const nextTurn = () => {
    setTurn((prev) => prev + 1);
  };

  const changeTurn = () => {
    if (playerTurn === 1) setPlayerTurn(2);
    else if (playerTurn === 2) setPlayerTurn(1);
  };

  useEffect(() => {
    if (playerTurn === 1) {
      setCurrentPlayer({ ...player1 });
    } else if (playerTurn === 2) {
      setCurrentPlayer({ ...player2 });
    }
    return () => {};
  }, [playerTurn]);

  return (
    <PlayersContext.Provider
      value={{
        player1,
        player2,
        setPlayerInfo,
        addPlayerCard,
        playerTurn,
        setPlayerTurn,
        currentPlayer,
        setCurrentPlayer,
        turn,
        changeTurn,
        resetAll,
        nextTurn,
        availableToPlay,
        newGame,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export { PlayersContext, PlayersProvider };
