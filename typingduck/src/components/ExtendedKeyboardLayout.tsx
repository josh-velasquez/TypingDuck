const ExtendedKeyboardLayout = () => {
  return (
    <div className="keyboard">
      <div className="keyboard__row keyboard__row--h4">
        <div id="PrintScreen" data-key="" className="key--word">
          prnt scrn
        </div>
        <div id="Insert" data-key="" className="key--word">
          insert
        </div>
        <div id="Delete" data-key="46" className="key--word">
          delete
        </div>
      </div>
      <div className="keyboard__row keyboard__row--h4">
        <div id="ScrollLock" data-key="" className="key--word">
          scroll lock
        </div>
        <div id="Home" data-key="36" className="key--word">
          home
        </div>
        <div id="End" data-key="35" className="key--word">
          end
        </div>
      </div>
      <div className="keyboard__row keyboard__row--h4">
        <div data-key="" className="key--word">
          pause break
        </div>
        <div id="PageUp" data-key="33" className="key--word">
          page up
        </div>
        <div id="PageDown" data-key="34" className="key--word">
          page down
        </div>
      </div>
    </div>
  );
};

export default ExtendedKeyboardLayout;
