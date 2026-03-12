import { createContext } from "@lit/context";
export var UserSelectionsKeys;
(function (UserSelectionsKeys) {
    UserSelectionsKeys["SearchTerm"] = "searchTerm";
    UserSelectionsKeys["SortChoice"] = "sortChoice";
    UserSelectionsKeys["SortDirection"] = "sortDirection";
})(UserSelectionsKeys || (UserSelectionsKeys = {}));
export var SortChoice;
(function (SortChoice) {
    SortChoice["Date"] = "Date";
    SortChoice["Rating"] = "Rating";
    SortChoice["Relevance"] = "Relevance";
})(SortChoice || (SortChoice = {}));
export var SortDirection;
(function (SortDirection) {
    SortDirection["Asc"] = "asc";
    SortDirection["Desc"] = "desc";
})(SortDirection || (SortDirection = {}));
export const INITIAL_USER_SELECTIONS = {
    [UserSelectionsKeys.SearchTerm]: "",
    [UserSelectionsKeys.SortChoice]: SortChoice.Relevance,
    [UserSelectionsKeys.SortDirection]: SortDirection.Desc,
};
export const userSelectionsContext = createContext("userSelectionsContext");
export const userSelectionsMethodsContext = createContext("userSelectionsMethodsContext");
