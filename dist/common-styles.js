import { css } from "lit";
export const universalStyles = css `
  font-family: sans-serif;
`;
export const buttonStyles = css `
  background: var(--powerColor);
  cursor: pointer;
  border: none;
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  &:hover {
    opacity: 0.9;
  }
`;
