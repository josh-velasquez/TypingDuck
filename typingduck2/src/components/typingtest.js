import React from "react";

class TypingTest extends React.Component {
  renderTypingTest() {
    return (
      <div class="keyboard">
            <div class="keyboard__row keyboard__row--h1">
                <div data-key="27" class="key--word" id="Escape">
                    <span>esc</span>
                </div>
                <div data-key="112" id="F1" class="key--fn">
                    <span>F1</span>
                </div>
                <div data-key="113" id="F2" class="key--fn">
                    <span>F2</span>
                </div>
                <div data-key="114" id="F3" class="key--fn">
                    <span>F3</span>
                </div>
                <div data-key="115" id="F4" class="key--fn">
                    <span>F4</span>
                </div>
                <div data-key="116" id="F5" class="key--fn">
                    <span>F5</span>
                </div>
                <div data-key="117" id="F6" class="key--fn">
                    <span>F6</span>
                </div>
                <div data-key="118" id="F7" class="key--fn">
                    <span>F7</span>
                </div>
                <div data-key="119" id="F8" class="key--fn">
                    <span>F8</span>
                </div>
                <div data-key="120" id="F9" class="key--fn">
                    <span>F9</span>
                </div>
                <div data-key="121" id="F10" class="key--fn">
                    <span>F10</span>
                </div>
                <div data-key="122" id="F11" class="key--fn">
                    <span>F11</span>
                </div>
                <div data-key="123" id="F12" class="key--fn">
                    <span>F12</span>
                </div>
                <div data-key="n/a" class="key--word">
                    <span>pwr</span>
                </div>
            </div>
            <div class="keyboard__row">
                <div class="key--double" id="`" data-key="192">
                    <div>~</div>
                    <div>`</div>
                </div>
                <div class="key--double" id="1" data-key="49">
                    <div>!</div>
                    <div>1</div>
                </div>
                <div class="key--double" id="2" data-key="50">
                    <div>@</div>
                    <div>2</div>
                </div>
                <div class="key--double" id="3" data-key="51">
                    <div>#</div>
                    <div>3</div>
                </div>
                <div class="key--double" id="4" data-key="52">
                    <div>$</div>
                    <div>4</div>
                </div>
                <div class="key--double" id="5" data-key="53">
                    <div>%</div>
                    <div>5</div>
                </div>
                <div class="key--double" id="6" data-key="54">
                    <div>^</div>
                    <div>6</div>
                </div>
                <div class="key--double" id="7" data-key="55">
                    <div>&</div>
                    <div>7</div>
                </div>
                <div class="key--double" id="8" data-key="56">
                    <div>*</div>
                    <div>8</div>
                </div>
                <div class="key--double" id="9" data-key="57">
                    <div>(</div>
                    <div>9</div>
                </div>
                <div class="key--double" id="0" data-key="48">
                    <div>)</div>
                    <div>0</div>
                </div>
                <div class="key--double" id="-" data-key="189">
                    <div>_</div>
                    <div>-</div>
                </div>
                <div class="key--double" id="=" data-key="187">
                    <div>+</div>
                    <div>=</div>
                </div>
                <div class="key--bottom-right key--word key--w4" id="Backspace" data-key="8">
                    <span>delete</span>
                </div>
            </div>
            <div class="keyboard__row">
                <div class="key--bottom-left key--word key--w4" id="Tab" data-key="9">
                    <span>tab</span>
                </div>
                <div class="key--letter" id="q" data-char="Q">Q</div>
                <div class="key--letter" id="w" data-char="W">W</div>
                <div class="key--letter" id="e" data-char="E">E</div>
                <div class="key--letter" id="r" data-char="R">R</div>
                <div class="key--letter" id="t" data-char="T">T</div>
                <div class="key--letter" id="y" data-char="Y">Y</div>
                <div class="key--letter" id="u" data-char="U">U</div>
                <div class="key--letter" id="i" data-char="I">I</div>
                <div class="key--letter" id="o" data-char="O">O</div>
                <div class="key--letter" id="p" data-char="P">P</div>
                <div class="key--double" id="[" data-key="219" data-char="{[">
                    <div>{"{"}</div>
                    <div>[</div>
                </div>
                <div class="key--double" id="]" data-key="221" data-char="}]">
                    <div>{"}"}</div>
                    <div>]</div>
                </div>
                <div class="key--double" id="\" data-key="220" data-char="|\">
                    <div>|</div>
                    <div>\</div>
                </div>
            </div>
            <div class="keyboard__row">
                <div class="key--bottom-left key--word key--w5" id="CapsLock" data-key="20">
                    <span>caps lock</span>
                </div>
                <div class="key--letter" id="a" data-char="A">A</div>
                <div class="key--letter" id="s" data-char="S">S</div>
                <div class="key--letter" id="d" data-char="D">D</div>
                <div class="key--letter" id="f" data-char="F">F</div>
                <div class="key--letter" id="g" data-char="G">G</div>
                <div class="key--letter" id="h" data-char="H">H</div>
                <div class="key--letter" id="j" data-char="J">J</div>
                <div class="key--letter" id="k" data-char="K">K</div>
                <div class="key--letter" id="l" data-char="L">L</div>
                <div class="key--double" id=";" data-key="186">
                    <div>:</div>
                    <div>;</div>
                </div>
                <div class="key--double" id="'" data-key="222">
                    <div>"</div>
                    <div>'</div>
                </div>
                <div class="key--bottom-right key--word key--w5" data-key="13">
                    <span>return</span>
                </div>
            </div>
            <div class="keyboard__row">
                <div class="key--bottom-left key--word key--w6" id="Shift" data-key="16">
                    <span>shift</span>
                </div>
                <div class="key--letter" id="z" data-char="Z">Z</div>
                <div class="key--letter" id="x" data-char="X">X</div>
                <div class="key--letter" id="c" data-char="C">C</div>
                <div class="key--letter" id="v" data-char="V">V</div>
                <div class="key--letter" id="b" data-char="B">B</div>
                <div class="key--letter" id="n" data-char="N">N</div>
                <div class="key--letter" id="m" data-char="M">M</div>
                <div class="key--double" id="," data-key="188">
                    <div>&lt;</div>
                    <div>,</div>
                </div>
                <div class="key--double" id="." data-key="190">
                    <div>&gt;</div>
                    <div>.</div>
                </div>
                <div class="key--double" id="/" data-key="191">
                    <div>?</div>
                    <div>/</div>
                </div>
                <div class="key--bottom-right key--word key--w6" id="Shift" data-key="16-R">
                    <span>shift</span>
                </div>
            </div>
            <div class="keyboard__row keyboard__row--h3">
                <div class="key--bottom-left key--word">
                    <span>fn</span>
                </div>
                <div class="key--bottom-left key--word key--w1" id="Control" data-key="17">
                    <span>control</span>
                </div>
                <div class="key--bottom-left key--word key--w1" id="Alt" data-key="18">
                    <span>Alt</span>
                </div>
                <div class="key--bottom-right key--word key--w3" id="Meta" data-key="91">
                    <span>Windows</span>
                </div>
                <div class="key--double key--right key--space" data-key="32" data-char=" ">
                    &nbsp;
                </div>
                <div class="key--bottom-left key--word key--w3" id="Meta" data-key="93-R">
                    <span>Windows</span>
                </div>
                <div class="key--bottom-left key--word key--w1" id="Alt" data-key="18-R">
                    <span>Alt</span>
                </div>
                <div data-key="37" class="key--arrow" id="ArrowLeft">
                    <span>&#9664;</span>
                </div>
                <div class="key--double key--arrow--tall" data-key="38">
                    <div>&#9650;</div>
                    <div>&#9660;</div>
                </div>
                <div data-key="39" class="key--arrow" id="ArrowRight">
                    <span>&#9654;</span>
                </div>
            </div>
        </div>
<<<<<<< HEAD
=======
        <div className="textbody">
          <div className="text">Typing Test</div>
        </div>
      </div>
>>>>>>> 6dad2d34b6a4629bfa74e66d8e6bf11745e2be7e
    );
  }

  render() {
    return this.renderTypingTest();
  }
}

export default TypingTest;
