var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume, provide } from "@lit/context";
import { ACTIVE_THEME_INITIAL, themeContext, ThemeKeys, themeObjectContext, THEMES, } from "./ThemeContext.js";
const NAME = "theme-context-wrapper";
const CSS_HANDLER_NAME = "theme-css-handler";
let ThemeContextWrapper = class ThemeContextWrapper extends LitElement {
    constructor() {
        super(...arguments);
        // Theme name
        this._activeTheme = ACTIVE_THEME_INITIAL;
        // Theme object
        this._activeThemeObject = THEMES[ACTIVE_THEME_INITIAL];
    }
    // TODO: provide method context to let users change the theme
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    provide({ context: themeContext }),
    property({ attribute: false })
], ThemeContextWrapper.prototype, "_activeTheme", void 0);
__decorate([
    provide({ context: themeObjectContext }),
    property({ attribute: false })
], ThemeContextWrapper.prototype, "_activeThemeObject", void 0);
ThemeContextWrapper = __decorate([
    customElement(NAME)
], ThemeContextWrapper);
export { ThemeContextWrapper };
let ThemeCSSHandler = class ThemeCSSHandler extends LitElement {
    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has("_activeThemeObject")) {
            Object.values(ThemeKeys).forEach((themeKey) => {
                this.style.setProperty(`--${themeKey}`, this._activeThemeObject?.[themeKey]?.toString() || null);
            });
        }
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    consume({ context: themeObjectContext, subscribe: true }),
    property({ attribute: false })
], ThemeCSSHandler.prototype, "_activeThemeObject", void 0);
ThemeCSSHandler = __decorate([
    customElement(CSS_HANDLER_NAME)
], ThemeCSSHandler);
export { ThemeCSSHandler };
