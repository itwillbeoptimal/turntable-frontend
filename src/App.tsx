import MyIcon from './assets/react.svg?react';
import ThemeProvider from './styles/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <p>
          This is a paragraph. It has default margins and line heights which
          will be reset.
        </p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <MyIcon width={40} height={40} />
      </div>
    </ThemeProvider>
  );
}

export default App;
