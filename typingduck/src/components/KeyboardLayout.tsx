import React from "react";

const KeyboardLayout: React.FC = () => {
  return (
    <div 
      className="keyboard"
      role="application"
      aria-label="Virtual keyboard layout"
      aria-describedby="keyboard-instructions"
    >
      <div className="keyboard__row keyboard__row--h1">
        <div 
          data-key="27" 
          className="key--word" 
          id="Escape"
          role="button"
          aria-label="Escape key"
          tabIndex={-1}
        >
          <span>esc</span>
        </div>
        <div data-key="112" id="F1" className="key--fn">
          <span>F1</span>
        </div>
        <div data-key="113" id="F2" className="key--fn">
          <span>F2</span>
        </div>
        <div data-key="114" id="F3" className="key--fn">
          <span>F3</span>
        </div>
        <div data-key="115" id="F4" className="key--fn">
          <span>F4</span>
        </div>
        <div data-key="116" id="F5" className="key--fn">
          <span>F5</span>
        </div>
        <div data-key="117" id="F6" className="key--fn">
          <span>F6</span>
        </div>
        <div data-key="118" id="F7" className="key--fn">
          <span>F7</span>
        </div>
        <div data-key="119" id="F8" className="key--fn">
          <span>F8</span>
        </div>
        <div data-key="120" id="F9" className="key--fn">
          <span>F9</span>
        </div>
        <div data-key="121" id="F10" className="key--fn">
          <span>F10</span>
        </div>
        <div data-key="122" id="F11" className="key--fn">
          <span>F11</span>
        </div>
        <div data-key="123" id="F12" className="key--fn">
          <span>F12</span>
        </div>
      </div>
      <div className="keyboard__row">
        <div className="key--double" id="`" data-key="192">
          <div>~</div>
          <div>`</div>
        </div>
        <div className="key--double" id="1" data-key="49">
          <div>!</div>
          <div>1</div>
        </div>
        <div className="key--double" id="2" data-key="50">
          <div>@</div>
          <div>2</div>
        </div>
        <div className="key--double" id="3" data-key="51">
          <div>#</div>
          <div>3</div>
        </div>
        <div className="key--double" id="4" data-key="52">
          <div>$</div>
          <div>4</div>
        </div>
        <div className="key--double" id="5" data-key="53">
          <div>%</div>
          <div>5</div>
        </div>
        <div className="key--double" id="6" data-key="54">
          <div>^</div>
          <div>6</div>
        </div>
        <div className="key--double" id="7" data-key="55">
          <div>&</div>
          <div>7</div>
        </div>
        <div className="key--double" id="8" data-key="56">
          <div>*</div>
          <div>8</div>
        </div>
        <div className="key--double" id="9" data-key="57">
          <div>(</div>
          <div>9</div>
        </div>
        <div className="key--double" id="0" data-key="48">
          <div>)</div>
          <div>0</div>
        </div>
        <div className="key--double" id="-" data-key="189">
          <div>_</div>
          <div>-</div>
        </div>
        <div className="key--double" id="=" data-key="187">
          <div>+</div>
          <div>=</div>
        </div>
        <div
          className="key--bottom-right key--word key--w4"
          id="Backspace"
          data-key="8"
        >
          <span>delete</span>
        </div>
      </div>
      <div className="keyboard__row">
        <div
          className="key--bottom-left key--word key--w4"
          id="Tab"
          data-key="9"
        >
          <span>tab</span>
        </div>
        <div className="key--letter" id="q" data-char="Q">
          Q
        </div>
        <div className="key--letter" id="w" data-char="W">
          W
        </div>
        <div className="key--letter" id="e" data-char="E">
          E
        </div>
        <div className="key--letter" id="r" data-char="R">
          R
        </div>
        <div className="key--letter" id="t" data-char="T">
          T
        </div>
        <div className="key--letter" id="y" data-char="Y">
          Y
        </div>
        <div className="key--letter" id="u" data-char="U">
          U
        </div>
        <div className="key--letter" id="i" data-char="I">
          I
        </div>
        <div className="key--letter" id="o" data-char="O">
          O
        </div>
        <div className="key--letter" id="p" data-char="P">
          P
        </div>
        <div className="key--double" id="[" data-key="219" data-char="{[">
          <div>{"{"}</div>
          <div>[</div>
        </div>
        <div className="key--double" id="]" data-key="221" data-char="}]">
          <div>{"}"}</div>
          <div>]</div>
        </div>
        <div className="key--double" id="\" data-key="220" data-char="|\">
          <div>|</div>
          <div>\</div>
        </div>
      </div>
      <div className="keyboard__row">
        <div
          className="key--bottom-left key--word key--w5"
          id="CapsLock"
          data-key="20"
        >
          <span>caps lock</span>
        </div>
        <div className="key--letter" id="a" data-char="A">
          A
        </div>
        <div className="key--letter" id="s" data-char="S">
          S
        </div>
        <div className="key--letter" id="d" data-char="D">
          D
        </div>
        <div className="key--letter" id="f" data-char="F">
          F
        </div>
        <div className="key--letter" id="g" data-char="G">
          G
        </div>
        <div className="key--letter" id="h" data-char="H">
          H
        </div>
        <div className="key--letter" id="j" data-char="J">
          J
        </div>
        <div className="key--letter" id="k" data-char="K">
          K
        </div>
        <div className="key--letter" id="l" data-char="L">
          L
        </div>
        <div className="key--double" id=";" data-key="186">
          <div>:</div>
          <div>;</div>
        </div>
        <div className="key--double" id="'" data-key="222">
          <div>"</div>
          <div>'</div>
        </div>
        <div
          className="key--bottom-right key--word key--w5"
          id="Enter"
          data-key="13"
        >
          <span>return</span>
        </div>
      </div>
      <div className="keyboard__row">
        <div
          className="key--bottom-left key--word key--w6"
          id="Shift"
          data-key="16"
        >
          <span>shift</span>
        </div>
        <div className="key--letter" id="z" data-char="Z">
          Z
        </div>
        <div className="key--letter" id="x" data-char="X">
          X
        </div>
        <div className="key--letter" id="c" data-char="C">
          C
        </div>
        <div className="key--letter" id="v" data-char="V">
          V
        </div>
        <div className="key--letter" id="b" data-char="B">
          B
        </div>
        <div className="key--letter" id="n" data-char="N">
          N
        </div>
        <div className="key--letter" id="m" data-char="M">
          M
        </div>
        <div className="key--double" id="," data-key="188">
          <div>&lt;</div>
          <div>,</div>
        </div>
        <div className="key--double" id="." data-char="." data-key="190">
          <div>&gt;</div>
          <div>.</div>
        </div>
        <div className="key--double" id="/" data-key="191">
          <div>?</div>
          <div>/</div>
        </div>
        <div
          className="key--bottom-right key--word key--w6"
          id="Shift-R"
          data-key="16-R"
        >
          <span>shift</span>
        </div>
      </div>
      <div className="keyboard__row keyboard__row--h3">
        <div id="Function" className="key--bottom-left key--word">
          <span>fn</span>
        </div>
        <div
          className="key--bottom-left key--word key--w1"
          id="Control"
          data-key="17"
        >
          <span>control</span>
        </div>
        <div
          className="key--bottom-left key--word key--w1"
          id="Alt"
          data-key="18"
        >
          <span>option</span>
        </div>
        <div
          className="key--bottom-right key--word key--w3"
          id="Meta"
          data-key="91"
        >
          <span>command</span>
        </div>
        <div
          className="key--double key--right key--space"
          data-key="32"
          id="Space"
          data-char=" "
        >
          &nbsp;
        </div>
        <div
          className="key--bottom-left key--word key--w3"
          id="Meta-R"
          data-key="93-R"
        >
          <span>command</span>
        </div>
        <div
          className="key--bottom-left key--word key--w1"
          id="Alt-R"
          data-key="18-R"
        >
          <span>option</span>
        </div>
        <div data-key="37" className="key--arrow" id="ArrowLeft">
          <span>&#9664;</span>
        </div>
        <div className="key--double key--arrow--tall">
          <div id="ArrowUp" data-key="38">
            &#9650;
          </div>
          <div id="ArrowDown" data-key="40">
            &#9660;
          </div>
        </div>
        <div data-key="39" className="key--arrow" id="ArrowRight">
          <span>&#9654;</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardLayout;
