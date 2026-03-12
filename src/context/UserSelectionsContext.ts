import { createContext } from "@lit/context";

export enum UserSelectionsKeys {
  SearchTerm = "searchTerm",
  SortChoice = "sortChoice",
  SortDirection = "sortDirection",
}

export enum SortChoice {
  Date = "Date",
  Rating = "Rating",
  Relevance = "Relevance",
}

export enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

export interface UserSelections {
  [UserSelectionsKeys.SearchTerm]: string;
  [UserSelectionsKeys.SortChoice]: SortChoice;
  [UserSelectionsKeys.SortDirection]: SortDirection;
}

export const INITIAL_USER_SELECTIONS: UserSelections = {
  [UserSelectionsKeys.SearchTerm]: "",
  [UserSelectionsKeys.SortChoice]: SortChoice.Relevance,
  [UserSelectionsKeys.SortDirection]: SortDirection.Desc,
};

export interface UserSelectionsPublicMethods {
  setSearchTerm: (searchTerm: string) => void;
  setSortChoice: (sortChoice: SortChoice) => void;
  setSortDirection: (sortChoice: SortDirection) => void;
}

export const userSelectionsContext = createContext<UserSelections>(
  "userSelectionsContext"
);

export const userSelectionsMethodsContext =
  createContext<UserSelectionsPublicMethods>("userSelectionsMethodsContext");
