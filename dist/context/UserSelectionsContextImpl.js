var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { INITIAL_USER_SELECTIONS, userSelectionsContext, UserSelectionsKeys, userSelectionsMethodsContext, } from "./UserSelectionsContext.js";
const NAME = "user-selections-context-wrapper";
let UserSelectionsContextWrapper = class UserSelectionsContextWrapper extends LitElement {
    constructor() {
        super(...arguments);
        // User Selections object
        this._userSelections = INITIAL_USER_SELECTIONS;
        // User Selections methods context
        this._userSelectionsMethodsContext = {
            setSearchTerm: (searchTerm) => {
                this._userSelections = {
                    ...this._userSelections,
                    [UserSelectionsKeys.SearchTerm]: searchTerm,
                };
            },
            setSortChoice: (sortChoice) => {
                this._userSelections = {
                    ...this._userSelections,
                    [UserSelectionsKeys.SortChoice]: sortChoice,
                };
            },
            setSortDirection: (sortDirection) => {
                this._userSelections = {
                    ...this._userSelections,
                    [UserSelectionsKeys.SortDirection]: sortDirection,
                };
            },
        };
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    provide({ context: userSelectionsContext }),
    property({ attribute: false })
], UserSelectionsContextWrapper.prototype, "_userSelections", void 0);
__decorate([
    provide({ context: userSelectionsMethodsContext }),
    property({ attribute: false })
], UserSelectionsContextWrapper.prototype, "_userSelectionsMethodsContext", void 0);
UserSelectionsContextWrapper = __decorate([
    customElement(NAME)
], UserSelectionsContextWrapper);
export { UserSelectionsContextWrapper };
