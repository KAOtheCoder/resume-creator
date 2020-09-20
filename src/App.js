import jsPDF from 'jspdf';
import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <button className="App-button"
          onClick={() => {
            var doc = new jsPDF();
            doc.text(35, 25, 'Pdf Generated.');
            doc.output('dataurlnewwindow');
          }}
        >
          "Generate pdf"
        </button>
      </div>
    );
  }
}

export default App;
