import { css } from 'lit-element';

export const SheetItemStyles = css`
:host {
  --sheet-header-background-color: #003b77;
  --sheet-header-text-color: #fff;
  --sheet-header-font-family: "Museo-300", "Times New Roman", serif;
  box-sizing: border-box;
  display: block;
}
*,
:before,
:after {
  box-sizing: inherit;
}
svg {
  fill: currentColor;
}
.sheet {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  transform: translateX(120%);
  transition: transform 350ms ease-in-out;
  background-color: #f4f4f4;
  box-shadow: 0 0 10px -5px rgba(0, 0, 0, 0.3), 0 0 24px 2px rgba(0, 0, 0, 0.24), 0 0 30px 5px rgba(0, 0, 0, 0.22);
}
.sheet__header {
  display: flex;
  align-items: center;
  padding: 1.25em 1.5em;
  background-color: var(--sheet-header-background-color);
  color: var(--sheet-header-text-color);
}
.sheet__frame {
  position: relative;
  flex: 1 0 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.sheet__content {
  padding: 1.5em;
}
.sheet__footer {
  padding: 1.5em;
  background-color: #fff;
  border-top: 1px solid #f4f4f4;
}
.sheet__close {
  display: block;
  flex: 0 0 1em;
  width: 1em;
  height: 1em;
  cursor: pointer;
}
.sheet__close > svg {
  width: 100%;
  height: 100%;
}
.sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 300ms ease-in-out, z-index 1000ms ease-in;
  transition-duration: 300ms, 1000ms;
}
.sheet.-is-open ~ .sheet-overlay {
  opacity: 1;
  z-index: 1;
  transition-duration: 300ms, 1ms;
}
.sheet__main-heading {
  flex: 1 0 auto;
  margin: 0;
  font-size: 1.25em;
  font-weight: normal;
  font-family: var(--sheet-header-font-family);
  line-height: 1.2;
}
.sheet__heading {
  margin: 0 0 0.5em;
  color: #09c;
  font-weight: 300;
  font-size: 1.5rem;
  font-family: "Museo-300", "Times New Roman", serif;
}
`;