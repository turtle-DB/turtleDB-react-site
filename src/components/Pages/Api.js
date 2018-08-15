import React from 'react';
export const Api = () => {
  return (
    <div className='documentation m0'>
       <div className='flex'>
          <div id='split-left' className='overflow-auto fs0 height-viewport-100'>
             <div className='py1 px2'>
                <h3 className='mb0 no-anchor'>turtleDB API</h3>
                <div className='mb1'><code>1.0.0</code></div>
                <div id='toc'>
                   <ul className='list-reset h5 py1-ul'>
                      <li><a href='#create' className="">create</a></li>
                      <li><a href='#read' className="">read</a></li>
                      <li><a href='#update' className="">update</a></li>
                      <li><a href='#delete' className="">delete</a></li>
                      <li><a href='#deleteAll' className="">deleteAll</a></li>
                      <li><a href='#dropDB' className="">dropDB</a></li>
                   </ul>
                </div>
             </div>
          </div>
          <div id='split-right' className='relative overflow-auto height-viewport-100'>
             <section className='p2 mb2 clearfix bg-white minishadow'>
                <div className='clearfix'>
                   <h3 className='fl m0' id='create'>
                     create
                   </h3>
                </div>
                <p>Create and inserts a document into the turtleDB store. An _id will automatically be generated for the document
                   if one is not specified.</p>
                <div className='pre p1 fill-light mt0'>create(doc: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
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
             </section>
             <section className='p2 mb2 clearfix bg-white minishadow'>
                <div className='clearfix'>
                   <h3 className='fl m0' id='read'>
                      read
                   </h3>
                </div>
                <p>Retrieves the winning document by default. If a _rev is specified, attempts to retrieve that specific document's revision only if it's a leaf node.</p>
                <div className='pre p1 fill-light mt0'>read(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>, _rev: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
                <div className='py1 quiet mt1 prose-big'>Parameters</div>
                <div className='prose'>
                   <div className='space-bottom0'>
                      <div>
                         <span className='code bold'>_id</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                         <ul>
                            <li>_id of the document to retrieve</li>
                         </ul>
                      </div>
                   </div>
                   <div className='space-bottom0'>
                      <div>
                         <span className='code bold'>_rev</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
                         <ul>
                            <li>(OPTIONAL) the _rev of the document to be read</li>
                         </ul>
                      </div>
                   </div>
                </div>
             </section>
             <section className='p2 mb2 clearfix bg-white minishadow'>
                <div className='clearfix'>
                   <h3 className='fl m0' id='update'>
                      update
                   </h3>
                </div>
                <p>Updates the specified document, replacing all of its properties with those of the new document passed into update.</p>
                <div className='pre p1 fill-light mt0'>update(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>, doc: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
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
                            <li>properties which will replace the old doc's properties</li>
                         </ul>
                      </div>
                   </div>
                </div>
             </section>
             <section className='p2 mb2 clearfix bg-white minishadow'>
                <div className='clearfix'>
                   <h3 className='fl m0' id='delete'>
                      delete
                   </h3>
                </div>
                <p>Deletes the specified document. Deleted documents cannot be updated or retrieved.</p>
                <div className='pre p1 fill-light mt0'>delete(_id: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
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
                </div>
             </section>

             <section className='p2 mb2 clearfix bg-white minishadow'>
                <div className='clearfix'>
                   <h3 className='fl m0' id='deleteAll'>
                      deleteAll
                   </h3>
                </div>
                <p>Deletes all documents inside the <strong>store</strong>. </p>
                <div className='pre p1 fill-light mt0'>deleteAll()</div>
                <div className='py1 quiet mt1 prose-big'>Parameters</div>
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
                   <h3 className='fl m0' id='dropDB'>
                      dropDB
                   </h3>
                </div>
                <p>Drops the entire turtleDB. <strong>This is permanent and cannot be reversed.</strong>. </p>
                <div className='pre p1 fill-light mt0'>dropDB()</div>
                <div className='py1 quiet mt1 prose-big'>Parameters</div>
                <div className='prose'>
                   <div className='space-bottom0'>
                      <div>
                         <span className='code bold'>None</span>
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
