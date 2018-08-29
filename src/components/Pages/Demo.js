import React from 'react';
import DemoApp from './Demo/DemoApp';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <div className="info-container">
          <div className="info-text">
            <h2 className="text-center">Todo App Demo</h2>
            <p>To demonstrate how turtleDB and tortoiseDB work, we built a simple demo todo app. Each of these apps has its own instance of a turtleDB database, and both of them are hooked up to the same remote tortoiseDB database.</p>

            <p>We included two of them so you can simulate what it might look like with two users working collaboratively on a todo list.</p>

            <p>You can try adding todo items, editing them, and deleting them. When you hit the sync button, it will send any updates you made to the remote database, as well as retrieve any updates from the database. (Note that this database is wiped clean every 10 minutes, so your data will not persist there).</p>

            <p>You should be able to share updates between the two todo lists via sync. You should also be able to generate conflicts (competing updates) by having both lists update the same item before syncing both.</p>

            <p>Once a conflict is generated, you should be able to resolve it easily by picking a winner.</p>

            <p>Lastly, you can also test out the offline-first functionality of this demo. In Chrome, if you open up DevTools, go the 'Network' tab, you can click on the 'Offline' box to disconnect this tab from the network. Thanks to ServiceWorkers and turtleDB, you should be able to refresh the page, see your todo items persisted, and continue to work on your todo lists.</p>
            <div className="demo-img-container">
              <img className="demo-img" src="images/devtools-offline-hl.png" alt="devtools offline" />
            </div>
          </div>
        </div>
        <div className="todo-apps-container">
          <DemoApp name="todo-left" />
          <div className="vertical-line"></div>
          <DemoApp name="todo-right" />
        </div>
        <div className="info-container-bottom">
          <div className="info-text">
            <p>Note that if you want to completely remove the local turtleDB databases when finished, you can again open DevTools, go to the 'Application' tab, on the left sidebar under 'Storage' expand the 'IndexedDB' dropdown, and click on either 'turtleDB-todo-left' or right, and you should be able to 'Delete database'. If you wish to continue using the todo demo apps, you will have to refresh the page to start with two new empty databases.</p>
            <div className="demo-img-container">
              <img className="demo-img" src="images/indexedb-demo-delete-hl.png" alt="delete indexeddb" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;