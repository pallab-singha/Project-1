function go() {
    var req = indexeddb.open(...);
    req.onupgradeneeded = function(event) {
  
      // note that event.target === req === this, use whatever you like
      var db = event.target.result;
  
      // createObjectScore implicitly uses the versionchange txn running 
      // here, without telling you, basically a convenience function
      var objectStore = db.createObjectStore(...);
      var txn = event.target.transaction;
  
      // note that txn.objectStore(...) will work here, because the 
      // createObjectStore call earlier guarantees the store exists here
      // within the implicit upgrade txn
      var addRequest = txn.objectStore(...).add('value');
  
      // side note: if in previous line we did:
      // var objectStoreRetrievedFromTxn = txn.objectStore(...);
      // then that variable is equal to the same variable returned from 
      // db.createObjectStore earlier in this function. Both are simply handles 
      // (references, pointers, whatever you want to call it) to the store.
  
      // kind of dumb, but you could do this just to log something
      addRequest.onsuccess = function() {console.log('Success!');};
    };
  
    // called once upgrade txn completes (if it even needed to run), 
    // and db is opened
    req.onsuccess = function(event) {
      console.log('upgrade txn completed and db is now connected');
      // here, create whatever readwrite or readonly txns you want, note these 
      // txns are separate from and different than the versionchange txn from 
      // before, because that is a unique transaction only available within 
      // onupgradeneeded. however, both versionchange and readwrite are similar
      // in that both support calls to put or add
    };
  }