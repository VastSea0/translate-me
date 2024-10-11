import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [showParagraph, setShowParagraph] = useState(true);
  const inputRef = useRef(null);

  // DOM'a erişmek için useRef kullanımı
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Component Did Mount ve Update örneği
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // JSX içinde conditional rendering ve event handling
  return (
    <div className="App">
      <h1>React DOM Test Application</h1>
      
      <div>
        <h2>1. React State ve Event Handling</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Artır</button>
        <button onClick={() => setCount(count - 1)}>Azalt</button>
      </div>

      <div>
        <h2>2. Conditional Rendering</h2>
        <button onClick={() => setShowParagraph(!showParagraph)}>
          {showParagraph ? "Paragrafı Gizle" : "Paragrafı Göster"}
        </button>
        {showParagraph && <p>Bu bir paragraf. İsterseniz gizleyebilirsiniz!</p>}
      </div>

      <div>
        <h2>3. DOM Manipülasyonu ve Ref Kullanımı</h2>
        <input ref={inputRef} type="text" placeholder="Bir şeyler yaz..." />
        <button onClick={focusInput}>Input'a Odaklan</button>
      </div>

      <div>
        <h2>4. Portallar ve Modaller</h2>
        <p>Modali açmak için aşağıdaki butona tıklayın:</p>
        <Modal />
      </div>
    </div>
  );
}

// React Portals kullanımı
function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleModal}>Modal Aç/Kapat</button>
      {isOpen &&
        ReactDOM.createPortal(
          <div className="modal">
            <h2>Ben bir Modalım!</h2>
            <button onClick={toggleModal}>Kapat</button>
          </div>,
          document.getElementById("modal-root")
        )}
    </>
  );
}

export default App;
