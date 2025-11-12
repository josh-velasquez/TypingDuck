import React from "react";

const ExtendedKeyboardLayout: React.FC = () => {
  return (
    <div className="extended-keyboard" style={{ display: "flex", gap: "30px" }}>
      <div>
        <div className="keyboard__row">
          <div id="PrintScreen" data-key="44" className="key--word">
            prnt scrn
          </div>
          <div id="ScrollLock" data-key="145" className="key--word">
            scroll lock
          </div>
          <div data-key="19" className="key--word">
            pause break
          </div>
        </div>
        <div className="keyboard__row">
          <div id="Insert" data-key="45" className="key--word">
            insert
          </div>
          <div id="Home" data-key="36" className="key--word">
            home
          </div>
          <div id="PageUp" data-key="33" className="key--word">
            page up
          </div>
        </div>
        <div className="keyboard__row">
          <div id="Delete" data-key="46" className="key--word">
            delete
          </div>
          <div id="End" data-key="35" className="key--word">
            end
          </div>
          <div id="PageDown" data-key="34" className="key--word">
            page down
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div id="NumLock" data-key="144" className="key--word">
            num lock
          </div>
          <div id="NumpadDivide" data-key="111" className="key--word">
            /
          </div>
          <div id="NumpadMultiply" data-key="106" className="key--word">
            *
          </div>
          <div id="NumpadSubtract" data-key="109" className="key--word">
            -
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <div id="Numpad7" data-key="103" className="key--word">
                7
              </div>
              <div id="Numpad8" data-key="104" className="key--word">
                8
              </div>
              <div id="Numpad9" data-key="105" className="key--word">
                9
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div id="Numpad4" data-key="100" className="key--word">
                4
              </div>
              <div id="Numpad5" data-key="101" className="key--word">
                5
              </div>
              <div id="Numpad6" data-key="102" className="key--word">
                6
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div id="Numpad1" data-key="97" className="key--word">
                1
              </div>
              <div id="Numpad2" data-key="98" className="key--word">
                2
              </div>
              <div id="Numpad3" data-key="99" className="key--word">
                3
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div id="Numpad0" data-key="96" className="key--word" style={{ minWidth: "108px" }}>
                0
              </div>
              <div id="NumpadDecimal" data-key="110" className="key--word">
                .
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div id="NumpadAdd" data-key="107" className="key--word" style={{ height: "108px" }}>
              +
            </div>
            <div id="NumpadEnter" data-key="13" className="key--word" style={{ height: "108px" }}>
              enter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedKeyboardLayout;