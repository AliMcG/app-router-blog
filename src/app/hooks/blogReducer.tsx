export const initialState: State = {
  title: "",
  description: "",
  image: "",
  numberVotes: 0
};

export type State = {
    id?: string;
    title: string;
    description: string;
    image: string;
    createdAt?: Date;
    numberVotes?: number
  };
  
  export enum ActionKind {
    Description = "DESCRIPTION",
    Title = "TITLE",
    Image = "IMAGE",
  }
  
  export type Action = {
    type: ActionKind;
    payload: string;
  };

  export function blogReducer(state: State, action: Action): State {
    const { type, payload } = action;
  
    switch (type) {
      case ActionKind.Description:
        return {
          ...state,
          description: payload,
        };
      case ActionKind.Image:
        return {
          ...state,
          image: payload,
        };
      case ActionKind.Title:
        return {
          ...state,
          title: payload,
        };
      default:
        return state;
    }
  }