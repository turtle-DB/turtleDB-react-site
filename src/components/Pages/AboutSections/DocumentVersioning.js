import React from 'react';
import Citation from '../../Citation'

import { Carousel } from 'react-responsive-carousel';

const DocumentVersioning = () => {
  return (
    <div>
      <h2 id='document-versioning'>Document Versioning</h2>
      <p>
        <em>Note: throughout this study we will use the terms ‘version’ and ‘revision’
        interchangeably - they communicate the same concept, that a document can have
        multiple versions of itself stored at the same time.</em>
      </p>
      <p>
        turtleDB stores multiple copies of every document. Whenever a document is updated,
        a new revision of the document would be created and added to IndexedDB.
        In other words, we treated documents as immutable.
      </p>
      <p>
        The reason behind this decision was driven by our goal for turtleDB to provide
        flexible and transparent conflict resolution while minimizing lost work.
      </p>
      <p>
        A common scenario offline-first apps encounter can better illustrate the value of
        this design: two clients and a server share the same document in an offline-first application.
        The clients both go offline and independently make different changes. When they come back online,
        they share their changes with the server.
      </p>
      <p>
        When these two competing changes are introduced, a conflict is generated.
        Conflicts often arise in collaborative applications where work is done asynchronously.
      </p>
      <p>
        How should these conflicting changes across clients be resolved? Our answer to this question
        largely determined many design choices we made for turtleDB.
      </p>
      <h3 id="last-write-wins">Last Write Wins: Naive Solution</h3>
      <p>
        One solution might be Last Write Wins (LWW). LWW simply stores the most recent revision of a document.
        The “winner” in a conflict is always the last client to write to the database, which means work is often lost.
      </p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/doc_versioning/lww_1.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/lww_2.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/lww_3.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/lww_4.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/lww_5.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/lww_6.png" />
        </div>
      </Carousel>
      <p>
        Here, client 1 comes online first and shares their changes with the server.
      </p>
      <p>
        Next, client 2 comes online and pushes their changes. With LWW, their revision replaces client 1’s write.
      </p>
      <p>
        LWW might be appropriate for applications such as real-time collaborative text editors where a deletion of
        a letter or word does not have a significant impact.
      </p>
      <p>
        However, it comes at the cost of always losing work, and that cost only increases proportionally as the
        number of clients collaborating increases; only one client ever has its work saved. This is
        unacceptable when we want to work with a reliable data store. Furthermore, LWW does not provide
        any context as to how that data was lost.
      </p>

      <h3 id="keep-conflicting-revisions">Keep Conflicting Revisions: Naive Solution</h3>
      <p>
        One improvement over LWW would be to store the conflicting revisions of a document.
        In other words, historical revisions are still discarded, while the conflicts are kept.
      </p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/doc_versioning/kcv_1.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kcv_2.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kcv_3.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kcv_4.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kcv_5.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kcv_6.png" />
        </div>
      </Carousel>
      <p>
        Two competing revisions from each client are eventually consistent across all nodes.
        The crossed-out text demonstrates the original revision that was overwritten by the clients.
      </p>
      <p>
        Clearly, more work is being saved by this solution. Even better, it provides transparency to clients -
        they are informed of conflicts and can see all competing revisions.
      </p>
      <p>
        Still, this solution has drawbacks. How did this conflict arise? It is not entirely clear
        how the original “Sea Turtle” document has been lost.
      </p>
      <h4>Conflicts Without Context</h4>
      <p>
        Another subtle issue is how conflicts are resolved in this solution. Eventually, clients
        need to pick a winning revision. However, they can only access the conflicting revisions.
        There are a few options here, each with their own drawbacks:
      </p>
      <ul>
        <li>Developers need code that can automatically determine the winning revision. How would this algorithm work?</li>
        <li>Users need to pick a winning revision. This is a ‘slow consensus’ problem where user selections must be collected
          before the losing revisions can be safely removed</li>
        <li>
          Allow app users to see the conflict and edit any of the revisions. After a revision has not been edited for a certain amount of time,
          it is dropped, resolving conflicts over time.
        </li>
      </ul>
      <p>
        The last option is elegant, but it introduces a slew of time-related complications. All clients and server must receive updated timestamps
        resulting from changes elsewhere and their clocks must be kept in sync.
      </p>
      <p>
        Even if we introduce time tracking, users still lack context because they can’t see the last common revision.
      </p>
      <h3 id="document-history">Document History: turtleDB’s Solution</h3>
      <p>
        Many of the problems discussed in the previous section go away once the system starts preserving historical revisions of a document.
      </p>

      <p>
        Continuing with our simplified example, all clients and the server now share all document revisions and track the order of those revisions.
        In this example only the previous revision is shown, but in actuality, all revisions are stored by turtleDB.
      </p>

      <Carousel showArrows={true}>
        <div>
          <img src="../images/doc_versioning/kav_1.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kav_2.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kav_3.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kav_4.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kav_5.png" />
        </div>
        <div>
          <img src="../images/doc_versioning/kav_6.png" />
        </div>
      </Carousel>

      <p>
        In the case of a conflict, clients can now see how it arose. Even better, the clients don’t just see the
        competing revisions, they actually have access to every single revision that was added between the last
        common revision and the latest competing revisions. The picture below is a snapshot taken of turtleDB’s
        document store. Notice that even though the original document was updated, we kept both the original and
        updated versions.
      </p>

      <img className="w-100" src="../images/doc_versioning/store-docs.png"/>


      <p>
        Imagine two clients have common document. They then go offline, and each makes many changes to that document. All of these revisions are
        subsequently stored and tracked in what we call a <strong>meta document</strong>. We will describe meta documents
        in explicit detail shortly.
      </p>
      <p>
        When a client comes online and syncs, they receive the combined history of that document which has all the changes made by every client.
      </p>

      <img className="w-100" src="../images/doc_versioning/combine-histories.png"/>

      <p>
        With this branch, the developer has more options. For example, the developer could write code that:
      </p>
      <ul>
        <li>Determines a winner deterministically; longest branch wins </li>
        <li>Compares the two branches, and finds an intermediate point where both versions shared the same changes</li>
        <li>Determine the incremental changes between each revision along each branch, (i.e. find the “diffs”), and see
        how much of the two branches can be safely merged without losing any work</li>
      </ul>
      <p>
        By having turtleDB keep all revisions, the developer never has to worry about when a conflict occurred, or eventually deleting all the
        competing revisions that do not become the winning revision.
      </p>
      <p>
        To ensure developers could still delete older document versions if they wanted to, we implement a feature called
        <a href="#"><strong> compaction</strong></a>.
      </p>
      <p>
        In turtleDB, all competing work is transparent, provided with context, and without resorting to any time-based solutions
        or involved consensus mechanisms.
      </p>
      <p>
        We simplified the task for developers even further by including code to determine the “default” winning
        revision in conflicts. Our algorithm for choosing a default winner is modular and ensures developers can
        easily override it with their own deterministic algorithm.
      </p>
      <p>
        So far we have only mentioned the pros of storing all document versions. There are also some cons that came with this design choice:
      </p>
      <ul>
        <li>
          <strong>Space</strong> - Unlike traditional databases that store mutable records, we store every document version.
          Naturally, this requires a lot more space.
        </li>
        <li>
          <strong>Performance</strong> - We had to keep in mind the cost of traversing the document history tree. For example, retrieving the
          latest revision of a document shouldn’t require a full traversal.
        </li>
      </ul>
      <p>
        Now that performance related issues were on our mind and we knew we had limited space to work with,
        the next question we asked ourselves was <em>"How could we best keep track of these multiple document revisions
          in a performant and elegant manner?"</em>
      </p>
    </div>
  )
}

export default DocumentVersioning;
