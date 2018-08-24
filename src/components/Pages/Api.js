import React from 'react';
export const Api = () => {
  return (
    <div className='documentation m0 mh-100'>
      <div className='flex-container'>
        <div id='split-left' className='overflow-auto fs0 left-nav'>
          <div className='py1 px2'>
            <h3 className='mb0 no-anchor'>turtleDB API</h3>
            <div className='mb1'><code>1.0.0</code></div>
            <div id='toc'>
              <ul className='list-reset h5 py1-ul'>
                <li><a href='#create' className="">create</a></li>
                <li><a href='#read' className="">read</a></li>
                <li><a href='#update' className="">update</a></li>
                <li><a href='#mergeUpdate' className="">mergeUpdate</a></li>
                <li><a href='#delete' className="">delete</a></li>
                <li><a href='#dropDB' className="">dropDB</a></li>
                <li><a href='#setRemote' className="">setRemote</a></li>
                <li><a href='#sync' className="">sync</a></li>
                <li><a href='#setBatchLimit' className="">setBatchLimit</a></li>
                <li><a href='#setConflictWinner' className="">setConflictWinner</a></li>
                <li><a href='#autoSyncOn' className="">autoSyncOn</a></li>
                <li><a href='#autoSyncOff' className="">autoSyncOff</a></li>
                <li><a href='#compactStore' className="">compactStore</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div id='split-right' className='relative overflow-auto'>
          <section className='p2 mb2 mt2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='create'>create</h3>
            </div>
            <p>Creates a document. An _id will automatically be generated for the document
                   if the _id property on the document passed in is not specified.</p>
            <p>Returns the generated document with the _id property and the automatically generated _rev property.</p>
            <div className='pre p1 fill-light mt0'>db.create(doc: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>doc</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
                  <ul>
                    <li>document to be inserted into store</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns the generated document with _id and _rev properties</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='read'>read</h3>
            </div>
            <p>Takes a document _id and returns that document. Returns the winning version by default if no specific revision ID (_rev) is provided.</p>
            <div className='pre p1 fill-light mt0'>db.read(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>, [_rev: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>])</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_id</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>_id of the document to be read</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Optional Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_rev</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>the specific _rev (revision ID) of the document to be read</li>
                    <li>defaults to the winning version if no revision ID provided</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns the generated document with _id and _rev properties, as well as _conflicts and _conflictVersion properties if conflicts exist</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='update'>update</h3>
            </div>
            <p>Takes a document _id and updates that document, overwriting all of its properties with those of the new document passed into update.</p>
            <p>Updates the winning version by default if no revision ID (_rev) is provided. If a revision ID is provided, it must be for a leaf revision.</p>
            <div className='pre p1 fill-light mt0'>db.update(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>, doc: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>, [_rev: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>])
            </div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_id</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>_id of the document to update</li>
                  </ul>
                </div>
              </div>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>doc</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
                  <ul>
                    <li>properties which will replace the old document's properties</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Optional Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_rev</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>the specific _rev (revision ID) of the document to be updated</li>
                    <li>defaults to the winning version if no revision ID provided</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns the newly updated document with _id and _rev properties, as well as _conflicts and _conflictVersion properties if conflicts exist</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='mergeUpdate'>mergeUpdate</h3>
            </div>
            <p>Takes a document _id and updates that document, merging the new properties provided with the old properties on that document.</p>
            <p>Updates the winning version by default if no revision ID (_rev) is provided. If a revision ID is provided, it must be for a leaf revision.</p>
            <div className='pre p1 fill-light mt0'>db.mergeUpdate(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>, doc: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>, [_rev: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>])
            </div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_id</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>_id of the document to update</li>
                  </ul>
                </div>
              </div>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>doc</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
                  <ul>
                    <li>properties which will be merged with the old document's properties</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Optional Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_rev</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>the specific _rev (revision ID) of the document to be updated</li>
                    <li>defaults to the winning version if no revision ID provided</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns the newly updated document with _id and _rev properties, as well as _conflicts and _conflictVersion properties if conflicts exist</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='delete'>delete</h3>
            </div>
            <p>Takes a document _id and deletes that document.</p>
            <p>Deletes the winning version by default if no revision ID (_rev) is provided. If a revision ID is provided, it must be for a leaf revision.</p>
            <div className='pre p1 fill-light mt0'>db.delete(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>, [_rev: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>])</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>_id</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>_id of the document to delete</li>
                  </ul>
                </div>
              </div>
              <div className='py1 quiet mt1 prose-big'>Optional Parameters</div>
              <div className='prose'>
                <div className='space-bottom0'>
                  <div>
                    <span className='code bold'>_rev</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                    <ul>
                      <li>the specific _rev (revision ID) of the document to be deleted</li>
                      <li>defaults to the winning version if no revision ID provided</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns the deleted document with _id and _rev properties, as well as _conflicts and _conflictVersion properties if conflicts still exist</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='dropDB'>dropDB</h3>
            </div>
            <p>Drops the entire turtleDB locally. <strong>This is permanent and cannot be reversed.</strong></p>
            <div className='pre p1 fill-light mt0'>db.dropDB(_name: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>name</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>the specific turtleDB database name to be dropped</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns <strong>true</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='setRemote'>setRemote</h3>
            </div>
            <p>Set the URL of the remote, tortoiseDB server to sync with. Set to <span className="code"> http://localhost:3000</span> by default.</p>
            <div className='pre p1 fill-light mt0'>db.setRemote(remoteUrl: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>remoteURL</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                  <ul>
                    <li>remote url of the tortoiseDB server to sync with</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='sync'>sync</h3>
            </div>
            <p>Triggers a full sync process with the remote server.</p>
            <div className='pre p1 fill-light mt0'>db.sync()</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='setBatchLimit'>setbatchLimit</h3>
            </div>
            <p>Set the maximum limit for the number of meta documents or documents sent over in one HTTP reuqest during the sync process. Set by default to <span className="code">1000</span>.</p>
            <div className='pre p1 fill-light mt0'>db.setBatchLimit(batchLimit: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>batchLimit</span> <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
                  <ul>
                    <li>maximum number of meta documents or documents to be sent over in one HTTP request during sync</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='setConflictWinner'>setConflictWinner</h3>
            </div>
            <p>Takes a document that has conflicting versions and deletes all the other versions, making the version passed in the default winner.</p>
            <div className='pre p1 fill-light mt0'>db.setConflictWinner(doc: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)
            </div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>doc</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
                  <ul>
                    <li>entire document to select as the winning version</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns the originally passed in document with _id and _rev properties</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='autoSyncOn'>autoSyncOn</h3>
            </div>
            <p>Set the database to trigger sync requests at regular intervals. Interval peroid set by default to <span className="code">3000</span> ms if no argument provided.</p>
            <div className='pre p1 fill-light mt0'>db.autoSyncOn([interval: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>])</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Optional Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>interval</span> <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
                  <ul>
                    <li>interval in <strong>milliseconds</strong> between sync requests. Defaults to <span className="code">3000</span> if not provided.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a>)</code>
                  <ul>
                    <li>returns <span className="code">true</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='autoSyncOff'>autoSyncOff</h3>
            </div>
            <p>Stops any already running auto-sync process.</p>
            <div className='pre p1 fill-light mt0'>db.autoSyncOff()</div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean</a>)</code>
                  <ul>
                    <li>returns <span className="code">true</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className='p2 mb2 clearfix bg-white minishadow'>
            <div className='clearfix'>
              <h3 className='fl m0' id='compactStore'>compactStore</h3>
            </div>
            <p>Permanently removes all non-leaf revisions from the database as a space-saving measure. <strong>This is permanent and cannot be reversed.</strong></p>
            <div className='pre p1 fill-light mt0'>db.compactStore()
            </div>
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>None</span>
                </div>
              </div>
            </div>
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <div className='prose'>
              <div className='space-bottom0'>
                <div>
                  <code className='quiet'>(<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</a>)</code>
                  <ul>
                    <li>returns a Promise which, if successful, returns <span className="code">true</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
export default Api;
