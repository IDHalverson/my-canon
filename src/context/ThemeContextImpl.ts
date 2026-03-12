import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

import { consume, provide } from "@lit/context";

import {
  ACTIVE_THEME_INITIAL,
  Theme,
  themeContext,
  ThemeKeys,
  themeObjectContext,
  THEMES,
  ThemesEnum,
} from "./ThemeContext.js";

const NAME = "theme-context-wrapper";
const CSS_HANDLER_NAME = "theme-css-handler";

export type LitElementWithActiveThemeObject = LitElement & {
  _activeThemeObject?: Theme;
};

@customElement(NAME)
export class ThemeContextWrapper extends LitElement {
  // Theme name
  @provide({ context: themeContext })
  @property({ attribute: false })
  protected _activeTheme: ThemesEnum = ACTIVE_THEME_INITIAL;

  // Theme object
  @provide({ context: themeObjectContext })
  @property({ attribute: false })
  protected _activeThemeObject: Theme = THEMES[ACTIVE_THEME_INITIAL];

  // TODO: provide method context to let users change the theme

  render() {
    return html`<slot></slot>`;
  }
}

@customElement(CSS_HANDLER_NAME)
export class ThemeCSSHandler extends LitElement {
  @consume({ context: themeObjectContext, subscribe: true })
  @property({ attribute: false })
  private _activeThemeObject?: Theme;

  override updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has("_activeThemeObject")) {
      Object.values(ThemeKeys).forEach((themeKey) => {
        this.style.setProperty(
          `--${themeKey}`,
          this._activeThemeObject?.[themeKey]?.toString() || null
        );
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: ThemeContextWrapper;
    [CSS_HANDLER_NAME]: ThemeCSSHandler;
  }
}
