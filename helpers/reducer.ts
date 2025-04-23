// helpers/reducer.ts
export type Action = {
  type: 'TOGGLE_EPISODE';
  payload: { saga: string; arc: string; title: string };
};

export const onePaceReducer = (state: Serie, action: Action): Serie => {
  switch (action.type) {
    case 'TOGGLE_EPISODE': {
      const { saga, arc, title } = action.payload;
      const newState: Serie = structuredClone(state);

      const episode = newState[saga][arc].find((e) => e.title === title);
      if (!episode) return state;

      episode.watched = !episode.watched;
      localStorage.setItem('one_pace', JSON.stringify(newState));

      return newState;
    }

    default:
      return state;
  }
};
